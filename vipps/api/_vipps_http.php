<?php
// vipps/api/_vipps_http.php
require_once __DIR__ . "/_bootstrap.php";

function vipps_required(string $name): string {
  if (!defined($name) || trim((string)constant($name)) === "") {
    http_response_code(500);
    echo json_encode(["error" => "Missing constant: " . $name]);
    exit;
  }
  return (string)constant($name);
}

function vipps_system_headers(): array {
  // Disse kan du endre fritt (Vipps liker at du sender dem)
  return [
    "Vipps-System-Name: Fjolsenbanden",
    "Vipps-System-Version: 1.0.0",
    "Vipps-System-Plugin-Name: custom-php",
    "Vipps-System-Plugin-Version: 1.0.0",
  ];
}

function vipps_get_access_token(): string {
  $tokenUrl = vipps_required("VIPPS_TOKEN_URL");
  $clientId = vipps_required("VIPPS_CLIENT_ID");
  $clientSecret = vipps_required("VIPPS_CLIENT_SECRET");
  $subKey = vipps_required("VIPPS_SUBSCRIPTION_KEY");

  // Enkel token-cache (30-40 min) for shared hosting
  $cacheFile = sys_get_temp_dir() . "/vipps_token_" . md5($clientId) . ".json";
  if (is_readable($cacheFile)) {
    $cached = json_decode((string)file_get_contents($cacheFile), true);
    if (is_array($cached) && !empty($cached["access_token"]) && !empty($cached["expires_at"])) {
      if ((int)$cached["expires_at"] > time() + 60) {
        return (string)$cached["access_token"];
      }
    }
  }

  $body = http_build_query([
    "grant_type" => "client_credentials",
    // Viktig: scope må matche produktet ditt. For Recurring brukes normalt "recurring"
    "scope" => "recurring",
  ]);

  $auth = base64_encode($clientId . ":" . $clientSecret);

  // Vipps har hatt både /accessToken/get (legacy) og /access-token/get (ny).
  // Prøv begge automatisk dersom første returnerer 404.
  $tokenUrls = array_values(array_unique([
    $tokenUrl,
    str_replace("access-token", "accessToken", $tokenUrl),
    str_replace("accessToken", "access-token", $tokenUrl),
  ]));

  $lastError = null;

  foreach ($tokenUrls as $url) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => $body,
      CURLOPT_HTTPHEADER => array_merge([
        "Content-Type: application/x-www-form-urlencoded",
        "Ocp-Apim-Subscription-Key: " . $subKey,
        "Authorization: Basic " . $auth,
        // Vipps krever fortsatt eksplisitte client_id/client_secret headers noen steder
        "client_id: " . $clientId,
        "client_secret: " . $clientSecret,
      ], vipps_system_headers()),
      CURLOPT_TIMEOUT => 30,
    ]);

    $resp = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err  = curl_error($ch);
    curl_close($ch);

    if ($resp === false) {
      $lastError = ["error" => "Curl error", "details" => $err];
      continue;
    }

    $data = json_decode($resp, true);

    if ($code >= 200 && $code < 300 && !empty($data["access_token"]) && !empty($data["expires_in"])) {
      $expiresAt = time() + (int)$data["expires_in"];
      @file_put_contents($cacheFile, json_encode([
        "access_token" => $data["access_token"],
        "expires_at" => $expiresAt
      ]));
      return (string)$data["access_token"];
    }

    // Lagre siste feilen, men prøv fallback-URL hvis 404/no route
    $lastError = ["error" => "Vipps token error", "status" => $code, "response" => $data ?: $resp];
    if ($code >= 400 && $code < 500) {
      // fortsetter til neste URL i listen
      continue;
    } else {
      break;
    }
  }

  http_response_code(500);
  echo json_encode($lastError ?: ["error" => "Vipps token error", "response" => "Unknown"]);
  exit;
}

function vipps_request(string $method, string $url, ?array $jsonBody = null, array $extraHeaders = []): array {
  $subKey = vipps_required("VIPPS_SUBSCRIPTION_KEY");
  $msn    = vipps_required("VIPPS_MSN");

  $token = vipps_get_access_token();

  $headers = array_merge([
    "Content-Type: application/json",
    "Accept: application/json",
    "Ocp-Apim-Subscription-Key: " . $subKey,
    "Authorization: Bearer " . $token,
    // Viktig for Recurring: Idempotency-Key på POST/PUT (trygt å sende alltid)
    "Idempotency-Key: " . bin2hex(random_bytes(16)),
    // Vipps bruker MSN i header (navn kan variere, men dette fungerer i praksis for mange oppsett)
    "Merchant-Serial-Number: " . $msn,
  ], vipps_system_headers(), $extraHeaders);

  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_TIMEOUT, 30);

  if ($jsonBody !== null) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($jsonBody, JSON_UNESCAPED_SLASHES));
  }

  $resp = curl_exec($ch);
  $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err  = curl_error($ch);
  curl_close($ch);

  if ($resp === false) {
    return ["_curl_error" => true, "status" => 0, "response" => $err];
  }

  $decoded = json_decode($resp, true);
  return [
    "status" => $code,
    "response" => ($decoded !== null ? $decoded : $resp),
  ];
}

function vipps_post_json(string $url, array $payload, array $headers = []): array {
  $res = vipps_request("POST", $url, $payload, $headers);
  if (!empty($res["_curl_error"])) {
    http_response_code(500);
    echo json_encode(["error" => "Curl error", "details" => $res["response"]]);
    exit;
  }
  if ((int)$res["status"] < 200 || (int)$res["status"] >= 300) {
    http_response_code(500);
    echo json_encode(["error" => "Vipps API error", "status" => $res["status"], "response" => $res["response"]]);
    exit;
  }
  return (array)$res["response"];
}

function vipps_get_json(string $url, array $headers = []): array {
  $res = vipps_request("GET", $url, null, $headers);
  if (!empty($res["_curl_error"])) {
    http_response_code(500);
    echo json_encode(["error" => "Curl error", "details" => $res["response"]]);
    exit;
  }
  if ((int)$res["status"] < 200 || (int)$res["status"] >= 300) {
    http_response_code(500);
    echo json_encode(["error" => "Vipps API error", "status" => $res["status"], "response" => $res["response"]]);
    exit;
  }
  return (array)$res["response"];
}
