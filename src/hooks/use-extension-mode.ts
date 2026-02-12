"use client";

import { useState, useEffect } from "react";

export function useExtensionMode(): boolean {
  const [isExtension, setIsExtension] = useState(false);

  useEffect(() => {
    setIsExtension(window.self !== window.top);
  }, []);

  return isExtension;
}
