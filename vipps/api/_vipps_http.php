<?php
// vipps/api/_vipps_http.php

require_once __DIR__ . "/_bootstrap.php";

/**
 * Henter OAuth access token fra Vipps
 */
function vipps_get_access_token(): string
{
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

    if ($response === false || $httpCode !== 200) {
        http_response_code(500);
        echo json_encode([
            "error" => "Vipps token error",
            "status" => $httpCode,
            "response" => $response,
        ]);
        exit;
    }

    $data = json_decode($response, true);

    if (!isset($data["access_token"])) {
        http_response_code(500);
        echo json_encode([
            "error" => "No access_token returned",
            "raw" => $data,
        ]);
        exit;
    }

    return $data["access_token"];
}

/**
 * POST JSON til Vipps API (Recurring)
 */
function vipps_post_json(string $url, array $payload): array
{
    $token = vipps_get_access_token();

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/json",
            "Ocp-Apim-Subscription-Key: " . VIPPS_SUBSCRIPTION_KEY,
            "Authorization: Bearer $token",
            "Idempotency-Key: " . bin2hex(random_bytes(16)),
        ],
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($response === false) {
        http_response_code(500);
        echo json_encode([
            "error" => "Curl error",
            "detail" => curl_error($ch),
        ]);
        exit;
    }

    $data = json_decode($response, true);

    if ($httpCode >= 400) {
        http_response_code(500);
        echo json_encode([
            "error" => "Vipps API error",
            "status" => $httpCode,
            "response" => $data,
        ]);
        exit;
    }

    return $data ?? [];
}
