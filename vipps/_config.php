<?php
// vipps/_config.php

return [
  // Bruk apitest.vipps.no i test, api.vipps.no i produksjon.
  // Vipps sin quick start viser apitest.vipps.no for test. 1
  'base_url' => 'https://api.vipps.no',

  'client_id' => 'DIN_CLIENT_ID',
  'client_secret' => 'DIN_CLIENT_SECRET',
  'subscription_key' => 'DIN_OCP_APIM_SUBSCRIPTION_KEY',
  'msn' => 'DIN_MERCHANT_SERIAL_NUMBER',

  'merchant_redirect_url' => 'https://www.fjolsenbanden.no/vipps/return.html',
  'callback_url' => 'https://www.fjolsenbanden.no/vipps/callback.php',
];
