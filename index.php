<?php
// --- load persisted sprites ---------------------------------------------------
$dir = __DIR__ . '/sprites';
if (!is_dir($dir)) @mkdir($dir, 0777, true);
$dataFile = $dir . '/data.json';
$data = ['sprites' => []];
if (is_file($dataFile)) {
    $j = json_decode(@file_get_contents($dataFile), true);
    if (is_array($j) && isset($j['sprites'])) $data = $j;
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>scale</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>

  <form id="addForm" class="topbar" enctype="multipart/form-data">
    <input type="file"   name="image"  id="f_image"  accept="image/*" required>
    <input type="text"   name="name"   id="f_name"   placeholder="name" maxlength="40">
    <input type="number" name="height" id="f_height" min="1" step="0.1" value="20" placeholder="cm" required>
    <button type="submit" id="f_add">+</button>
  </form>

  <div class="stage">
    <div class="ruler" id="ruler"></div>
    <div class="people" id="people">
      <div class="people-inner" id="inner"></div>
      <div class="controls" id="controls">
        <button class="nav" id="prev" disabled>&lt;</button>
        <button class="nav" id="next" disabled>&gt;</button>
      </div>
    </div>
  </div>

  <div class="ground"></div>

<script>window.INITIAL_SPRITES = <?php echo json_encode($data['sprites']); ?>;</script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/copy-tex.min.js"></script>
<script src="assets/model.js"></script>
<script src="assets/app.js"></script>
</body>
</html>
