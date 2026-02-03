import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_lv/main.dart';

void main() {
  Future<void> pumpHome(WidgetTester tester) async {
    // Bypass auth routing and go straight to the logged-in home shell.
    await tester.pumpWidget(
      const MaterialApp(home: MyHomePage(title: 'CareConnect')),
    );
    await tester.pump(); // first frame
    await tester.pump(const Duration(milliseconds: 300));
  }

  Future<void> goToTabByIcon(WidgetTester tester, IconData icon) async {
    final iconFinder = find.byIcon(icon);
    expect(iconFinder, findsOneWidget); // fail fast with a clear message
    await tester.tap(iconFinder);
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));
  }

  group('Navigation tests', () {
    testWidgets('Can navigate to Medications tab', (tester) async {
      await pumpHome(tester);
      await goToTabByIcon(tester, Icons.medication_outlined);
      expect(find.textContaining('Medication'), findsWidgets);
    });

    testWidgets('Can navigate to Tasks tab', (tester) async {
      await pumpHome(tester);
      await goToTabByIcon(tester, Icons.assignment_outlined);
      expect(find.text('Tasks'), findsWidgets);
    });

    testWidgets('Can navigate to Settings tab', (tester) async {
      await pumpHome(tester);
      await goToTabByIcon(tester, Icons.settings_outlined);
      expect(find.textContaining('Settings'), findsWidgets);
    });

    testWidgets('Can return back to Home tab', (tester) async {
      await pumpHome(tester);
      await goToTabByIcon(tester, Icons.assignment_outlined);
      await goToTabByIcon(tester, Icons.home_outlined);
      expect(find.text('CareConnect'), findsWidgets);
    });

    testWidgets('Home shows medication actions after returning', (
      tester,
    ) async {
      await pumpHome(tester);
      await goToTabByIcon(tester, Icons.medication_outlined);
      await goToTabByIcon(tester, Icons.home_outlined);
      expect(find.text('Mark as Taken'), findsWidgets);
    });

    testWidgets('Switching tabs does not crash: Home -> Medications -> Tasks', (
      tester,
    ) async {
      await pumpHome(tester);
      await goToTabByIcon(tester, Icons.home_outlined);
      await goToTabByIcon(tester, Icons.medication_outlined);
      await goToTabByIcon(tester, Icons.assignment_outlined);
      expect(find.text('Tasks'), findsWidgets);
    });

    testWidgets('Switching tabs does not crash: Tasks -> Settings -> Home', (
      tester,
    ) async {
      await pumpHome(tester);
      await goToTabByIcon(tester, Icons.assignment_outlined);
      await goToTabByIcon(tester, Icons.settings_outlined);
      await goToTabByIcon(tester, Icons.home_outlined);
      expect(find.text('CareConnect'), findsWidgets);
    });

    testWidgets('Mark as Taken button is tappable on Home (if present)', (
      tester,
    ) async {
      await pumpHome(tester);

      final mark = find.text('Mark as Taken');
      if (mark.evaluate().isNotEmpty) {
        await tester.tap(mark.first);
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 300));
      }

      expect(find.text('CareConnect'), findsWidgets);
    });

    testWidgets('Snooze button is tappable on Home (if present)', (
      tester,
    ) async {
      await pumpHome(tester);

      final snooze = find.textContaining('Snooze');
      if (snooze.evaluate().isNotEmpty) {
        await tester.tap(snooze.first);
        await tester.pump();
        await tester.pump(const Duration(milliseconds: 300));
      }

      expect(find.text('CareConnect'), findsWidgets);
    });

    testWidgets('All bottom nav tabs remain present', (tester) async {
      await pumpHome(tester);

      // These should always be present because they're part of your custom bottom nav.
      expect(find.byIcon(Icons.home_outlined), findsOneWidget);
      expect(find.byIcon(Icons.medication_outlined), findsOneWidget);
      expect(find.byIcon(Icons.assignment_outlined), findsOneWidget);
      expect(find.byIcon(Icons.settings_outlined), findsOneWidget);

      // Also confirm labels exist (not tapped via label, just presence).
      expect(find.text('Home'), findsOneWidget);
      expect(find.text('Medications'), findsOneWidget);
      expect(find.text('Tasks'), findsOneWidget);
      expect(find.text('Settings'), findsOneWidget);
    });
  });
}
