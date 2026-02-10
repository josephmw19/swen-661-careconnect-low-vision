
# CareConnect – React Native Mobile Application

**Course:** SWEN 661 – User Interface Implementation  
**Assignment:** Assignment 5 – React Native Mobile Implementation & Testing  

## Overview

CareConnect is a mobile health management application implemented in **React Native using Expo**.  
This project is a feature-parity reimplementation of a previously developed **Flutter application**, created to evaluate framework trade-offs between Flutter and React Native.

The application supports:
- User authentication (demo mode)
- Appointments management
- Medication tracking
- Task management
- User settings and preferences

State management is implemented using the **React Context API**, and navigation is handled with **React Navigation**.

---

## Technology Stack

- **React Native**
- **Expo**
- **TypeScript**
- **React Navigation**
- **Jest**
- **React Native Testing Library**
- **Context API**

---

## Running the Application

### Install Dependencies
```bash
npm install
```

Start the Development Server
```bash
npx expo start
```
From the Expo CLI:
	•	Press a to open Android emulator/device
	•	Press i to open iOS simulator (macOS only)
	•	Press w to open web version

⸻

Running Tests & Coverage

Run All Tests
```bash
npm test
```

Generate Coverage Report

```bash
npm test -- --coverage
```

Coverage results are generated in:
```bash
coverage/lcov-report/index.html
```
Open in web browser:
```bash
open coverage/lcov-report/index.html
```
This project exceeds the minimum 60% coverage requirement defined in the assignment (78.46%).

⸻

Platform Build Instructions

Android Build (Expo / EAS)
```bash
npx eas build --platform android
```
The generated APK is included with the assignment submission.

(iOS build optional depending on environment availability)

⸻

Feature Parity with Flutter Version

This React Native implementation mirrors the functionality of the original Flutter application, including:
	•	Screen structure and navigation flow
	•	State-driven UI updates
	•	Task and medication workflows
	•	Accessibility-aware UI components

A detailed framework comparison is provided in the accompanying Flutter vs React Native Analysis document.

⸻

Testing Approach
	•	Unit tests validate business logic and utility behavior
	•	Component tests verify UI rendering and user interactions
	•	Navigation tests ensure correct routing behavior
	•	Deterministic tests using mocked timers and providers

⸻

Notes

This project was developed using an Expo starter template with React Navigation, which was extended and customized to meet all assignment requirements.

⸻

Resources
	•	https://reactnative.dev/
	•	https://docs.expo.dev/
	•	https://reactnavigation.org/
	•	https://jestjs.io/
	•	https://callstack.github.io/react-native-testing-library/

