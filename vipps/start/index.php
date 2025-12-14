<?php
$config = require __DIR__ . '/../_config.php';

$plan = $_GET['plan'] ?? '';
$prices = ['starter' => 49, 'pro' => 99, 'legend' => 149];

if (!isset($prices[$plan])) {
  http_response_code(400);
  echo "Ugyldig plan";
  exit;
}

function vipps_request($method, $url, $headers, $body = null) {
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  if ($body !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
  $resp = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  if ($resp === false) throw new Exception('cURL error: ' . curl_error($ch));
  curl_close($ch);
  return [$code, $resp];
}

try {
  // 1) Access token
  $tokenUrl = rtrim($config['base_url'], '/') . '/accesstoken/get';
  $tokenHeaders = [
    'Content-Type: application/json',
    'client_id: ' . $config['client_id'],
    'client_secret: ' . $config['client_secret'],
    'Ocp-Apim-Subscription-Key: ' . $config['subscription_key'],
    'Merchant-Serial-Number: ' . $config['msn'],
  ];

  [$tCode, $tResp] = vipps_request('POST', $tokenUrl, $tokenHeaders, '');
  if ($tCode < 200 || $tCode >= 300) {
    http_response_code(502);
    echo "Token-feil ($tCode): " . htmlspecialchars($tResp);
    exit;
  }

  $tokenJson = json_decode($tResp, true);
  $accessToken = $tokenJson['access_token'] ?? null;
  if (!$accessToken) {
    http_response_code(502);
    echo "Token mangler i respons";
    exit;
  }

  // 2) Opprett agreement (Recurring)
  $agreementUrl = rtrim($config['base_url'], '/') . '/recurring/v3/agreements';
  $merchantAgreementId = bin2hex(random_bytes(16));

  $payload = [
    'currency' => 'NOK',
    'price' => $prices[$plan],
    'interval' => [
      'unit' => 'MONTH',
      'count' => 1
    ],
    'merchantAgreementId' => $merchantAgreementId,
    'productName' => 'Fjolsenbanden ' . $plan,
    'merchantRedirectUrl' => $config['merchant_redirect_url'],
    'callbackUrl' => $config['callback_url'],
  ];

  $agreementHeaders = [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $accessToken,
    'Ocp-Apim-Subscription-Key: ' . $config['subscription_key'],
    'Merchant-Serial-Number: ' . $config['msn'],
    'Vipps-System-Name: fjolsenbanden',
    'Vipps-System-Version: 1.0',
    'Vipps-System-Plugin-Name: custom',
    'Vipps-System-Plugin-Version: 1.0',
  ];

  [$aCode, $aResp] = vipps_request('POST', $agreementUrl, $agreementHeaders, json_encode($payload));
  if ($aCode < 200 || $aCode >= 300) {
    http_response_code(502);
    echo "Agreement-feil ($aCode): " . htmlspecialchars($aResp);
    exit;
  }

  $aJson = json_decode($aResp, true);
  $vippsUrl = $aJson['vippsConfirmationUrl'] ?? null;

  if (!$vippsUrl) {
    http_response_code(502);
    echo "Mangler vippsConfirmationUrl i respons";
    exit;
  }

  header('Location: ' . $vippsUrl, true, 302);
  exit;

} catch (Exception $e) {
  http_response_code(500);
  echo "Serverfeil: " . htmlspecialchars($e->getMessage());
}
