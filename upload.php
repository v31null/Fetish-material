<?php
header('Content-Type: application/json');

function fail($m){ http_response_code(400); echo json_encode(['ok'=>false,'error'=>$m]); exit; }

$dir = __DIR__ . '/sprites';
if (!is_dir($dir)) @mkdir($dir, 0777, true);
$dataFile = $dir . '/data.json';

$height = isset($_POST['height']) ? floatval($_POST['height']) : 0;
if ($height <= 0) fail('height must be > 0');

$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
if (mb_strlen($name) > 40) $name = mb_substr($name, 0, 40);

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) fail('no image');
if ($_FILES['image']['size'] > 8 * 1024 * 1024) fail('image too large (max 8 MB)');

$info = @getimagesize($_FILES['image']['tmp_name']);
if ($info === false) fail('not a valid image');

$ext = [IMAGETYPE_JPEG=>'jpg', IMAGETYPE_PNG=>'png', IMAGETYPE_GIF=>'gif', IMAGETYPE_WEBP=>'webp'];
if (!isset($ext[$info[2]])) fail('unsupported image type');

$id    = bin2hex(random_bytes(8));
$fname = $id . '.' . $ext[$info[2]];
$rel   = 'sprites/' . $fname;
if (!move_uploaded_file($_FILES['image']['tmp_name'], $dir . '/' . $fname)) fail('could not save file');

$fp = fopen($dataFile, 'c+');
flock($fp, LOCK_EX);
$raw = stream_get_contents($fp);
$data = json_decode($raw, true);
if (!is_array($data) || !isset($data['sprites'])) $data = ['sprites' => []];
$sprite = ['id'=>$id, 'file'=>$rel, 'height'=>$height, 'name'=>$name];
$data['sprites'][] = $sprite;
ftruncate($fp, 0);
rewind($fp);
fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
flock($fp, LOCK_UN);
fclose($fp);

echo json_encode(['ok'=>true, 'sprite'=>$sprite]);
