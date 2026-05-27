
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

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("show");

      // ✅ SCROLL LOCK ADDED HERE
      document.body.style.overflow = isOpen ? "hidden" : "auto";

    });

  }

  // close menu on link click (UX FIX)
  document.querySelectorAll(".nav-links li a").forEach(link => {
    link.addEventListener("click", () => {

      navLinks?.classList.remove("show");

      // ✅ UNLOCK SCROLL WHEN MENU CLOSES
      document.body.style.overflow = "auto";

    });
  });


  // ================= SCROLL REVEAL =================
  const revealElements = document.querySelectorAll(".reveal");
  const valueItems = document.querySelectorAll(".value-item");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));


  // ================= VALUE CARDS ANIMATION =================
  const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.style.transition = `0.6s ease ${index * 0.1}s`;
      }
    });
  }, { threshold: 0.2 });

  valueItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    valueObserver.observe(item);
  });

});