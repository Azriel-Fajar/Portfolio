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

    <!-- AOS -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css">

    <!-- Custom styles (load LAST so they win over Bootstrap defaults) -->
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="stylesheet" href="CSS/navbar.css">
    <link rel="stylesheet" href="CSS/skills.css">
    <link rel="stylesheet" href="CSS/projects.css">
    <link rel="stylesheet" href="CSS/contact.css">
    <link rel="stylesheet" href="CSS/footer.css">

    <!-- Defer main JS -->
    <script defer src="JS/main.js"></script>
</head>

<body>

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

    <!-- AOS init via main.js -->
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>

</body>
</html>
