
const profileData = {
  name: "Valiant Ekklesia",
  phone: "+23481112345678",
  username: "valiant12345",
  id: "000234",
  gender: "Female",
  twoFactorEnabled: false
};

// Fill Profile Info
document.getElementById("profileName").innerText = profileData.name;
document.getElementById("profilePhone").innerText = profileData.phone;

// Mask username
document.getElementById("profileUsername").innerText = profileData.username.slice(0,4) + "**";

document.getElementById("profileId").innerText = profileData.id;
document.getElementById("profileGender").innerText = profileData.gender;

// Update header
document.getElementById("greetName").innerText = "Hi, " + profileData.name;
document.getElementById("headerId").innerText = profileData.id;

// Button functionality
document.getElementById("changePasswordBtn").onclick = function() {
    const newPassword = prompt("Enter new password (min 6 chars):");
    if(newPassword && newPassword.length >= 6){
        alert("Password changed successfully 🎉");
    } else {
        alert("Password must be at least 6 characters ❌");
    }
}

document.getElementById("twoFactorBtn").onclick = function() {
    profileData.twoFactorEnabled = !profileData.twoFactorEnabled;
    if(profileData.twoFactorEnabled){
        alert("Two Factor Authentication Enabled 🔐");
    } else {
        alert("Two Factor Authentication Disabled ❌");
    }
}
// Button functionality
document.getElementById("changePasswordBtn").onclick = function() {
    const newPassword = prompt("Enter new password (must be 6 character):");
    if(newPassword && newPassword.length >= 6){
        alert("Password changed successfully 🎉");
    } else {
        alert("Password must be at least 6 characters ❌");
    }
}

document.getElementById("twoFactorBtn").onclick = function() {
    profileData.twoFactorEnabled = !profileData.twoFactorEnabled;
    if(profileData.twoFactorEnabled){
        alert("Two Factor Authentication Enabled 🔐");
    } else {
        alert("Two Factor Authentication Disabled ❌");
    }
}