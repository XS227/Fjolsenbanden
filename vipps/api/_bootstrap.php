<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=utf-8");

// Secrets-fil (ligger i /P/ inne i webroot)
$secretsPath = $_SERVER['DOCUMENT_ROOT'] . "/P/fjolsen_secret.php";

if (!file_exists($secretsPath)) {
  http_response_code(500);
  echo json_encode([
    "error" => "Secrets file not found",
    "path"  => $secretsPath
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

define("VIPPS_ENV", must($secrets, "VIPPS_ENV")); // "test" eller "prod"
define("VIPPS_CLIENT_ID", must($secrets, "VIPPS_CLIENT_ID"));
define("VIPPS_CLIENT_SECRET", must($secrets, "VIPPS_CLIENT_SECRET"));
define("VIPPS_SUBSCRIPTION_KEY", must($secrets, "VIPPS_SUBSCRIPTION_KEY"));
define("VIPPS_MSN", must($secrets, "VIPPS_MSN"));

// Riktig Access Token endpoint
define(
  "VIPPS_TOKEN_URL",
  VIPPS_ENV === "test"
    ? "https://apitest.vipps.no/access-token-service/oauth/token"
    : "https://api.vipps.no/access-token-service/oauth/token"
);

// Recurring base
define(
  "VIPPS_RECURRING_BASE",
  VIPPS_ENV === "test"
    ? "https://apitest.vipps.no/recurring/v3"
    : "https://api.vipps.no/recurring/v3"
);

// (Valgfritt, men fint å ha)
define("VIPPS_SYSTEM_NAME", "Fjolsenbanden");
define("VIPPS_SYSTEM_VERSION", "1.0.0");
define("VIPPS_PLUGIN_NAME", "custom-php");
define("VIPPS_PLUGIN_VERSION", "1.0.0");
