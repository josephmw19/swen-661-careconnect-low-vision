import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter_lv/auth/auth_keys.dart';
import 'package:flutter_lv/auth/auth_prefs.dart';
import 'package:flutter_lv/auth/forgot_password_page.dart';
import 'package:flutter_lv/auth/landing_page.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
    await AuthPrefs.resetAuth();
  });

  Widget buildHarness({required ForgotMode mode}) {
    return MaterialApp(
      initialRoute: ForgotPasswordPage.routeName,
      onGenerateRoute: (settings) {
        if (settings.name == ForgotPasswordPage.routeName) {
          return MaterialPageRoute(
            settings: RouteSettings(
              name: ForgotPasswordPage.routeName,
              arguments: ForgotPasswordArgs(mode: mode),
            ),
            builder: (_) => const ForgotPasswordPage(),
          );
        }
        if (settings.name == LandingPage.routeName) {
          return MaterialPageRoute(
            settings: const RouteSettings(name: LandingPage.routeName),
            builder: (_) => const LandingPage(),
          );
        }
        return null;
      },
    );
  }

  Future<void> ensureVisible(WidgetTester tester, Finder target) async {
    final scrollable = find.descendant(
      of: find.byType(ForgotPasswordPage),
      matching: find.byType(Scrollable),
    );

    if (scrollable.evaluate().isNotEmpty) {
      await tester.dragUntilVisible(
        target,
        scrollable.first,
        const Offset(0, -300),
      );
      await tester.pumpAndSettle();
      return;
    }

    await tester.ensureVisible(target);
    await tester.pumpAndSettle();
  }

  /// SnackBars are animation-driven. This helper makes their appearance reliable.
  Future<void> pumpForSnackBar(WidgetTester tester) async {
    await tester.pump(); // let showSnackBar schedule
    await tester.pump(const Duration(milliseconds: 250)); // animate in
  }

  testWidgets('Forgot Username mode renders and validates input', (
    tester,
  ) async {
    await tester.pumpWidget(buildHarness(mode: ForgotMode.username));
    await tester.pumpAndSettle();

    expect(find.text('Forgot Username'), findsOneWidget);

    final input = find.byKey(AuthKeys.forgotInputField);
    final submit = find.byKey(AuthKeys.forgotSubmitBtn);
    final back = find.byKey(AuthKeys.forgotReturnBtn);

    expect(input, findsOneWidget);
    expect(submit, findsOneWidget);
    expect(back, findsOneWidget);

    // Empty submit -> SnackBar should appear
    await ensureVisible(tester, submit);
    await tester.tap(submit);
    await pumpForSnackBar(tester);
    expect(find.byType(SnackBar), findsOneWidget);

    // Enter something and submit -> another SnackBar should appear
    await tester.enterText(input, 'test@example.com');
    await tester.pumpAndSettle();

    await tester.tap(submit);
    await pumpForSnackBar(tester);
    expect(find.byType(SnackBar), findsOneWidget);
  });

  testWidgets('Forgot Password mode renders and validates input', (
    tester,
  ) async {
    await tester.pumpWidget(buildHarness(mode: ForgotMode.password));
    await tester.pumpAndSettle();

    expect(find.text('Forgot Password'), findsOneWidget);

    final input = find.byKey(AuthKeys.forgotInputField);
    final submit = find.byKey(AuthKeys.forgotSubmitBtn);

    // Empty submit -> SnackBar should appear
    await ensureVisible(tester, submit);
    await tester.tap(submit);
    await pumpForSnackBar(tester);
    expect(find.byType(SnackBar), findsOneWidget);

    // Non-empty submit -> SnackBar should appear
    await tester.enterText(input, 'pw@test.com');
    await tester.pumpAndSettle();

    await tester.tap(submit);
    await pumpForSnackBar(tester);
    expect(find.byType(SnackBar), findsOneWidget);
  });

  testWidgets('Forgot page return button pops back', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        initialRoute: LandingPage.routeName,
        routes: {
          LandingPage.routeName: (_) => Scaffold(
            body: Builder(
              builder: (context) => Center(
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(
                      context,
                      ForgotPasswordPage.routeName,
                      arguments: const ForgotPasswordArgs(
                        mode: ForgotMode.password,
                      ),
                    );
                  },
                  child: const Text('Go'),
                ),
              ),
            ),
          ),
          ForgotPasswordPage.routeName: (_) => const ForgotPasswordPage(),
        },
      ),
    );

    await tester.tap(find.text('Go'));
    await tester.pumpAndSettle();
    expect(find.byType(ForgotPasswordPage), findsOneWidget);

    final back = find.byKey(AuthKeys.forgotReturnBtn);
    await ensureVisible(tester, back);
    await tester.tap(back);
    await tester.pumpAndSettle();

    expect(find.byType(ForgotPasswordPage), findsNothing);
    expect(find.text('Go'), findsOneWidget);
  });
}
