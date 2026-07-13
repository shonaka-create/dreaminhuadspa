/* ==========================================================================
   Dreamin' Head Spa & Sculpture — script.js
   Vanilla JS only. Handles:
   1. Header solid-on-scroll
   2. Mobile nav drawer
   3. Scroll-triggered fade-in animations, staggered per sibling group
   4. Sticky booking banner: appears after the hero, hides over the footer
   5. Hero background slideshow (cross-fade rotation)
   6. Journal category filter
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

  /* ---------- 3. Fade-in on scroll (restrained, one-shot) ----------
     Siblings sharing a parent (cards in a grid, a section's kicker/title/
     lead) get an incremental delay, so each group reveals in sequence.
     Once an element has finished entering, the inline delay is cleared
     and hover-transition cards drop .fade-in, handing the transition
     property back to their own hover styles. */
  var faders = document.querySelectorAll(".fade-in");
  var lastParent = null;
  var groupIndex = 0;
  faders.forEach(function (el) {
    if (el.parentElement !== lastParent) {
      lastParent = el.parentElement;
      groupIndex = 0;
    }
    el.style.transitionDelay = Math.min(groupIndex * 80, 560) + "ms";
    groupIndex++;
  });

  function settleFader(el) {
    var wait = 1000 + (parseFloat(el.style.transitionDelay) || 0);
    setTimeout(function () {
      el.style.transitionDelay = "";
      if (el.matches(".why-card, .menu-card, .post-card")) {
        el.classList.remove("fade-in");
      }
    }, wait);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
            settleFader(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    faders.forEach(function (el) { io.observe(el); });
  } else {
    faders.forEach(function (el) {
      el.style.transitionDelay = "";
      el.classList.add("is-visible");
    });
  }

  /* ---------- 4. Sticky CTA ----------
     Stays out of the way until the reader has scrolled past the hero
     (or a screen's worth on pages without one), then slides up; slides
     away again while the footer is in view, which repeats the same CTAs.
     With JS disabled the banner is simply always visible. */
  var sticky = document.getElementById("stickyCta");
  var footer = document.querySelector(".site-footer");
  if (sticky) {
    var overFooter = false;
    var pageTop = document.querySelector(".hero, .page-hero");
    function stickyRevealPoint() {
      return pageTop ? pageTop.offsetHeight * 0.6 : 320;
    }
    function updateSticky() {
      sticky.classList.toggle(
        "is-hidden",
        overFooter || window.scrollY < stickyRevealPoint()
      );
    }
    if (footer && "IntersectionObserver" in window) {
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) { overFooter = entry.isIntersecting; });
          updateSticky();
        },
        { threshold: 0 }
      ).observe(footer);
    }
    window.addEventListener("scroll", updateSticky, { passive: true });
    updateSticky();
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

  /* ---------- 6. Journal: category filter ----------
     Cards carry data-cat; buttons carry data-filter. "all" shows everything,
     which is the default state. Matches how a WordPress category filter
     behaves, so the markup can be swapped for a loop later without touching
     this logic. */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var postCards = document.querySelectorAll(".post-card");
  var postEmpty = document.getElementById("postEmpty");

  if (filterBtns.length && postCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        var shown = 0;

        filterBtns.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });

        postCards.forEach(function (card) {
          var match = filter === "all" || card.getAttribute("data-cat") === filter;
          card.classList.toggle("is-hidden", !match);
          if (match) shown++;
        });

        if (postEmpty) postEmpty.classList.toggle("is-shown", shown === 0);
      });
    });
  }
})();
