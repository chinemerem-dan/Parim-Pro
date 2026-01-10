

// menu icon navigation

const menuIcon = document.getElementById('menuIcon');

// Add a click event listener to the icon
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      window.location.href = "nav.html";
    });
  }
});


/* -------------------------
   BACKEND CONFIG
-------------------------- */
// Change these URLs when backend is ready
const API = {
  dashboard: "/api/dashboard",
  attendance: "/api/attendance",
  search: "/api/search",
  notifications: "/api/notifications",
  qr: "/api/qr"
};

/* -------------------------
   DOM REFERENCES
-------------------------- */
const searchInput = document.querySelector(".search input");
const notificationIcon = document.querySelector(".hero-icons span");

/* -------------------------
   MOCK DATA (REMOVE LATER)
-------------------------- */
const mockData = {
  dashboard: {
    totalEvents: 347,
    totalStaff: 447,
    analysis: 447,
    training: 147
  },
  attendance: {
    rate: "91%",
    checkedIn: 230,
    late: 50,
    absent: 20,
    onTime: 200
  },
  qrValue: "https://parimpro.com/event/tech-conference-2026"
};

/* -------------------------
   LOAD DASHBOARD DATA
-------------------------- */
function loadDashboard() {
  /*
    BACKEND VERSION:
    fetch(API.dashboard)
      .then(res => res.json())
      .then(renderDashboard);
  */

  // FRONTEND MOCK
  renderDashboard(mockData.dashboard);
}

function renderDashboard(data) {
  document.querySelectorAll(".stat")[0].querySelector("strong").textContent = data.totalEvents;
  document.querySelectorAll(".stat")[1].querySelector("strong").textContent = data.totalStaff;
  document.querySelectorAll(".stat")[2].querySelector("strong").textContent = data.analysis;
  document.querySelectorAll(".stat")[3].querySelector("strong").textContent = data.training;
}

/* -------------------------
   LOAD ATTENDANCE DATA
-------------------------- */
function loadAttendance() {
  /*
    BACKEND VERSION:
    fetch(API.attendance)
      .then(res => res.json())
      .then(renderAttendance);
  */

  renderAttendance(mockData.attendance);
}

function renderAttendance(data) {
  document.querySelector(".attendance-rate").textContent = data.rate;

  const boxes = document.querySelectorAll(".box");
  boxes[0].querySelector("strong").textContent = data.checkedIn;
  boxes[1].querySelector("strong").textContent = data.late;
  boxes[2].querySelector("strong").textContent = data.absent;
  boxes[3].querySelector("strong").textContent = data.onTime;
}

/* -------------------------
   QR CODE (BACKEND)
-------------------------- */
function loadQRCode() {
  /*
    BACKEND VERSION:
    fetch(API.qr)
      .then(res => res.json())
      .then(data => qrImage.src = data.qrUrl);
  */

  const qrImage = document.querySelector(".qr img");
  qrImage.src =
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(mockData.qrValue)}`;
}

/* -------------------------
   SEARCH (BACKEND)
-------------------------- */
searchInput.addEventListener("input", e => {
  const query = e.target.value.trim();

  if (!query) return;

  /*
    BACKEND VERSION:
    fetch(`${API.search}?q=${query}`)
      .then(res => res.json())
      .then(results => console.log(results));
  */

  console.log("Searching for:", query);
});

/* -------------------------
   NOTIFICATIONS (BACKEND)
-------------------------- */
notificationIcon.addEventListener("click", () => {
  /*
    BACKEND VERSION:
    fetch(API.notifications)
      .then(res => res.json())
      .then(data => console.log(data));
  */

  alert("Notifications (backend)");
});

/* -------------------------
   INITIALIZE PAGE
-------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
  loadAttendance();
  loadQRCode();
});
