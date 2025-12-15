<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "DOCUMENT_ROOT: " . ($_SERVER['DOCUMENT_ROOT'] ?? 'N/A') . "<br>";
echo "__DIR__: " . __DIR__ . "<br>";
echo "realpath(__DIR__): " . realpath(__DIR__) . "<br>";

$try = [
  "/P/fjolsen_secret.php",
  __DIR__ . "/../../../../P/fjolsen_secret.php",
  "/customers/5/e/8/cifms3ug/P/fjolsen_secret.php",
  "/customers/5/e/8/cifms3ug/PRIVATE/vipps_secrets.php",
];

foreach ($try as $p) {
  echo "<hr>Trying: <code>$p</code><br>";
  echo "exists: " . (file_exists($p) ? "YES" : "NO") . "<br>";
  echo "readable: " . (is_readable($p) ? "YES" : "NO") . "<br>";
  if (file_exists($p) && is_readable($p)) {
    $s = require $p;
    echo "require OK. keys: " . implode(", ", array_keys($s)) . "<br>";
    exit;
  }
}

echo "<hr>No readable secrets file found.";
