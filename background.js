// Background script
let lastIntentionTime = 0;
const MIN_INTERVAL = 5000; // Minimum interval between intention prompts (in milliseconds)

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('web.whatsapp.com')) {
    if (Date.now() - lastIntentionTime > MIN_INTERVAL) {
      chrome.tabs.sendMessage(tabId, { action: 'showIntentionPrompt' });
      lastIntentionTime = Date.now();
    } else {
      chrome.tabs.sendMessage(tabId, { action: 'allowUsage' });
    }
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && tab.url.includes('web.whatsapp.com')) {
      if (Date.now() - lastIntentionTime > MIN_INTERVAL) {
        chrome.tabs.sendMessage(activeInfo.tabId, { action: 'showIntentionPrompt' });
        lastIntentionTime = Date.now();
      } else {
        chrome.tabs.sendMessage(activeInfo.tabId, { action: 'allowUsage' });
      }
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'closeTab') {
    chrome.tabs.remove(sender.tab.id);
  }
});