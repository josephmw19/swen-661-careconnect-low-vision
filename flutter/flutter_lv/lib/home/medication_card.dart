import 'package:flutter/material.dart';

class MedicationCard extends StatelessWidget {
  final bool isMarkedAsTaken;
  final bool isSnoozed;
  final VoidCallback? onMarkAsTaken;
  final VoidCallback? onSnooze;

  final String? takenTimeText;

  const MedicationCard({
    super.key,
    this.isMarkedAsTaken = false,
    this.isSnoozed = false,
    this.onMarkAsTaken,
    this.onSnooze,
    this.takenTimeText,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(color: const Color(0xFF4A5568), width: 2),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(27),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Header section with icon and "Next Medication"
          Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: const Color(0xFFFFB3BA),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Center(
                  child: Icon(Icons.medication, color: Colors.white, size: 20),
                ),
              ),
              const SizedBox(width: 13.5),
              const Text(
                'Next Medication',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 28,
                  fontWeight: FontWeight.w600,
                  color: Colors.white,
                  letterSpacing: 0.3828,
                  height: 1.4,
                ),
              ),
            ],
          ),
          const SizedBox(height: 22.5),

          // Medication details section
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Metformin 500mg',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 26,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  letterSpacing: 0.2158,
                  height: 1.6,
                ),
              ),
              const SizedBox(height: 9),

              // Time information with clock icon
              Row(
                children: [
                  Icon(
                    Icons.access_time,
                    color: isMarkedAsTaken
                        ? const Color(0xFF34A853)
                        : const Color(0xFF81C995),
                    size: 18,
                  ),
                  const SizedBox(width: 13.5),
                  Expanded(
                    child: Text(
                      isMarkedAsTaken
                          ? (takenTimeText ?? 'Taken today')
                          : 'Due at 2:00 PM (in 15 minutes)',
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 24,
                        fontWeight: FontWeight.normal,
                        color: isMarkedAsTaken
                            ? const Color(0xFF34A853)
                            : const Color(0xFF81C995),
                        letterSpacing: 0.0703,
                        height: 1.6,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 27),

          // "Mark as Taken" button
          SizedBox(
            width: double.infinity,
            height: 90,
            child: ElevatedButton(
              onPressed: isMarkedAsTaken ? null : onMarkAsTaken,
              style: ElevatedButton.styleFrom(
                backgroundColor: isMarkedAsTaken
                    ? const Color(0xFF34A853)
                    : const Color(0xFF4285F4),
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
                  Expanded(
                    child: Center(
                      child: Text(
                        isMarkedAsTaken ? 'Taken' : 'Mark as Taken',
                        style: const TextStyle(
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

          // "Snooze 10 min" button
          SizedBox(
            width: double.infinity,
            height: 77,
            child: ElevatedButton(
              onPressed: isMarkedAsTaken || isSnoozed ? null : onSnooze,
              style: ElevatedButton.styleFrom(
                backgroundColor: isSnoozed
                    ? const Color(0xFF4285F4)
                    : const Color(0xFF2D333E),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.25),
                ),
                padding: EdgeInsets.zero,
              ),
              child: Row(
                children: [
                  const SizedBox(width: 24),
                  const SizedBox(
                    width: 32,
                    height: 32,
                    child: Center(
                      child: Icon(
                        Icons.snooze,
                        color: Color(0xFFE8EAED),
                        size: 28,
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Center(
                      child: Text(
                        isSnoozed ? 'Snoozed' : 'Snooze 10 min',
                        style: const TextStyle(
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
        ],
      ),
    );
  }
}
