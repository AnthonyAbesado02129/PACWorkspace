# Troubleshooting: Extension Connection Issues

## Problem: "localhost refuses to connect" on Another Device

**Why this happens**: `localhost` or `127.0.0.1` only refers to the current device. When you install the extension on Device B, it can't connect to `localhost` on Device A.

## ✅ Solution 1: Run the App on the Same Device (Easiest)

**If you want to use the extension on Device B, run the app on Device B:**

1. **Transfer the entire project** to Device B (or clone from GitHub)
2. **On Device B**, open terminal in the project folder:
   ```bash
   npm install
   npm run dev
   ```
3. **In the extension Options**, set URL to: `http://localhost:3000` (or whatever port it shows)
4. The extension will now work!

**Advantages**: Simple, no network configuration needed

---

## ✅ Solution 2: Use Network IP Address (Both Devices Same Network)

**If the app is running on Device A, access it from Device B using Device A's IP:**

### Step 1: Find Device A's IP Address

**On Device A (where the app is running):**

**Windows:**
```powershell
ipconfig
```
Look for "IPv4 Address" under your active network adapter (usually starts with `192.168.x.x` or `10.x.x.x`)

**Mac/Linux:**
```bash
ifconfig
# or
ip addr
```

### Step 2: Make Sure App Accepts External Connections

**On Device A**, when running `npm run dev`, Next.js should show:
```
- Local:        http://localhost:3000
- Network:      http://192.168.1.100:3000  ← Use this!
```

If it only shows "Local", you may need to explicitly bind to `0.0.0.0`:

**Update `package.json` scripts:**
```json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0"
  }
}
```

Then restart: `npm run dev`

### Step 3: Configure Extension on Device B

1. **Open extension Options** (right-click extension icon → Options)
2. **Enter the Network IP** from Device A:
   ```
   http://192.168.1.100:3000
   ```
   (Replace with your actual IP address)
3. **Click Save**
4. **Open the side panel** - it should connect!

**Note**: Both devices must be on the same Wi-Fi/network.

---

## ✅ Solution 3: Deploy the App (Best for Production)

**Deploy your app to a public URL:**

### Option A: Vercel (Recommended - Free)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy (takes ~2 minutes)
5. Get your URL: `https://your-app.vercel.app`
6. **In extension Options**, use: `https://your-app.vercel.app`
7. Works from any device, anywhere!

### Option B: Other Hosting
- Netlify
- Railway
- Render
- Any Node.js hosting service

**Advantages**: 
- Works from any device
- No localhost issues
- Always accessible

---

## 🔍 Quick Diagnostic Steps

### Check 1: Is the app running?
- On Device A, open `http://localhost:3000` in a browser
- If it works there, the app is running correctly

### Check 2: Can Device B reach Device A?
- On Device B, open browser and try: `http://[Device-A-IP]:3000`
- If this works, the extension will work too
- If this fails, check firewall settings on Device A

### Check 3: Firewall Settings (Windows)

**On Device A**, allow Node.js through firewall:
1. Windows Security → Firewall & network protection
2. Allow an app through firewall
3. Find "Node.js" and enable both Private and Public
4. Or temporarily disable firewall to test

### Check 4: Extension Console Errors

1. Open extension side panel
2. Press `F12` to open DevTools
3. Check Console tab for errors
4. Common errors:
   - `ERR_CONNECTION_REFUSED` → App not running or wrong IP
   - `ERR_BLOCKED_BY_CLIENT` → Ad blocker interfering
   - `CORS error` → Check `next.config.ts` CSP settings

---

## 🎯 Recommended Setup

**For Development:**
- Run app locally on each device where you use the extension
- Use `http://localhost:3000` in extension Options

**For Production/Sharing:**
- Deploy to Vercel/Netlify
- Use deployed URL in extension Options
- Works everywhere!

---

## Still Having Issues?

1. **Check browser console** (F12) for specific error messages
2. **Verify the app URL** in extension Options is correct
3. **Try accessing the URL directly** in a browser first
4. **Check network connectivity** between devices
5. **Verify firewall settings** aren't blocking connections
