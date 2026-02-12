const STORAGE_KEY = "pacWorkspaceAppUrl";
const form = document.getElementById("options-form");
const input = document.getElementById("app-url");
const savedMsg = document.getElementById("saved-msg");

chrome.storage.local.get([STORAGE_KEY], function (result) {
  if (result[STORAGE_KEY]) input.value = result[STORAGE_KEY];
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const url = (input.value || "").trim().replace(/\/$/, "");
  if (!url) return;
  chrome.storage.local.set({ [STORAGE_KEY]: url }, function () {
    savedMsg.style.display = "block";
    setTimeout(function () { savedMsg.style.display = "none"; }, 3000);
  });
});
