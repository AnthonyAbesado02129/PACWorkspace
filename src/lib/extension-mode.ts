"use client";

/**
 * True when the app is embedded (e.g. in the browser extension side panel iframe).
 * Use this to adapt layout: hide left nav, single-column content, etc.
 */
export function isExtensionMode(): boolean {
  if (typeof window === "undefined") return false;
  return window.self !== window.top;
}
