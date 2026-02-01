# CareConnect Low Vision (Flutter)

CareConnect is a Flutter mobile app prototype designed with low-vision accessibility in mind. The application emphasizes large typography, high-contrast UI elements, and clearly labeled interactive controls to improve usability for users with visual impairments.

## Screens Implemented
- Home dashboard
- Medications (list and details)
- Appointments (list and details)
- Tasks (list and details)
- Settings

## State Management and Navigation
- **State management:** Local widget state using `setState`
- **Navigation:** Flutter `Navigator` (imperative navigation using `push` and `pop`)

## Accessibility Considerations
- Large font sizes for primary and secondary content
- High-contrast color palette
- Clearly labeled buttons and accessible touch targets
- Consistent spacing and layout to improve readability

## Build Artifacts
- Android release APK successfully generated (`app-release.apk`)
- iOS release build successfully generated on macOS

## Requirements
- Flutter SDK installed
- Android Studio or Xcode recommended for emulator or simulator usage

## Run the App
```bash
flutter pub get
flutter run