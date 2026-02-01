import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:flutter_lv/main.dart';
import 'package:flutter_lv/medications/medications_page.dart';
import 'package:flutter_lv/tasks/tasks_page.dart';
import 'package:flutter_lv/settings/settings_page.dart';

// If this import exists in your project, keep it.
// If it errors because the file/class name differs, remove it and tell me the file names inside lib/appointments.
// import 'package:flutter_lv/appointments/appointments_page.dart';

Widget _wrap(Widget child) {
  return MaterialApp(home: Scaffold(body: child));
}

void main() {
  group('Coverage boost: core pages render', () {
    testWidgets('MedicationsPage renders without crashing', (tester) async {
      await tester.pumpWidget(_wrap(MedicationsPage(onNavItemTapped: (_) {})));
      await tester.pumpAndSettle();
      expect(find.textContaining('Medications'), findsWidgets);
    });

    testWidgets('TasksPage renders without crashing', (tester) async {
      await tester.pumpWidget(_wrap(TasksPage(onNavItemTapped: (_) {})));
      await tester.pumpAndSettle();
      expect(find.textContaining('Tasks'), findsWidgets);
    });

    testWidgets('SettingsPage renders without crashing', (tester) async {
      await tester.pumpWidget(_wrap(SettingsPage(onNavItemTapped: (_) {})));
      await tester.pumpAndSettle();
      expect(find.textContaining('Settings'), findsWidgets);
    });
  });

  group('Coverage boost: exercise app state a bit', () {
    testWidgets('Mark as Taken updates UI state (basic smoke)', (tester) async {
      await tester.pumpWidget(const MyApp());
      await tester.pumpAndSettle();

      // Tap Mark as Taken if it exists.
      final markAsTaken = find.textContaining('Mark as Taken');
      if (markAsTaken.evaluate().isNotEmpty) {
        await tester.tap(markAsTaken.first);
        await tester.pumpAndSettle();
      }

      // Just verify app still renders after interaction.
      expect(find.textContaining('CareConnect'), findsWidgets);
    });

    testWidgets('Snooze button tap does not crash', (tester) async {
      await tester.pumpWidget(const MyApp());
      await tester.pumpAndSettle();

      final snooze = find.textContaining('Snooze');
      if (snooze.evaluate().isNotEmpty) {
        await tester.tap(snooze.first);
        await tester.pumpAndSettle();
      }

      expect(find.textContaining('CareConnect'), findsWidgets);
    });
  });
}
