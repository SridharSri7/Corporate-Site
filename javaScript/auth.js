// ================= SIGNUP =================
function signup() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  // Get existing users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check duplicate email
  const exist = users.find(u => u.email === email);

  if (exist) {
    alert("User already exists!");
    return;
  }

  // add new user
  users.push({
    name,
    email,
    password,
    role
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Please login.");
  window.location.href = "login.html";
}


// ================= LOGIN =================
function login() {

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  // store current session user
  localStorage.setItem("user", JSON.stringify({
    name: user.name,
    email: user.email,
    role: user.role
  }));

  alert("Login successful!");

  window.location.href = "dashboard.html";
}


// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}