<?php
require_once __DIR__ . "/_bootstrap.php";

echo json_encode([
    "client_id" => defined("VIPPS_CLIENT_ID") && VIPPS_CLIENT_ID !== "",
    "client_secret" => defined("VIPPS_CLIENT_SECRET") && VIPPS_CLIENT_SECRET !== "",
]);
