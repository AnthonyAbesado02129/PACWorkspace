(function () {
  const DEFAULT_APP_URL = "http://localhost:3000";
  const STORAGE_KEY = "pacWorkspaceAppUrl";

  const iframe = document.getElementById("app-frame");
  const loading = document.getElementById("loading");

  chrome.storage.local.get([STORAGE_KEY], function (result) {
    const appUrl = (result[STORAGE_KEY] || DEFAULT_APP_URL).replace(/\/$/, "");
    iframe.src = appUrl;
    iframe.onload = function () {
      loading.style.display = "none";
      iframe.style.display = "block";
    };
    iframe.onerror = function () {
      loading.innerHTML =
        'Could not load PAC Workspace.<br/><br/>' +
        'Set your app URL in extension Options (right‑click the extension icon).<br/><br/>' +
        'Use <strong>http://localhost:3000</strong> when running <code>npm run dev</code>, ' +
        'or your deployed URL (e.g. Vercel).';
    };
  });
})();
