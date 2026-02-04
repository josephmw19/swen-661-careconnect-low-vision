import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:flutter_lv/navigation/app_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_lv/auth/auth_prefs.dart';
import 'package:flutter_lv/medications/medications_page.dart';
import 'package:flutter_lv/tasks/tasks_page.dart';

Future<void> _mockSignedIn() async {
  SharedPreferences.setMockInitialValues({});
  await AuthPrefs.setSignedIn(true); // assumes you have this method
}

void main() {
  group('AppRouterDelegate', () {
    testWidgets('builds and can replaceRoute', (tester) async {
      await _mockSignedIn();

      final delegate = AppRouterDelegate(
        initialRoute: AppRouteConfig(path: AppRoutes.home),
        onNavItemTapped: (_) {},
      );

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: delegate,
          routeInformationParser: AppRouteInformationParser(),
        ),
      );

      await tester.pumpAndSettle();

      // Use setNewRoutePath so we can await the async auth check
      await delegate.setNewRoutePath(
        AppRouteConfig(path: AppRoutes.medications),
      );
      await tester.pumpAndSettle();

      expect(delegate.currentConfiguration.path, AppRoutes.medications);
      expect(find.byType(MedicationsPage), findsOneWidget);
    });

    testWidgets('setNewRoutePath updates route', (tester) async {
      await _mockSignedIn();

      final delegate = AppRouterDelegate(
        initialRoute: AppRouteConfig(path: AppRoutes.home),
        onNavItemTapped: (_) {},
      );

      await tester.pumpWidget(
        MaterialApp.router(
          routerDelegate: delegate,
          routeInformationParser: AppRouteInformationParser(),
        ),
      );
      await tester.pumpAndSettle();

      await delegate.setNewRoutePath(AppRouteConfig(path: AppRoutes.tasks));
      await tester.pumpAndSettle();

      expect(delegate.currentConfiguration.path, AppRoutes.tasks);
      expect(find.byType(TasksPage), findsOneWidget);
    });
  });
}
