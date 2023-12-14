console.log("running content.js");
var selector = ".yt-core-image";
// Initial store opacity as 0 in local storage
localStorage.setItem("thumbnailOpacity", "0");

// Initial opacity set to 1 (fully visible)
document.querySelectorAll(selector).forEach((thumbnail) => {
  thumbnail.style.opacity = "0";
});

function updateThumbnailOpacity(Opacity) {
  document.querySelectorAll(selector).forEach((img) => {
    img.style.opacity = Opacity;
  });
}

// MutationObserver to handle dynamic content loading
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    updateThumbnailOpacity(localStorage.getItem("thumbnailOpacity"));
  });
});

// Start observing
observer.observe(document.body, { childList: true, subtree: true });

//Listen to changes from popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Message received from tab:", sender.tab.id);
  console.log("Message content:", request);
  if (request.action === "toggleOpacity") {
    updateThumbnailOpacity(request.opacity);
  }
});

