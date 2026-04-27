/* ============================================================
   Azriel Portfolio — animations.js
   Replaces AOS with a unified reveal + parallax system.
   Adds scroll progress bar, project-card tilt, stat counters.
   ============================================================ */

(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  // ---------------------------------------------------------
  // Reveal on scroll (IntersectionObserver — once)
  // ---------------------------------------------------------
  function initReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
  }

  // ---------------------------------------------------------
  // Parallax + scroll progress (single RAF tick)
  // ---------------------------------------------------------
  let parallaxItems = [];
  let progressBar = null;

  function recomputeBases() {
    const y = window.scrollY || 0;
    parallaxItems.forEach((item) => {
      // Reset transform first to measure unbiased position
      const prev = item.el.style.transform;
      item.el.style.transform = "";
      const rect = item.el.getBoundingClientRect();
      item.base = rect.top + y + rect.height / 2;
      item.el.style.transform = prev;
    });
  }

  function tickScroll() {
    const y = window.scrollY || 0;

    if (parallaxItems.length) {
      const vh = window.innerHeight;
      parallaxItems.forEach(({ el, speed, base }) => {
        // Only animate when within ~1.5 viewports of the element center
        if (Math.abs(y + vh / 2 - base) > vh * 1.5) return;
        const offset = (y + vh / 2 - base) * speed;
        el.style.transform = "translate3d(0, " + offset.toFixed(2) + "px, 0)";
      });
    }

    if (progressBar) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docH > 0 ? Math.min(Math.max(y / docH, 0), 1) : 0;
      progressBar.style.transform = "scaleX(" + ratio.toFixed(4) + ")";
    }
  }

  function initScrollLoop() {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          tickScroll();
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        recomputeBases();
        tickScroll();
      },
      { passive: true }
    );
    tickScroll();
  }

  function initParallax() {
    if (reduced) return;
    if (window.innerWidth < 600) return; // skip on narrow viewports

    const els = document.querySelectorAll("[data-parallax]");
    if (!els.length) return;

    parallaxItems = Array.from(els).map((el) => {
      const speed = parseFloat(el.getAttribute("data-parallax")) || 0;
      return { el, speed, base: 0 };
    });
    recomputeBases();
  }

  function initScrollProgress() {
    progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.setAttribute("aria-hidden", "true");
    document.body.appendChild(progressBar);
  }

  // ---------------------------------------------------------
  // Project-card 3D tilt + cursor highlight
  // ---------------------------------------------------------
  function initTilt() {
    if (reduced || isTouch) return;

    const cards = document.querySelectorAll("[data-tilt]");
    if (!cards.length) return;

    const MAX_DEG = 6;

    cards.forEach((card) => {
      let raf = 0;
      let pendingX = 0;
      let pendingY = 0;

      function applyTilt() {
        raf = 0;
        card.style.transform =
          "perspective(900px) rotateX(" +
          pendingY.toFixed(2) +
          "deg) rotateY(" +
          pendingX.toFixed(2) +
          "deg) translateY(-4px)";
      }

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = x / rect.width;
        const py = y / rect.height;

        pendingX = (px - 0.5) * 2 * MAX_DEG;
        pendingY = -(py - 0.5) * 2 * MAX_DEG;

        card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (py * 100).toFixed(1) + "%");

        if (!raf) raf = window.requestAnimationFrame(applyTilt);
      });

      card.addEventListener("mouseleave", () => {
        if (raf) {
          window.cancelAnimationFrame(raf);
          raf = 0;
        }
        card.style.transform = "";
        card.style.removeProperty("--mx");
        card.style.removeProperty("--my");
      });
    });
  }

  // ---------------------------------------------------------
  // Animated stat counters
  // ---------------------------------------------------------
  function initCounters() {
    const els = document.querySelectorAll("[data-counter]");
    if (!els.length) return;

    els.forEach((el) => {
      const text = el.textContent.trim();
      const match = text.match(/^([^\d]*)(\d+)(.*)$/);
      if (!match) return;
      const prefix = match[1];
      const target = parseInt(match[2], 10);
      const suffix = match[3];

      // Stash the final value so external tools (screenshot.mjs, tests) can
      // restore it without waiting for the IntersectionObserver tween.
      el.setAttribute("data-counter-target", text);

      if (reduced || !("IntersectionObserver" in window)) {
        return; // leave existing text in place
      }

      el.textContent = prefix + "0" + suffix;

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            io.unobserve(entry.target);

            const start = performance.now();
            const dur = 1200;
            function ease(t) {
              return 1 - Math.pow(1 - t, 3);
            }
            function tick(now) {
              const t = Math.min((now - start) / dur, 1);
              const v = Math.round(target * ease(t));
              el.textContent = prefix + v + suffix;
              if (t < 1) window.requestAnimationFrame(tick);
            }
            window.requestAnimationFrame(tick);
          });
        },
        { threshold: 0.4 }
      );
      io.observe(el);
    });
  }

  // ---------------------------------------------------------
  // Boot
  // ---------------------------------------------------------
  function boot() {
    initScrollProgress();
    initReveal();
    initParallax();
    initTilt();
    initCounters();
    initScrollLoop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
