import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter_lv/auth/auth_keys.dart';
import 'package:flutter_lv/auth/auth_prefs.dart';
import 'package:flutter_lv/auth/landing_page.dart';
import 'package:flutter_lv/auth/role_select_page.dart';
import 'package:flutter_lv/auth/sign_in_page.dart';
import 'package:flutter_lv/auth/forgot_password_page.dart';
import 'package:flutter_lv/main.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
    await AuthPrefs.resetAuth();
  });

  Future<void> pumpStep(WidgetTester tester, {int ms = 100}) async {
    await tester.pump();
    await tester.pump(Duration(milliseconds: ms));
  }

  Future<void> pumpUntil(
    WidgetTester tester,
    bool Function() condition, {
    Duration timeout = const Duration(seconds: 2),
  }) async {
    final end = DateTime.now().add(timeout);
    while (DateTime.now().isBefore(end)) {
      await tester.pump(const Duration(milliseconds: 50));
      if (condition()) return;
    }
    fail('Timed out waiting for condition');
  }

  Widget buildAuthHarness() {
    return MaterialApp(
      initialRoute: LandingPage.routeName,
      routes: {
        // Deterministic home for tests.
        '/': (_) => const MyHomePage(title: 'CareConnect'),

        LandingPage.routeName: (_) => const LandingPage(),
        RoleSelectPage.routeName: (_) => const RoleSelectPage(),
        SignInPage.routeName: (_) => const SignInPage(),
        ForgotPasswordPage.routeName: (_) => const ForgotPasswordPage(),
      },
    );
  }

  testWidgets('Auth flow: Landing -> Role -> Sign In -> Home', (tester) async {
    await tester.pumpWidget(buildAuthHarness());
    await pumpStep(tester);

    expect(find.byType(LandingPage), findsOneWidget);

    // Tap Landing "Sign In"
    await tester.tap(find.byKey(AuthKeys.landingSignInBtn));
    await pumpStep(tester);

    await pumpUntil(
      tester,
      () => find.byType(RoleSelectPage).evaluate().isNotEmpty,
    );
    expect(find.byType(RoleSelectPage), findsOneWidget);

    // Pick a role (caregiver)
    await tester.tap(find.byKey(AuthKeys.roleCaregiverCard));
    await pumpStep(tester);

    await pumpUntil(
      tester,
      () => find.byType(SignInPage).evaluate().isNotEmpty,
    );
    expect(find.byType(SignInPage), findsOneWidget);

    // Enter credentials via keyed fields
    await tester.enterText(
      find.byKey(AuthKeys.signInUsernameField),
      'testuser',
    );
    await tester.enterText(find.byKey(AuthKeys.signInPasswordField), 'pw');
    await pumpStep(tester);

    // Tap Sign In submit
    await tester.tap(find.byKey(AuthKeys.signInSubmitBtn));
    await pumpStep(tester);

    await pumpUntil(
      tester,
      () => find.byType(MyHomePage).evaluate().isNotEmpty,
    );
    expect(find.byType(MyHomePage), findsOneWidget);
    expect(find.text('CareConnect'), findsWidgets);
  });
}
