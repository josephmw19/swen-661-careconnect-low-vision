import 'package:flutter/material.dart';

class TodayCard extends StatelessWidget {
  final bool bloodPressureCheckCompleted;
  final bool lunchMedicationCompleted;
  final bool eveningWalkCompleted;
  final Function(String)? onTaskToggle;

  const TodayCard({
    super.key,
    this.bloodPressureCheckCompleted = true,
    this.lunchMedicationCompleted = false,
    this.eveningWalkCompleted = false,
    this.onTaskToggle,
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
      padding: const EdgeInsets.all(29),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header with calendar icon
          Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: const Color(0xFF4285F4), // Blue for calendar
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(
                  Icons.calendar_today,
                  color: Colors.white,
                  size: 20,
                ),
              ),
              const SizedBox(width: 13.5),
              const Text(
                'Today',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 28,
                  fontWeight: FontWeight.w600, // Semi-bold
                  color: Colors.white,
                  letterSpacing: 0.3828,
                  height: 1.4, // 39.2 / 28
                ),
              ),
            ],
          ),
          const SizedBox(height: 27),
          
          // Task list
          Column(
            children: [
              _TaskItem(
                title: 'Blood Pressure Check',
                time: '9:00 AM',
                isCompleted: bloodPressureCheckCompleted,
                height: 157.5,
                onTap: () => onTaskToggle?.call('blood_pressure'),
              ),
              const SizedBox(height: 18),
              _TaskItem(
                title: 'Lunch Medication',
                time: '12:30 PM',
                isCompleted: lunchMedicationCompleted,
                height: 119.5,
                onTap: () => onTaskToggle?.call('lunch_medication'),
              ),
              const SizedBox(height: 18),
              _TaskItem(
                title: 'Evening Walk',
                time: '6:00 PM',
                isCompleted: eveningWalkCompleted,
                height: 119.5,
                onTap: () => onTaskToggle?.call('evening_walk'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _TaskItem extends StatelessWidget {
  final String title;
  final String time;
  final bool isCompleted;
  final double height;
  final VoidCallback? onTap;

  const _TaskItem({
    required this.title,
    required this.time,
    required this.isCompleted,
    required this.height,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: height,
        decoration: BoxDecoration(
          color: const Color(0xFF2D333E),
          borderRadius: BorderRadius.circular(15.25),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 22.5),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 24,
                      fontWeight: FontWeight.w600, // Semi-bold
                      color: Colors.white,
                      letterSpacing: 0.0703,
                      height: 1.6, // 38.4 / 24
                    ),
                  ),
                  const SizedBox(height: 4.5),
                  Text(
                    time,
                    style: const TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 22,
                      fontWeight: FontWeight.normal,
                      color: Color(0xFF9AA0A6),
                      letterSpacing: -0.2578,
                      height: 1.5, // 33 / 22
                    ),
                  ),
                ],
              ),
            ),
            if (isCompleted)
              const Icon(
                Icons.check_circle,
                color: Color(0xFF81C995),
                size: 27,
              )
            else
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  border: Border.all(
                    color: const Color(0xFF5A6270),
                    width: 2,
                  ),
                  shape: BoxShape.circle,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
