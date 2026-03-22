# CareConnect Low Vision Application (SWEN 661 – Week 11 Final)

A responsive healthcare application designed with **low-vision accessibility**, built using **React, Vite, and Electron**.  
This project demonstrates full implementation, accessibility compliance, automated testing, and deployment.

---

# Overview

CareConnect is a **low-vision accessible healthcare interface** that supports:

- Medication tracking
- Task management
- Appointment scheduling
- User authentication workflows

The application emphasizes:

- **Keyboard-first interaction**
- **Accessible UI design**
- **Responsive layouts**
- **Automated testing and validation**

This submission represents the **final implementation (Week 11)**, expanding earlier milestones with:

- Full responsive web application
- Accessibility enhancements
- Unit, component, and E2E testing
- Test coverage reporting
- Production deployment (Vercel)

---

# Technology Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Desktop Layer:** Electron
- **Routing:** React Router
- **Unit Testing:** Jest
- **Component Testing:** React Testing Library
- **E2E Testing:** Playwright
- **Deployment:** Vercel

---

# Features

## Navigation & Routing
- Multi-page navigation using React Router
- Sidebar-based navigation system
- Keyboard shortcuts for rapid navigation

## Core Modules
- Dashboard
- Medications
- Tasks
- Appointments
- Settings
- Authentication (Login, Create Account, Reset Password)

## Desktop Integration
- Electron-based desktop application
- Native menu integration
- IPC communication via preload script

---

# Keyboard Shortcuts

| Shortcut | Action |
|--------|--------|
| Cmd/Ctrl + 1 | Dashboard |
| Cmd/Ctrl + 2 | Medications |
| Cmd/Ctrl + 3 | Tasks |
| Cmd/Ctrl + 4 | Appointments |
| Cmd/Ctrl + 5 | Settings |
| Cmd/Ctrl + , | Settings |
| Cmd/Ctrl + R | Refresh |
| Cmd/Ctrl + Shift + C | Toggle Critical Info |
| Cmd/Ctrl + Shift + R | Toggle Read Aloud |
| Cmd/Ctrl + Shift + V | Toggle Voice Commands |
| Cmd/Ctrl + L | Focus Sidebar |
| Cmd/Ctrl + K | Focus Main Content |
| Cmd/Ctrl + Alt + S | SOS (demo) |

---

# Accessibility (Low Vision Focus)

The application was designed with accessibility as a primary requirement.

### Implemented Features
- Keyboard-only navigation support
- Skip-to-main-content functionality
- High contrast UI mode
- Large, readable typography
- Logical tab order and focus management
- ARIA labels for assistive technologies
- Semantic HTML (`main`, `nav`, `button`, etc.)

These features improve usability for users with visual impairments and align with WCAG principles.

---

# Responsive Design

The application supports multiple viewport sizes:

- **Mobile (375px)**
- **Tablet (768px)**
- **Desktop (1440px)**

Layouts adapt to maintain usability and readability across all breakpoints.

---

# Testing

## Unit & Component Testing

Implemented using:

- Jest
- React Testing Library

Tests cover:

- Component rendering
- State updates
- Navigation behavior
- Accessibility interactions

### Results
- **117 tests passing**
- Multiple test suites covering UI and logic

Run tests:

```bash
npm test -- --coverage
```

End-to-End Testing (Playwright)

Playwright tests simulate real user behavior.

Covered Scenarios
	•	Application loads successfully
	•	Keyboard navigation works
	•	Page transitions function correctly

Run E2E tests:
```bash
npm run e2e
```

Test Coverage

The project exceeds the required 75% coverage threshold. Overal coverage is 82%.

Deployment

The application is deployed using Vercel.

Live Application

https://careconnect-lv-team5-7thtczqss-josephmw19s-projects.vercel.app

Notes
	•	SPA routing configured using Vercel rewrites
	•	Production build uses Vite
	•	Fully functional in deployed environment

    electron/
├── main.ts
├── preload.ts

web/
├── src/
│   ├── ui/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── _tests_/
│   │   └── App.tsx
│   └── main.tsx
├── e2e/
├── playwright.config.ts

Run (Development)

```bash
npm install
npm run dev
```
Run Tests

```bash
npm test -- --coverage
npm run e2e
```
Build
```bash
npm run build
```

AI Usage Statement

AI tools were used during development.
	•	Tools Used: ChatGPT, GitHub Copilot
	•	Usage:
	•	Debugging issues
	•	Generating test cases
	•	Assisting with deployment configuration
	•	Validation:
All outputs were reviewed, tested, and verified before inclusion.

Conclusion

This project demonstrates a complete, accessible, and tested application built with modern web technologies. The implementation satisfies all requirements for responsiveness, accessibility, testing, and deployment, and reflects production-level development practices.