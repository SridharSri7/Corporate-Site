document.addEventListener("DOMContentLoaded", () => {

  // MOBILE MENU
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // SCROLL REVEAL ANIMATION
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".value-item");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = "0.2s";
        entry.target.style.opacity = "1";
      }
    });
  });

  items.forEach(item => observer.observe(item));
});