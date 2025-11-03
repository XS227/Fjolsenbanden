<?php
// Legacy entry point kept for compatibility. Redirects to the Vite-powered updates page.
http_response_code(302);
header('Location: /updates.html');
exit;
