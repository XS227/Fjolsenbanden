<?php
require_once __DIR__ . "/_bootstrap.php";

function vipps_get_access_token(): string {
  $ch = curl_init(VIPPS_TOKEN_URL);

  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
      "Content-Type: application/json",
      "Ocp-Apim-Subscription-Key: " . VIPPS_SUBSCRIPTION_KEY,
      "Merchant-Serial-Number: " . VIPPS_MSN,
      "client_id: " . VIPPS_CLIENT_ID,
      "client_secret: " . VIPPS_CLIENT_SECRET,

      // anbefalt metadata (ikke strengt nødvendig, men ok)
      "Vipps-System-Name: " . VIPPS_SYSTEM_NAME,
      "Vipps-System-Version: " . VIPPS_SYSTEM_VERSION,
      "Vipps-Plugin-Name: " . VIPPS_PLUGIN_NAME,
      "Vipps-Plugin-Version: " . VIPPS_PLUGIN_VERSION,
    ],
    CURLOPT_POSTFIELDS => "", // tom body
  ]);

  $resp = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

  if ($resp === false) {
    http_response_code(500);
    echo json_encode(["token_error" => true, "curl" => curl_error($ch)]);
    exit;
  }

  $data = json_decode($resp, true);

  if ($code < 200 || $code >= 300 || !is_array($data) || empty($data["access_token"])) {
    http_response_code(500);
    echo json_encode([
      "token_error" => true,
      "status" => $code,
      "response" => $data ?? $resp
    ]);
    exit;
  }

  return (string)$data["access_token"];
}

function vipps_post_json(string $url, array $payload): array {
  $token = vipps_get_access_token();

  $ch = curl_init($url);
  $json = json_encode($payload, JSON_UNESCAPED_UNICODE);

  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
      "Content-Type: application/json",
      "Authorization: Bearer " . $token,
      "Ocp-Apim-Subscription-Key: " . VIPPS_SUBSCRIPTION_KEY,
      "Merchant-Serial-Number: " . VIPPS_MSN,

      "Vipps-System-Name: " . VIPPS_SYSTEM_NAME,
      "Vipps-System-Version: " . VIPPS_SYSTEM_VERSION,
      "Vipps-Plugin-Name: " . VIPPS_PLUGIN_NAME,
      "Vipps-Plugin-Version: " . VIPPS_PLUGIN_VERSION,
    ],
    CURLOPT_POSTFIELDS => $json,
  ]);

  $resp = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

  if ($resp === false) {
    http_response_code(500);
    echo json_encode(["error" => "Curl error", "details" => curl_error($ch)]);
    exit;
  }

  $data = json_decode($resp, true);

  if ($code < 200 || $code >= 300) {
    http_response_code(500);
    echo json_encode([
      "error" => "Vipps API error",
      "status" => $code,
      "response" => $data ?? $resp
    ]);
    exit;
  }

  return is_array($data) ? $data : [];
}
