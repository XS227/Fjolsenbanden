<?php
require_once __DIR__ . "/_vipps_http.php";

$body = json_decode(file_get_contents("php://input"), true) ?: [];
$plan = $body["plan"] ?? "";

$prices = ["starter" => 49, "pro" => 99, "legend" => 149];
if (!isset($prices[$plan])) {
  http_response_code(400);
  echo json_encode(["error" => "Ugyldig plan"]);
  exit;
}

$agreementId = "FJOLSEN-" . strtoupper($plan) . "-" . bin2hex(random_bytes(6));

$payload = [
  "id" => $agreementId,
  "productName" => "Fjolsenbanden " . ucfirst($plan),
  "productDescription" => "Månedlig medlemskap (" . $plan . ").",
  "interval" => ["unit" => "MONTH", "count" => 1],
  "pricing" => ["amount" => $prices[$plan] * 100, "currency" => "NOK"],
  "merchantSerialNumber" => VIPPS_MSN,
  "returnUrl" => "https://fjolsenbanden.no/vipps/return.html",
  "callbackUrl" => "https://fjolsenbanden.no/vipps/callback.php"
];

$url = VIPPS_RECURRING_BASE . "/agreements";
$result = vipps_post_json($url, $payload);

echo json_encode([
  "agreementId" => $agreementId,
  "vippsConfirmationUrl" => $result["vippsConfirmationUrl"] ?? null,
  "redirectUrl" => $result["redirectUrl"] ?? null,
  "raw" => $result
]);
