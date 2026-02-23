# CareConnect Desktop (Week 7)

Electron + React scaffold for **SWEN 661 Assignment 7 (Week 7)**.  
Implements a desktop-first UI aligned to the team's **low vision** accessibility constraint.

## What this includes (Assignment 7 requirements)
- Electron project setup: **main + preload + renderer**
- Native application menu bar (File/Edit/View/Navigate/Help), with keyboard shortcuts
- Navigation between **2 screens** (Dashboard and Medications), plus Settings stub
- One working communication between main and renderer (IPC):
  - Renderer calls a native dialog via `cc:showNativeDialog`
  - Native menu items send commands to renderer (`cc:command`) and navigate (`cc:navigate`)
- Keyboard-first accessibility basics:
  - Skip-to-main-content link
  - Visible focus indicators (`:focus-visible`)
  - Accessible labels and ARIA states on interactive controls

## Tech
- Electron
- React (Vite)
- TypeScript

## Run (development)
```bash
npm install
npm run dev
```

## Build (optional)
```bash
npm run build
```

## Keyboard shortcuts (implemented)
- Cmd/Ctrl + 1: Home (Dashboard)
- Cmd/Ctrl + 2: Medications
- Cmd/Ctrl + , : Open Settings
- Cmd/Ctrl + R: Refresh (demo)
- Cmd/Ctrl + Shift + C: Toggle Critical Medical Information
- Cmd/Ctrl + Shift + R: Toggle Read Aloud
- Cmd/Ctrl + Shift + V: Toggle Voice Commands
- Cmd/Ctrl + L: Focus Sidebar
- Cmd/Ctrl + K: Skip to Main Content
- Cmd/Ctrl + Alt + S: Trigger SOS (demo)

## Figma link
Add your Figma share link here:
- Desktop design: <PASTE_FIGMA_LINK>

## Notes for Week 8
Week 8 expands this scaffold to implement full features, testing, coverage, window state persistence, and packaging.

## AI usage statement
Replace one line below in your submission document:
- Used AI: “We used AI tools to assist with design and/or implementation. We reviewed and understood all generated outputs.”
- No AI: “No AI tools were used.”
