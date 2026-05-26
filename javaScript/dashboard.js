document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Show user data
  document.getElementById("userName").innerText = user.name;
  document.getElementById("userRole").innerText = "Role: " + user.role;

  // Role-based UI control
  const adminElements = document.querySelectorAll(".admin-only");
  const managerElements = document.querySelectorAll(".manager-only");

  if (user.role === "admin") {
    adminElements.forEach(el => el.style.display = "block");
    managerElements.forEach(el => el.style.display = "block");
  }

  else if (user.role === "manager") {
    managerElements.forEach(el => el.style.display = "block");
  }

  else {
    // normal user → nothing extra
  }
});

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}