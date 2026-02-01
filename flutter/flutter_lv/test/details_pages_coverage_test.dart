import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:flutter_lv/appointments/appointments_page.dart';
import 'package:flutter_lv/appointments/appointment_details_page.dart';
import 'package:flutter_lv/medications/medications_page.dart';
import 'package:flutter_lv/medications/medication_details_page.dart';
import 'package:flutter_lv/tasks/tasks_page.dart';
import 'package:flutter_lv/tasks/task_details_page.dart';

Widget wrap(Widget child) => MaterialApp(home: Scaffold(body: child));

void main() {
  group('Coverage boost: render pages', () {
    testWidgets('AppointmentsPage renders', (tester) async {
      await tester.pumpWidget(wrap(const AppointmentsPage()));
      await tester.pumpAndSettle();
      expect(find.byType(AppointmentsPage), findsOneWidget);
    });

    testWidgets('MedicationsPage renders', (tester) async {
      await tester.pumpWidget(wrap(MedicationsPage(onNavItemTapped: (_) {})));
      await tester.pumpAndSettle();
      expect(find.byType(MedicationsPage), findsOneWidget);
    });

    testWidgets('TasksPage renders', (tester) async {
      await tester.pumpWidget(wrap(TasksPage(onNavItemTapped: (_) {})));
      await tester.pumpAndSettle();
      expect(find.byType(TasksPage), findsOneWidget);
    });

    testWidgets('AppointmentDetailsPage renders', (tester) async {
      await tester.pumpWidget(
        wrap(
          const AppointmentDetailsPage(
            doctorName: 'Dr. Test Provider',
            dateTime: 'Mon, Feb 3, 2026 at 10:00 AM',
            location: 'CareConnect Clinic',
            appointmentType: 'Primary Care Visit',
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byType(AppointmentDetailsPage), findsOneWidget);
      expect(find.text('Appointment Details'), findsOneWidget);
    });

    testWidgets('MedicationDetailsPage renders', (tester) async {
      await tester.pumpWidget(
        wrap(
          const MedicationDetailsPage(
            medicationName: 'Lisinopril',
            dosage: '10 mg',
            instructions: 'Take 1 tablet by mouth daily with water.',
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byType(MedicationDetailsPage), findsOneWidget);
      expect(find.text('Medication Details'), findsOneWidget);
    });

    testWidgets('TaskDetailsPage renders', (tester) async {
      await tester.pumpWidget(
        wrap(const TaskDetailsPage(taskTitle: 'Complete daily check-in')),
      );
      await tester.pumpAndSettle();
      expect(find.byType(TaskDetailsPage), findsOneWidget);
    });
  });
}
