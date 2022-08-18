// importScripts('faviconupdate.js');
// Define all the AWS services here

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ['faviconupdate.js'],
      });
  }
});
