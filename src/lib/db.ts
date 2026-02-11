"use client";

import { init } from "@instantdb/react";

const APP_ID = "6f0f99b1-ab65-4af0-864c-61eeca19a008";

export const db = init({ appId: APP_ID });
