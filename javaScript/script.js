
// ================= NAVBAR TOGGLE (SAFE) =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// OPTIONAL: close menu when clicking a link (professional UX)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// ================= SIGNUP =================
function signup() {
  let name = document.getElementById("name")?.value;
  let email = document.getElementById("email")?.value;
  let password = document.getElementById("password")?.value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = { name, email, password };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Signup successful!");
  window.location.href = "login.html";
}


// ================= LOGIN =================
function login() {
  let email = document.getElementById("loginEmail")?.value;
  let password = document.getElementById("loginPassword")?.value;

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No user found. Please signup first.");
    return;
  }

  if (email === user.email && password === user.password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}


// ================= DASHBOARD SECURITY =================
if (window.location.pathname.includes("dashboard")) {
  let user = JSON.parse(localStorage.getItem("user"));

  if (!localStorage.getItem("loggedIn") || !user) {
    window.location.href = "login.html";
  } else {
    const nameEl = document.getElementById("userName");
    if (nameEl) {
      nameEl.innerText = user.name;
    }
  }
}


// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// ===================== safe ===================
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.1
});

sections.forEach((sec) => observer.observe(sec));