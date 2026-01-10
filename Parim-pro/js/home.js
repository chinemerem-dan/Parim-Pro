// const form = document.getElementById("loginForm");

// const usernameInput = document.getElementById("username");
// const passwordInput = document.getElementById("password");

// const usernameError = document.getElementById("usernameError");
// const passwordError = document.getElementById("passwordError");

// /* ---------- HELPER FUNCTIONS ---------- */
// function showError(input, errorElement, message) {
//   input.style.border = "1px solid red";
//   errorElement.textContent = message;
// }

// function clearError(input, errorElement) {
//   input.style.border = "none";
//   errorElement.textContent = "";
// }

// /* ---------- INPUT VALIDATION ---------- */
// function validateUsername() {
//   if (usernameInput.value.trim() === "") {
//     showError(usernameInput, usernameError, "Username is required");
//     return false;
//   }
//   clearError(usernameInput, usernameError);
//   return true;
// }

// function validatePassword() {
//   if (passwordInput.value.trim() === "") {
//     showError(passwordInput, passwordError, "Password is required");
//     return false;
//   }
//   clearError(passwordInput, passwordError);
//   return true;
// }

// /* ---------- REAL-TIME INPUT EVENTS ---------- */
// usernameInput.addEventListener("input", validateUsername);
// passwordInput.addEventListener("input", validatePassword);

// /* ---------- FORM SUBMISSION ---------- */
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const isUsernameValid = validateUsername();
//   const isPasswordValid = validatePassword();

//   if (!isUsernameValid || !isPasswordValid) return;

//   try {
//     const response = await fetch("http://localhost:5000/api/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         username: usernameInput.value.trim(),
//         password: passwordInput.value.trim()
//       })
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       showError(passwordInput, passwordError, data.message);
//       return;
//     }

//     // Save token
//     localStorage.setItem("token", data.token);

//     alert("Login successful");
//     // window.location.href = "dashboard.html";

//   } catch (error) {
//     showError(passwordInput, passwordError, "Server error. Try again.");
//   }
// });

// const togglePassword = document.getElementById("togglePassword");

// togglePassword.addEventListener("click", () => {
//   if (passwordInput.type === "password") {
//     passwordInput.type = "text";
//     togglePassword.textContent = "🙈";
//   } else {
//     passwordInput.type = "password";
//     togglePassword.textContent = "👁";
//   }
// });
// const loginForm = document.getElementById('loginForm');
// const togglePassword = document.getElementById('togglePassword');
// const passwordInput = document.getElementById('loginPassword');

/* ---------- PASSWORD TOGGLE ---------- */
togglePassword.addEventListener('click', function () {
  const isPassword = passwordInput.type === 'password';

  passwordInput.type = isPassword ? 'text' : 'password';
  togglePassword.classList.toggle('active');
  togglePassword.textContent = isPassword ? '🙈' : '👁️';
});

/* ---------- LOGIN ---------- */
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document
    .getElementById('loginUsername')
    .value.trim()
    .toLowerCase();

  const password = passwordInput.value;

  if (!username || !password) {
    alert("All fields are required");
    return;
  }

  fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        alert(data.message || "Invalid login");
        return;
      }

      alert("Login successful");
      localStorage.setItem("token", data.token);
      // window.location.href = "dashboard.html";
    })
    .catch(() => {
      alert("Server error. Try again later.");
    });
});
