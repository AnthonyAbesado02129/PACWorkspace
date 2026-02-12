# How to Transfer PAC Workspace Extension to Another Device

## Step 1: Package the Extension

### Option A: Using Windows File Explorer (Easiest)

1. Navigate to the `extension` folder:
   ```
   c:\Users\Anthony\Desktop\Sample Projects\pacworkspace\extension
   ```

2. **Select all files** inside the `extension` folder:
   - `manifest.json`
   - `background.js`
   - `sidepanel.html`
   - `sidepanel.js`
   - `options.html`
   - `options.js`
   - `README.md`
   - Any other files (but NOT the `extension` folder itself)

3. **Right-click** → **Send to** → **Compressed (zipped) folder**
   - Or select all files, right-click, and choose "Compress to ZIP file"

4. Name it `pac-workspace-extension.zip` (or any name you prefer)

### Option B: Using PowerShell/Command Line

Open PowerShell in the project root and run:

```powershell
Compress-Archive -Path "extension\*" -DestinationPath "pac-workspace-extension.zip" -Force
```

This creates `pac-workspace-extension.zip` in the project root.

## Step 2: Transfer the ZIP File

Choose one of these methods:

### Method 1: USB Drive / External Storage
1. Copy `pac-workspace-extension.zip` to a USB drive
2. Transfer to the other device
3. Extract the ZIP file on the other device

### Method 2: Cloud Storage (Google Drive, OneDrive, Dropbox)
1. Upload `pac-workspace-extension.zip` to your cloud storage
2. Download it on the other device
3. Extract the ZIP file

### Method 3: Email
1. Attach `pac-workspace-extension.zip` to an email
2. Send it to yourself or the other device
3. Download and extract on the other device

### Method 4: Network Share / File Sharing
- Copy the ZIP to a shared network drive
- Or use file sharing apps (AirDrop on Mac, Nearby Share on Windows/Android)

## Step 3: Install on the Other Device

### On the Other Device:

1. **Extract the ZIP file** to get the extension files
   - Extract to a folder like `pac-workspace-extension` (or any name)

2. **Open Chrome/Edge Extensions**:
   - Chrome: Type `chrome://extensions` in the address bar
   - Edge: Type `edge://extensions` in the address bar

3. **Enable Developer Mode**:
   - Toggle the switch in the top-right corner

4. **Load the Extension**:
   - Click **"Load unpacked"** button
   - Navigate to and select the **extracted folder** (the one containing `manifest.json`)
   - Click **Select Folder**

5. **Configure the App URL**:
   - Right-click the extension icon in the toolbar → **Options**
   - Enter your app URL:
     - **Local dev**: `http://localhost:3000` (if running `npm run dev` on that device)
     - **Deployed**: `https://your-app.vercel.app` (your deployed URL)
   - Click **Save**

6. **Test**:
   - Click the extension icon in the toolbar
   - The side panel should open with your PAC Workspace app

## Important Notes

### ⚠️ App URL Configuration

- **If running locally**: The app must be running on the other device (or accessible on the same network)
- **If using a deployed URL**: Make sure the deployed app allows embedding (check `next.config.ts` for CSP settings)
- The extension will work with any URL you configure in Options

### 🔒 Security

- The extension only works with URLs you configure
- It doesn't require special permissions beyond side panel and storage
- Safe to share with others

### 📦 File Size

The extension folder is very small (usually < 50 KB), so it's easy to transfer via any method.

## Troubleshooting

**Extension doesn't load:**
- Make sure you selected the folder containing `manifest.json`, not a parent folder
- Check that all files were included in the ZIP

**Side panel shows blank/error:**
- Verify the app URL in Options is correct
- Make sure the app is running (if using localhost)
- Check browser console for errors (F12 → Console)

**App URL not saving:**
- Make sure you clicked "Save" in Options
- Try reloading the extension (Extensions page → reload icon)
