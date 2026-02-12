# PAC Workspace – Persona Agent Copilot

AI-powered browser sidebar app for drafting responses, extracting entities, detecting intents, summarizing conversations, and translating — with policy compliance and per-vertical intent support.

## Tech stack

- **Next.js** (App Router)
- **React** + **Tailwind CSS**
- **InstantDB**

## Getting started

```bash
cd pacworkspace
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’ll see the **Sign In** page. Sign-in uses **InstantDB magic code (OTP)** sent to the test email; all test accounts use that same email for verification.

### Using as a browser sidebar (Chrome / Edge extension)

A **browser extension** in the `extension/` folder opens PAC Workspace in the browser’s **side panel**:

1. Deploy the app (e.g. Vercel) or run it locally (`npm run dev`).
2. In Chrome or Edge, go to `chrome://extensions` (or `edge://extensions`), enable **Developer mode**, and click **Load unpacked**.
3. Select the project’s **`extension`** folder.
4. Right‑click the extension icon → **Options**, set the app URL (e.g. `http://localhost:3000` or your deployed URL), and save.
5. Click the extension icon to open the side panel.

See **`extension/README.md`** for details and optional icon/publish steps.

## Environment variables

Copy `.env.example` to `.env.local` and optionally set:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_INSTANT_APP_ID` | InstantDB App ID (default set in code). |
| `OPENAI_API_KEY` | OpenAI API key for real AI in Compose, Intents, Summarize, Translate, Entities. If unset, API routes return mock responses. |

## Modules

- **Compose** – Draft AI responses with industry, persona, tone, mood, policy-safe and quality-check options.
- **Entities** – Extract and mask sensitive fields (names, orgs, addresses, contact info, etc.) from transcripts.
- **Intents** – Analyze customer messages for intent and category (per-vertical).
- **Summarize** – Generate 3-bullet case notes from conversation transcripts.
- **Translate** – Translate text for multilingual support.
- **Reports** – Analytics placeholders (KPIs, intent distribution, vertical performance, audit log). Connect InstantDB or your API to populate.
- **Admin Studio** – Policy manager, intent taxonomy, entity patterns (UI ready; connect InstantDB for persistence). **Access is restricted to Admin role only**; Supervisors and Agents do not see the Admin Studio link and are redirected if they open `/admin`.

## InstantDB

The app uses InstantDB with the provided App ID for **auth (magic code OTP)** and optional data.

- **Auth:** Sign-in uses `db.auth.sendMagicCode({ email })` and `db.auth.signInWithMagicCode({ email, code })`. For testing, all test accounts use the same OTP recipient email (see `OTP_TEST_EMAIL` in `src/lib/auth.ts`); configure Magic Code Email in [InstantDB Dashboard → Auth](https://instantdb.com/dash) if needed.
- **Data:** To persist audit logs, policies, and intents, define your schema in the [InstantDB dashboard](https://instantdb.com/dash) (or use `npx instant-cli init` and push), then use `db.useQuery()` and `db.transact()` in client components (see `src/lib/db.ts`).

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint
