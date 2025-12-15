<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=utf-8");

// LAST SECRETS LOKALT (IKKE URL)
$secretsPath = $_SERVER['DOCUMENT_ROOT'] . "/P/fjolsen_secret.php";

if (!file_exists($secretsPath)) {
  http_response_code(500);
  echo json_encode([
    "error" => "Secrets file not found",
    "path" => $secretsPath
  ]);
  exit;
}

$secrets = require $secretsPath;

function must(array $arr, string $key): string {
  if (!isset($arr[$key]) || trim((string)$arr[$key]) === "") {
    http_response_code(500);
    echo json_encode(["error" => "Missing secret: {$key}"]);
    exit;
  }
  return (string)$arr[$key];
}

define("VIPPS_ENV", must($secrets, "VIPPS_ENV"));
define("VIPPS_CLIENT_ID", must($secrets, "VIPPS_CLIENT_ID"));
define("VIPPS_CLIENT_SECRET", must($secrets, "VIPPS_CLIENT_SECRET"));
define("VIPPS_SUBSCRIPTION_KEY", must($secrets, "VIPPS_SUBSCRIPTION_KEY"));
define("VIPPS_MSN", must($secrets, "VIPPS_MSN"));

define(
  "VIPPS_TOKEN_URL",
  VIPPS_ENV === "test"
    ? "https://apitest.vipps.no/access-token-service/oauth/token"
    : "https://api.vipps.no/access-token-service/oauth/token"
);

define(
  "VIPPS_RECURRING_BASE",
  VIPPS_ENV === "test"
    ? "https://apitest.vipps.no/recurring/v3"
    : "https://api.vipps.no/recurring/v3"
);
