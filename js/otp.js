const BASE_URL = "https://parim-backendapi-0lfo.onrender.com";

// Elements
const otpInput = document.getElementById("otpInput");
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");
const notification = document.getElementById("notification");

// Get phone stored during registration
const phone = localStorage.getItem("otp_phone");

// Safety check
if (!phone) {
  alert("Session expired. Please register again.");
  window.location.href = "register.html";
}

//helpers
function clearMessages() {
  errorMsg.textContent = "";
  successMsg.textContent = "";
}

//LIVE ERROR CLEARING 
otpInput.addEventListener("input", () => {
  clearMessages();
});

//SUBMIT OTP 
loginBtn.addEventListener("click", async () => {
  clearMessages();

  const otp = otpInput.value.trim();

  if (!otp) {
    errorMsg.textContent = "OTP is required";
    return;
  }

  // Disable button to prevent double submission
  loginBtn.disabled = true;
  loginBtn.textContent = "Verifying...";

  try {
    const res = await fetch(`${BASE_URL}/api-docs/#/Authentication/post_api_auth_verify_otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone,
        otp: otp
      })
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.message || "Invalid OTP";
      return;
    }

    // SUCCESS
    successMsg.textContent = "OTP verified successfully! Redirecting...";

    otpInput.value = ""; // clear only on success
    notification.style.display = "none";

    localStorage.removeItem("otp_phone");

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1500);

  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Network error. Please try again.";
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
  }
});
