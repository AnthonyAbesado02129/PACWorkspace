# Alternative Transfer Methods (Email Blocked)

Since email providers often block ZIP files, here are better ways to transfer the extension:

## ✅ Method 1: Cloud Storage (Easiest & Fastest)

### Google Drive / OneDrive / Dropbox

1. **Upload the ZIP**:
   - Go to Google Drive (drive.google.com) or OneDrive (onedrive.live.com)
   - Click "New" → "File upload"
   - Select `pac-workspace-extension.zip`
   - Wait for upload to complete

2. **Share or Download**:
   - **Option A**: Right-click the file → "Get link" → Share link with yourself
   - **Option B**: Download directly on the other device from your cloud storage

3. **On the other device**:
   - Download the ZIP from your cloud storage
   - Extract and install as usual

**Advantages**: Fast, reliable, no size limits, accessible from anywhere

---

## ✅ Method 2: USB Drive / External Storage

1. Copy `pac-workspace-extension.zip` to a USB drive
2. Plug USB into the other device
3. Copy the ZIP file to the other device
4. Extract and install

**Advantages**: No internet needed, very secure, instant transfer

---

## ✅ Method 3: Direct File Sharing Services

### WeTransfer (wetransfer.com)
1. Go to wetransfer.com
2. Upload `pac-workspace-extension.zip`
3. Enter your email (or the other device's email)
4. Get download link (valid for 7 days)
5. Download on the other device

### SendAnywhere (sendanywhere.com)
- Similar process, creates a 6-digit code for direct transfer

**Advantages**: No account needed, large file support

---

## ✅ Method 4: GitHub (If You Have Access)

1. Create a new repository (private or public)
2. Upload the ZIP file
3. Download on the other device

**Advantages**: Version control, permanent storage

---

## ✅ Method 5: Rename the File Extension

Some email providers allow `.zip` but block `.exe`. Try renaming:

```powershell
Rename-Item "pac-workspace-extension.zip" "pac-workspace-extension.txt"
```

Then on the other device, rename it back to `.zip` before extracting.

**Note**: This may not work if your email provider scans file contents.

---

## ✅ Method 6: Copy Files Directly (Same Network)

If both devices are on the same Wi-Fi network:

1. **Share the extension folder**:
   - Right-click the `extension` folder → Properties → Sharing → Share
   - Give yourself read access

2. **On the other device**:
   - Open File Explorer → Network
   - Find your computer
   - Copy the `extension` folder
   - Use it directly (no ZIP needed)

**Advantages**: No ZIP needed, direct access

---

## 🎯 Recommended: Google Drive or OneDrive

**Fastest and most reliable method**:
1. Upload ZIP to Google Drive/OneDrive (takes seconds)
2. Download on other device (takes seconds)
3. Extract and install

The extension is tiny (~50 KB), so upload/download is instant.

---

## Quick PowerShell Upload Script (Google Drive)

If you have Google Drive desktop app installed:

```powershell
Copy-Item "pac-workspace-extension.zip" "$env:USERPROFILE\Google Drive\" -Force
```

Then sync will upload it automatically to Google Drive cloud.
