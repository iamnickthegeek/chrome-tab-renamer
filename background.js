chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "renameTab",
    title: "Rename this tab",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "renameTab") {
    chrome.tabs.sendMessage(tab.id, { action: "showRenameModal" }, (response) => {
      if (chrome.runtime.lastError) {
        // Content script not available on this page (e.g. chrome:// pages)
        console.log("Tab Renamer: cannot run on this page.");
      }
    });
  }
});