//api links
const BASE_URL = "https://parim-backendapi-0lfo.onrender.com";
const REGISTER_ADMIN_URL = `${BASE_URL}/api/auth/register-admin`;

const registerForm = document.getElementById("registerForm");
const formMessage = document.getElementById("formMessage");

// Inputs
const fullName = document.getElementById("fullname");
const mail = document.getElementById("mail");
const phone = document.getElementById("phone");
const createPassword = document.getElementById("password");
const confirmPassword = document.getElementById("confirm");
const role = document.getElementById("role");

// Error texts
const nameError = document.getElementById("nameError");
const mailError = document.getElementById("maillError");
const phoneError = document.getElementById("phoneError");
const createPasswordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const roleError = document.getElementById("roleError");

// Password toggles
const togglePassword1 = document.getElementById("togglePassword1");
const togglePassword2 = document.getElementById("togglePassword2");

//functions
function showFormMessage(message, type = "error") {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = "block";
  formMessage.style.fontSize = "20px";
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.style.display = "none";
}

function showInputError(input, errorEl, message) {
  if (message) errorEl.textContent = message;
  errorEl.style.display = "block";
  input.classList.add("error-input");
}

function clearInputError(input, errorEl) {
  errorEl.style.display = "none";
  input.classList.remove("error-input");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//for clearing error
[
  [fullName, nameError],
  [mail, mailError],
  [phone, phoneError],
  [createPassword, createPasswordError],
  [confirmPassword, confirmError],
  [role, roleError],
].forEach(([input, errorEl]) => {
  input.addEventListener("input", () => {
    clearInputError(input, errorEl);
    clearFormMessage();
  });
});

//toggle code
function togglePassword(input, icon) {
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}

togglePassword1.addEventListener("click", () =>
  togglePassword(password, togglePassword1)
);

togglePassword2.addEventListener("click", () =>
  togglePassword(confirmPassword, togglePassword2)
);

//form to submit
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearFormMessage();

  let valid = true;

  // validation logic
  if (!fullName.value.trim()) {
    showInputError(fullName, nameError);
    valid = false;
  }

  if (!mail.value.trim() || !isValidEmail(mail.value.trim())) {
    showInputError(mail, mailError, "Enter a valid email address");
    valid = false;
  }

  if (!phone.value.trim()) {
    showInputError(phone, phoneError);
    valid = false;
  }

  if (createPassword.value.length < 6) {
    showInputError(createPassword, createPasswordError);
    valid = false;
  }

  if (confirmPassword.value !== createPassword.value) {
    showInputError(confirmPassword, confirmError);
    valid = false;
  }

  if (!role.value.trim()) {
    showInputError(role, roleError);
    valid = false;
  }

  if (!valid) return;

  // matching the backend
  const payload = {
    fullName: fullName.value.trim(),
    mail: mail.value.trim(),
    phoneNumber: phone.value.trim(),
    createPassword: createPassword.value,
    confirmPassword: confirmPassword.value,
    role: role.value.trim(),
  };

  try {
    showFormMessage("Creating your account...", "info");

    const response = await fetch(REGISTER_ADMIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);

    const msg = (data.message || "").toLowerCase();

    // for backend errors
    if (!response.ok) {
      showFormMessage(msg);
      return;
    }

    // for successful registration, otp generation  and redirecting
    showFormMessage(msg, "success");

    registerForm.reset();

    setTimeout(() => {
      window.location.href = "otp.html";
    }, 1500);
  } catch (error) {
    showFormMessage(data.error.details);
  }
});
