import 'package:flutter/material.dart';
import 'package:flutter_lv/widgets/responsive_scaffold.dart';
import '../home/app_header.dart';
import '../home/bottom_navigation_bar_custom.dart';
import 'medication_list_item.dart';
import '../navigation/navigation_helper.dart';
import '../navigation/app_router.dart';

class MedicationsPage extends StatefulWidget {
  final Function(int)? onNavItemTapped;

  const MedicationsPage({super.key, this.onNavItemTapped});

  @override
  State<MedicationsPage> createState() => _MedicationsPageState();
}

class _MedicationsPageState extends State<MedicationsPage> {
  // Track which medications have been marked as taken
  bool _lisinoprilTaken = false;
  bool _aspirinTaken = false;
  bool _isReading = false;
  bool _isListening = false;

  void _handleReadAction() {
    setState(() {
      _isReading = !_isReading;
    });
  }

  void _handleVoiceAction() {
    setState(() {
      _isListening = !_isListening;
    });
  }

  void _handleMarkAsTaken(String medicationName) {
    setState(() {
      switch (medicationName) {
        case 'Lisinopril 10mg':
          _lisinoprilTaken = true;
          break;
        case 'Aspirin 81mg':
          _aspirinTaken = true;
          break;
      }
    });
  }

  String _getTakenTime() {
    final now = DateTime.now();
    final hour = now.hour;
    final minute = now.minute;
    final period = hour >= 12 ? 'PM' : 'AM';
    final displayHour = hour > 12 ? hour - 12 : (hour == 0 ? 12 : hour);
    final displayMinute = minute.toString().padLeft(2, '0');
    return 'Taken today at $displayHour:$displayMinute $period';
  }

  @override
  Widget build(BuildContext context) {
    return ResponsiveScaffold(
      appBar: AppHeader(
        onReadTap: _handleReadAction,
        onVoiceTap: _handleVoiceAction,
        isReading: _isReading,
        isListening: _isListening,
      ),
      body: Container(
        color: const Color(0xFF1A1D24),
        child: Column(
          children: [
            // Header section
            Container(
              decoration: BoxDecoration(
                color: const Color(0xFF252932),
                border: Border(
                  bottom: BorderSide(color: const Color(0xFF3A3F4A), width: 2),
                ),
              ),
              padding: const EdgeInsets.fromLTRB(22.5, 27, 22.5, 2),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Medications title
                  const SizedBox(
                    height: 44,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'Medications',
                        style: TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 34,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          letterSpacing: 0.3901,
                          height: 1.3, // 44.2 / 34
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 13.5),
                  // Today's Medications subtitle
                  const SizedBox(
                    height: 38,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        "Today's Medications",
                        style: TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 26,
                          fontWeight: FontWeight.normal,
                          color: Color(0xFFE8EAED),
                          letterSpacing: 0.2158,
                          height: 1.5, // 39 / 26
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 13.5),
                  // Date
                  SizedBox(
                    height: 32,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        _getFormattedDate(),
                        style: const TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 22,
                          fontWeight: FontWeight.normal,
                          color: Color(0xFF9AA0A6),
                          letterSpacing: -0.2578,
                          height: 1.5, // 33 / 22
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            // Content area with medication list
            Expanded(
              child: Container(
                color: const Color(0xFF1A1D24),
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(22.5, 36, 22.5, 22.5),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Lisinopril 10mg - Due now
                      MedicationListItem(
                        name: 'Lisinopril 10mg',
                        instructions: '1 tablet every morning',
                        additionalNotes: 'Take with food',
                        status: _lisinoprilTaken
                            ? MedicationStatus.taken
                            : MedicationStatus.dueNow,
                        statusText: _lisinoprilTaken
                            ? null
                            : 'Due now (9:00 AM)',
                        takenTime: _lisinoprilTaken ? _getTakenTime() : null,
                        onMarkAsTaken: _lisinoprilTaken
                            ? null
                            : () => _handleMarkAsTaken('Lisinopril 10mg'),
                        onTap: () {
                          context.navigateTo(
                            AppRoutes.medicationDetails,
                            params: {'id': 'Lisinopril 10mg'},
                            queryParams: {
                              'dosage': '1 tablet every morning',
                              'instructions': 'Take with food',
                              'nextDose': _lisinoprilTaken
                                  ? 'Next dose: Tomorrow at 9:00 AM'
                                  : 'Today at 9:00 AM (due now)',
                              'statusMessage': _lisinoprilTaken
                                  ? 'Medication taken'
                                  : 'Please take this medication now',
                            },
                          );
                        },
                      ),
                      const SizedBox(height: 36),
                      // Metformin 500mg - Taken
                      MedicationListItem(
                        name: 'Metformin 500mg',
                        instructions: '1 tablet with breakfast',
                        additionalNotes: 'Take with food and water',
                        status: MedicationStatus.taken,
                        takenTime: 'Taken today at 8:15 AM',
                        onTap: () {
                          context.navigateTo(
                            AppRoutes.medicationDetails,
                            params: {'id': 'Metformin 500mg'},
                            queryParams: {
                              'dosage': '1 tablet with breakfast',
                              'instructions': 'Take with food and water',
                              'nextDose': 'Today at 2:00 PM (in 15 minutes)',
                              'statusMessage':
                                  'Please take this medication within the next 15 minutes',
                            },
                          );
                        },
                      ),
                      const SizedBox(height: 36),
                      // Atorvastatin 20mg - Scheduled
                      MedicationListItem(
                        name: 'Atorvastatin 20mg',
                        instructions: '1 tablet every evening',
                        additionalNotes: 'Take before bedtime',
                        status: MedicationStatus.scheduled,
                        statusText: 'Scheduled for 9:00 PM',
                        onTap: () {
                          context.navigateTo(
                            AppRoutes.medicationDetails,
                            params: {'id': 'Atorvastatin 20mg'},
                            queryParams: {
                              'dosage': '1 tablet every evening',
                              'instructions': 'Take before bedtime',
                              'nextDose': 'Today at 9:00 PM',
                            },
                          );
                        },
                      ),
                      const SizedBox(height: 36),
                      // Aspirin 81mg - Due soon
                      MedicationListItem(
                        name: 'Aspirin 81mg',
                        instructions: '1 tablet with lunch',
                        additionalNotes: 'Take with food',
                        status: _aspirinTaken
                            ? MedicationStatus.taken
                            : MedicationStatus.dueSoon,
                        statusText: _aspirinTaken
                            ? null
                            : 'Due in 30 minutes (12:30 PM)',
                        takenTime: _aspirinTaken ? _getTakenTime() : null,
                        onMarkAsTaken: _aspirinTaken
                            ? null
                            : () => _handleMarkAsTaken('Aspirin 81mg'),
                        onTap: () {
                          context.navigateTo(
                            AppRoutes.medicationDetails,
                            params: {'id': 'Aspirin 81mg'},
                            queryParams: {
                              'dosage': '1 tablet with lunch',
                              'instructions': 'Take with food',
                              'nextDose': _aspirinTaken
                                  ? 'Next dose: Tomorrow at 12:30 PM'
                                  : 'Today at 12:30 PM (in 30 minutes)',
                              'statusMessage': _aspirinTaken
                                  ? 'Medication taken'
                                  : 'Please take this medication within the next 30 minutes',
                            },
                          );
                        },
                      ),
                      const SizedBox(height: 36),
                      // Vitamin D 2000 IU - Taken
                      MedicationListItem(
                        name: 'Vitamin D 2000 IU',
                        instructions: '1 capsule every morning',
                        additionalNotes: 'Take with breakfast',
                        status: MedicationStatus.taken,
                        takenTime: 'Taken today at 8:20 AM',
                        onTap: () {
                          context.navigateTo(
                            AppRoutes.medicationDetails,
                            params: {'id': 'Vitamin D 2000 IU'},
                            queryParams: {
                              'dosage': '1 capsule every morning',
                              'instructions': 'Take with breakfast',
                              'nextDose': 'Tomorrow at 8:00 AM',
                            },
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBarCustom(
        currentIndex: 1, // Medications is index 1
        onTap: widget.onNavItemTapped ?? (index) {},
      ),
    );
  }

  String _getFormattedDate() {
    final now = DateTime.now();
    final weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    final months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return '${weekdays[now.weekday - 1]}, ${months[now.month - 1]} ${now.day}, ${now.year}';
  }
}
