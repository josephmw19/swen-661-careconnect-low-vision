# CareConnect Desktop (Week 7)

Electron + React scaffold for **SWEN 661 Assignment 7 (Week 7)**.  
Desktop-first UI aligned to the team’s **low vision** accessibility constraint.

## Overview
This folder contains the **Track B (Early Electron Implementation)** deliverable.  
**Track A (Figma screenshots, keyboard shortcut table 8+, accessibility explanation, and Electron screenshots)** are submitted in the required **MS Word document**.

## What this includes (Track B requirements)
- Electron project setup: **main + preload + renderer**
- **Primary screen implemented:** Dashboard (desktop-first layout)
- Native macOS menu bar: **File / Edit / View / Navigate / Help** (minimum 3 menus met)
- Keyboard shortcuts connected to menu items (see list below)
- One working IPC communication (main ↔ renderer)
- Navigation between at least 2 screens (Dashboard ↔ Medications, plus Settings)

## Proof steps (grader quick check)
Run the app, then in the Electron window:
1) **File → Open Settings** → lands on Settings screen  
2) **Help → About CareConnect** → native dialog appears  
3) Press **Cmd+Shift+C** → Critical Medical Information card collapses/expands

## Accessibility (low vision focus)
- Keyboard-first navigation supported (Tab / Shift+Tab)
- Skip-to-main-content link
- Visible focus indicators using `:focus-visible`
- Accessible labels + ARIA states for interactive controls
- High contrast styling (desktop-first, not stretched mobile)

## Tech
- Electron
- React (Vite)
- TypeScript

## Project structure
- `electron/main.ts` = Electron main process (window + native menus)
- `electron/preload.ts` = contextBridge API (`window.careconnect`)
- `src/` = renderer (React UI)

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
- Desktop design: https://www.figma.com/design/29RF7XlEZUf7x5WbgsiZJ7/CareConnect-LV---Desktop-Design-System?node-id=0-1&t=5VxiGeWk3ZNtcHma-1

## Notes for Week 8
Week 8 expands this scaffold to implement full features, testing, coverage, window state persistence, and packaging.

## AI usage statement
- Used AI: “We used AI tools to assist with design and/or implementation. We reviewed and understood all generated outputs.”
