import 'package:flutter/material.dart';
import 'home/medication_card.dart';
import 'home/refill_reminder_card.dart';
import 'home/today_card.dart';
import 'home/bottom_navigation_bar_custom.dart';
import 'home/app_header.dart';

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppHeader(),
      body: Container(
        color: const Color(0xFF1A1D24), // Dark background for the page
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(22.5, 36, 22.5, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: const [
              MedicationCard(),
              SizedBox(height: 36),
              RefillReminderCard(),
              SizedBox(height: 36),
              TodayCard(),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBarCustom(
        currentIndex: _currentIndex,
        onTap: _onNavItemTapped,
      ),
    );
  }
}
