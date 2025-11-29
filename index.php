<?php
// Cargador para entorno Apache/XAMPP.
// Sirve archivos generados por Vite en dist/ (incluyendo shop.html) respetando la ruta solicitada.
// Si no hay build, muestra una guía rápida para ejecutar en dev o generar la build.
header('Content-Type: text/html; charset=UTF-8');

$distDir = __DIR__ . DIRECTORY_SEPARATOR . 'dist' . DIRECTORY_SEPARATOR;
$fallback = $distDir . 'index.html';

if (file_exists($fallback)) {
  // Resolver la ruta solicitada dentro de dist
  $requestUri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
  $path = parse_url($requestUri, PHP_URL_PATH);
  if ($path === null || $path === false) { $path = '/'; }
  // Base donde vive este index.php (ej.: /dogtown)
  $base = rtrim(dirname(isset($_SERVER['SCRIPT_NAME']) ? $_SERVER['SCRIPT_NAME'] : ''), '/\\');
  if ($base !== '' && substr($path, 0, strlen($base)) === $base) { $path = substr($path, strlen($base)); }
  $path = ltrim($path, '/');
  if ($path === '' || (strlen($requestUri) > 0 && substr($requestUri, -1) === '/')) {
    $path = 'index.html';
  }
  $candidate = realpath($distDir . $path);
  // Asegurar que el archivo esté dentro de dist y exista; si no, servir index.html
  $distReal = realpath($distDir);
  if ($candidate && $distReal && strpos($candidate, $distReal) === 0 && is_file($candidate)) {
    readfile($candidate);
  } else {
    readfile($fallback);
  }
  exit;
}

// Sin build: mostrar instrucciones mínimas
?>
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DogTown — Configuración requerida</title>
    <style>
      body{font-family: Arial, sans-serif; padding:24px; background:#EFECEC; color:#1f2a2e}
      .box{background:#fff; border-radius:12px; padding:16px; max-width:880px; margin:auto; border:1px solid #e5e7eb}
      h1{color:#2f3e46}
      code{background:#f3f4f6; padding:2px 6px; border-radius:6px}
      li{margin:.4rem 0}
    </style>
  </head>
  <body>
    <div class="box">
      <h1>DogTown (React + Vite)</h1>
      <p>Para ver el sitio necesitas ejecutar el servidor de desarrollo o generar la build de producción:</p>
      <ol>
        <li>Desarrollo (recomendado):<br>
          <code>npm install</code> y luego <code>npm run dev</code>. Abre la URL que muestre Vite (por ejemplo <code>http://localhost:5173/</code>).</li>
        <li>Producción en XAMPP/Apache:<br>
          Ejecuta <code>npm run build</code>. Esto creará la carpeta <code>dist/</code>. Vuelve a cargar esta página (<code>index.php</code>) y se servirá automáticamente <code>dist/index.html</code>.</li>
      </ol>
      <p>Nota: Este mensaje aparece porque no se encontró <code>dist/index.html</code>.</p>
    </div>
  </body>
  </html>
