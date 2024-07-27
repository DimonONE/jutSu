chrome.runtime.onInstalled.addListener(function() {
  console.log("Розширення встановлено!");
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.sendMessage(tabId, {action: "runScript"});
  }
})
