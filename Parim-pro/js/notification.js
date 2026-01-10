/* =========================
   DATA SOURCE (FROM BACKEND LATER)
========================= */

const notifications = [
  {
    id: 1,
    message: "John Thompson just registered for Corporate Event",
    createdAt: Date.now() - 2 * 60 * 1000,
    read: false
  },
  {
    id: 2,
    message: "Your next event will be active in the next 5 days",
    createdAt: Date.now() - 3 * 60 * 60 * 1000,
    read: false
  },
  {
    id: 3,
    message: "Meet new staffs that registered on Parim Pro",
    createdAt: Date.now() - 26 * 60 * 60 * 1000,
    read: false
  },
  {
    id: 4,
    message: "David Daniels is now on Parim Pro",
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    read: true
  }
];

/* =========================
   GLOBAL STATE
========================= */

const container = document.getElementById("notificationContainer");
const markAllBtn = document.getElementById("markAll");
let activeNotificationId = null;

/* =========================
   TIME CATEGORY ENGINE
========================= */

function getTimeCategory(timestamp) {
  const now = Date.now();
  const diffMs = now - timestamp;

  const minutes = diffMs / (1000 * 60);
  const hours = minutes / 60;
  const days = hours / 24;

  if (minutes < 5) return "Just now";
  if (hours < 24) return "Today";
  if (days < 2) return "Yesterday";
  if (days < 7) return "This week";
  return "Earlier";
}

/* =========================
   RENDER ENGINE
========================= */

function renderNotifications() {
  container.innerHTML = "";

  /* ---------- DETAIL VIEW ---------- */
  if (activeNotificationId !== null) {
    const notif = notifications.find(n => n.id === activeNotificationId);
    if (!notif) return;

    const detail = document.createElement("div");
    detail.className = "notification-detail";
    detail.innerHTML = `
      <div class="detail-header">
        <button id="closeDetail">← Back</button>
      </div>
      <div class="detail-body">
        <p>${notif.message}</p>
      </div>
    `;

    container.appendChild(detail);

    document.getElementById("closeDetail").onclick = () => {
      activeNotificationId = null;
      renderNotifications();
    };

    return;
  }

  /* ---------- LIST VIEW ---------- */
  const grouped = {};

  notifications.forEach(n => {
    const category = getTimeCategory(n.createdAt);
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(n);
  });

  Object.keys(grouped).forEach(category => {
    const label = document.createElement("div");
    label.className = "section-title";
    label.textContent = category;
    container.appendChild(label);

    grouped[category].forEach(n => {
      const item = document.createElement("div");
      item.className = `notification ${n.read ? "read" : "unread"}`;

      item.innerHTML = `
        <div class="avatar"></div>
        <p>${n.message}</p>
      `;

      item.onclick = () => openNotification(n.id);

      container.appendChild(item);
    });
  });
}

/* =========================
   OPEN / CLOSE HANDLERS
========================= */

function openNotification(id) {
  const notif = notifications.find(n => n.id === id);
  if (!notif) return;

  notif.read = true;
  activeNotificationId = id;

  // 🔴 BACKEND CALL
  // fetch(`/api/notifications/${id}/read`, { method: "POST" });

  renderNotifications();
}

/* =========================
   MARK ALL AS READ
========================= */

markAllBtn.onclick = () => {
  notifications.forEach(n => (n.read = true));

  // 🔴 BACKEND CALL
  // fetch("/api/notifications/read-all", { method: "POST" });

  renderNotifications();
};

/* =========================
   INITIAL LOAD
========================= */

renderNotifications();

/* =========================
   LIVE TIME UPDATE (SAFE)
========================= */

setInterval(() => {
  // Prevent auto refresh while reading a message
  if (activeNotificationId === null) {
    renderNotifications();
  }
}, 60 * 1000);
