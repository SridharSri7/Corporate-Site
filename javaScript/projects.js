
// =============================== NAVIGATION ===============================

function goHome() {
  window.location.href = "index.html";
}

function goError() {
  window.location.href = "error.html";
}


// =============================== INIT ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ================= MOBILE MENU =================

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  // 🔒 ULTRA SCROLL LOCK (FIXES ALL BROWSERS)
  let scrollPosition = 0;

  function lockScroll() {
    scrollPosition = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
  }

  function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollPosition);
  }

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("show");

      if (isOpen) {
        lockScroll();
      } else {
        unlockScroll();
      }

    });

  }

  // close menu on link click
  document.querySelectorAll(".nav-links li a").forEach(link => {
    link.addEventListener("click", () => {

      navLinks?.classList.remove("show");
      unlockScroll();

    });
  });


  // ================= SCROLL ANIMATION =================

  const cards = document.querySelectorAll(
    ".project-card, .stat-box, .timeline-box, .testimonial-card"
  );

  // initial state
  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";
    card.style.transition = "0.8s ease";
  });

  window.addEventListener("scroll", () => {

    cards.forEach(card => {

      const top = card.getBoundingClientRect().top;

      if (top < window.innerHeight - 100) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }

    });

  });


  // ================= HERO PARALLAX =================

  window.addEventListener("scroll", () => {

    const hero = document.querySelector(".projects-hero");
    if (!hero) return;

    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";

  });

});