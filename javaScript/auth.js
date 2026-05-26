// ========== GET USERS ==========
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// ========== SAVE USERS ==========
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// ========== SIGNUP ==========
function signup() {

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!name || !email || !password || !role) {
    alert("Fill all fields");
    return;
  }

  let users = getUsers();

  const exists = users.find(u => u.email === email);

  if (exists) {
    alert("User already exists");
    return;
  }

  users.push({ name, email, password, role });

  saveUsers(users);

  alert("Signup successful!");
  window.location.href = "login.html";
}

// ========== LOGIN ==========
function login() {

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  let users = getUsers();

  const user = users.find(u =>
    u.email === email &&
    u.password === password &&
    u.role === role
  );

  if (!user) {
    alert("Invalid login");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));

  window.location.href = "dashboard.html";
}

// ========== LOGOUT ==========
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}