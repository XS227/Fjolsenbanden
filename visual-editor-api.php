<?php
// visual-editor-api.php
session_start();

/**
 * Her kan du koble mot din ekte innlogging senere.
 * Foreløpig er den alltid "tilatt".
 */
// if (empty($_SESSION['user_is_admin'])) {
//     http_response_code(403);
//     echo json_encode(['status' => 'error', 'message' => 'Not authorized']);
//     exit;
// }

header('Content-Type: application/json; charset=utf-8');

$action   = $_GET['action'] ?? '';
$dataFile = __DIR__ . '/visual-editor-data.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'load') {
    // Last lagret state
    if (file_exists($dataFile)) {
        $json = file_get_contents($dataFile);
        if ($json === false) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Could not read data file']);
            exit;
        }
        echo $json;
    } else {
        // Ingen lagring ennå → tomt svar, da bruker vi HTML-default
        echo json_encode([
            'order'    => [],
            'sections' => []
        ]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'save') {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Empty body']);
        exit;
    }

    $decoded = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
        exit;
    }

    // Enkel sjekk – må inneholde "sections"
    if (!isset($decoded['sections']) || !is_array($decoded['sections'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid structure']);
        exit;
    }

    // Forsøk å lagre
    if (file_put_contents($dataFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Could not write data file']);
        exit;
    }

    echo json_encode(['status' => 'ok']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'reset') {
    if (file_exists($dataFile)) {
        @unlink($dataFile);
    }
    echo json_encode(['status' => 'ok', 'message' => 'reset']);
    exit;
}

// Ugyldig kall
http_response_code(400);
echo json_encode(['status' => 'error', 'message' => 'Bad request']);
