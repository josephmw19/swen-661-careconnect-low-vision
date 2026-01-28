import 'package:flutter/material.dart';
import '../home/app_header.dart';
import '../home/bottom_navigation_bar_custom.dart';

class AppointmentDetailsPage extends StatelessWidget {
  final String doctorName;
  final String dateTime;
  final String location;
  final String appointmentType;
  final String? clinicName;
  final String? address;
  final String? suite;
  final String? cityStateZip;
  final Function(int)? onNavItemTapped;

  const AppointmentDetailsPage({
    super.key,
    required this.doctorName,
    required this.dateTime,
    required this.location,
    required this.appointmentType,
    this.clinicName,
    this.address,
    this.suite,
    this.cityStateZip,
    this.onNavItemTapped,
  });

  void _handleNavigation(int index, BuildContext context) {
    if (index == 0) {
      // If tapping Home, pop back to appointments page
      Navigator.of(context).pop();
    } else {
      // If tapping other nav items, pop back to main page and navigate
      Navigator.of(context).popUntil((route) => route.isFirst);
      if (onNavItemTapped != null) {
        onNavItemTapped!(index);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppHeader(),
      body: Container(
        color: const Color(0xFF1A1D24),
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(22.5, 27, 22.5, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Appointment Details title with back button
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
                        Navigator.of(context).pop();
                      },
                      padding: EdgeInsets.zero,
                      constraints: const BoxConstraints(
                        minWidth: 40,
                        minHeight: 40,
                      ),
                    ),
                    const SizedBox(width: 8),
                    // Appointment Details title
                    const Expanded(
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          'Appointment Details',
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

              // Appointment Summary Section
              _AppointmentSummarySection(
                doctorName: doctorName,
                dateTime: dateTime,
                appointmentType: appointmentType,
              ),
              const SizedBox(height: 36),

              // Location Section
              _LocationSection(
                clinicName: clinicName ?? location,
                address: address ?? '450 Main Street',
                suite: suite ?? 'Suite 200',
                cityStateZip: cityStateZip ?? 'Springfield, IL 62701',
              ),
              const SizedBox(height: 36),

              // Preparation Notes Section
              const _PreparationNotesSection(),
              const SizedBox(height: 36),

              // Actions Section
              const _ActionsSection(),
              const SizedBox(height: 36),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBarCustom(
        currentIndex: 0, // Home is index 0
        onTap: (index) => _handleNavigation(index, context),
      ),
    );
  }
}

class _AppointmentSummarySection extends StatelessWidget {
  final String doctorName;
  final String dateTime;
  final String appointmentType;

  const _AppointmentSummarySection({
    required this.doctorName,
    required this.dateTime,
    required this.appointmentType,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF252932),
        border: Border.all(
          color: const Color(0xFF4A5568),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.fromLTRB(29, 29, 29, 2),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              const Icon(
                Icons.medical_services,
                color: Color(0xFF4285F4),
                size: 26,
              ),
              const SizedBox(width: 13.5),
              const Expanded(
                child: Text(
                  'Appointment Summary',
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
          // Provider
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Provider',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 22,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF9AA0A6),
                  letterSpacing: -0.2578,
                  height: 1.5, // 33 / 22
                ),
              ),
              const SizedBox(height: 9),
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
            ],
          ),
          const SizedBox(height: 22.5),
          // Date and Time
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Date and Time',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 22,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF9AA0A6),
                  letterSpacing: -0.2578,
                  height: 1.5, // 33 / 22
                ),
              ),
              const SizedBox(height: 9),
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
            ],
          ),
          const SizedBox(height: 22.5),
          // Visit Type
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Visit Type',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 22,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF9AA0A6),
                  letterSpacing: -0.2578,
                  height: 1.5, // 33 / 22
                ),
              ),
              const SizedBox(height: 9),
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
        ],
      ),
    );
  }
}

class _LocationSection extends StatelessWidget {
  final String clinicName;
  final String address;
  final String suite;
  final String cityStateZip;

  const _LocationSection({
    required this.clinicName,
    required this.address,
    required this.suite,
    required this.cityStateZip,
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
      padding: const EdgeInsets.fromLTRB(29, 29, 29, 2),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              const Icon(
                Icons.location_on,
                color: Color(0xFFF9AB00),
                size: 32,
              ),
              const SizedBox(width: 13.5),
              const Expanded(
                child: Text(
                  'Location',
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
          // Clinic Name
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Clinic Name',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 22,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF9AA0A6),
                  letterSpacing: -0.2578,
                  height: 1.5, // 33 / 22
                ),
              ),
              const SizedBox(height: 9),
              Text(
                clinicName,
                style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 24,
                  fontWeight: FontWeight.w500,
                  color: Color(0xFFE8EAED),
                  letterSpacing: 0.0703,
                  height: 1.6, // 38.4 / 24
                ),
              ),
            ],
          ),
          const SizedBox(height: 22.5),
          // Address
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Address',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 22,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF9AA0A6),
                  letterSpacing: -0.2578,
                  height: 1.5, // 33 / 22
                ),
              ),
              const SizedBox(height: 9),
              Text(
                address,
                style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 24,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFFE8EAED),
                  letterSpacing: 0.0703,
                  height: 1.6, // 38.4 / 24
                ),
              ),
              const SizedBox(height: 9),
              Text(
                suite,
                style: const TextStyle(
                  fontFamily: 'Inter',
                  fontSize: 24,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFFE8EAED),
                  letterSpacing: 0.0703,
                  height: 1.6, // 38.4 / 24
                ),
              ),
              const SizedBox(height: 9),
              Text(
                cityStateZip,
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
        ],
      ),
    );
  }
}

class _PreparationNotesSection extends StatelessWidget {
  const _PreparationNotesSection();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF2D2416),
        border: Border.all(
          color: const Color(0xFFE8A87C),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.fromLTRB(29, 29, 29, 2),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: const Color(0xFFF9AB00),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.warning_amber_rounded,
                  color: Colors.white,
                  size: 20,
                ),
              ),
              const SizedBox(width: 13.5),
              const Expanded(
                child: Text(
                  'Preparation Notes',
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
          // Notes list
          Column(
            children: [
              _PreparationNoteItem(
                text: 'Arrive 15 minutes early',
                icon: Icons.access_time,
                iconColor: const Color(0xFFF9AB00),
              ),
              const SizedBox(height: 18),
              _PreparationNoteItem(
                text: 'Bring insurance card and photo ID',
                icon: null,
                iconColor: null,
              ),
              const SizedBox(height: 18),
              _PreparationNoteItem(
                text: 'Bring list of current medications',
                icon: null,
                iconColor: null,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _PreparationNoteItem extends StatelessWidget {
  final String text;
  final IconData? icon;
  final Color? iconColor;

  const _PreparationNoteItem({
    required this.text,
    this.icon,
    this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (icon != null)
          Icon(
            icon,
            color: iconColor,
            size: 26,
          )
        else
          Container(
            width: 27,
            height: 27,
            decoration: BoxDecoration(
              color: const Color(0xFFF9AB00),
              borderRadius: BorderRadius.circular(13.5),
            ),
          ),
        const SizedBox(width: 18),
        Expanded(
          child: Text(
            text,
            style: const TextStyle(
              fontFamily: 'Inter',
              fontSize: 24,
              fontWeight: FontWeight.normal,
              color: Color(0xFFE8C4A0),
              letterSpacing: 0.0703,
              height: 1.6, // 38.4 / 24
            ),
          ),
        ),
      ],
    );
  }
}

class _ActionsSection extends StatelessWidget {
  const _ActionsSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Padding(
          padding: EdgeInsets.only(left: 9),
          child: Text(
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
        ),
        const SizedBox(height: 27),
        // Add to Calendar button
        SizedBox(
          width: double.infinity,
          height: 90,
          child: ElevatedButton(
            onPressed: () {
              // Handle add to calendar
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
                const Icon(
                  Icons.add,
                  color: Colors.white,
                  size: 32,
                ),
                const SizedBox(width: 13.5),
                const Text(
                  'Add to Calendar',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 26,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                    letterSpacing: 0.2158,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 22.5),
        // Call Office button
        SizedBox(
          width: double.infinity,
          height: 90,
          child: ElevatedButton(
            onPressed: () {
              // Handle call office
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF34A853),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.25),
              ),
              padding: EdgeInsets.zero,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(
                  Icons.phone,
                  color: Colors.white,
                  size: 32,
                ),
                const SizedBox(width: 13.5),
                const Text(
                  'Call Office',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 26,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                    letterSpacing: 0.2158,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 22.5),
        // Get Directions button
        SizedBox(
          width: double.infinity,
          height: 90,
          child: ElevatedButton(
            onPressed: () {
              // Handle get directions
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF2D333E),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.25),
              ),
              padding: EdgeInsets.zero,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(
                  Icons.directions,
                  color: Color(0xFFE8EAED),
                  size: 32,
                ),
                const SizedBox(width: 13.5),
                const Text(
                  'Get Directions',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 26,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFFE8EAED),
                    letterSpacing: 0.2158,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
