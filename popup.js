document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const stored = await chrome.storage.local.get(tab.url);
  if (stored[tab.url]) {
    document.getElementById('tabName').value = stored[tab.url];
  }

  document.getElementById('renameBtn').addEventListener('click', async () => {
    const newName = document.getElementById('tabName').value.trim();
    if (!newName) return;
    await chrome.storage.local.set({ [tab.url]: newName });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (name) => { document.title = name; },
      args: [newName]
    });
    document.getElementById('status').textContent = 'Renamed!';
    setTimeout(() => window.close(), 800);
  });

  document.getElementById('resetBtn').addEventListener('click', async () => {
    await chrome.storage.local.remove(tab.url);
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => { location.reload(); }
    });
    window.close();
  });
});