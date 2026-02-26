// Apply any saved name on page load
chrome.storage.local.get(window.location.href, (result) => {
  const savedName = result[window.location.href];
  if (savedName) {
    applyTitle(savedName);
  }
});

function applyTitle(name) {
  document.title = name;
  const observer = new MutationObserver(() => {
    if (document.title !== name) document.title = name;
  });
  observer.observe(
    document.querySelector('title') || document.head,
    { childList: true, subtree: true, characterData: true }
  );
}

// Listen for right-click trigger from background.js
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "showRenameModal") showModal();
});

function showModal() {
  // Don't stack modals
  if (document.getElementById('tab-renamer-modal')) return;

  const overlay = document.createElement('div');
  overlay.id = 'tab-renamer-modal';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.4); z-index: 2147483647;
    display: flex; align-items: center; justify-content: center;
    font-family: Arial, sans-serif;
  `;

  const box = document.createElement('div');
  box.style.cssText = `
    background: white; padding: 20px; border-radius: 8px;
    width: 300px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;

  chrome.storage.local.get(window.location.href, (result) => {
    const current = result[window.location.href] || '';
    box.innerHTML = `
      <div style="font-weight:bold; margin-bottom:12px;">Rename This Tab</div>
      <input id="trInput" type="text" value="${current}" placeholder="Enter tab name..."
        style="width:100%; box-sizing:border-box; padding:7px; border:1px solid #ccc;
               border-radius:4px; margin-bottom:12px; font-size:14px;" />
      <div style="display:flex; gap:8px; justify-content:flex-end;">
        <button id="trReset" style="padding:7px 14px; border:none; border-radius:4px;
          background:#e0e0e0; cursor:pointer;">Reset</button>
        <button id="trCancel" style="padding:7px 14px; border:none; border-radius:4px;
          background:#e0e0e0; cursor:pointer;">Cancel</button>
        <button id="trSave" style="padding:7px 14px; border:none; border-radius:4px;
          background:#1a73e8; color:white; cursor:pointer;">Save</button>
      </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const input = document.getElementById('trInput');
    input.focus();
    input.select();

    document.getElementById('trSave').addEventListener('click', () => {
      const name = input.value.trim();
      if (name) {
        chrome.storage.local.set({ [window.location.href]: name });
        applyTitle(name);
      }
      overlay.remove();
    });

    document.getElementById('trReset').addEventListener('click', () => {
      chrome.storage.local.remove(window.location.href);
      overlay.remove();
      location.reload();
    });

    document.getElementById('trCancel').addEventListener('click', () => overlay.remove());

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    // Save on Enter
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('trSave').click();
      if (e.key === 'Escape') overlay.remove();
    });
  });
}