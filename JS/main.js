/* ============================================================
   Azriel Portfolio — main.js
   Handles: scrolled-nav state, mobile nav toggle, footer year.
   Reveal/parallax/tilt/counters live in JS/animations.js.
   ============================================================ */

(function () {
  "use strict";

  // -------- Navbar scrolled state --------
  function initNavScroll() {
    const nav = document.getElementById("primary-nav");
    if (!nav) return;

    let ticking = false;
    function update() {
      const y = window.scrollY || 0;
      nav.classList.toggle("is-scrolled", y > 24);
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  // -------- Mobile nav toggle --------
  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const panel = document.getElementById("nav-mobile");
    if (!toggle || !panel) return;

    panel.removeAttribute("hidden");

    function setOpen(open) {
      panel.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", () => {
      const open = !panel.classList.contains("is-open");
      setOpen(open);
    });

    // Close mobile nav when an in-page anchor is clicked
    panel.querySelectorAll("a[href^='#']").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // -------- Year update in footer (defensive) --------
  function initYear() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  // -------- Boot --------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  function boot() {
    initNavScroll();
    initMobileNav();
    initYear();
  }
})();
