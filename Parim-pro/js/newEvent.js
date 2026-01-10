const form = document.getElementById("eventForm");
const qrContainer = document.getElementById("qrCode");

const inputs = {
  name: document.getElementById("name"),
  venue: document.getElementById("venue"),
  time: document.getElementById("time"),
  roles: document.getElementById("roles")
};

const errors = {
  name: document.getElementById("nameError"),
  venue: document.getElementById("venueError"),
  time: document.getElementById("timeError"),
  roles: document.getElementById("rolesError")
};

let qrGenerated = false;
let qrToken = "";

/* ================= VALIDATION ================= */
function validate() {
  let valid = true;

  Object.keys(inputs).forEach(key => {
    if (!inputs[key].value.trim()) {
      errors[key].textContent = "This field is required";
      valid = false;
    } else {
      errors[key].textContent = "";
    }
  });

  return valid;
}

/* ================= QR CODE ================= */
function generateQRCode(payload) {
  qrContainer.innerHTML = "";
  qrToken = btoa(JSON.stringify(payload)); // simple encoded token

  new QRCode(qrContainer, {
    text: qrToken,
    width: 90,
    height: 90
  });

  qrGenerated = true;
}

/* ================= CREATE EVENT ================= */
document.getElementById("createBtn").addEventListener("click", () => {
  if (!validate()) return;

  const eventData = {
    name: inputs.name.value,
    location: inputs.venue.value,
    startTime: inputs.time.value,
    endTime: new Date(
      new Date(inputs.time.value).getTime() + 60 * 60 * 1000
    ).toISOString(),
    attendees: inputs.roles.value
  };

  generateQRCode(eventData);

  /* ================= BACKEND INTEGRATION =================
     - Backend should verify QR scan
     - Backend should persist event per user
     - API Example:
       POST /api/events
       Body: eventData
       Auth: Bearer token
  ======================================================== */

  // TEMP: Save locally per user
  const existing = JSON.parse(localStorage.getItem("events")) || [];
  existing.push(eventData);
  localStorage.setItem("events", JSON.stringify(existing));

  // Simulate QR scan success
  setTimeout(() => {
    window.location.href = "event.html";
  }, 1200);
});
const localEvents = JSON.parse(localStorage.getItem("events")) || [];
if (localEvents.length) renderEvents(localEvents);