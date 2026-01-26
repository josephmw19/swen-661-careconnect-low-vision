import 'package:flutter/material.dart';

class MedicationCard extends StatelessWidget {
  const MedicationCard({super.key});

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
                  const Icon(
                    Icons.access_time,
                    color: Color(0xFF81C995),
                    size: 18,
                  ),
                  const SizedBox(width: 13.5),
                  const Expanded(
                    child: Text(
                      'Due at 2:00 PM (in 15 minutes)',
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 24,
                        fontWeight: FontWeight.normal,
                        color: Color(0xFF81C995),
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

          // "Snooze 10 min" button
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
                children: const [
                  SizedBox(width: 24),
                  SizedBox(
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
                  SizedBox(width: 16),
                  Expanded(
                    child: Center(
                      child: Text(
                        'Snooze 10 min',
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
                  SizedBox(width: 24),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
