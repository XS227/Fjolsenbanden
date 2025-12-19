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
  "merchantRedirectUrl" => "https://fjolsenbanden.no/vipps/return.html",
  "callbackUrl" => "https://fjolsenbanden.no/vipps/callback.php"
];

$url = VIPPS_RECURRING_BASE . "/agreements";

try {
  $result = vipps_post_json($url, $payload);
} catch (VippsApiException $e) {
  $status = $e->status ?: 500;
  http_response_code($status >= 400 && $status < 600 ? $status : 500);

  $response = $e->response;
  $friendlyMessage = null;
  if (is_array($response) && isset($response["detail"]) && str_contains((string)$response["detail"], "Recurring API")) {
    $friendlyMessage = "Vipps Recurring er ikke aktivert for denne butikken. Ta kontakt med Vipps for å åpne produktet, eller bruk engangsbetaling.";
  }

  echo json_encode([
    "error" => $e->getMessage(),
    "status" => $e->status,
    "response" => $e->response,
    "friendlyMessage" => $friendlyMessage
  ]);
  exit;
}

echo json_encode([
  "agreementId" => $agreementId,
  "vippsConfirmationUrl" => $result["vippsConfirmationUrl"] ?? null,
  "redirectUrl" => $result["redirectUrl"] ?? null,
  "raw" => $result
]);
