import 'package:flutter/material.dart';

enum MedicationStatus {
  dueNow,
  taken,
  scheduled,
  dueSoon,
}

class MedicationListItem extends StatelessWidget {
  final String name;
  final String instructions;
  final String? additionalNotes;
  final MedicationStatus status;
  final String? statusText;
  final String? takenTime;
  final VoidCallback? onMarkAsTaken;
  final VoidCallback? onTap;

  const MedicationListItem({
    super.key,
    required this.name,
    required this.instructions,
    this.additionalNotes,
    required this.status,
    this.statusText,
    this.takenTime,
    this.onMarkAsTaken,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final hasDarkerBorder = status == MedicationStatus.dueNow ||
        status == MedicationStatus.dueSoon;

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
      padding: const EdgeInsets.all(29),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Medication info section
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Pill icon
              Container(
                width: 32,
                height: 32,
                margin: const EdgeInsets.only(top: 4.5),
                decoration: BoxDecoration(
                  color: const Color(0xFF4285F4), // Light blue for pill icon
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Icon(
                  Icons.medication,
                  color: Colors.white,
                  size: 20,
                ),
              ),
              const SizedBox(width: 13.5),
              // Medication details
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Medication name
                    SizedBox(
                      height: 38,
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          name,
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
                    const SizedBox(height: 9),
                    // Instructions
                    SizedBox(
                      height: 76,
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: Text(
                          instructions,
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
                    if (additionalNotes != null) ...[
                      const SizedBox(height: 9),
                      SizedBox(
                        height: additionalNotes!.length > 20 ? 68 : 34,
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            additionalNotes!,
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
                    const SizedBox(height: 9),
                    // Status section
                    _buildStatusSection(),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 22.5),
          // Action button or taken status
          if (status == MedicationStatus.dueNow ||
              status == MedicationStatus.dueSoon)
            _buildMarkAsTakenButton()
          else if (status == MedicationStatus.taken)
            _buildTakenStatus(),
        ],
      ),
      ),
    );
  }

  Widget _buildStatusSection() {
    switch (status) {
      case MedicationStatus.dueNow:
      case MedicationStatus.dueSoon:
        return Row(
          children: [
            const Icon(
              Icons.access_time,
              color: Color(0xFFF9AB00),
              size: 22,
            ),
            const SizedBox(width: 13.5),
            Expanded(
              child: SizedBox(
                height: 76,
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    statusText ?? '',
                    style: const TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 24,
                      fontWeight: FontWeight.w500, // Medium
                      color: Color(0xFFF9AB00),
                      letterSpacing: 0.0703,
                      height: 1.6, // 38.4 / 24
                    ),
                  ),
                ),
              ),
            ),
          ],
        );
      case MedicationStatus.scheduled:
        return Row(
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
                    statusText ?? '',
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
        );
      case MedicationStatus.taken:
        return const SizedBox.shrink();
    }
  }

  Widget _buildMarkAsTakenButton() {
    return SizedBox(
      width: double.infinity,
      height: 90,
      child: ElevatedButton(
        onPressed: onMarkAsTaken ?? () {},
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
    );
  }

  Widget _buildTakenStatus() {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1E3A2F),
        borderRadius: BorderRadius.circular(15.25),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 22.5, vertical: 20),
      child: Row(
        children: [
          const Icon(
            Icons.check_circle,
            color: Color(0xFF81C995),
            size: 25,
          ),
          const SizedBox(width: 13.5),
          Expanded(
            child: SizedBox(
              height: 72,
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  takenTime ?? 'Taken today',
                  style: const TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 24,
                    fontWeight: FontWeight.w500, // Medium
                    color: Color(0xFF81C995),
                    letterSpacing: 0.0703,
                    height: 1.5, // 36 / 24
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
