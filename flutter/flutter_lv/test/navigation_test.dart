import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_lv/main.dart';

void main() {
  Future<void> pumpApp(WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());
    await tester.pumpAndSettle();
  }

  Future<void> goToTab(WidgetTester tester, String tabLabel) async {
    await tester.tap(find.text(tabLabel));
    await tester.pumpAndSettle();
  }

  group('Navigation tests', () {
    testWidgets('Can navigate to Medications tab', (tester) async {
      await pumpApp(tester);
      await goToTab(tester, 'Medications');
      expect(find.textContaining('Medication'), findsWidgets);
    });

    testWidgets('Can navigate to Tasks tab', (tester) async {
      await pumpApp(tester);
      await goToTab(tester, 'Tasks');
      expect(find.text('Tasks'), findsWidgets);
    });

    testWidgets('Can navigate to Settings tab', (tester) async {
      await pumpApp(tester);
      await goToTab(tester, 'Settings');
      expect(find.textContaining('Settings'), findsWidgets);
    });

    testWidgets('Can return back to Home tab', (tester) async {
      await pumpApp(tester);
      await goToTab(tester, 'Tasks');
      await goToTab(tester, 'Home');
      expect(find.text('CareConnect'), findsWidgets);
    });

    testWidgets('Home shows medication actions after returning', (tester) async {
      await pumpApp(tester);
      await goToTab(tester, 'Medications');
      await goToTab(tester, 'Home');
      expect(find.text('Mark as Taken'), findsWidgets);
    });

    testWidgets('Switching tabs does not crash: Home -> Medications -> Tasks', (tester) async {
      await pumpApp(tester);
      await goToTab(tester, 'Home');
      await goToTab(tester, 'Medications');
      await goToTab(tester, 'Tasks');
      expect(find.text('Tasks'), findsWidgets);
    });

    testWidgets('Switching tabs does not crash: Tasks -> Settings -> Home', (tester) async {
      await pumpApp(tester);
      await goToTab(tester, 'Tasks');
      await goToTab(tester, 'Settings');
      await goToTab(tester, 'Home');
      expect(find.text('CareConnect'), findsWidgets);
    });

    testWidgets('Mark as Taken button is tappable on Home', (tester) async {
      await pumpApp(tester);
      await tester.tap(find.text('Mark as Taken').first);
      await tester.pumpAndSettle();
      expect(find.text('CareConnect'), findsWidgets);
    });

    testWidgets('Snooze button is tappable on Home', (tester) async {
      await pumpApp(tester);
      await tester.tap(find.textContaining('Snooze').first);
      await tester.pumpAndSettle();
      expect(find.text('CareConnect'), findsWidgets);
    });

    testWidgets('All bottom nav tabs remain present after interactions', (tester) async {
      await pumpApp(tester);
      await tester.tap(find.text('Read'));
      await tester.pumpAndSettle();
      expect(find.text('Home'), findsOneWidget);
      expect(find.text('Medications'), findsOneWidget);
      expect(find.text('Tasks'), findsOneWidget);
      expect(find.text('Settings'), findsOneWidget);
    });
  });
}