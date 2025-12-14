<?php
header("Content-Type: application/json; charset=utf-8");

// 1) Les secrets fra fil (utenfor webroot)
$secrets = require "/P/fjolsen_secret.php";

function must(array $arr, string $key): string {
  if (!isset($arr[$key]) || trim((string)$arr[$key]) === "") {
    http_response_code(500);
    echo json_encode(["error" => "Missing secret: {$key}"]);
    exit;
  }
  return (string)$arr[$key];
}

define("VIPPS_ENV", must($secrets, "VIPPS_ENV")); // "prod" eller "test"
define("VIPPS_CLIENT_ID", must($secrets, "VIPPS_CLIENT_ID"));
define("VIPPS_CLIENT_SECRET", must($secrets, "VIPPS_CLIENT_SECRET"));
define("VIPPS_SUBSCRIPTION_KEY", must($secrets, "VIPPS_SUBSCRIPTION_KEY"));
define("VIPPS_MSN", must($secrets, "VIPPS_MSN"));

define("VIPPS_TOKEN_URL", VIPPS_ENV === "test"
  ? "https://apitest.vipps.no/access-token-service/oauth/token"
  : "https://api.vipps.no/access-token-service/oauth/token"
);

define("VIPPS_RECURRING_BASE", VIPPS_ENV === "test"
  ? "https://apitest.vipps.no/recurring/v3"
  : "https://api.vipps.no/recurring/v3"
);
