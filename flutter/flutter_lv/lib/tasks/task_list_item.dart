import 'package:flutter/material.dart';

enum TaskStatus {
  notCompleted,
  completed,
  upcoming,
}

class TaskListItem extends StatelessWidget {
  final String title;
  final String? description;
  final TaskStatus status;
  final String? statusText;
  final String? completionText;
  final String? dueDate;
  final bool hasActionButton;
  final VoidCallback? onMarkComplete;
  final VoidCallback? onTap;

  const TaskListItem({
    super.key,
    required this.title,
    this.description,
    required this.status,
    this.statusText,
    this.completionText,
    this.dueDate,
    this.hasActionButton = false,
    this.onMarkComplete,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final hasDarkerBorder = status == TaskStatus.notCompleted;

    return GestureDetector(
      onTap: onTap,
      child: Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: hasDarkerBorder
              ? const Color(0xFF4A5568)
              : const Color(0xFF3A3F4A),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.fromLTRB(29, 29, 29, 2),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Task info section
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Task icon
              Container(
                width: 32,
                height: 32,
                margin: const EdgeInsets.only(top: 4.5),
                decoration: BoxDecoration(
                  color: status == TaskStatus.completed
                      ? const Color(0xFF81C995) // Green for completed
                      : const Color(0xFF4285F4), // Blue for other tasks
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Icon(
                  status == TaskStatus.completed
                      ? Icons.check_circle
                      : status == TaskStatus.upcoming
                          ? Icons.calendar_today
                          : Icons.radio_button_unchecked,
                  color: Colors.white,
                  size: 20,
                ),
              ),
              const SizedBox(width: 13.5),
              // Task details
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Task title
                    SizedBox(
                      height: description != null && description!.length > 30
                          ? 114
                          : 76,
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          title,
                          style: const TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 26,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                            letterSpacing: 0.2158,
                            height: 1.5, // 39 / 26
                          ),
                        ),
                      ),
                    ),
                    if (description != null) ...[
                      const SizedBox(height: 9),
                      SizedBox(
                        height: 76,
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            description!,
                            style: const TextStyle(
                              fontFamily: 'Inter',
                              fontSize: 24,
                              fontWeight: FontWeight.normal,
                              color: Color(0xFFE8EAED),
                              letterSpacing: 0.0703,
                              height: 1.6, // 38.4 / 24
                            ),
                          ),
                        ),
                      ),
                    ],
                    if (statusText != null) ...[
                      const SizedBox(height: 13.5),
                      SizedBox(
                        height: 34,
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            statusText!,
                            style: const TextStyle(
                              fontFamily: 'Inter',
                              fontSize: 22,
                              fontWeight: FontWeight.normal,
                              color: Color(0xFF9AA0A6),
                              letterSpacing: -0.2578,
                              height: 1.6, // 35.2 / 22
                            ),
                          ),
                        ),
                      ),
                    ],
                    if (completionText != null) ...[
                      const SizedBox(height: 13.5),
                      SizedBox(
                        height: 76,
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            completionText!,
                            style: const TextStyle(
                              fontFamily: 'Inter',
                              fontSize: 24,
                              fontWeight: FontWeight.normal,
                              color: Color(0xFF81C995),
                              letterSpacing: 0.0703,
                              height: 1.6, // 38.4 / 24
                            ),
                          ),
                        ),
                      ),
                    ],
                    if (dueDate != null) ...[
                      const SizedBox(height: 13.5),
                      Row(
                        children: [
                          const Icon(
                            Icons.access_time,
                            color: Color(0xFF9AA0A6),
                            size: 20,
                          ),
                          const SizedBox(width: 13.5),
                          Expanded(
                            child: SizedBox(
                              height: 76,
                              child: Align(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  dueDate!,
                                  style: const TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 24,
                                    fontWeight: FontWeight.normal,
                                    color: Color(0xFF9AA0A6),
                                    letterSpacing: 0.0703,
                                    height: 1.6, // 38.4 / 24
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
          if (hasActionButton) ...[
            const SizedBox(height: 18),
            // Mark as Complete button
            SizedBox(
              width: double.infinity,
              height: 126,
              child: ElevatedButton(
                onPressed: onMarkComplete,
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
                      width: 27.5,
                      height: 27.5,
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
        ],
      ),
      ),
    );
  }
}
