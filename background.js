    console.log("Running background");
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
            chrome.tabs.sendMessage(tabId, {
                action: "updateThumbnailOpacity",
                opacity: localStorage.getItem("thumbnailOpacity"),
            });
        }
    });