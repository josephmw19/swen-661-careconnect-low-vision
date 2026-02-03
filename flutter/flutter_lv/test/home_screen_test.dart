import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

// Import real home widgets used on the home tab
import 'package:flutter_lv/home/app_header.dart';
import 'package:flutter_lv/home/bottom_navigation_bar_custom.dart';
import 'package:flutter_lv/home/medication_card.dart';
import 'package:flutter_lv/home/refill_reminder_card.dart';
import 'package:flutter_lv/home/today_card.dart';
import 'package:flutter_lv/home/upcoming_appointments_card.dart';

import 'helpers/pump_app.dart';

void main() {
  testWidgets('Home screen renders base layout', (WidgetTester tester) async {
    await pumpHome(tester);

    expect(find.byType(MaterialApp), findsOneWidget);
    expect(find.byType(Scaffold), findsOneWidget);
    expect(find.byType(SingleChildScrollView), findsOneWidget);
  });

  testWidgets('Home shows custom header and bottom navigation', (
    WidgetTester tester,
  ) async {
    await pumpHome(tester);

    expect(find.byType(AppHeader), findsOneWidget);
    expect(find.byType(BottomNavigationBarCustom), findsOneWidget);
  });

  testWidgets('Home shows Medication card and Today card', (
    WidgetTester tester,
  ) async {
    await pumpHome(tester);

    expect(find.byType(MedicationCard), findsOneWidget);
    expect(find.byType(TodayCard), findsOneWidget);
  });

  testWidgets('Home shows Refill reminder and Upcoming appointments', (
    WidgetTester tester,
  ) async {
    await pumpHome(tester);

    expect(find.byType(RefillReminderCard), findsOneWidget);
    expect(find.byType(UpcomingAppointmentsCard), findsOneWidget);
  });

  testWidgets('Home has tappable controls', (WidgetTester tester) async {
    await pumpHome(tester);

    // MedicationCard and nav should include tap targets.
    final hasTapTargets =
        find.byType(InkWell).evaluate().isNotEmpty ||
        find.byType(GestureDetector).evaluate().isNotEmpty ||
        find.byType(IconButton).evaluate().isNotEmpty ||
        find.byType(ElevatedButton).evaluate().isNotEmpty ||
        find.byType(TextButton).evaluate().isNotEmpty;

    expect(hasTapTargets, true);
  });
}
