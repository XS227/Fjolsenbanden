<?php
// vipps/api/_vipps_http.php
require_once __DIR__ . "/_bootstrap.php";

/**
 * Minimal Vipps HTTP helper for shared hosting (cURL only).
 * - Fetches OAuth token using client_credentials
 * - Adds required headers (Subscription key, Authorization, MSN)
 * - Adds Idempotency-Key automatically for POST/PUT/PATCH (required by Recurring)
 */

function vipps_uuid_v4(): string {
  $data = random_bytes(16);
  $data[6] = chr((ord($data[6]) & 0x0f) | 0x40);
  $data[8] = chr((ord($data[8]) & 0x3f) | 0x80);
  return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function vipps_get_access_token(): string {
  static $cached = null;
  static $expiresAt = 0;

  if ($cached && time() < ($expiresAt - 30)) {
    return $cached;
  }

  // IMPORTANT: scope must match the API you use (Recurring -> "recurring")
  $postFields = http_build_query([
    "grant_type" => "client_credentials",
    "scope"      => "recurring",
  ]);

  $ch = curl_init(VIPPS_TOKEN_URL);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $postFields,
    CURLOPT_HTTPHEADER     => [
      "Content-Type: application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key: " . VIPPS_SUBSCRIPTION_KEY,
      "Authorization: Basic " . base64_encode(VIPPS_CLIENT_ID . ":" . VIPPS_CLIENT_SECRET),
    ],
    CURLOPT_TIMEOUT        => 20,
  ]);

  $raw = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err  = curl_error($ch);
  curl_close($ch);

  if ($raw === false) {
    http_response_code(500);
    echo json_encode(["error" => "cURL error", "detail" => $err]);
    exit;
  }

  $json = json_decode($raw, true);
  if ($code < 200 || $code >= 300 || !is_array($json) || empty($json["access_token"])) {
    http_response_code(500);
    echo json_encode([
      "error" => "Vipps token error",
      "status" => $code,
      "response" => $json ?? $raw
    ]);
    exit;
  }

  $cached = (string)$json["access_token"];
  $expiresAt = time() + (int)($json["expires_in"] ?? 3600);
  return $cached;
}

function vipps_request(string $method, string $url, ?array $jsonBody = null): array {
  $token = vipps_get_access_token();

  $headers = [
    "Content-Type: application/json",
    "Accept: application/json",
    "Authorization: Bearer " . $token,
    "Ocp-Apim-Subscription-Key: " . VIPPS_SUBSCRIPTION_KEY,
    // Recurring API expects Merchant Serial Number as header:
    "Merchant-Serial-Number: " . VIPPS_MSN,

    // Nice-to-have (safe defaults):
    "Vipps-System-Name: Fjolsenbanden",
    "Vipps-System-Version: 1.0.0",
    "Vipps-System-Plugin-Name: SharedHostingPHP",
    "Vipps-System-Plugin-Version: 1.0.0",
  ];

  // Idempotency-Key required for create/update operations in many Vipps APIs
  $upper = strtoupper($method);
  if (in_array($upper, ["POST", "PUT", "PATCH"], true)) {
    $headers[] = "Idempotency-Key: " . vipps_uuid_v4();
  }

  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST  => $upper,
    CURLOPT_HTTPHEADER     => $headers,
    CURLOPT_TIMEOUT        => 25,
  ]);

  if ($jsonBody !== null) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($jsonBody, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
  }

  $raw  = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err  = curl_error($ch);
  curl_close($ch);

  if ($raw === false) {
    return ["__httpCode" => 0, "__curlError" => $err];
  }

  $decoded = json_decode($raw, true);
  if ($decoded === null && trim($raw) !== "") {
    // Non-JSON response
    return ["__httpCode" => $code, "__raw" => $raw];
  }

  if (is_array($decoded)) {
    $decoded["__httpCode"] = $code;
    return $decoded;
  }

  return ["__httpCode" => $code, "__raw" => $raw];
}

function vipps_get_json(string $url): array {
  return vipps_request("GET", $url, null);
}

function vipps_post_json(string $url, array $payload): array {
  return vipps_request("POST", $url, $payload);
}
