// =============================== NAVIGATION ===============================

function goHome() {
  window.location.href = "index.html";
}

function goError() {
  window.location.href = "error.html";
}


// =============================== MOBILE MENU ===============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    // lock background scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });

}

// close menu when clicking a link
document.querySelectorAll(".nav-links li a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("show");
    document.body.style.overflow = "auto";
  });
});


// =============================== SCROLL ANIMATION ===============================

const elements = document.querySelectorAll(
  ".contact-form-container, .mini-card, .info-box, .map-box"
);

// initial state
elements.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(60px)";
  el.style.transition = "0.8s ease";
});

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
});


// =============================== HERO PARALLAX ===============================

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".contact-hero");
  if (!hero) return;

  const scrollPosition = window.pageYOffset;
  hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";
});