# CareConnect Low Vision (Flutter)

CareConnect is a Flutter mobile app prototype designed with low-vision accessibility in mind. The application emphasizes large typography, high-contrast UI elements, and clearly labeled interactive controls to improve usability for users with visual impairments.

This project was developed as part of **SWEN 661 – User Interface Implementation** and focuses on building accessible UI components, navigation flows, and comprehensive widget testing with measurable test coverage.

---

## Screens Implemented
- Home dashboard
- Medications (list and details)
- Appointments (list and details)
- Tasks (list and details)
- Settings

## Authentication & Entry Screens
The application includes a complete authentication and entry flow implemented to support controlled access and role-based entry:

- Landing / Welcome screen
- Role selection (Patient / Caregiver)
- Sign-in screen
- Credential recovery (username and password)

The authentication flow is linear and predictable:
Landing → Role Selection → Sign In → Home

All authentication screens follow the same accessibility principles as the rest of the application, including large text, high-contrast UI elements, labeled form inputs, and accessible validation messaging. These screens are implemented in Flutter and reflected in the design documentation and Figma prototypes.

---

## State Management and Navigation
- **State management:** Local widget state using `setState`
- **Navigation:** MaterialApp.router (RouterDelegate (Navigator 2.0))

Navigation supports:
- Forward navigation to detail screens
- Back navigation using both UI controls and system back behavior
- Bottom navigation bar handling across primary screens

---

## Accessibility Considerations
The application was designed with accessibility as a primary concern:

- Large font sizes for primary and secondary content
- High-contrast color palette optimized for low vision
- Clearly labeled buttons and icons
- Large, consistent touch targets
- Predictable layout and spacing to improve readability
- Minimal visual clutter and strong visual hierarchy

---
### WCAG 2.1 Alignment
The CareConnect Flutter application was evaluated against WCAG 2.1 Level A and Level AA success criteria relevant to mobile applications. Accessibility validation focused on low-vision and screen-reader users and included both automated guideline checks and manual assistive technology testing.

## Testing Strategy
The project includes a comprehensive set of Flutter widget tests focused on:

- Smoke testing core screens
- Navigation flows between screens
- Rendering verification for detail pages
- UI interaction stability (taps, navigation, state changes)
- - Automated accessibility guideline validation using Flutter’s `meetsGuideline(...)` testing APIs for tap target size and text contrast

## Security & Static Analysis Review
Basic security and static analysis checks were performed to identify potential code quality, dependency, and configuration issues:

### Static Analysis
```bash
flutter analyze
```
Result: No issues found.

Dependency Review
```bash
flutter pub outdated
```
Result: All direct and development dependencies are up to date. Some transitive dependencies are locked to older patch versions due to Flutter SDK constraints, with no known security implications.

Automated Fix Review
```bash
dart fix --dry-run
```
Result: No fixes suggested.

These checks confirm that the project currently has no known static analysis warnings, dependency issues, or required automated code fixes.

### Test Files Included
- `widget_test.dart`
- `rendering_smoke_test.dart`
- `home_screen_test.dart`
- `navigation_test.dart`
- `coverage_boost_test.dart`
- `details_pages_coverage_test.dart`

---

## Test Coverage
Test coverage was generated using Flutter’s built-in coverage tooling.

### Commands Used
```bash
flutter test
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html 
```
## Coverage Results
- **Overall line coverage:** 82.2%
- **Total lines covered:** 1192 / 1450
- Coverage exceeds the **75%+ requirement**

A detailed HTML coverage report is generated as part of the test process and can be viewed locally after running coverage commands.
```bash
coverage/html/index.html
```
## UI & Accessibility Testing (Maestro)

This Flutter application includes end-to-end (E2E) UI tests implemented using Maestro to validate critical user workflows and accessibility-related interactions.

Tooling
	•	Maestro – Cross-platform mobile UI testing framework
	•	Flutter Android build (emulator or physical device)

Test Coverage
The Maestro test suite covers the following critical user flows:
	1.	User Login (Patient Role)
	•	App launch
	•	Sign In navigation
	•	Role selection
	•	Credential entry
	•	Successful navigation to Home screen
	2.	Home Navigation Smoke Test
	•	Home screen verification
	•	Bottom navigation bar presence
	•	Scroll behavior and content visibility
	3.	Appointments Workflow
	•	Navigate to Upcoming Appointments
	•	View all appointments
	•	View appointment details
	4.	Medication Management
	•	Navigate to Medications tab
	•	Mark medication as taken
	•	Verify state change confirmation
	5.	Settings Screen Smoke Test
	•	Navigate to Settings via bottom navigation
	•	Verify Settings screen loads correctly

These tests validate real user behavior, not mocked flows, and confirm that accessibility-aware UI changes do not break critical user workflows.

Running the Maestro Tests
Prerequisites
	•	Flutter SDK installed
	•	Android Emulator running (Pixel recommended)
	•	Maestro installed
```bash
brew install maestro
```
Run all Flutter Maestro tests
```bash
cd flutter/flutter_lv
maestro test maestro/
```
Run a single flow
```bash 
maestro test maestro/01_login_patient.yaml
```
Accessibility Considerations in Tests
While Maestro does not directly emulate screen readers, these tests ensure:
	•	Logical focus order
	•	Keyboard-safe navigation paths
	•	Visible labels and tappable elements
	•	No inaccessible dead ends in critical workflows

Manual screen reader testing (TalkBack and VoiceOver) was conducted separately and documented as part of Assignment 6 accessibility validation.

Test Artifacts
	•	Screenshots are captured during test execution for verification
	•	All flows pass consistently on Android emulator

## Build Artifacts
The application successfully builds for both major platforms:

- **Android:** Release APK generated  
- File: `build/app/outputs/flutter-apk/app-release.apk`

- **iOS:** Release build generated on macOS using Xcode tooling

### Build Commands
```bash
flutter build apk
flutter build ios
```
## Requirements
- Flutter SDK installed
- Android Studio or Xcode recommended for emulator or simulator usage
- macOS required for iOS builds

## Run the App
```bash
flutter pub get
flutter run
```

This Flutter implementation was evaluated alongside a parallel React Native implementation to compare accessibility practices and testing approaches across mobile frameworks.

## Known Limitations
- State management uses local widget state (setState) rather than Provider or Riverpod
- No external data persistence (SharedPreferences or SQLite)
- Accessibility semantics widgets are limited to core controls
- Application is a prototype and not production-hardened

## Team Contributions (This Week)
- Implemented all core UI screens and navigation
- Added comprehensive widget tests and smoke tests
- Achieved and validated 80%+ test coverage
- Generated Android and iOS release builds
- Updated project documentation and testing instructions

## AI Usage Summary
AI was used to:
- Assist with debugging Flutter build and Gradle issues
- Help design and refine widget test cases
- Identify test coverage gaps and strategies to improve coverage
- Assist with documentation structure and wording
