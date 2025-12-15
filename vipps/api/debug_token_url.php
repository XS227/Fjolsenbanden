<?php
header("Content-Type: application/json; charset=utf-8");

require __DIR__ . "/_bootstrap.php";

echo json_encode([
  "VIPPS_ENV" => VIPPS_ENV,
  "VIPPS_TOKEN_URL" => VIPPS_TOKEN_URL,
  "VIPPS_RECURRING_BASE" => VIPPS_RECURRING_BASE
], JSON_PRETTY_PRINT);
