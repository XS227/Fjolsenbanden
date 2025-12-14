<?php
require_once __DIR__ . "/_vipps_http.php";

$body = json_decode(file_get_contents("php://input"), true) ?: [];
$amount = (int)($body["amount"] ?? 0);

if ($amount < 1) {
  http_response_code(400);
  echo json_encode(["error" => "amount must be >= 1"]);
  exit;
}

$agreementId = "FJOLSEN-" . bin2hex(random_bytes(8));

// Viktig: interval/timePeriod må være OBJEKT, ikke string.
// Viktig: pricing må IKKE være null.
$payload = [
  "id" => $agreementId,
  "productName" => "Støtte FjOlsenbanden",
  "productDescription" => "Månedlig støtte til FjOlsenbanden.",
  "interval" => [           // <- IKKE string
    "unit" => "MONTH",
    "count" => 1
  ],
  "pricing" => [            // <- IKKE null
    "amount" => $amount * 100,   // øre
    "currency" => "NOK"
  ],
  "merchantSerialNumber" => VIPPS_MSN,
  "customer" => [
    // Vipps håndterer ofte identifisering i godkjenning/redirect-flyten,
    // så denne kan være tom/utelates i noen oppsett.
  ],
  "returnUrl" => "https://fjolsenbanden.no/vipps/thanks.html",
  "callbackUrl" => "https://fjolsenbanden.no/vipps/api/webhook.php"
];

$url = VIPPS_RECURRING_BASE . "/agreements";
$result = vipps_post_json($url, $payload);

// Returner relevante felt til frontend.
// Vipps kan returnere confirmationUrl/redirectUrl avhengig av produkt/flyt.
echo json_encode([
  "agreementId" => $agreementId,
  "vippsConfirmationUrl" => $result["vippsConfirmationUrl"] ?? null,
  "redirectUrl" => $result["redirectUrl"] ?? null,
  "raw" => $result
]);
