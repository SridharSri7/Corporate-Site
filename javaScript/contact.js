
// =============================== NAVIGATION =================================
function goHome() {
  window.location.href = "index.html";
}

function goError() {
  window.location.href = "error.html";
}


// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


// ================= SCROLL ANIMATION =================

const elements = document.querySelectorAll(
  ".contact-form-container, .mini-card, .info-box, .map-box"
);

window.addEventListener("scroll", () => {

  elements.forEach((element) => {

    const elementTop = element.getBoundingClientRect().top;

    if(elementTop < window.innerHeight - 100){

      element.style.opacity = "1";
      element.style.transform = "translateY(0px)";

    }

  });

});


// INITIAL STATE

elements.forEach((element) => {

  element.style.opacity = "0";
  element.style.transform = "translateY(60px)";
  element.style.transition = "0.8s ease";

});


// ================= HERO PARALLAX =================

window.addEventListener("scroll", () => {

  const hero = document.querySelector(".contact-hero");

  let scrollPosition = window.pageYOffset;

  hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";

});