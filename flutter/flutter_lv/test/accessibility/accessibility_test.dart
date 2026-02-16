import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter_lv/main.dart';

void main() {
  setUp(() async {
    // Prevent shared_preferences from hanging in widget tests
    SharedPreferences.setMockInitialValues({
      // Adjust keys if your AuthPrefs uses different ones
      // Example:
      // 'isSignedIn': false,
    });
  });

  testWidgets('CareConnect meets basic accessibility guidelines', (
    WidgetTester tester,
  ) async {
    final SemanticsHandle handle = tester.ensureSemantics();

    await tester.pumpWidget(const MyApp());

    // Let initState + async auth check run without forcing "settle"
    await tester.pump(const Duration(milliseconds: 200));
    await tester.pump(const Duration(milliseconds: 200));
    await tester.pump(const Duration(milliseconds: 200));
    await tester.pump(const Duration(milliseconds: 200));

    // Now run accessibility guideline checks
    await expectLater(tester, meetsGuideline(androidTapTargetGuideline));

    // If contrast fails in your dark theme, swap this for labeledTapTargetGuideline
    await expectLater(tester, meetsGuideline(textContrastGuideline));

    handle.dispose();
  });

  testWidgets('CareConnect meets tap target guidelines', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const MyApp());
    await tester.pumpAndSettle();

    final handle = tester.ensureSemantics();
    await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
    // Optional, if you want iOS too:
    await expectLater(tester, meetsGuideline(iOSTapTargetGuideline));
    handle.dispose();
  });
}
