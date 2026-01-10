// Generate OTP
const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

// Elements
const otpDisplay = document.getElementById("otpDisplay");
const otpInput = document.getElementById("otpInput");
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

// Show OTP in notification
otpDisplay.textContent = generatedOTP;

// Login button click
loginBtn.addEventListener("click", () => {
  errorMsg.textContent = "";
  successMsg.textContent = "";

  if (otpInput.value === "") {
    errorMsg.textContent = "Please enter the OTP.";
    return;
  }

  if (otpInput.value === generatedOTP) {
    successMsg.textContent = "Login successful 🎉";
    setTimeout(() => {
      alert("User logged in successfully");
       window.location.href = "dashboard.html"; 
    }, 800);
  } else {
    errorMsg.textContent = "Invalid OTP. Please try again.";
  }
});
