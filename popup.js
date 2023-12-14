
var toggleSwitch = document.getElementById("toggleSwitch");

toggleSwitch.addEventListener("change", function () {
  console.log("Change detected");

  // Send message to content script
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("Active tab ID:", tabs[0].id);
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "toggleOpacity",
      opacity: toggleSwitch.checked ? "0" : "1",
    });
  });
});
