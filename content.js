// Content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showIntentionPrompt') {
      const container = document.createElement('div');
      container.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); z-index: 9999; display: flex; justify-content: center; align-items: center;">
          <div style="background-color: #1f1f1f; color: #fff; padding: 30px; border-radius: 10px; text-align: center; z-index: 10000; width: 400px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="font-size: 24px; margin-bottom: 20px;">What is your intention for using WhatsApp Web?</h2>
            <button id="noIntentionBtn" style="background-color: #e53935; color: #fff; border: none; padding: 10px 20px; margin: 10px; border-radius: 5px; font-size: 16px; cursor: pointer; z-index: 10001;">No Intention</button>
            <button id="recordIntentionBtn" style="background-color: #43a047; color: #fff; border: none; padding: 10px 20px; margin: 10px; border-radius: 5px; font-size: 16px; cursor: pointer; z-index: 10001;">Record My Intention</button>
          </div>
        </div>
      `;
      document.body.appendChild(container);
  
      const noIntentionBtn = document.getElementById('noIntentionBtn');
      const recordIntentionBtn = document.getElementById('recordIntentionBtn');
  
      noIntentionBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'closeTab' });
      });
  
      recordIntentionBtn.addEventListener('click', () => {
        const intention = prompt('Please enter your intention:');
  
        if (intention !== null && intention.trim() !== '') {
          console.log('Intention recorded:', intention);
          container.remove();
        } else {
          alert('Intention cannot be empty. Please try again.');
        }
      });
    }
  });