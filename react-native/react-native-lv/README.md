
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

## Accessibility Overview

The CareConnect React Native application was designed and tested with accessibility as a primary requirement, with a focus on low-vision users and screen reader compatibility. The implementation leverages React Native accessibility APIs to ensure controls expose correct semantic metadata to assistive technologies.

### WCAG 2.1 Alignment

This application was evaluated against WCAG 2.1 Level A and Level AA success criteria applicable to mobile applications. Validation focused on screen reader usability, accessible touch targets, logical focus order, and proper exposure of control names, roles, and values.

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

## Android Build (Expo EAS)

A production Android build was created using Expo EAS.

Expo build link:
https://expo.dev/accounts/josephmw19/projects/react-native-lv/builds/d710eb5a-4018-4a6c-8014-4d6941f02213

To install:
- Open the link on an Android device
- Or scan the QR code shown on the Expo build page

## iOS Build
Due to the cost of an Apple Developer account ($99/yr) this was skipped as it was optional but local instructions are below:

To run locally via iOS
```bash
npx expo run:ios
```
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
	•	Comparable accessibility semantics, including labeled controls, consistent focus order, and screen reader compatibility
	

A detailed framework comparison is provided in the accompanying Flutter vs React Native Analysis document.

⸻

Testing Approach
	•	Unit tests validate business logic and utility behavior
	•	Component tests verify UI rendering and user interactions
	•	Navigation tests ensure correct routing behavior
	•	Deterministic tests using mocked timers and providers

⸻

## Accessibility Testing

Accessibility validation for the React Native implementation was performed using a combination of automated UI tests and manual inspection.

### Programmatic Accessibility Validation
- UI tests written with **React Native Testing Library (RNTL)** verify:
  - Presence of `accessibilityLabel` on interactive controls
  - Correct `accessibilityRole` values (e.g., button)
  - Focusable pressable elements
- Accessibility metadata is asserted directly in component tests to ensure screen readers can correctly announce controls.

### Manual Screen Reader Testing
- Manual testing was performed using:
  - **Android TalkBack**
  - **Apple VoiceOver**
- Tests verified:
  - Logical focus traversal
  - Correct control announcements
  - No inaccessible dead ends in primary user flows

## Automated UI Testing (Maestro)

While Maestro does not emulate screen readers directly, these tests ensure that accessibility-aware UI changes do not break critical user workflows and that all interactive elements remain reachable through standard navigation paths.
This project includes automated end-to-end UI tests written using Maestro.
The tests focus on critical user workflows and are designed to reflect realistic user behavior.

### Test Coverage
- Patient login flow
- Home screen navigation
- Viewing upcoming appointments and appointment details
- Marking medications as taken
- Accessing settings screen

### Running the Tests
1. Start the Android emulator
2. Launch the Expo app
3. Run:
   maestro test maestro/

### Notes
- Tests assume a fresh app state and use demo credentials
- Authentication is mocked at the UI level (no backend dependency)
- Login is performed once; subsequent tests assume an authenticated session

Notes

This project was developed using an Expo starter template with React Navigation, which was extended and customized to meet all assignment requirements.

⸻

## Accessibility Summary

No blocking accessibility issues were identified during testing. All core user flows were verified to be usable with mobile screen readers, and interactive controls expose appropriate accessibility metadata. Minor platform-specific differences may occur due to underlying OS accessibility behavior.

Resources
	•	https://reactnative.dev/
	•	https://docs.expo.dev/
	•	https://reactnavigation.org/
	•	https://jestjs.io/
	•	https://callstack.github.io/react-native-testing-library/

