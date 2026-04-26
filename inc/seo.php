<?php
/**
 * Shared SEO meta block.
 * Set $meta_title, $meta_description, $meta_keywords, $meta_image, $meta_url, $meta_type
 * before including this file.
 */
$meta_title       = $meta_title       ?? 'Azriel — Founder of Rielcode | Portfolio';
$meta_description = $meta_description ?? 'Portfolio of Azriel — full-stack web developer and founder of Rielcode. Real Code. Real Results.';
$meta_keywords    = $meta_keywords    ?? 'azriel, rielcode, portfolio, web developer, surakarta, php, bootstrap';
$meta_image       = $meta_image       ?? 'https://portfolio.rielcode.com/IMG/og-portfolio.png';
$meta_url         = $meta_url         ?? 'https://portfolio.rielcode.com/';
$meta_type        = $meta_type        ?? 'website';
?>
<meta name="description" content="<?= htmlspecialchars($meta_description, ENT_QUOTES) ?>">
<meta name="keywords" content="<?= htmlspecialchars($meta_keywords, ENT_QUOTES) ?>">
<meta name="author" content="Azriel — Rielcode">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#080c14">

<!-- Open Graph -->
<meta property="og:type" content="<?= htmlspecialchars($meta_type, ENT_QUOTES) ?>">
<meta property="og:title" content="<?= htmlspecialchars($meta_title, ENT_QUOTES) ?>">
<meta property="og:description" content="<?= htmlspecialchars($meta_description, ENT_QUOTES) ?>">
<meta property="og:image" content="<?= htmlspecialchars($meta_image, ENT_QUOTES) ?>">
<meta property="og:url" content="<?= htmlspecialchars($meta_url, ENT_QUOTES) ?>">
<meta property="og:site_name" content="Azriel — Portfolio">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= htmlspecialchars($meta_title, ENT_QUOTES) ?>">
<meta name="twitter:description" content="<?= htmlspecialchars($meta_description, ENT_QUOTES) ?>">
<meta name="twitter:image" content="<?= htmlspecialchars($meta_image, ENT_QUOTES) ?>">

<link rel="canonical" href="<?= htmlspecialchars($meta_url, ENT_QUOTES) ?>">
