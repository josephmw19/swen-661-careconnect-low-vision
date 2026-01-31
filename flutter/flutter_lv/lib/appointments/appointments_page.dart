import 'package:flutter/material.dart';
import '../home/app_header.dart';
import '../home/bottom_navigation_bar_custom.dart';
import 'appointment_details_page.dart';

class AppointmentsPage extends StatelessWidget {
  final Function(int)? onNavItemTapped;

  const AppointmentsPage({super.key, this.onNavItemTapped});

  void _handleNavigation(int index, BuildContext context) {
    if (index == 0) {
      // If tapping Home, just pop back to home page
      Navigator.of(context).pop();
    } else {
      // For other tabs, pop all routes until the first one (MyHomePage)
      // then call the main navigation callback to switch tabs
      Navigator.of(context).popUntil((route) => route.isFirst);
      onNavItemTapped?.call(index);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                  bottom: BorderSide(
                    color: const Color(0xFF3A3F4A),
                    width: 2,
                  ),
                ),
              ),
              padding: const EdgeInsets.fromLTRB(22.5, 27, 22.5, 22.5),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Appointments title
                  const SizedBox(
                    height: 44,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'Appointments',
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
                  // Upcoming Appointments subtitle
                  const SizedBox(
                    height: 38,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'Upcoming Appointments',
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
                ],
              ),
            ),
            // Content area
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(22.5),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    AppointmentCard(
                      doctorName: 'Dr. Sarah Johnson',
                      dateTime: 'Monday, February 3 at 2:30 PM',
                      location: 'Main Street Medical Center',
                      appointmentType: 'Annual checkup',
                      hasDarkerBorder: true,
                      onNavItemTapped: onNavItemTapped,
                    ),
                    const SizedBox(height: 36),
                    AppointmentCard(
                      doctorName: 'Dr. Michael Chen',
                      dateTime: 'Thursday, February 6 at 10:00 AM',
                      location: 'Cardiology Associates',
                      appointmentType: 'Follow-up visit',
                      onNavItemTapped: onNavItemTapped,
                    ),
                    const SizedBox(height: 36),
                    AppointmentCard(
                      doctorName: 'Dr. Emily Rodriguez',
                      dateTime: 'Monday, February 10 at 3:45 PM',
                      location: 'Vision Care Center',
                      appointmentType: 'Eye examination',
                      onNavItemTapped: onNavItemTapped,
                    ),
                    const SizedBox(height: 36),
                    AppointmentCard(
                      doctorName: 'Dr. James Patterson',
                      dateTime: 'Friday, February 14 at 11:15 AM',
                      location: 'Community Health Clinic',
                      appointmentType: 'Blood work and consultation',
                      onNavItemTapped: onNavItemTapped,
                    ),
                    const SizedBox(height: 36),
                    AppointmentCard(
                      doctorName: 'Dr. Lisa Martinez',
                      dateTime: 'Wednesday, February 19 at 1:00 PM',
                      location: 'Downtown Physical Therapy',
                      appointmentType: 'Physical therapy session',
                      onNavItemTapped: onNavItemTapped,
                    ),
                    const SizedBox(height: 36),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBarCustom(
        currentIndex: 0, // Home is index 0
        onTap: (index) => _handleNavigation(index, context),
      ),
    );
  }
}

class AppointmentCard extends StatelessWidget {
  final String doctorName;
  final String dateTime;
  final String location;
  final String appointmentType;
  final bool hasDarkerBorder;
  final Function(int)? onNavItemTapped;

  const AppointmentCard({
    super.key,
    required this.doctorName,
    required this.dateTime,
    required this.location,
    required this.appointmentType,
    this.hasDarkerBorder = false,
    this.onNavItemTapped,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
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
      padding: const EdgeInsets.all(29),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Doctor info section
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: const Color(0xFF4285F4), // Blue for doctor icon
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(
                  Icons.medical_services,
                  color: Colors.white,
                  size: 20,
                ),
              ),
              const SizedBox(width: 13.5),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      doctorName,
                      style: const TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        letterSpacing: 0.2158,
                        height: 1.5, // 39 / 26
                      ),
                    ),
                    const SizedBox(height: 22.5),
                    // Date/Time row
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Icon(
                          Icons.calendar_today,
                          color: Color(0xFF81C995),
                          size: 26,
                        ),
                        const SizedBox(width: 13.5),
                        Expanded(
                          child: Text(
                            dateTime,
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
                      ],
                    ),
                    const SizedBox(height: 18),
                    // Location row
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Icon(
                          Icons.location_on,
                          color: Color(0xFFF9AB00),
                          size: 26,
                        ),
                        const SizedBox(width: 13.5),
                        Expanded(
                          child: Text(
                            location,
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
                      ],
                    ),
                    const SizedBox(height: 18),
                    // Appointment type
                    Text(
                      appointmentType,
                      style: const TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 24,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFFA8C7FA),
                        letterSpacing: 0.0703,
                        height: 1.6, // 38.4 / 24
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 22.5),
          // View Details button
          SizedBox(
            width: double.infinity,
            height: 90,
            child: ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => AppointmentDetailsPage(
                      doctorName: doctorName,
                      dateTime: dateTime,
                      location: location,
                      appointmentType: appointmentType,
                      clinicName: location,
                      onNavItemTapped: onNavItemTapped,
                    ),
                  ),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF4285F4),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.25),
                ),
                padding: EdgeInsets.zero,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'View Details',
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 26,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                      letterSpacing: 0.2158,
                    ),
                  ),
                  const SizedBox(width: 8),
                  const Icon(
                    Icons.arrow_forward,
                    color: Colors.white,
                    size: 32,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
