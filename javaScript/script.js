// ====================================== PASSWORD VALIDATION ======================================
function isStrongPassword(password) {
  const minLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(password);

  return minLength && hasLetter && hasNumber && hasSymbol;
}


// ================= SAFE INIT =================
document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks?.classList.remove("show");
    });
  });

  initPopup();
});


// ================= POPUP INIT =================
function initPopup() {
  const overlay = document.getElementById("popupOverlay");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (!overlay || !loginForm || !signupForm) return;

  window._popup = { overlay, loginForm, signupForm };
}


// ================= OPEN POPUP =================
function openLogin() {
  const p = window._popup;
  if (!p) return;

  p.overlay.classList.add("show");
  p.loginForm.classList.remove("hidden");
  p.signupForm.classList.add("hidden");
}

function openSignup() {
  const p = window._popup;
  if (!p) return;

  p.overlay.classList.add("show");
  p.signupForm.classList.remove("hidden");
  p.loginForm.classList.add("hidden");
}

function closePopup() {
  const p = window._popup;
  if (!p) return;

  p.overlay.classList.remove("show");
}


// ================= SWITCH FORMS =================
function showLogin() {
  const p = window._popup;
  if (!p) return;

  p.loginForm.classList.remove("hidden");
  p.signupForm.classList.add("hidden");
}

function showSignup() {
  const p = window._popup;
  if (!p) return;

  p.signupForm.classList.remove("hidden");
  p.loginForm.classList.add("hidden");
}


// ================= USERS DB =================
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}


// ================= SIGNUP =================
function signup() {
  const name = document.getElementById("signupName")?.value.trim();
  const email = document.getElementById("signupEmail")?.value.trim().toLowerCase();
  const password = document.getElementById("signupPassword")?.value.trim();
  const confirm = document.getElementById("signupConfirmPassword")?.value.trim();
  const role = document.getElementById("signupRole")?.value || "user";

  const errorBox = document.getElementById("signupError");

  if (errorBox) {
    errorBox.style.display = "block";
    errorBox.innerText = "";
  }

  // 1. Empty check
  if (!name || !email || !password || !confirm) {
    return showSignupError("Please fill all fields");
  }

  // 2. Password strength check (8+ with letter, number, symbol)
  if (
    password.length < 8 ||
    !/[a-zA-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(password)
  ) {
    return showSignupError("Password must be 8+ chars with letter, number & symbol");
  }

  // 3. Password match check
  if (password !== confirm) {
    return showSignupError("Passwords do not match");
  }

  // 4. Get existing users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // 5. Duplicate email check
  const exists = users.some(user => user.email === email);
  if (exists) {
    return showSignupError("User already exists");
  }

  // 6. Save user
  users.push({
    name,
    email,
    password,
    role
  });

  localStorage.setItem("users", JSON.stringify(users));

  // 7. Success message
  showSignupError("Account created successfully!");

  // 8. Switch to login after delay
  setTimeout(() => {
    if (typeof showLogin === "function") {
      showLogin();
    }
  }, 1200);
}

// ================= ERROR HELPER =================
function showSignupError(msg) {
  const errorBox = document.getElementById("signupError");
  if (!errorBox) return;

  errorBox.style.display = "block";
  errorBox.innerText = msg;
}

// ================= LOGIN =================
function login() {

  let email = document.getElementById("loginEmail")?.value.trim().toLowerCase();
  let password = document.getElementById("loginPassword")?.value.trim();
  let role = document.getElementById("loginRole")?.value || "user";

  const hint = document.getElementById("passwordHint");

  if (!email || !password) return;

  // ✅ ONLY RULE: 8+ characters
  if (password.length < 8) {
    if (hint) {
      hint.textContent = "Password must be at least 8 characters";
      hint.classList.remove("hidden");
    }
    return;
  }

  let users = getUsers();

  // try find user
  let user = users.find(u =>
    u.email === email &&
    u.password === password &&
    u.role === role
  );

  // auto-create if not found
  if (!user) {

    user = {
      name: email.split("@")[0],
      email,
      password,
      role
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  // hide hint
  if (hint) hint.classList.add("hidden");

  // save session
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");

  window.location.href = "dashboard.html";
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


// ================= ROLE SELECTION =================
function selectRole(role) {

  const userCard = document.getElementById("userRoleCard");
  const adminCard = document.getElementById("adminRoleCard");
  const hiddenRole = document.getElementById("signupRole");

  if (!hiddenRole) return;

  if (role === "admin") {
    adminCard?.classList.add("active");
    userCard?.classList.remove("active");
  } else {
    userCard?.classList.add("active");
    adminCard?.classList.remove("active");
  }

  hiddenRole.value = role;
}