# ProjectFlow — Website Overview

ProjectFlow is a calm productivity demo site: sign in, manage projects, and continue where your ideas left off. It also hosts the **Sapius** embed so product tours and onboarding can run against a realistic multi-page app.

**Tagline:** Think clearly. Decide wisely.

---

## Purpose

| Role | Description |
|------|-------------|
| Product surface | Marketing home, auth, workspace dashboard, and pricing |
| Demo host | Realistic SPA with `data-demo-id` hooks for Sapius walks |
| Auth bridge | Cookie-based session that switches the widget between anonymous **demo** and signed-in **onboarding** modes |

---

## Site map

| Route | Page | Access |
|-------|------|--------|
| `/` | Home — brand + auth, or signed-in welcome | Public |
| `/pricing` | Three plans with trial CTAs | Public |
| `/workspace` | Project dashboard | Auth required for full access |

Navigation: **Home · Pricing · Workspace**, plus brand link to home. Unknown paths fall back to home.

---

## User flows

### Anonymous visitor

1. Lands on home with the ProjectFlow brand pane and Sign in / Sign up form.
2. Can browse **Pricing** and open **Workspace** (sees a sign-in gate).
3. Sapius widget loads in **demo** mode (no user email).

### Sign up / Sign in

1. Toggle between **Sign in** (“Welcome back”) and **Sign up** (“Create your account”).
2. Validation: valid email; password at least 6 characters; sign-up requires name and matching password confirmation.
3. On success, session cookies are set and the page **reloads** so the Sapius widget boots in **onboarding** mode with the user’s email.
4. Auth is client-only (no backend). Name and email are stored in cookies; the password is not persisted.

### Signed-in experience

1. **Home** — “Welcome back, {name}” with CTAs to open the workspace or view pricing; copy invites asking the assistant for a walkthrough.
2. **Workspace** — create projects, view stats, browse recent projects.
3. **Pricing** — “Start trial” sends the user to the workspace (no billing).
4. **Sign out** — clears session and Sapius storage, then reloads so the widget returns to **demo** mode.

---

## Capabilities

### Authentication

- Sign in and sign up with email and password
- Show / hide password
- Session via cookies (`thisisjustarandomstring` access token, `sapius_demo_user` for name/email)
- Sign out with full session and widget state cleanup

### Workspace

- Welcome header personalized by name
- **Create project** — inline form; new projects start as Active with 0 tasks
- **Stats** — active projects, open tasks (sum of task counts), team size (demo value: 8)
- **Recent projects** — seeded list (Website Redesign, Mobile App v2, API Integration) with status and task counts

### Pricing

| Plan | Price | For | Includes |
|------|-------|-----|----------|
| **Starter** | $29/mo | Solo operators testing the waters | 1 workspace, Basic demos, Email support |
| **Growth** | $79/mo | Teams running live product tours | Unlimited demos, Onboarding walks, Priority chat |
| **Scale** | $149/mo | Orgs with multiple product surfaces | Custom playbooks, SSO-ready, Dedicated success |

- Anonymous CTA: **Sign in to start** → home
- Signed-in CTA: **Start trial** → workspace
- Growth is the featured plan

### Sapius assistant integration

- Widget script loaded from the Sapius origin (`localhost:8080` in local demo)
- **Demo mode** when signed out — anonymous product tour
- **Onboarding mode** when signed in — walkthrough tied to the user’s email (cookie / JSON path / explicit email attributes)
- UI elements marked with `data-demo-id` so tours can target nav, auth CTAs, workspace actions, stats, project rows, and pricing cards

---

## Flow diagram

```text
                    ┌─────────────┐
                    │    Home     │
                    │  (brand +   │
                    │   auth)     │
                    └──────┬──────┘
           anonymous│      │signed in
                    │      │
         ┌──────────┘      └──────────┐
         ▼                            ▼
  ┌─────────────┐              ┌─────────────┐
  │   Pricing   │◄────────────►│  Workspace  │
  │  (browse /  │   CTAs        │ (dashboard │
  │ sign-in CTA)│              │  or gate)   │
  └─────────────┘              └─────────────┘

  Auth success → reload → widget: onboarding
  Sign out     → reload → widget: demo
```

---

## Tech notes

- **Stack:** React 19, Vite 6, custom History API router (not React Router)
- **Styling:** Global CSS tokens; Instrument Serif + Sora
- **Run:** `npm install` then `npm run dev` (typically `http://localhost:5173`)
- **External:** Sapius widget + Google Fonts

For local setup commands, see [README.md](./README.md).
