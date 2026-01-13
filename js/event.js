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


const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const addEventBtn = document.getElementById("addEvent");
const tableBody = document.getElementById("eventTable");

// MODAL LOGIC/
openModal.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

//STATUS LOGIC 
function getStatus(startTime, endTime) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return { text: "In Future", class: "future" };
  if (now >= start && now <= end) return { text: "In Progress", class: "progress" };
  return { text: "Done", class: "done" };
}

// RENDER EVENTS /
function renderEvents(events) {
  tableBody.innerHTML = "";

  events.forEach(event => {
    const status = getStatus(event.startTime, event.endTime);

    const row = document.createElement("tr");
    row.dataset.start = event.startTime;
    row.dataset.end = event.endTime;

    row.innerHTML = `
      <td>${event.name}</td>
      <td>${new Date(event.startTime).toLocaleString()}</td>
      <td>${event.location}</td>
      <td>${event.attendees}</td>
      <td>
        <span class="status ${status.class}">
          ${status.text}
        </span>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// FETCH EVENTS
async function loadEvents() {
  try {
    const res = await fetch("/api/events", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
      }
    });

    if (!res.ok) throw new Error("Failed to fetch events");

    const events = await res.json();
    renderEvents(events);
  } catch (err) {
    console.error("Error loading events:", err);
  }
}

//CREATE EVENT
addEventBtn.addEventListener("click", async () => {
  const name = document.getElementById("eventName").value.trim();
  const startTime = document.getElementById("eventDate").value;
  const location = document.getElementById("eventLocation").value.trim();
  const attendees = document.getElementById("eventAttendees").value;

  if (!name || !startTime || !location || !attendees) {
    alert("All fields are required");
    return;
  }

  // Default duration: 1 hour
  const endTime = new Date(
    new Date(startTime).getTime() + 60 * 60 * 1000
  ).toISOString();

  try {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
      },
      body: JSON.stringify({
        name,
        startTime,
        endTime,
        location,
        attendees
      })
    });

    if (!res.ok) throw new Error("Failed to create event");

    // Reset form
    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventLocation").value = "";
    document.getElementById("eventAttendees").value = "";

    modal.style.display = "none";
    loadEvents();
  } catch (err) {
    console.error("Error creating event:", err);
  }
});

//AUTO UPDATE STATUS 
function updateStatuses() {
  document.querySelectorAll("#eventTable tr").forEach(row => {
    const startTime = row.dataset.start;
    const endTime = row.dataset.end;

    if (!startTime || !endTime) return;

    const status = getStatus(startTime, endTime);
    const badge = row.querySelector(".status");

    badge.textContent = status.text;
    badge.className = `status ${status.class}`;
  });
}

// Update every minute
setInterval(updateStatuses, 60000);


