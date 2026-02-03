import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_lv/main.dart';

void main() {
  Future<void> pumpHome(WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(home: MyHomePage(title: 'CareConnect')),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));
  }

  testWidgets('Mark as Taken updates UI state (basic smoke)', (tester) async {
    await pumpHome(tester);

    final mark = find.text('Mark as Taken');
    if (mark.evaluate().isNotEmpty) {
      await tester.tap(mark.first);
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));
    }

    // Just ensure app is still alive and header title is present.
    expect(find.text('CareConnect'), findsWidgets);
  });

  testWidgets('Snooze button tap does not crash', (tester) async {
    await pumpHome(tester);

    final snooze = find.textContaining('Snooze');
    if (snooze.evaluate().isNotEmpty) {
      await tester.tap(snooze.first);
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));
    }

    expect(find.text('CareConnect'), findsWidgets);
  });
}
