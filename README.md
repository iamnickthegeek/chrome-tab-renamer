# Chrome Tab Renamer

A minimal Chrome extension that lets you rename any browser tab to something actually useful. Right-click any page, type a name, done. It sticks across refreshes.

Built out of frustration with apps like Buffer, where you can have four identical-looking tabs open simultaneously with no way to tell them apart.

---

## Why it exists

Some web apps give every tab the same title regardless of what you're doing in them. Buffer's social scheduling tool is a good example: open it for LinkedIn, open it for Twitter/X, and both tabs say "Buffer". There's no way to tell them apart, especially when you have enough tabs open that the titles shrink out of sight.

This extension fixes that. You rename them yourself, once, and it remembers.

---

## Installation

Install this extension directly from the source files - not from the Chrome Store.

1. Download or clone this repository to your computer
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer Mode** using the toggle in the top-right corner
4. Click **Load unpacked**
5. Select the folder containing the extension files

The extension is now active. No restart needed.

---

## Usage

1. Navigate to any tab you want to rename & refresh the page in the browser (normally F5)
2. Right-click anywhere on the page
3. Select **"Rename this tab"** from the context menu
4. Type your preferred name in the modal that appears
5. Press **Enter** or click **Save**

The tab title updates immediately and will be restored automatically every time that URL is loaded.

To revert to the original title, right-click and open the rename modal again, then click **Reset**.

---

## How it works

Names are stored in `chrome.storage.local`, which is a sandboxed key-value store private to the extension. The key is the full page URL, the value is whatever name you saved.

Every time a page loads, the extension checks if the current URL has a saved name. If it does, it applies it immediately and watches for the page trying to overwrite it (some apps update the title dynamically), keeping your custom name in place.

Nothing is sent anywhere. No analytics, no external requests, no accounts. Everything stays in your browser.

---

## Limitations

URL matching is exact. If a URL contains query parameters (e.g. `?ref=123`) it's treated as a different page from the clean URL. Renamed names won't carry across to it automatically.

The extension can't run on Chrome's internal pages (`chrome://` URLs) or the new tab page. Right-clicking there won't show the menu option.

If an app loads different content at the same URL dynamically without changing the address bar, the extension can't distinguish between the two states.

---

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration and permissions |
| `background.js` | Registers the right-click context menu item |
| `content.js` | Applies saved names on page load, handles the rename modal |
| `popup.html` / `popup.js` | Toolbar icon popup (secondary access method) |
| `icon.png` | Toolbar icon |

---

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>
