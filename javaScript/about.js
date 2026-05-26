

// =============================== NAVIGATION =================================
function goHome() {
  window.location.href = "index.html";
}

// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

  // ================= MOBILE MENU =================
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // ================= SCROLL REVEAL =================
  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach((el) => revealObserver.observe(el));

  // ================= VALUE CARDS ANIMATION =================
  const items = document.querySelectorAll(".value-item");

  const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.style.transition = `0.6s ease ${index * 0.1}s`;
      }
    });
  }, {
    threshold: 0.2
  });

  items.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    valueObserver.observe(item);
  });

});

// ================= SCROLL REVEAL (OLD) =================

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});