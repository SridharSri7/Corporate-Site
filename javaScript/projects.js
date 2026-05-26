
// =============================== NAVIGATION =================================
function goHome() {
  window.location.href = "index.html";
}

// ==========================================================

// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


// ================= SCROLL ANIMATION =================

const cards = document.querySelectorAll(
  ".project-card, .stat-box, .timeline-box, .testimonial-card"
);

window.addEventListener("scroll", () => {

  cards.forEach((card) => {

    const cardTop = card.getBoundingClientRect().top;

    if(cardTop < window.innerHeight - 100){
      card.style.opacity = "1";
      card.style.transform = "translateY(0px)";
    }

  });

});


// INITIAL STATE
cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(60px)";
  card.style.transition = "0.8s ease";
});


// ================= HERO PARALLAX =================

window.addEventListener("scroll", () => {

  const hero = document.querySelector(".projects-hero");

  let scrollPosition = window.pageYOffset;

  hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";

});
