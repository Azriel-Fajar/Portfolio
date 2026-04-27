<?php
$meta_title       = "Azriel — Founder of Rielcode | Portfolio";
$meta_description = "Portfolio of Azriel — full-stack web developer based in Surakarta and founder of Rielcode. Real Code. Real Results.";
$meta_keywords    = "azriel, rielcode, portfolio, web developer, surakarta, php developer, indonesia";
$meta_image       = "https://portfolio.rielcode.com/IMG/og-portfolio.png";
$meta_type        = "website";
$meta_url         = "https://portfolio.rielcode.com/";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($meta_title, ENT_QUOTES) ?></title>

    <!-- Inline skeleton CSS (paints before any CDN — kills white flash on slow networks) -->
    <style>
      html, body { background: #080c14; }
      .skeleton-root {
        position: fixed; inset: 0; z-index: 9999;
        background: #080c14;
        display: grid; place-items: center;
        padding: 24px;
        transition: opacity .45s ease;
      }
      .skeleton-root.is-hidden { opacity: 0; pointer-events: none; }
      .sk-grid {
        width: min(1100px, 92vw);
        display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
        align-items: center;
      }
      @media (max-width: 860px) {
        .sk-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        .sk-portrait { max-width: 280px; }
      }
      .sk-block {
        background: linear-gradient(90deg,
          rgba(255,255,255,.04) 0%,
          rgba(255,255,255,.09) 50%,
          rgba(255,255,255,.04) 100%);
        background-size: 200% 100%;
        animation: sk-pulse 1.6s ease-in-out infinite;
        border-radius: 8px;
      }
      .sk-eyebrow   { width: 220px; height: 22px; margin-bottom: 24px; border-radius: 999px; }
      .sk-title-1   { width: 88%;   height: 44px; margin-bottom: 12px; }
      .sk-title-2   { width: 60%;   height: 44px; margin-bottom: 32px; }
      .sk-sub-1     { width: 95%;   height: 14px; margin-bottom: 10px; }
      .sk-sub-2     { width: 80%;   height: 14px; margin-bottom: 32px; }
      .sk-cta-row   { display: flex; gap: 12px; margin-bottom: 32px; }
      .sk-cta       { width: 160px; height: 44px; border-radius: 999px; }
      .sk-meta      { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
      .sk-meta-item { height: 32px; border-radius: 6px; }
      .sk-portrait  { aspect-ratio: 1 / 1; border-radius: 24px; max-width: 420px; margin: 0 auto; width: 100%; }
      @keyframes sk-pulse {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .sk-block { animation: none; }
        .skeleton-root { transition: none; }
      }
    </style>

    <?php include 'inc/seo.php'; ?>

    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="IMG/Rielcode Logo Square Transparent Icon.png">
    <link rel="icon" type="image/png" sizes="16x16" href="IMG/Rielcode Logo Square Transparent Icon.png">

    <!-- Bootstrap FIRST so our custom CSS can cleanly override it -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
          crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- Custom styles (load LAST so they win over Bootstrap defaults) -->
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="stylesheet" href="CSS/navbar.css">
    <link rel="stylesheet" href="CSS/skills.css">
    <link rel="stylesheet" href="CSS/projects.css">
    <link rel="stylesheet" href="CSS/contact.css">
    <link rel="stylesheet" href="CSS/footer.css">
    <link rel="stylesheet" href="CSS/animations.css">

    <!-- Defer JS -->
    <script defer src="JS/main.js"></script>
    <script defer src="JS/animations.js"></script>
</head>

<body>

    <!-- Skeleton loader (mirrors hero shape; removed on window.load or 2.5s failsafe) -->
    <div class="skeleton-root" aria-hidden="true">
        <div class="sk-grid">
            <div>
                <div class="sk-block sk-eyebrow"></div>
                <div class="sk-block sk-title-1"></div>
                <div class="sk-block sk-title-2"></div>
                <div class="sk-block sk-sub-1"></div>
                <div class="sk-block sk-sub-2"></div>
                <div class="sk-cta-row">
                    <div class="sk-block sk-cta"></div>
                    <div class="sk-block sk-cta"></div>
                </div>
                <div class="sk-meta">
                    <div class="sk-block sk-meta-item"></div>
                    <div class="sk-block sk-meta-item"></div>
                    <div class="sk-block sk-meta-item"></div>
                    <div class="sk-block sk-meta-item"></div>
                </div>
            </div>
            <div class="sk-block sk-portrait"></div>
        </div>
    </div>
    <script>
      (function () {
        var root = document.querySelector('.skeleton-root');
        if (!root) return;
        var dismissed = false;
        function dismiss() {
          if (dismissed) return;
          dismissed = true;
          root.classList.add('is-hidden');
          setTimeout(function () {
            if (root.parentNode) root.parentNode.removeChild(root);
          }, 600);
        }
        if (document.readyState === 'complete') {
          dismiss();
        } else {
          window.addEventListener('load', dismiss);
        }
        setTimeout(dismiss, 2500);
      })();
    </script>

    <?php include 'navbar.php'; ?>

    <main>
        <?php include 'sections/hero.php'; ?>
        <?php include 'sections/about.php'; ?>
        <?php include 'sections/skills.php'; ?>
        <?php include 'sections/services.php'; ?>
        <?php include 'sections/projects.php'; ?>
        <?php include 'sections/contact.php'; ?>
    </main>

    <?php include 'footer.php'; ?>

</body>
</html>
