<?php
// vipps/callback.php
// Enkel mottaker. Senere kan vi validere/signere og lagre i DB.

$raw = file_get_contents('php://input');
$time = date('c');

@file_put_contents(__DIR__ . '/_vipps_callback.log', "[$time] $raw\n", FILE_APPEND);

http_response_code(200);
echo "OK";
