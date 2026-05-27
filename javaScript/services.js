
// =============================== NAVIGATION ===============================

function goHome() {
  window.location.href = "index.html";
}

function goError() {
  window.location.href = "error.html";
}


// =============================== SERVICE TOGGLE ===============================

function toggleDetail(element) {

  const wrapper = element.parentElement;

  // close others
  document.querySelectorAll(".service-wrapper").forEach(item => {
    if (item !== wrapper) {
      item.classList.remove("active");
    }
  });

  wrapper.classList.toggle("active");
}


// =============================== INIT ===============================

document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");

  // ================= SCROLL LOCK (BULLETPROOF) =================

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

  // ================= MOBILE MENU =================

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("show");

      if (isOpen) {
        lockScroll();   // 🔒 lock background scroll
      } else {
        unlockScroll(); // 🔓 restore scroll
      }

    });

    // close menu when clicking link
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {

        navLinks.classList.remove("show");
        unlockScroll();

      });
    });

  }

});