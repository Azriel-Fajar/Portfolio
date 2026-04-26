<?php
$projects = [
    [
        'badge'   => 'Competition Platform',
        'title'   => 'FIT Competition 2026',
        'summary' => 'A full event platform for the largest information technology competition at FTI UKSW — registrations, categories, and the winner showcase.',
        'tags'    => ['PHP', 'MySQL', 'Bootstrap'],
        'thumb'   => 'IMG/projects/fit.png',
        'link'    => 'https://fit2026.rielcode.com',
    ],
    [
        'badge'   => 'Education',
        'title'   => 'Parallaxnet Canada',
        'summary' => 'Marketing + program site for Parallaxnet Canada — nurturing graduates who excel where technology and business meet.',
        'tags'    => ['PHP', 'Bootstrap', 'AOS'],
        'thumb'   => 'IMG/projects/parallaxnet-ca.png',
        'link'    => 'https://parallaxnet.ca',
    ],
    [
        'badge'   => 'Education',
        'title'   => 'Parallaxnet Indonesia',
        'summary' => 'The Indonesian arm of Parallaxnet — localized brand, programs, and intake flow built on the same engine.',
        'tags'    => ['PHP', 'Bootstrap', 'i18n'],
        'thumb'   => 'IMG/projects/parallaxnet-id.png',
        'link'    => 'https://www.parallaxnet.id',
    ],
    [
        'badge'   => 'Enterprise',
        'title'   => 'SSS · 3s-Tech',
        'summary' => 'Sinergi Sarana Solusi — enterprise site covering Data Center, Renewable Energy, and Energy Management for clients across Indonesia.',
        'tags'    => ['PHP', 'Bootstrap', 'SEO'],
        'thumb'   => 'IMG/projects/sss.png',
        'link'    => 'https://www.3s-tech.co.id',
    ],
    [
        'badge'   => 'Brand Site',
        'title'   => 'DAAM.co.id',
        'summary' => 'Brand presence and product showcase site for DAAM — clean visual identity, fast-loading layout, mobile-first.',
        'tags'    => ['PHP', 'Bootstrap'],
        'thumb'   => 'IMG/projects/daam.png',
        'link'    => 'https://www.daam.co.id',
    ],
];
?>
<section class="section" id="projects">
    <div class="container-x">
        <div class="section-head" data-aos="fade-up">
            <span class="eyebrow">// 04 — Selected Work</span>
            <h2 class="section-title">Past clients of Rielcode.</h2>
            <p class="section-desc">
                A small, real list. Each one shipped, served live traffic, and taught me something I now bring into the next build.
            </p>
        </div>

        <div class="projects-grid">
            <?php foreach ($projects as $i => $p): ?>
                <article class="project-card" data-aos="fade-up" data-aos-delay="<?= $i * 70 ?>">
                    <div class="project-thumb">
                        <span class="badge"><?= htmlspecialchars($p['badge']) ?></span>
                        <img src="<?= htmlspecialchars($p['thumb']) ?>"
                             onerror="this.onerror=null;this.src='https://placehold.co/720x450/0c111c/3b82f6?text=<?= urlencode($p['title']) ?>';"
                             alt="<?= htmlspecialchars($p['title']) ?> screenshot">
                    </div>
                    <div class="project-body">
                        <div class="project-title">
                            <span><?= htmlspecialchars($p['title']) ?></span>
                            <span class="ext" aria-hidden="true"><i class="bi bi-arrow-up-right"></i></span>
                        </div>
                        <p class="project-summary"><?= htmlspecialchars($p['summary']) ?></p>
                        <div class="project-tags">
                            <?php foreach ($p['tags'] as $t): ?>
                                <span class="project-tag"><?= htmlspecialchars($t) ?></span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <a class="project-link-overlay"
                       href="<?= htmlspecialchars($p['link']) ?>"
                       <?= $p['link'] !== '#' ? 'target="_blank" rel="noopener"' : '' ?>
                       aria-label="Open <?= htmlspecialchars($p['title']) ?>"></a>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
