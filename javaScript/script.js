
// ================= PASSWORD VALIDATION =================
function isValidPassword(password) {
  const minLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(password);

  return minLength && hasLetter && hasNumber && hasSymbol;
}

// ================= ERROR HANDLER =================
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.innerText = msg;
    el.style.display = "block";
  }
}

function hideError(id) {
  const el = document.getElementById(id);
  if (el) {
    el.innerText = "";
    el.style.display = "none";
  }
}

// ================= INIT POPUP =================
document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks?.classList.remove("show"));
  });

  initPopup();
});

// ================= POPUP =================
function initPopup() {
  const overlay = document.getElementById("popupOverlay");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (!overlay || !loginForm || !signupForm) return;

  window._popup = { overlay, loginForm, signupForm };
}

function openLogin() {
  const p = window._popup;
  p.overlay.classList.add("show");
  p.loginForm.classList.remove("hidden");
  p.signupForm.classList.add("hidden");
}

function openSignup() {
  const p = window._popup;
  p.overlay.classList.add("show");
  p.signupForm.classList.remove("hidden");
  p.loginForm.classList.add("hidden");
}

function closePopup() {
  window._popup.overlay.classList.remove("show");
}

function showLogin() {
  const p = window._popup;
  p.loginForm.classList.remove("hidden");
  p.signupForm.classList.add("hidden");
}

function showSignup() {
  const p = window._popup;
  p.signupForm.classList.remove("hidden");
  p.loginForm.classList.add("hidden");
}

// ================= USERS DB =================
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// ================= SIGNUP =================
function signup() {

  const name = document.getElementById("signupName")?.value.trim();
  const email = document.getElementById("signupEmail")?.value.trim().toLowerCase();
  const password = document.getElementById("signupPassword")?.value.trim();
  const confirm = document.getElementById("signupConfirmPassword")?.value.trim();
  const role = document.getElementById("signupRole")?.value || "user";

  hideError("signupError");

  if (!name || !email || !password || !confirm) {
    showError("signupError", "Please fill all fields");
    return;
  }

  if (!isValidPassword(password)) {
    showError(
      "signupError",
      "Password must be 8+ chars with letter, number & symbol"
    );
    return;
  }

  if (password !== confirm) {
    showError("signupError", "Passwords do not match");
    return;
  }

  let users = getUsers();

  if (users.find(u => u.email === email)) {
    showError("signupError", "User already exists");
    return;
  }

  users.push({ name, email, password, role });
  saveUsers(users);

  showError("signupError", "Account created! You can login now.");

  setTimeout(() => {
    showLogin();
    hideError("signupError");
  }, 1200);
}

// ================= LOGIN =================
function login() {

  const email = document.getElementById("loginEmail")?.value.trim().toLowerCase();
  const password = document.getElementById("loginPassword")?.value.trim();
  const role = document.getElementById("loginRole")?.value || "user";

  hideError("loginError");

  if (!email || !password) {
    showError("loginError", "Enter email and password");
    return;
  }

  if (!isValidPassword(password)) {
    showError(
      "loginError",
      "Password must be 8+ chars with letter, number & symbol"
    );
    return;
  }

  let users = getUsers();

  let user = users.find(u => u.email === email);

  // AUTO CREATE USER (NO SIGNUP REQUIRED)
  if (!user) {
    user = {
      name: email.split("@")[0],
      email,
      password,
      role
    };

    users.push(user);
    saveUsers(users);
  }

  // PASSWORD CHECK
  if (user.password !== password) {
    showError("loginError", "Incorrect password");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");

  window.location.href = "dashboard.html";
}

// ================= ROLE SELECTION UI =================
function selectRole(role) {

  const userCard = document.getElementById("userRoleCard");
  const adminCard = document.getElementById("adminRoleCard");
  const hiddenRole = document.getElementById("signupRole");

  if (role === "admin") {
    adminCard?.classList.add("active");
    userCard?.classList.remove("active");
  } else {
    userCard?.classList.add("active");
    adminCard?.classList.remove("active");
  }

  if (hiddenRole) hiddenRole.value = role;
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// ================= FORGOT PASSWORD =================
function forgotPassword() {
  window.location.href = "error.html";
}