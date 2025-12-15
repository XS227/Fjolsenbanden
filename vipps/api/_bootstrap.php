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

if (!defined('VIPPS_ENV')) define('VIPPS_ENV', must($secrets, 'VIPPS_ENV')); // "test" eller "prod"
if (!defined('VIPPS_CLIENT_ID')) define('VIPPS_CLIENT_ID', must($secrets, 'VIPPS_CLIENT_ID'));
if (!defined('VIPPS_CLIENT_SECRET')) define('VIPPS_CLIENT_SECRET', must($secrets, 'VIPPS_CLIENT_SECRET'));
if (!defined('VIPPS_SUBSCRIPTION_KEY')) define('VIPPS_SUBSCRIPTION_KEY', must($secrets, 'VIPPS_SUBSCRIPTION_KEY'));
if (!defined('VIPPS_MSN')) define('VIPPS_MSN', must($secrets, 'VIPPS_MSN'));

if (!defined('VIPPS_TOKEN_URL')) {
  define(
    'VIPPS_TOKEN_URL',
    VIPPS_ENV === 'test'
      ? 'https://apitest.vipps.no/accessToken/get'
      : 'https://api.vipps.no/accessToken/get'
  );
}

if (!defined('VIPPS_RECURRING_BASE')) {
  define(
    'VIPPS_RECURRING_BASE',
    VIPPS_ENV === 'test'
      ? 'https://apitest.vipps.no/recurring/v3'
      : 'https://api.vipps.no/recurring/v3'
  );
}

// (Valgfritt, men fint å ha)
if (!defined('VIPPS_SYSTEM_NAME')) define('VIPPS_SYSTEM_NAME', 'Fjolsenbanden');
if (!defined('VIPPS_SYSTEM_VERSION')) define('VIPPS_SYSTEM_VERSION', '1.0.0');
if (!defined('VIPPS_PLUGIN_NAME')) define('VIPPS_PLUGIN_NAME', 'custom-php');
if (!defined('VIPPS_PLUGIN_VERSION')) define('VIPPS_PLUGIN_VERSION', '1.0.0');
