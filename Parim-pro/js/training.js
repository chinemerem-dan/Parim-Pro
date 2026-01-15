const toggleBtn = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');


toggleBtn.addEventListener('click',()=>{
window.location.href= "/dashboard.html";
});

const uploadBtn = document.getElementById("uploadBtn");
const videoContainer = document.getElementById("videoContainer");

const MAX_PER_ROW = 4;

uploadBtn.addEventListener("click", () => {
  let lastRow = videoContainer.lastElementChild;

  if (lastRow.children.length >= MAX_PER_ROW) {
    const newRow = document.createElement("div");
    newRow.className = "flex gap-8 overflow-x-auto pb-4";
    videoContainer.appendChild(newRow);
    lastRow = newRow;
  }

  const videoCard = document.createElement("a");
  videoCard.href = "VIDEO_LINK";
  videoCard.className = "min-w-[260px]";
  videoCard.innerHTML = `
    <img src="VIDEO_THUMBNAIL_SRC"
         class="rounded-xl h-44 w-full object-cover">
    <h3 class="mt-3 font-semibold text-sm">
      New Uploaded Video
    </h3>
    <p class="text-xs text-gray-500">
      Optional description
    </p>
  `;

  lastRow.appendChild(videoCard);
});
