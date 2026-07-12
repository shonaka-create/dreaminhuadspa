/* ==========================================================================
   Dreamin' Head Spa & Sculpture — script.js
   Vanilla JS only. Handles:
   1. Header solid-on-scroll
   2. Mobile nav drawer
   3. Scroll-triggered fade-in animations (IntersectionObserver)
   4. Hero background slideshow (cross-fade rotation)
   Note: the bottom booking banner is always visible (pure CSS).
   ========================================================================== */

(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var burger = document.getElementById("navBurger");
  var nav = document.getElementById("mainNav");

  /* ---------- 1. Header: transparent over hero, solid after ---------- */
  function onScroll() {
    header.classList.toggle("is-solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Mobile nav drawer ---------- */
  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- 3. Fade-in on scroll (restrained, one-shot) ---------- */
  var faders = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    faders.forEach(function (el) { io.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 4. Sticky CTA: hide once the footer is in view ---------- */
  var sticky = document.getElementById("stickyCta");
  var footer = document.querySelector(".site-footer");
  if (sticky && footer && "IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          sticky.classList.toggle("is-hidden", entry.isIntersecting);
        });
      },
      { threshold: 0 }
    ).observe(footer);
  }

  /* ---------- 5. Hero slideshow: cross-fade every 6 seconds ---------- */
  var slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, 6000);
  }
})();
