import 'package:flutter_test/flutter_test.dart';

import 'package:flutter_lv/main.dart';
import 'package:flutter_lv/home/app_header.dart';
import 'package:flutter_lv/home/bottom_navigation_bar_custom.dart';
import 'package:flutter_lv/home/medication_card.dart';
import 'package:flutter_lv/home/refill_reminder_card.dart';
import 'package:flutter_lv/home/today_card.dart';
import 'package:flutter_lv/home/upcoming_appointments_card.dart';

void main() {
  testWidgets('Home renders core layout widgets', (tester) async {
    await tester.pumpWidget(const MyApp());
    await tester.pumpAndSettle();

    expect(find.byType(AppHeader), findsOneWidget);
    expect(find.byType(BottomNavigationBarCustom), findsOneWidget);
  });

  testWidgets('Home renders Medication card', (tester) async {
    await tester.pumpWidget(const MyApp());
    await tester.pumpAndSettle();

    expect(find.byType(MedicationCard), findsOneWidget);
  });

  testWidgets('Home renders Refill reminder card', (tester) async {
    await tester.pumpWidget(const MyApp());
    await tester.pumpAndSettle();

    expect(find.byType(RefillReminderCard), findsOneWidget);
  });

  testWidgets('Home renders Today and Upcoming Appointments cards', (tester) async {
    await tester.pumpWidget(const MyApp());
    await tester.pumpAndSettle();

    expect(find.byType(TodayCard), findsOneWidget);
    expect(find.byType(UpcomingAppointmentsCard), findsOneWidget);
  });
}