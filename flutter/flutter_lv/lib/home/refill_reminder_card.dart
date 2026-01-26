import 'package:flutter/material.dart';

class RefillReminderCard extends StatelessWidget {
  const RefillReminderCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF3D2A1F),
        border: Border.all(
          color: const Color(0xFFE8A87C),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.fromLTRB(29, 29, 29, 2),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Warning icon
          Container(
            width: 32,
            height: 32,
            margin: const EdgeInsets.only(top: 4.5),
            decoration: BoxDecoration(
              color: const Color(0xFFFFD700), // Yellow for warning
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.warning,
              color: Colors.white,
              size: 20,
            ),
          ),
          const SizedBox(width: 18), // 50 - 32 = 18
          
          // Text content
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Refill Reminder',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 26,
                    fontWeight: FontWeight.w600, // Semi-bold
                    color: Colors.white,
                    letterSpacing: 0.2158,
                    height: 1.5, // 39 / 26
                  ),
                ),
                const SizedBox(height: 9),
                const Text(
                  'Metformin refill due in 3 days. Tap to contact pharmacy.',
                  style: TextStyle(
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
