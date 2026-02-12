# PAC Workspace – Browser extension (sidebar)

This folder is a **Chrome/Edge extension** that opens PAC Workspace in the browser’s **side panel**, so you can use the app as a sidebar while browsing.

## How it works

- The extension adds a **side panel** that loads your PAC Workspace app in an iframe.
- You choose the app URL in **Options** (e.g. `http://localhost:3000` for dev or your deployed URL).
- Clicking the extension icon in the toolbar opens the side panel.

## Prerequisites

1. **Run or deploy the PAC Workspace app**
   - **Local:** From the project root run `npm run dev` and use `http://localhost:3000`.
   - **Deployed:** Deploy the Next.js app (e.g. [Vercel](https://vercel.com)) and use that URL (e.g. `https://pac-workspace.vercel.app`).

2. **Allow the app to be embedded (if deployed)**  
   If your host sets `X-Frame-Options` or a strict `frame-ancestors` CSP, the sidebar may be blocked. On Vercel you can add in `next.config.ts`:

   ```ts
   async headers() {
     return [{ source: "/:path*", headers: [{ key: "X-Frame-Options", value: "ALLOWALL" }] }];
   }
   ```

   (Use a more restrictive value in production if you only want the extension origin to embed the app.)

## Load the extension (Chrome / Edge)

1. Open **Extensions**:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select the **`extension`** folder inside this project (the folder that contains `manifest.json`).

The extension should appear in the toolbar. Click its icon to open the side panel.

## Set the app URL

1. Right‑click the extension icon in the toolbar.
2. Choose **Options** (or open the extension’s options from the Extensions page).
3. Enter your app URL, e.g.:
   - `http://localhost:3000` (when running `npm run dev`)
   - `https://your-app.vercel.app` (your deployed URL)
4. Click **Save**, then open the side panel again.

## Optional: Add an icon

To give the extension a custom icon:

1. Create an `icons` folder inside `extension`.
2. Add PNGs: `icon16.png`, `icon32.png`, `icon48.png` (and optionally `icon128.png`).
3. In `manifest.json`, add back under `action`:

   ```json
   "default_icon": {
     "16": "icons/icon16.png",
     "32": "icons/icon32.png",
     "48": "icons/icon48.png"
   }
   ```

## Publish to the Chrome Web Store (optional)

1. Zip the contents of the `extension` folder (not the folder itself).
2. Go to [Chrome Developer Dashboard](https://developer.chrome.com/docs/webstore/publish).
3. Create a new item and upload the zip.
4. Fill in store listing, privacy, and compliance details, then submit for review.

(Edge supports the same format; you can also publish to the Microsoft Add-ons store.)

## Files in this folder

| File            | Purpose |
|-----------------|--------|
| `manifest.json` | Extension manifest (v3); declares side panel and options. |
| `sidepanel.html` / `sidepanel.js` | Side panel UI; loads your app URL in an iframe. |
| `background.js` | Service worker; opens side panel when the action icon is clicked. |
| `options.html` / `options.js` | Options page to set and save the app URL. |
| `README.md`     | This file. |
