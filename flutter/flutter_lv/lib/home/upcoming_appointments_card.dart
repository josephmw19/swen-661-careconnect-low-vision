import 'package:flutter/material.dart';
import '../navigation/navigation_helper.dart';
import '../navigation/app_router.dart';

class UpcomingAppointmentsCard extends StatelessWidget {
  const UpcomingAppointmentsCard({super.key});

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
                  Icons.event,
                  color: Colors.white,
                  size: 20,
                ),
              ),
              const SizedBox(width: 13.5),
              const Expanded(
                child: Text(
                  'Upcoming Appointments',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 28,
                    fontWeight: FontWeight.w600, // Semi-bold
                    color: Colors.white,
                    letterSpacing: 0.3828,
                    height: 1.4, // 39.2 / 28
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 27),
          
          // Appointments list
          Column(
            children: [
              _AppointmentItem(
                provider: 'Dr. Rodriguez',
                date: 'Feb 10, 3:45 PM',
              ),
              const SizedBox(height: 18),
              _AppointmentItem(
                provider: 'Vision Care Center',
                date: 'Mar 2, 9:00 AM',
              ),
              const SizedBox(height: 18),
              _AppointmentItem(
                provider: 'Physical Therapy',
                date: 'Mar 8, 11:30 AM',
              ),
            ],
          ),
          const SizedBox(height: 27),
          
          // View All Appointments button
          SizedBox(
            width: double.infinity,
            height: 77,
            child: ElevatedButton(
              onPressed: () {
                context.navigateTo(AppRoutes.appointments);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF4285F4),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.25),
                ),
                padding: EdgeInsets.zero,
              ),
              child: const Center(
                child: Text(
                  'View All Appointments',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 24,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                    letterSpacing: 0.0703,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _AppointmentItem extends StatelessWidget {
  final String provider;
  final String date;

  const _AppointmentItem({
    required this.provider,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Container(
        decoration: BoxDecoration(
          color: const Color(0xFF2D333E),
          borderRadius: BorderRadius.circular(15.25),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 22.5, vertical: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              provider,
              style: const TextStyle(
                fontFamily: 'Inter',
                fontSize: 24,
                fontWeight: FontWeight.w600, // Semi-bold
                color: Colors.white,
                letterSpacing: 0.0703,
                height: 1.6, // 38.4 / 24
              ),
              textAlign: TextAlign.left,
            ),
            const SizedBox(height: 4.5),
            Text(
              date,
              style: const TextStyle(
                fontFamily: 'Inter',
                fontSize: 22,
                fontWeight: FontWeight.normal,
                color: Color(0xFF9AA0A6),
                letterSpacing: -0.2578,
                height: 1.5, // 33 / 22
              ),
              textAlign: TextAlign.left,
            ),
          ],
        ),
      ),
    );
  }
}

