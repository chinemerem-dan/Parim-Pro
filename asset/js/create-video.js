document.getElementById("videoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const subtitle = document.getElementById("subtitle").value.trim();
  const videoLink = document.getElementById("videoLink").value.trim();

  if (!title || !subtitle || !videoLink) {
    alert("Please fill in all fields");
    return;
  }

  // 🔗 API / backend upload logic goes here
  console.log({
    title,
    subtitle,
    videoLink,
  });

  alert("Video uploaded successfully!");
  this.reset();
  
});
