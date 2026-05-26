
// =============================== NAVIGATION =================================
function goHome() {
  window.location.href = "index.html";
}

function goError() {
  window.location.href = "error.html";
}
// ==========================================================

function toggleDetail(element) {

  const wrapper = element.parentElement;

  // close others
  document.querySelectorAll(".service-wrapper").forEach(item => {
    if (item !== wrapper) {
      item.classList.remove("active");
    }
  });

  // toggle current
  wrapper.classList.toggle("active");
}


document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    // OPTIONAL: close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

});