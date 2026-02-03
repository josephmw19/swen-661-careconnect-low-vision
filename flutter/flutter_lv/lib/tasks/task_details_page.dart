import 'package:flutter/material.dart';
import '../home/app_header.dart';
import '../home/bottom_navigation_bar_custom.dart';
import '../navigation/navigation_helper.dart';
import '../navigation/app_router.dart';

class TaskDetailsPage extends StatelessWidget {
  final String taskTitle;
  final String? description;
  final String? dueTime;
  final String? statusMessage;
  final Function(int)? onNavItemTapped;

  const TaskDetailsPage({
    super.key,
    required this.taskTitle,
    this.description,
    this.dueTime,
    this.statusMessage,
    this.onNavItemTapped,
  });

  void _handleNavigation(int index, BuildContext context) {
    if (index == 2) {
      // If tapping Tasks, just go back to tasks page
      context.navigateBack();
    } else {
      // If tapping other nav items, navigate to the appropriate route
      String route;
      switch (index) {
        case 0:
          route = AppRoutes.home;
          break;
        case 1:
          route = AppRoutes.medications;
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
              // Task Details title with back button
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
                    // Task Details title
                    const Expanded(
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          'Task Details',
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

              // Task Summary Section
              _TaskSummarySection(
                taskTitle: taskTitle,
                description: description ??
                    'Measure blood pressure using home monitor and record the result.',
                dueTime: dueTime ?? 'Today at 10:00 AM',
                statusMessage: statusMessage ?? 'This task is still pending',
              ),
              const SizedBox(height: 36),

              // Complete Task Section
              const _CompleteTaskSection(),
              const SizedBox(height: 36),

              // Other Actions Section
              const _OtherActionsSection(),
              const SizedBox(height: 36),

              // History & Notes Section
              const _HistoryNotesSection(),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBarCustom(
        currentIndex: 2, // Tasks is index 2
        onTap: (index) => _handleNavigation(index, context),
      ),
    );
  }
}

class _TaskSummarySection extends StatelessWidget {
  final String taskTitle;
  final String description;
  final String dueTime;
  final String statusMessage;

  const _TaskSummarySection({
    required this.taskTitle,
    required this.description,
    required this.dueTime,
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
          // Task Summary header
          Row(
            children: [
              const Icon(
                Icons.check_circle_outline,
                color: Color(0xFF4285F4),
                size: 32,
              ),
              const SizedBox(width: 13.5),
              const Expanded(
                child: Text(
                  'Task Summary',
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
          // Task title
          Text(
            taskTitle,
            style: const TextStyle(
              fontFamily: 'Inter',
              fontSize: 26,
              fontWeight: FontWeight.bold,
              color: Colors.white,
              letterSpacing: 0.2158,
              height: 1.6, // 41.6 / 26
            ),
          ),
          const SizedBox(height: 27),
          // Description card
          Container(
            decoration: BoxDecoration(
              color: const Color(0xFF2D333E),
              borderRadius: BorderRadius.circular(15.25),
            ),
            padding: const EdgeInsets.fromLTRB(22.5, 22.5, 22.5, 22.5),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Description',
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
                        description,
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
          // Due time card
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
                        'Due time',
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
                        dueTime,
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
            padding: const EdgeInsets.all(24.5),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Status: Not completed',
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
          ),
        ],
      ),
    );
  }
}

class _CompleteTaskSection extends StatelessWidget {
  const _CompleteTaskSection();

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
            'Complete Task',
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
          // Mark as Complete button
          SizedBox(
            width: double.infinity,
            height: 126,
            child: ElevatedButton(
              onPressed: () {
                // Handle mark as complete
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
                    width: 26.5,
                    height: 26.5,
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.white,
                        width: 2,
                      ),
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 16),
                  const Expanded(
                    child: Center(
                      child: Text(
                        'Mark as Complete',
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
        ],
      ),
    );
  }
}

class _OtherActionsSection extends StatelessWidget {
  const _OtherActionsSection();

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
            'Other Actions',
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
              // Remind Me Later button
              SizedBox(
                width: double.infinity,
                height: 109,
                child: ElevatedButton(
                  onPressed: () {
                    // Handle remind me later
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
                        Icons.notifications_outlined,
                        color: Color(0xFFE8EAED),
                        size: 26.5,
                      ),
                      const SizedBox(width: 16),
                      const Expanded(
                        child: Center(
                          child: Text(
                            'Remind Me Later',
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
              // Add Note button
              Column(
                children: [
                  SizedBox(
                    width: double.infinity,
                    height: 77,
                    child: ElevatedButton(
                      onPressed: () {
                        // Handle add note
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
                            Icons.note_add_outlined,
                            color: Color(0xFFE8EAED),
                            size: 28,
                          ),
                          const SizedBox(width: 16),
                          const Expanded(
                            child: Center(
                              child: Text(
                                'Add Note',
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
                        'Add a short note about this task',
                        style: TextStyle(
                          fontFamily: 'Inter',
                          fontSize: 20,
                          fontWeight: FontWeight.normal,
                          color: Color(0xFF9AA0A6),
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

class _HistoryNotesSection extends StatelessWidget {
  const _HistoryNotesSection();

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
            'History & Notes',
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
              // Reminder snoozed
              _HistoryItem(
                icon: Icons.notifications_outlined,
                iconColor: const Color(0xFF9AA0A6),
                backgroundColor: const Color(0xFF2D333E),
                title: 'Reminder snoozed',
                subtitle: 'Snoozed at 9:30 AM today',
                subtitleColor: const Color(0xFF9AA0A6),
              ),
              const SizedBox(height: 18),
              // Note added
              _HistoryItem(
                icon: Icons.note_outlined,
                iconColor: const Color(0xFF9AA0A6),
                backgroundColor: const Color(0xFF2D333E),
                title: 'Note added',
                subtitle: 'Felt dizzy this morning',
                subtitleColor: const Color(0xFFE8EAED),
                additionalText: 'Added at 9:25 AM today',
                additionalTextColor: const Color(0xFF9AA0A6),
              ),
              const SizedBox(height: 18),
              // Previous completion
              _HistoryItem(
                icon: Icons.check_circle,
                iconColor: const Color(0xFF81C995),
                backgroundColor: const Color(0xFF1E3A2E),
                title: 'Previous completion',
                subtitle: 'Completed yesterday at 10:15 AM',
                subtitleColor: const Color(0xFF81C995),
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
  final String title;
  final String subtitle;
  final Color subtitleColor;
  final String? additionalText;
  final Color? additionalTextColor;

  const _HistoryItem({
    required this.icon,
    required this.iconColor,
    required this.backgroundColor,
    required this.title,
    required this.subtitle,
    required this.subtitleColor,
    this.additionalText,
    this.additionalTextColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: backgroundColor,
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
                SizedBox(
                  height: additionalText != null ? 38 : 76,
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
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
                  ),
                ),
                if (additionalText == null) ...[
                  const SizedBox(height: 4.5),
                ] else ...[
                  const SizedBox(height: 4.5),
                ],
                Text(
                  subtitle,
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 22,
                    fontWeight: FontWeight.normal,
                    color: subtitleColor,
                    letterSpacing: -0.2578,
                    height: 1.6, // 35.2 / 22
                  ),
                ),
                if (additionalText != null) ...[
                  const SizedBox(height: 4.5),
                  Text(
                    additionalText!,
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 20,
                      fontWeight: FontWeight.normal,
                      color: additionalTextColor ?? const Color(0xFF9AA0A6),
                      letterSpacing: -0.4492,
                      height: 1.6, // 32 / 20
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
