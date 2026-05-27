// =============================== NAVIGATION =================================

function goHome() {
  window.location.href = "index.html";
}

function goError() {
  window.location.href = "error.html";
}

// ================= MASTER BOOTSTRAP =================
document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  console.log("🚀 Dashboard Loaded");

  App.init(user);
});


// ================= APP CORE =================
const App = {

  user: null,
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  notifications: JSON.parse(localStorage.getItem("notifications")) || [],

  // INIT ALL
  init(user) {
    this.user = user;

    this.initUI();
    this.initProfile();
    this.initDashboard();
    this.initTasks();
    this.initNotifications();
    this.initSettings();
    this.initCounters();
    this.initLiveSystem();
  },

  // ================= UI =================
  initUI() {

    const u = this.user;

    this.setText("userName", u.name);
    this.setText("userEmail", u.email);
    this.setText("pName", u.name);
    this.setText("pEmail", u.email);
    this.setText("pRole", u.role.toUpperCase());

    const roleEl = document.getElementById("userRole");
    if (roleEl) {
      roleEl.innerText = u.role.toUpperCase();
      roleEl.classList.add("role-" + u.role);
    }

    const avatar = document.getElementById("avatarText");
    if (avatar) avatar.innerText = u.name.charAt(0).toUpperCase();

    // ADMIN CONTROL
    if (u.role !== "admin") {
      document.querySelectorAll(".admin-only").forEach(el => {
        el.style.display = "none";
      });
    }
  },

  setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
  },


  // ================= PROFILE =================
  initProfile() {

    const u = this.user;

    if (!u.activities) u.activities = [];

    const name = document.getElementById("editName");
    const email = document.getElementById("editEmail");

    if (name) name.value = u.name;
    if (email) email.value = u.email;

    this.updateProfileProgress();

    this.renderActivities();
  },

  updateProfileProgress() {

    const u = this.user;
    let score = 0;

    if (u.name) score += 30;
    if (u.email) score += 30;
    if (u.password) score += 20;
    if (u.avatar) score += 20;

    const bar = document.getElementById("profileProgress");
    if (bar) bar.style.width = score + "%";
  },

  saveProfile() {

    const u = this.user;

    const name = document.getElementById("editName")?.value;
    const email = document.getElementById("editEmail")?.value;

    if (name) u.name = name;
    if (email) u.email = email;

    this.addActivity("Updated profile");

    this.saveUser();
    location.reload();
  },

  changePassword() {

    const u = this.user;

    const oldPass = document.getElementById("oldPass")?.value;
    const newPass = document.getElementById("newPass")?.value;

    if (oldPass !== u.password) {
      alert("Wrong password");
      return;
    }

    u.password = newPass;

    this.addActivity("Changed password");
    this.saveUser();

    alert("Password updated");
  },

  addActivity(text) {

    const u = this.user;

    if (!u.activities) u.activities = [];

    u.activities.unshift({
      text,
      time: new Date().toLocaleString()
    });

    if (u.activities.length > 6) u.activities.pop();

    this.saveUser();
    this.renderActivities();
  },

  renderActivities() {

    const container = document.getElementById("timeline");
    if (!container) return;

    container.innerHTML = "";

    const u = this.user;

    (u.activities || []).forEach(a => {

      const div = document.createElement("div");
      div.className = "timeline-item";

      div.innerHTML = `<b>${a.text}</b><br><small>${a.time}</small>`;

      container.appendChild(div);
    });
  },

  initAvatarUpload() {

    const input = document.getElementById("avatarInput");
    if (!input) return;

    input.addEventListener("change", e => {

      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {

        this.user.avatar = reader.result;

        const img = document.getElementById("avatarImg");
        const txt = document.getElementById("avatarText");

        if (img) {
          img.src = reader.result;
          img.style.display = "block";
        }

        if (txt) txt.style.display = "none";

        this.addActivity("Updated avatar");
        this.saveUser();
      };

      reader.readAsDataURL(file);
    });
  },


  // ================= DASHBOARD =================
  initDashboard() {
    this.initCharts();
  },

  initCharts() {

    if (typeof Chart === "undefined") return;

    const line = document.getElementById("lineChart");
    const bar = document.getElementById("barChart");
    const donut = document.getElementById("donutChart");

    if (!line || !bar || !donut) return;

    new Chart(line, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun"],
        datasets: [{
          label: "Users",
          data: [200,400,600,900,1100,1240],
          borderColor: "#3b82f6"
        }]
      }
    });

    new Chart(bar, {
      type: "bar",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun"],
        datasets: [{
          label: "Revenue",
          data: [2000,4000,3000,7000,9000,12540],
          backgroundColor: "#9333ea"
        }]
      }
    });

    new Chart(donut, {
      type: "doughnut",
      data: {
        labels: ["Google","Direct","Social","Referral"],
        datasets: [{
          data: [40,25,20,15],
          backgroundColor: ["#3b82f6","#9333ea","#22c55e","#f59e0b"]
        }]
      }
    });
  },


  // ================= COUNTERS =================
  initCounters() {

    document.querySelectorAll(".count").forEach(el => {

      let target = +el.getAttribute("data-target");
      let value = 0;

      let step = target / 60;

      const run = () => {

        value += step;

        if (value < target) {
          el.innerText = Math.floor(value);
          requestAnimationFrame(run);
        } else {
          el.innerText = target;
        }
      };

      run();
    });
  },


  // ================= TASKS =================
  initTasks() {
    this.renderTasks();
  },

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  },

  renderTasks() {

    ["todo","progress","done"].forEach(id => {
      const el = document.getElementById(id + "List");
      if (el) el.innerHTML = "";
    });

    this.tasks.forEach(t => {

      const div = document.createElement("div");
      div.className = "task-item " + t.priority;

      div.innerHTML = `
        <b>${t.title}</b>
        <p>${t.desc}</p>
      `;

      const container = document.getElementById(t.status + "List");
      if (container) container.appendChild(div);
    });
  },

  addTask() {

    this.tasks.push({
      id: Date.now(),
      title: document.getElementById("taskTitle")?.value || "",
      desc: document.getElementById("taskDesc")?.value || "",
      priority: document.getElementById("taskPriority")?.value || "low",
      date: document.getElementById("taskDate")?.value || "",
      tags: document.getElementById("taskTags")?.value || "",
      status: "todo"
    });

    this.saveTasks();
    this.renderTasks();
  },


  // ================= NOTIFICATIONS =================
  initNotifications() {
    this.renderNotifications();
  },

  pushNotification(type, title, message) {

    this.notifications.unshift({
      id: Date.now(),
      type,
      title,
      message,
      time: new Date().toLocaleTimeString(),
      read: false
    });

    if (this.notifications.length > 20) this.notifications.pop();

    localStorage.setItem("notifications", JSON.stringify(this.notifications));

    this.renderNotifications();
  },

  renderNotifications() {

    const box = document.getElementById("notifContainer");
    if (!box) return;

    box.innerHTML = "";

    this.notifications.forEach(n => {

      const div = document.createElement("div");
      div.className = "notif-item";

      div.innerHTML = `
        <b>${n.title}</b>
        <p>${n.message}</p>
      `;

      box.appendChild(div);
    });
  },


  // ================= SETTINGS =================
  initSettings() {},


  // ================= LIVE SYSTEM =================
  initLiveSystem() {

    setInterval(() => {

      const msgs = [
        ["system","System","Running smoothly"],
        ["user","User","New login detected"],
        ["security","Security","No threats found"],
        ["payment","Payment","Transaction completed"]
      ];

      const r = msgs[Math.floor(Math.random() * msgs.length)];

      this.pushNotification(r[0], r[1], r[2]);

    }, 8000);
  },


  // ================= UTILS =================
  saveUser() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }
};


// ================= GLOBAL FUNCTIONS =================
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// ================= SETTINGS FUNCTIONS =================

function openSettings(id) {

  document.querySelectorAll(".settings-panel")
    .forEach(p => p.classList.remove("active"));

  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".tab")
    .forEach(t => t.classList.remove("active"));

  event.target.classList.add("active");
}

/* LOAD USER */
document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return;

  document.getElementById("setName").value = user.name;
  document.getElementById("setEmail").value = user.email;

  document.getElementById("settingsRole").innerText = user.role.toUpperCase();

  document.getElementById("avatarPreview").innerText =
    user.name.charAt(0).toUpperCase();
});

/* SAVE */
function saveSettingsProfile() {

  const user = JSON.parse(localStorage.getItem("user"));

  user.name = document.getElementById("setName").value;
  user.email = document.getElementById("setEmail").value;

  localStorage.setItem("user", JSON.stringify(user));

  alert("Profile Updated");
}

/* DELETE */
function deleteAccount() {
  if (confirm("Delete account permanently?")) {
    localStorage.clear();
    window.location.href = "signup.html";
  }
}

// ==========================================================================
// ================= ADMIN LIVE FEED =================

function adminLog(msg) {
  const box = document.getElementById("adminFeed");
  if (!box) return;

  const div = document.createElement("div");
  div.className = "feed-item";
  div.innerText = "⚡ " + msg;

  box.prepend(div);

  if (box.children.length > 8) {
    box.removeChild(box.lastChild);
  }
}

// FAKE LIVE ACTIVITY
setInterval(() => {

  const logs = [
    "New user registered",
    "Server load stable",
    "Payment processed",
    "Security scan completed",
    "Database optimized"
  ];

  const msg = logs[Math.floor(Math.random() * logs.length)];
  adminLog(msg);

}, 5000);


// ================= USER ACTIONS =================

function banUser(btn) {
  btn.parentElement.parentElement.style.opacity = "0.4";
  btn.innerText = "Banned";
  btn.disabled = true;
  adminLog("User banned");
}

function promoteUser(btn) {
  btn.innerText = "Admin";
  btn.style.background = "#22c55e";
  adminLog("User promoted to admin");
}