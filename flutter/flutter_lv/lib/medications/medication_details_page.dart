import 'package:flutter/material.dart';
import '../home/app_header.dart';
import '../home/bottom_navigation_bar_custom.dart';
import '../navigation/navigation_helper.dart';
import '../navigation/app_router.dart';

class MedicationDetailsPage extends StatelessWidget {
  final String medicationName;
  final String dosage;
  final String instructions;
  final String? nextDose;
  final String? statusMessage;
  final Function(int)? onNavItemTapped;

  const MedicationDetailsPage({
    super.key,
    required this.medicationName,
    required this.dosage,
    required this.instructions,
    this.nextDose,
    this.statusMessage,
    this.onNavItemTapped,
  });

  void _handleNavigation(int index, BuildContext context) {
    if (index == 1) {
      // If tapping Medications, just go back to medications page
      context.navigateBack();
    } else {
      // If tapping other nav items, navigate to the appropriate route
      String route;
      switch (index) {
        case 0:
          route = AppRoutes.home;
          break;
        case 2:
          route = AppRoutes.tasks;
          break;
        case 3:
          route = AppRoutes.settings;
          break;
        default:
          route = AppRoutes.home;
      }
      context.navigateReplace(route);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppHeader(),
      body: Container(
        color: const Color(0xFF1A1D24),
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(22.5, 27, 22.5, 22.5),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Medication Details title with back button
              SizedBox(
                height: 44,
                child: Row(
                  children: [
                    // Back button
                    IconButton(
                      icon: const Icon(
                        Icons.arrow_back,
                        color: Colors.white,
                        size: 24,
                      ),
                      onPressed: () {
                        context.navigateBack();
                      },
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(
                        minWidth: 40,
                        minHeight: 40,
                      ),
                    ),
                    const SizedBox(width: 8),
                    // Medication Details title
                    const Expanded(
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          'Medication Details',
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
                  ],
                ),
              ),
              const SizedBox(height: 36), // 107 - 27 - 44 = 36

              // Medication Summary Section
              _MedicationSummarySection(
                medicationName: medicationName,
                dosage: dosage,
                instructions: instructions,
                nextDose: nextDose ?? 'Today at 2:00 PM (in 15 minutes)',
                statusMessage: statusMessage ??
                    'Please take this medication within the next 15 minutes',
              ),
              const SizedBox(height: 36),

              // Actions Section
              const _ActionsSection(),
              const SizedBox(height: 36),

              // History Section
              const _HistorySection(),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBarCustom(
        currentIndex: 1, // Medications is index 1
        onTap: (index) => _handleNavigation(index, context),
      ),
    );
  }
}

class _MedicationSummarySection extends StatelessWidget {
  final String medicationName;
  final String dosage;
  final String instructions;
  final String nextDose;
  final String statusMessage;

  const _MedicationSummarySection({
    required this.medicationName,
    required this.dosage,
    required this.instructions,
    required this.nextDose,
    required this.statusMessage,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(33.5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Medication Summary header
          Row(
            children: [
              const Icon(
                Icons.medication,
                color: Color(0xFF4285F4),
                size: 27,
              ),
              const SizedBox(width: 13.5),
              const Expanded(
                child: Text(
                  'Medication Summary',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 28,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                    letterSpacing: 0.3828,
                    height: 1.4, // 39.2 / 28
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 27),
          // Medication name and dosage
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                medicationName,
                style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  letterSpacing: 0.2158,
                  height: 1.6, // 41.6 / 26
                ),
              ),
              const SizedBox(height: 9),
              Text(
                dosage,
                style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 24,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFFE8EAED),
                  letterSpacing: 0.0703,
                  height: 1.6, // 38.4 / 24
                ),
              ),
            ],
          ),
          const SizedBox(height: 27),
          // Next dose card
          Container(
            decoration: BoxDecoration(
              color: const Color(0xFF2D333E),
              borderRadius: BorderRadius.circular(15.25),
            ),
            padding: const EdgeInsets.fromLTRB(22.5, 22.5, 22.5, 22.5),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(
                  Icons.access_time,
                  color: Color(0xFF81C995),
                  size: 28,
                ),
                const SizedBox(width: 13.5),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Next dose',
                        style: TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 24,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                          letterSpacing: 0.0703,
                          height: 1.6, // 38.4 / 24
                        ),
                      ),
                      const SizedBox(height: 4.5),
                      Text(
                        nextDose,
                        style: const TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 22,
                          fontWeight: FontWeight.normal,
                          color: Color(0xFFE8EAED),
                          letterSpacing: -0.2578,
                          height: 1.6, // 35.2 / 22
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 27),
          // Instructions card
          Container(
            decoration: BoxDecoration(
              color: const Color(0xFF2D333E),
              borderRadius: BorderRadius.circular(15.25),
            ),
            padding: const EdgeInsets.fromLTRB(22.5, 22.5, 22.5, 22.5),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Instructions',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 24,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                    letterSpacing: 0.0703,
                    height: 1.6, // 38.4 / 24
                  ),
                ),
                const SizedBox(height: 9),
                Text(
                  instructions,
                  style: const TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 22,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFFE8EAED),
                    letterSpacing: -0.2578,
                    height: 1.6, // 35.2 / 22
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 27),
          // Status alert card
          Container(
            decoration: BoxDecoration(
              color: const Color(0xFF3D2A1F),
              border: Border.all(
                color: const Color(0xFFE8A87C),
                width: 2,
              ),
              borderRadius: BorderRadius.circular(15.25),
            ),
            padding: const EdgeInsets.fromLTRB(24.5, 24.5, 24.5, 2),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Status: Due soon',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 24,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                    letterSpacing: 0.0703,
                    height: 1.6, // 38.4 / 24
                  ),
                ),
                const SizedBox(height: 4.5),
                Text(
                  statusMessage,
                  style: const TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 22,
                    fontWeight: FontWeight.normal,
                    color: Color(0xFFE8C4A0),
                    letterSpacing: -0.2578,
                    height: 1.6, // 35.2 / 22
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ActionsSection extends StatelessWidget {
  const _ActionsSection();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(33.5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Actions',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 28,
              fontWeight: FontWeight.w600,
              color: Colors.white,
              letterSpacing: 0.3828,
              height: 1.4, // 39.2 / 28
            ),
          ),
          const SizedBox(height: 27),
          Column(
            children: [
              // Mark as Taken button
              SizedBox(
                width: double.infinity,
                height: 90,
                child: ElevatedButton(
                  onPressed: () {
                    // Handle mark as taken
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF4285F4),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.25),
                    ),
                    padding: EdgeInsets.zero,
                  ),
                  child: Row(
                    children: [
                      const SizedBox(width: 24),
                      Container(
                        width: 32,
                        height: 32,
                        decoration: const BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                        ),
                        child: const Center(
                          child: Icon(
                            Icons.check,
                            color: Color(0xFF4285F4),
                            size: 20,
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      const Expanded(
                        child: Center(
                          child: Text(
                            'Mark as Taken',
                            style: TextStyle(
                              fontFamily: 'Inter',
                              fontSize: 26,
                              fontWeight: FontWeight.w600,
                              color: Colors.white,
                              letterSpacing: 0.2158,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 24),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 18),
              // Snooze 10 min button
              SizedBox(
                width: double.infinity,
                height: 77,
                child: ElevatedButton(
                  onPressed: () {
                    // Handle snooze
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2D333E),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.25),
                    ),
                    padding: EdgeInsets.zero,
                  ),
                  child: Row(
                    children: [
                      const SizedBox(width: 24),
                      const Icon(
                        Icons.snooze,
                        color: Color(0xFFE8EAED),
                        size: 28,
                      ),
                      const SizedBox(width: 16),
                      const Expanded(
                        child: Center(
                          child: Text(
                            'Snooze 10 min',
                            style: TextStyle(
                              fontFamily: 'Inter',
                              fontSize: 24,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFFE8EAED),
                              letterSpacing: 0.0703,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 24),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 18),
              // Edit Schedule button
              SizedBox(
                width: double.infinity,
                height: 77,
                child: ElevatedButton(
                  onPressed: () {
                    // Handle edit schedule
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2D333E),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15.25),
                    ),
                    padding: EdgeInsets.zero,
                  ),
                  child: Row(
                    children: [
                      const SizedBox(width: 24),
                      const Icon(
                        Icons.edit_outlined,
                        color: Color(0xFFE8EAED),
                        size: 28,
                      ),
                      const SizedBox(width: 16),
                      const Expanded(
                        child: Center(
                          child: Text(
                            'Edit Schedule',
                            style: TextStyle(
                              fontFamily: 'Inter',
                              fontSize: 24,
                              fontWeight: FontWeight.w500,
                              color: Color(0xFFE8EAED),
                              letterSpacing: 0.0703,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 24),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 18),
              // Request Refill button
              Column(
                children: [
                  SizedBox(
                    width: double.infinity,
                    height: 77,
                    child: ElevatedButton(
                      onPressed: () {
                        // Handle request refill
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF2D333E),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15.25),
                        ),
                        padding: EdgeInsets.zero,
                      ),
                      child: Row(
                        children: [
                          const SizedBox(width: 24),
                          const Icon(
                            Icons.refresh,
                            color: Color(0xFFE8EAED),
                            size: 28,
                          ),
                          const SizedBox(width: 16),
                          const Expanded(
                            child: Center(
                              child: Text(
                                'Request Refill',
                                style: TextStyle(
                                  fontFamily: 'Inter',
                                  fontSize: 24,
                                  fontWeight: FontWeight.w500,
                                  color: Color(0xFFE8EAED),
                                  letterSpacing: 0.0703,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 24),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 13.5),
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Padding(
                      padding: EdgeInsets.only(left: 9),
                      child: Text(
                        'Refill reminder: due in 3 days',
                        style: TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 20,
                          fontWeight: FontWeight.normal,
                          color: Color(0xFFF9AB00),
                          letterSpacing: -0.4492,
                          height: 1.6, // 32 / 20
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _HistorySection extends StatelessWidget {
  const _HistorySection();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(33.5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'History',
            style: TextStyle(
              fontFamily: 'Inter',
              fontSize: 28,
              fontWeight: FontWeight.w600,
              color: Colors.white,
              letterSpacing: 0.3828,
              height: 1.4, // 39.2 / 28
            ),
          ),
          const SizedBox(height: 27),
          Column(
            children: [
              // Taken today
              _HistoryItem(
                icon: Icons.check_circle,
                iconColor: const Color(0xFF81C995),
                backgroundColor: const Color(0xFF1E3A2E),
                title: 'Taken today at 8:15 AM',
                status: 'Status: Completed',
                statusColor: const Color(0xFF81C995),
              ),
              const SizedBox(height: 18),
              // Taken yesterday
              _HistoryItem(
                icon: Icons.check_circle,
                iconColor: const Color(0xFF81C995),
                backgroundColor: const Color(0xFF1E3A2E),
                title: 'Taken yesterday at 8:10 AM',
                status: 'Status: Completed',
                statusColor: const Color(0xFF81C995),
              ),
              const SizedBox(height: 18),
              // Missed dose
              _HistoryItem(
                icon: Icons.access_time,
                iconColor: const Color(0xFFE8A87C),
                backgroundColor: const Color(0xFF3D2A1F),
                borderColor: const Color(0xFFE8A87C),
                title: 'Missed dose: Jan 24',
                status: 'Status: Missed - not taken',
                statusColor: const Color(0xFFE8C4A0),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _HistoryItem extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final Color backgroundColor;
  final Color? borderColor;
  final String title;
  final String status;
  final Color statusColor;

  const _HistoryItem({
    required this.icon,
    required this.iconColor,
    required this.backgroundColor,
    this.borderColor,
    required this.title,
    required this.status,
    required this.statusColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: backgroundColor,
        border: borderColor != null
            ? Border.all(color: borderColor!, width: 2)
            : null,
        borderRadius: BorderRadius.circular(15.25),
      ),
      padding: const EdgeInsets.fromLTRB(22.5, 27, 22.5, 22.5),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            icon,
            color: iconColor,
            size: 28,
          ),
          const SizedBox(width: 18.5),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 24,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                    letterSpacing: 0.0703,
                    height: 1.6, // 38.4 / 24
                  ),
                ),
                const SizedBox(height: 4.5),
                Text(
                  status,
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 22,
                    fontWeight: FontWeight.normal,
                    color: statusColor,
                    letterSpacing: -0.2578,
                    height: 1.6, // 35.2 / 22
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
