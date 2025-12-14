<?php
// vipps/api/_bootstrap.php

header("Content-Type: application/json; charset=utf-8");

function envv(string $key): string {
  $v = getenv($key);
  if ($v === false || $v === "") {
    http_response_code(500);
    echo json_encode(["error" => "Missing env var: {$key}"]);
    exit;
  }
  return $v;
}

// Vipps credentials via env
define("VIPPS_CLIENT_ID", envv("VIPPS_CLIENT_ID"));
define("VIPPS_CLIENT_SECRET", envv("VIPPS_CLIENT_SECRET"));
define("VIPPS_SUBSCRIPTION_KEY", envv("VIPPS_SUBSCRIPTION_KEY"));

// Sett ditt MSN/merchant serial number om Vipps krever det for API-et du bruker
define("VIPPS_MSN", envv("VIPPS_MSN"));

// Bytt mellom test/prod ved å sette VIPPS_ENV = "prod" eller "test"
define("VIPPS_ENV", getenv("VIPPS_ENV") ?: "prod");

// Base URLs (kan justeres etter Vipps docs for ditt produkt)
define("VIPPS_TOKEN_URL", VIPPS_ENV === "test"
  ? "https://apitest.vipps.no/access-token-service/oauth/token"
  : "https://api.vipps.no/access-token-service/oauth/token"
);

define("VIPPS_RECURRING_BASE", VIPPS_ENV === "test"
  ? "https://apitest.vipps.no/recurring/v3"
  : "https://api.vipps.no/recurring/v3"
);

// Enkle CORS/CSRF-tiltak: kun samme origin
$origin = $_SERVER["HTTP_ORIGIN"] ?? "";
$host = ($_SERVER["HTTPS"] ?? "off") === "on" ? "https://" . $_SERVER["HTTP_HOST"] : "http://" . $_SERVER["HTTP_HOST"];
if ($origin && $origin !== $host) {
  http_response_code(403);
  echo json_encode(["error" => "Forbidden origin"]);
  exit;
}
