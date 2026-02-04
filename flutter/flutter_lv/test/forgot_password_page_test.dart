import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter_lv/auth/auth_keys.dart';
import 'package:flutter_lv/auth/auth_prefs.dart';
import 'package:flutter_lv/auth/forgot_password_page.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
    await AuthPrefs.resetAuth();
  });

  Future<void> pumpSnackBar(WidgetTester tester) async {
    // SnackBar animates in, so a single pumpAndSettle is sometimes not enough.
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 400));
    await tester.pumpAndSettle();
  }

  Widget buildHarness({required ForgotMode mode}) {
    return MaterialApp(home: ForgotPasswordPage(mode: mode));
  }

  testWidgets('Forgot Username mode renders and validates input', (
    tester,
  ) async {
    await tester.pumpWidget(buildHarness(mode: ForgotMode.username));
    await tester.pumpAndSettle();

    expect(find.text('Forgot Username'), findsOneWidget);

    // Empty submit
    await tester.tap(find.byKey(AuthKeys.forgotSubmitBtn));
    await pumpSnackBar(tester);
    expect(find.text('Please enter an email address.'), findsOneWidget);

    // Non-empty submit
    await tester.enterText(
      find.byKey(AuthKeys.forgotInputField),
      'test@example.com',
    );
    await tester.pumpAndSettle();

    await tester.tap(find.byKey(AuthKeys.forgotSubmitBtn));
    await pumpSnackBar(tester);
    expect(find.text('Request sent. (Demo mode, no backend)'), findsOneWidget);
  });

  testWidgets('Forgot Password mode renders and validates input', (
    tester,
  ) async {
    await tester.pumpWidget(buildHarness(mode: ForgotMode.password));
    await tester.pumpAndSettle();

    expect(find.text('Forgot Password'), findsOneWidget);

    // Empty submit
    await tester.tap(find.byKey(AuthKeys.forgotSubmitBtn));
    await pumpSnackBar(tester);
    expect(find.text('Please enter an email address.'), findsOneWidget);

    // Non-empty submit
    await tester.enterText(
      find.byKey(AuthKeys.forgotInputField),
      'test@example.com',
    );
    await tester.pumpAndSettle();

    await tester.tap(find.byKey(AuthKeys.forgotSubmitBtn));
    await pumpSnackBar(tester);
    expect(find.text('Request sent. (Demo mode, no backend)'), findsOneWidget);
  });

  testWidgets('Forgot page return button pops back', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Builder(
          builder: (context) => Scaffold(
            body: Center(
              child: TextButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) =>
                          const ForgotPasswordPage(mode: ForgotMode.password),
                    ),
                  );
                },
                child: const Text('Go'),
              ),
            ),
          ),
        ),
      ),
    );

    // Confirm launcher exists
    expect(find.text('Go'), findsOneWidget);

    // Navigate to Forgot page
    await tester.tap(find.text('Go'));
    await tester.pumpAndSettle();
    expect(find.byType(ForgotPasswordPage), findsOneWidget);

    // Tap Back
    final backBtn = find.byKey(AuthKeys.forgotReturnBtn);
    await tester.ensureVisible(backBtn);
    await tester.pumpAndSettle();
    await tester.tap(backBtn);
    await tester.pumpAndSettle();

    // We're back on launcher page
    expect(find.byType(ForgotPasswordPage), findsNothing);
    expect(find.text('Go'), findsOneWidget);
  });
}
