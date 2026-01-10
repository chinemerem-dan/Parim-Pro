const registerForm = document.getElementById('registerForm');

const fullname = document.getElementById('fullname');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

const nameError = document.getElementById('nameError');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');

function resetErrors() {
  document.querySelectorAll('.error').forEach(e => {
    e.textContent = '';
    e.style.display = 'none';
  });
  document.querySelectorAll('input').forEach(i =>
    i.classList.remove('error-input')
  );
}

registerForm.addEventListener('submit', function (e) {
  e.preventDefault();
  resetErrors();

  let isValid = true;

  if (!fullname.value.trim()) {
    nameError.textContent = 'Full name is required';
    nameError.style.display = 'block';
    isValid = false;
  }

  if (!username.value.trim()) {
    usernameError.textContent = 'Username is required';
    usernameError.style.display = 'block';
    isValid = false;
  }

  if (!password.value) {
    passwordError.textContent = 'Password is required';
    passwordError.style.display = 'block';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters';
    passwordError.style.display = 'block';
    isValid = false;
  }

  if (!confirm.value) {
    confirmError.textContent = 'Confirm your password';
    confirmError.style.display = 'block';
    isValid = false;
  } else if (password.value !== confirm.value) {
    confirmError.textContent = 'Passwords do not match';
    confirmError.style.display = 'block';
    isValid = false;
  }

  if (!isValid) return;

  /* ---------- API CALL ---------- */
  fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullname: fullname.value.trim(),
      username: username.value.trim().toLowerCase(),
      password: password.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Registration successful! You can now login.");
      registerForm.reset();
      // window.location.href = "login.html";
    })
    .catch(() => {
      alert("Server error. Try again later.");
    });
});
