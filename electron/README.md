# CareConnect Desktop (Assignment 8)

Electron + React desktop application for **SWEN 661 Assignment 8 — Desktop Implementation & Testing**.  
The application is designed with a **low-vision accessibility constraint** and emphasizes keyboard-first interaction.

---

# Overview

This project implements the **CareConnect desktop application** using **Electron + React**.  
The application demonstrates desktop UI patterns, keyboard accessibility, native application menus, and automated testing.

Assignment 8 expands on the early implementation completed in **Week 7** by adding:

- Full desktop UI implementation
- Keyboard navigation support
- Automated testing
- Test coverage reporting
- Desktop application packaging

The application supports **keyboard-first interaction** and accessibility features designed for users with **low vision**.

---

# Implementation Requirements (Completed)

The following desktop implementation requirements were completed:

- Electron desktop application using **Electron + React**
- Native desktop **application menus**
- **Keyboard shortcuts** connected to menu actions
- Desktop UI patterns including sidebar navigation and toolbar layout
- IPC communication between the **main process and renderer**

The application includes multiple working screens including:

- Landing Page
- Role Selection
- Login
- Dashboard
- Medications
- Tasks
- Appointments
- Settings

---

# Native Application Menus

The application implements a **native macOS menu bar** created in the Electron **main process**.

Menus included:

- **File**
- **Edit**
- **View**
- **Navigate**
- **Help**

Menu items are connected to application behavior and renderer navigation using **Electron IPC communication**.

---

# Keyboard Shortcuts

The following keyboard shortcuts are implemented to support **keyboard-first interaction**.

| Shortcut | Action |
|--------|--------|
| Cmd/Ctrl + 1 | Navigate to Dashboard |
| Cmd/Ctrl + 2 | Navigate to Medications |
| Cmd/Ctrl + , | Open Settings |
| Cmd/Ctrl + R | Refresh (demo) |
| Cmd/Ctrl + Shift + C | Toggle Critical Medical Information |
| Cmd/Ctrl + Shift + R | Toggle Read Aloud |
| Cmd/Ctrl + Shift + V | Toggle Voice Commands |
| Cmd/Ctrl + L | Focus Sidebar |
| Cmd/Ctrl + K | Skip to Main Content |
| Cmd/Ctrl + Alt + S | Trigger SOS (demo) |

---

# Accessibility (Low Vision Focus)

Accessibility features were implemented to support **low-vision users** and follow WCAG accessibility guidance.

Key accessibility features include:

- Keyboard-first navigation (Tab / Shift + Tab)
- Skip-to-main-content shortcut
- Visible focus indicators using `:focus-visible`
- High contrast text and UI elements
- Large, readable typography
- Accessible labels and ARIA attributes for interactive controls

---

# Testing

Automated tests were implemented using:

- **Jest**
- **React Testing Library**

Tests verify:

- Page rendering
- Component behavior
- Navigation between screens
- UI interactions
- Electron preload functionality

The project currently includes:

- **20 test suites**
- **115 passing tests**

Run tests with coverage:

```bash
npm test -- --coverage --no-cache
```

---

# Test Coverage

The application exceeds the assignment requirement of **60% minimum coverage**.

| Metric | Coverage |
|------|------|
| Statements | **85.71%** |
| Branches | **82.59%** |
| Functions | **74.27%** |
| Lines | **88.46%** |

---

# Project Structure

```
electron/
├── main.ts        # Electron main process (menus + window)
├── preload.ts     # contextBridge API (secure IPC)

src/
├── ui/
│   ├── components/    # reusable UI components
│   ├── pages/         # application screens
│   ├── _tests_/       # Jest + React Testing Library tests
│   └── App.tsx
└── main.tsx
```

---

# Run (Development)

Install dependencies:

```bash
npm install
```

Run the Electron application:

```bash
npm run dev
```

---

# Run Tests

Execute the test suite with coverage reporting:

```bash
npm test -- --coverage
```

---

# Build / Package

The application can be packaged for distribution using Electron build tools.

Example build command:

```bash
npm run build
```

This produces a packaged desktop application for the target platform (macOS in this case).

---

# Repository

GitHub Repository:

https://github.com/josephmw19/swen-661-careconnect-low-vision

The repository includes:

- Electron source code
- React renderer
- Jest test suite
- Test coverage report
- Setup instructions

---

# AI Usage Statement

AI tools were used to assist with aspects of design and implementation.  
All generated output was reviewed, understood, and modified as necessary to meet assignment requirements.
