<?php
header('Content-Type: application/json');

$dataFile = __DIR__ . '/sprites/data.json';
$id = isset($_POST['id']) ? (string) $_POST['id'] : '';
$y  = isset($_POST['y']) ? floatval($_POST['y']) : 0;
if ($y < 0) $y = 0;
if ($y > 0.95) $y = 0.95;

if ($id === '' || !is_file($dataFile)) { http_response_code(400); echo json_encode(['ok' => false]); exit; }

$fp = fopen($dataFile, 'c+');
flock($fp, LOCK_EX);
$data = json_decode(stream_get_contents($fp), true);
if (!is_array($data) || !isset($data['sprites'])) { flock($fp, LOCK_UN); fclose($fp); echo json_encode(['ok' => false]); exit; }

$found = false;
foreach ($data['sprites'] as &$s) {
    if (isset($s['id']) && $s['id'] === $id) { $s['y'] = $y; $found = true; break; }
}
unset($s);

ftruncate($fp, 0);
rewind($fp);
fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
flock($fp, LOCK_UN);
fclose($fp);

echo json_encode(['ok' => $found, 'y' => $y]);
