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

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF252932),
          brightness: Brightness.dark,
        ),
      ),
      home: const MyHomePage(title: 'CareConnect'),
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

  void _onNavItemTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
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
              children: const [
                MedicationCard(),
                SizedBox(height: 36),
                RefillReminderCard(),
                SizedBox(height: 36),
                TodayCard(),
                SizedBox(height: 36),
                UpcomingAppointmentsCard(),
              ],
            ),
          ),
        );
      case 1:
        return MedicationsPage(
          onNavItemTapped: _onNavItemTapped,
        );
      case 2:
        return TasksPage(
          onNavItemTapped: _onNavItemTapped,
        );
      case 3:
        return SettingsPage(
          onNavItemTapped: _onNavItemTapped,
        );
      default:
        return Container(
          color: const Color(0xFF1A1D24),
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(22.5),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: const [
                MedicationCard(),
                SizedBox(height: 36),
                RefillReminderCard(),
                SizedBox(height: 36),
                TodayCard(),
                SizedBox(height: 36),
                UpcomingAppointmentsCard(),
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
      appBar: const AppHeader(),
      body: _getCurrentPage(),
      bottomNavigationBar: BottomNavigationBarCustom(
        currentIndex: _currentIndex,
        onTap: _onNavItemTapped,
      ),
    );
  }
}
