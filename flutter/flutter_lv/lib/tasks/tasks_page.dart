import 'package:flutter/material.dart';
import 'package:flutter_lv/widgets/responsive_scaffold.dart';
import '../home/app_header.dart';
import '../home/bottom_navigation_bar_custom.dart';
import 'task_list_item.dart';
import 'task_details_page.dart';

class TasksPage extends StatefulWidget {
  final Function(int)? onNavItemTapped;

  const TasksPage({super.key, this.onNavItemTapped});

  @override
  State<TasksPage> createState() => _TasksPageState();
}

class _TasksPageState extends State<TasksPage> {
  // Track which tasks have been marked as complete
  bool _morningVitaminsCompleted = false;
  bool _drinkWaterCompleted = false;

  void _handleMarkComplete(String taskTitle) {
    setState(() {
      switch (taskTitle) {
        case 'Take morning vitamins':
          _morningVitaminsCompleted = true;
          break;
        case 'Drink 8 glasses of water':
          _drinkWaterCompleted = true;
          break;
      }
    });
  }

  String _getCompletionTime() {
    final now = DateTime.now();
    final hour = now.hour;
    final minute = now.minute;
    final period = hour >= 12 ? 'PM' : 'AM';
    final displayHour = hour > 12 ? hour - 12 : (hour == 0 ? 12 : hour);
    final displayMinute = minute.toString().padLeft(2, '0');
    return 'Completed at $displayHour:$displayMinute $period';
  }

  @override
  Widget build(BuildContext context) {
    return ResponsiveScaffold(
      appBar: const AppHeader(),
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
                  // Tasks title
                  const SizedBox(
                    height: 44,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'Tasks',
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
                  // Today subtitle
                ],
              ),
            ),
            // Content area with task lists
            Expanded(
              child: Container(
                color: const Color(0xFF1A1D24),
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(22.5, 36, 22.5, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Today section
                      const _SectionHeader(title: 'Today'),
                      const SizedBox(height: 27),
                      // Take morning vitamins
                      TaskListItem(
                        title: 'Take morning vitamins',
                        status: _morningVitaminsCompleted
                            ? TaskStatus.completed
                            : TaskStatus.notCompleted,
                        statusText: _morningVitaminsCompleted
                            ? null
                            : 'Status: Not completed',
                        completionText: _morningVitaminsCompleted
                            ? _getCompletionTime()
                            : null,
                        hasActionButton: !_morningVitaminsCompleted,
                        onMarkComplete: _morningVitaminsCompleted
                            ? null
                            : () =>
                                  _handleMarkComplete('Take morning vitamins'),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TaskDetailsPage(
                                taskTitle: 'Take morning vitamins',
                                description: 'Take your daily vitamins',
                                dueTime: _morningVitaminsCompleted
                                    ? 'Completed'
                                    : 'Today at 8:00 AM',
                                statusMessage: _morningVitaminsCompleted
                                    ? 'Completed'
                                    : 'This task is still pending',
                                onNavItemTapped: widget.onNavItemTapped,
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 27),
                      // Check blood pressure
                      TaskListItem(
                        title: 'Check blood pressure',
                        status: TaskStatus.completed,
                        completionText: 'Completed at 7:45 AM',
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TaskDetailsPage(
                                taskTitle: 'Check blood pressure',
                                description:
                                    'Measure blood pressure using home monitor and record the result.',
                                dueTime: 'Today at 10:00 AM',
                                statusMessage: 'This task is still pending',
                                onNavItemTapped: widget.onNavItemTapped,
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 27),
                      // Drink 8 glasses of water
                      TaskListItem(
                        title: 'Drink 8 glasses of water',
                        description: 'Stay hydrated throughout the day',
                        status: _drinkWaterCompleted
                            ? TaskStatus.completed
                            : TaskStatus.notCompleted,
                        statusText: _drinkWaterCompleted
                            ? null
                            : 'Status: Not completed',
                        completionText: _drinkWaterCompleted
                            ? _getCompletionTime()
                            : null,
                        hasActionButton: !_drinkWaterCompleted,
                        onMarkComplete: _drinkWaterCompleted
                            ? null
                            : () => _handleMarkComplete(
                                'Drink 8 glasses of water',
                              ),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TaskDetailsPage(
                                taskTitle: 'Drink 8 glasses of water',
                                description: 'Stay hydrated throughout the day',
                                dueTime: _drinkWaterCompleted
                                    ? 'Completed'
                                    : 'Today',
                                statusMessage: _drinkWaterCompleted
                                    ? 'Completed'
                                    : 'This task is still pending',
                                onNavItemTapped: widget.onNavItemTapped,
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 27),
                      // 30-minute morning walk
                      TaskListItem(
                        title: '30-minute morning walk',
                        status: TaskStatus.completed,
                        completionText: 'Completed at 6:30 AM',
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TaskDetailsPage(
                                taskTitle: '30-minute morning walk',
                                description:
                                    'Take a 30-minute walk in the morning',
                                dueTime: 'Today at 6:30 AM',
                                statusMessage: 'Completed',
                                onNavItemTapped: widget.onNavItemTapped,
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 45),
                      // Upcoming section
                      const _SectionHeader(title: 'Upcoming'),
                      const SizedBox(height: 27),
                      // Call pharmacy for refill
                      TaskListItem(
                        title: 'Call pharmacy for refill',
                        status: TaskStatus.upcoming,
                        dueDate: 'Due February 2, 2026',
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TaskDetailsPage(
                                taskTitle: 'Call pharmacy for refill',
                                description:
                                    'Call pharmacy to request medication refill',
                                dueTime: 'Due February 2, 2026',
                                onNavItemTapped: widget.onNavItemTapped,
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 27),
                      // Schedule annual physical
                      TaskListItem(
                        title: 'Schedule annual physical',
                        status: TaskStatus.upcoming,
                        dueDate: 'Due February 10, 2026',
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TaskDetailsPage(
                                taskTitle: 'Schedule annual physical',
                                description:
                                    'Schedule your annual physical examination',
                                dueTime: 'Due February 10, 2026',
                                onNavItemTapped: widget.onNavItemTapped,
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 27),
                      // Order blood pressure monitor batteries
                      TaskListItem(
                        title: 'Order blood pressure monitor batteries',
                        description: 'Current batteries running low',
                        status: TaskStatus.upcoming,
                        dueDate: 'Due February 5, 2026',
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TaskDetailsPage(
                                taskTitle:
                                    'Order blood pressure monitor batteries',
                                description: 'Current batteries running low',
                                dueTime: 'Due February 5, 2026',
                                onNavItemTapped: widget.onNavItemTapped,
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 45),
                      // Completed section
                      const _SectionHeader(title: 'Completed'),
                      const SizedBox(height: 27),
                      // Review medication list with doctor
                      TaskListItem(
                        title: 'Review medication list with doctor',
                        status: TaskStatus.completed,
                        completionText: 'Completed January 25, 2026',
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TaskDetailsPage(
                                taskTitle: 'Review medication list with doctor',
                                description:
                                    'Review current medications with your doctor',
                                dueTime: 'Completed January 25, 2026',
                                statusMessage: 'Completed',
                                onNavItemTapped: widget.onNavItemTapped,
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 27),
                      // Update emergency contact information
                      TaskListItem(
                        title: 'Update emergency contact information',
                        status: TaskStatus.completed,
                        completionText: 'Completed January 24, 2026',
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TaskDetailsPage(
                                taskTitle:
                                    'Update emergency contact information',
                                description:
                                    'Update your emergency contact information',
                                dueTime: 'Completed January 24, 2026',
                                statusMessage: 'Completed',
                                onNavItemTapped: widget.onNavItemTapped,
                              ),
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 27),
                      // Pick up prescription refills
                      TaskListItem(
                        title: 'Pick up prescription refills',
                        description: 'Collected from Pharmacy',
                        status: TaskStatus.completed,
                        completionText: 'Completed January 23, 2026',
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => TaskDetailsPage(
                                taskTitle: 'Pick up prescription refills',
                                description: 'Collected from Pharmacy',
                                dueTime: 'Completed January 23, 2026',
                                statusMessage: 'Completed',
                                onNavItemTapped: widget.onNavItemTapped,
                              ),
                            ),
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
        currentIndex: 2, // Tasks is index 2
        onTap: widget.onNavItemTapped ?? (index) {},
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;

  const _SectionHeader({required this.title});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 9),
      child: SizedBox(
        height: 38,
        child: Align(
          alignment: Alignment.centerLeft,
          child: Text(
            title,
            style: const TextStyle(
              fontFamily: 'Inter',
              fontSize: 28,
              fontWeight: FontWeight.w600,
              color: Colors.white,
              letterSpacing: 0.3828,
              height: 1.4, // 39.2 / 28
            ),
          ),
        ),
      ),
    );
  }
}
