//api links
const BASE_URL = "https://parim-backendapi-0lfo.onrender.com";
const LOGIN_URL = `${BASE_URL}/api/auth/login`;

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginSuccess = document.getElementById("loginSuccess");

const togglePassword = document.getElementById("togglePassword");

// FOR PASSWORD TOGGLE
togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";

  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

//THIS CLEARS  ERRORS ON INPUT
[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error");
    emailError.textContent = "";
    passwordError.textContent = "";
    loginSuccess.textContent = "";
  });
});

//FOR SUBMISSION
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mail = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let hasError = false;

  if (!mail) {
    emailError.textContent = "Please input your Email";
    emailInput.classList.add("input-error");
    hasError = true;
  }

  if (!password) {
    passwordError.textContent = "Please input your Password";
    passwordInput.classList.add("input-error");
    hasError = true;
  }

  if (hasError) return;

  const submitBtn = loginForm.querySelector("button");
  submitBtn.disabled = true;
  submitBtn.textContent = "Logging in...";

  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid login credentials");
    }

    // FOR SUCCESFUL LOGIN
    localStorage.setItem("parim_token", data.token);
    localStorage.setItem("parim_user", JSON.stringify(data.user));

    loginSuccess.textContent = "Login successful. Redirecting...";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 600);
  } catch (error) {
    passwordError.textContent = error.message;
    passwordInput.classList.add("input-error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Login";
  }
});
