<?php
// vipps/api/_vipps_http.php
require_once __DIR__ . "/_bootstrap.php";

function vipps_get_access_token(): string {
  $ch = curl_init(VIPPS_TOKEN_URL);
  $body = http_build_query([
    "grant_type" => "client_credentials",
    "scope" => "recurring"
  ]);

  $auth = base64_encode(VIPPS_CLIENT_ID . ":" . VIPPS_CLIENT_SECRET);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_HTTPHEADER => [
      "Content-Type: application/x-www-form-urlencoded",
      "Ocp-Apim-Subscription-Key: " . VIPPS_SUBSCRIPTION_KEY,
      "Authorization: Basic $auth",
    ],
  ]);

  $response = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "Curl error: " . curl_error($ch)]);
    exit;
  }
  curl_close($ch);

  if ($httpCode !== 200) {
    http_response_code(500);
    echo json_encode([
      "token_error" => true,
      "status" => $httpCode,
      "response" => $response
    ]);
    exit;
  }
  $data = json_decode($response, true);
  if (!isset($data["access_token"])) {
    http_response_code(500);
    echo json_encode(["error" => "No access_token in response", "details" => $data]);
    exit;
  }
  return $data["access_token"];
}

function vipps_post_json(string $url, array $payload, array $extraHeaders = []): array {
  $token = vipps_get_access_token();

  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_HTTPHEADER => array_merge([
      "Content-Type: application/json",
      "Accept: application/json",
      "Authorization: Bearer " . $token,
      "Ocp-Apim-Subscription-Key: " . VIPPS_SUBSCRIPTION_KEY,
    ], $extraHeaders),
  ]);

  $raw = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

  if ($raw === false) {
    http_response_code(500);
    echo json_encode(["error" => "Curl error: " . curl_error($ch)]);
    exit;
  }
  curl_close($ch);

  $data = json_decode($raw, true);
  if ($code < 200 || $code >= 300) {
    http_response_code($code);
    echo json_encode(["error" => "Vipps API error", "details" => $data ?: $raw]);
    exit;
  }
  return $data ?: [];
}
