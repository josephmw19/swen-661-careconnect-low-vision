import 'package:flutter/material.dart';

import 'home/medication_card.dart';
import 'home/refill_reminder_card.dart';
import 'home/today_card.dart';
import 'home/upcoming_appointments_card.dart';
import 'home/bottom_navigation_bar_custom.dart';
import 'home/app_header.dart';
import 'medications/medications_page.dart';
import 'tasks/tasks_page.dart';
import 'settings/settings_page.dart';

import 'auth/auth_prefs.dart';
import 'auth/landing_page.dart';
import 'auth/role_select_page.dart';
import 'auth/sign_in_page.dart';
import 'auth/forgot_password_page.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

// This widget is the root of your application.
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CareConnect',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF252932),
          brightness: Brightness.dark,
        ),
      ),
      routes: {
        LandingPage.routeName: (_) => const LandingPage(),
        RoleSelectPage.routeName: (_) => const RoleSelectPage(),
        SignInPage.routeName: (_) => const SignInPage(),
        ForgotPasswordPage.routeName: (_) => const ForgotPasswordPage(),
      },
      home: const _AppEntry(),
    );
  }
}

class _AppEntry extends StatelessWidget {
  const _AppEntry();

  static const bool _resetAuth = bool.fromEnvironment(
    'RESET_AUTH',
    defaultValue: false,
  );

  Future<bool> _bootstrap() async {
    if (_resetAuth) {
      // Your AuthPrefs has signOut(), not resetAuth()
      await AuthPrefs.signOut();
    }
    return AuthPrefs.isSignedIn();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: _bootstrap(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Scaffold(
            backgroundColor: Color(0xFF1A1D24),
            body: Center(child: CircularProgressIndicator()),
          );
        }

        final signedIn = snapshot.data ?? false;
        return signedIn
            ? const MyHomePage(title: 'CareConnect')
            : const LandingPage();
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _currentIndex = 0;

  // Medication state
  bool _medicationMarkedAsTaken = false;
  bool _medicationSnoozed = false;

  // Task completion state
  bool _bloodPressureCheckCompleted = true;
  bool _lunchMedicationCompleted = false;
  bool _eveningWalkCompleted = false;

  // Read/Voice button states
  bool _isReading = false;
  bool _isListening = false;

  void _onNavItemTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  void _handleMarkAsTaken() {
    setState(() {
      _medicationMarkedAsTaken = true;
      _medicationSnoozed = false;
    });
  }

  void _handleSnooze() {
    setState(() {
      _medicationSnoozed = true;
    });
  }

  void _handleRefillReminderTap() {
    // Handle refill reminder tap - could navigate to pharmacy or show dialog
    // For now, just a placeholder
  }

  void _handleTaskToggle(String taskId) {
    setState(() {
      switch (taskId) {
        case 'blood_pressure':
          _bloodPressureCheckCompleted = !_bloodPressureCheckCompleted;
          break;
        case 'lunch_medication':
          _lunchMedicationCompleted = !_lunchMedicationCompleted;
          break;
        case 'evening_walk':
          _eveningWalkCompleted = !_eveningWalkCompleted;
          break;
      }
    });
  }

  void _handleReadAction() {
    setState(() {
      _isReading = !_isReading;
    });
    // Could add actual read functionality here
  }

  void _handleVoiceAction() {
    setState(() {
      _isListening = !_isListening;
    });
    // Could add actual voice command functionality here
  }

  Widget _getCurrentPage() {
    switch (_currentIndex) {
      case 0:
        return Container(
          color: const Color(0xFF1A1D24),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(22.5),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                MedicationCard(
                  isMarkedAsTaken: _medicationMarkedAsTaken,
                  isSnoozed: _medicationSnoozed,
                  onMarkAsTaken: _handleMarkAsTaken,
                  onSnooze: _handleSnooze,
                ),
                const SizedBox(height: 36),
                RefillReminderCard(onTap: _handleRefillReminderTap),
                const SizedBox(height: 36),
                TodayCard(
                  bloodPressureCheckCompleted: _bloodPressureCheckCompleted,
                  lunchMedicationCompleted: _lunchMedicationCompleted,
                  eveningWalkCompleted: _eveningWalkCompleted,
                  onTaskToggle: _handleTaskToggle,
                ),
                const SizedBox(height: 36),
                const UpcomingAppointmentsCard(),
              ],
            ),
          ),
        );
      case 1:
        return MedicationsPage(onNavItemTapped: _onNavItemTapped);
      case 2:
        return TasksPage(onNavItemTapped: _onNavItemTapped);
      case 3:
        return SettingsPage(onNavItemTapped: _onNavItemTapped);
      default:
        return Container(
          color: const Color(0xFF1A1D24),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(22.5),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                MedicationCard(
                  isMarkedAsTaken: _medicationMarkedAsTaken,
                  isSnoozed: _medicationSnoozed,
                  onMarkAsTaken: _handleMarkAsTaken,
                  onSnooze: _handleSnooze,
                ),
                const SizedBox(height: 36),
                RefillReminderCard(onTap: _handleRefillReminderTap),
                const SizedBox(height: 36),
                TodayCard(
                  bloodPressureCheckCompleted: _bloodPressureCheckCompleted,
                  lunchMedicationCompleted: _lunchMedicationCompleted,
                  eveningWalkCompleted: _eveningWalkCompleted,
                  onTaskToggle: _handleTaskToggle,
                ),
                const SizedBox(height: 36),
                const UpcomingAppointmentsCard(),
              ],
            ),
          ),
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_currentIndex == 1 || _currentIndex == 2 || _currentIndex == 3) {
      // Medications, Tasks, and Settings pages have their own Scaffold
      return _getCurrentPage();
    }

    return Scaffold(
      appBar: AppHeader(
        onReadTap: _handleReadAction,
        onVoiceTap: _handleVoiceAction,
        isReading: _isReading,
        isListening: _isListening,
      ),
      body: _getCurrentPage(),
      bottomNavigationBar: BottomNavigationBarCustom(
        currentIndex: _currentIndex,
        onTap: _onNavItemTapped,
      ),
    );
  }
}
