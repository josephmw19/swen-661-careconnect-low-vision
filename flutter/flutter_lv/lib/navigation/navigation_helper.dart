import 'package:flutter/material.dart';
import 'app_router.dart';

// Extension to make navigation easier
extension AppNavigation on BuildContext {
  AppRouterDelegate? get _routerDelegate {
    try {
      final router = Router.maybeOf(this);
      if (router == null) return null;
      final delegate = router.routerDelegate;
      if (delegate is AppRouterDelegate) {
        return delegate;
      }
    } catch (e) {
      debugPrint('Error getting router delegate: $e');
    }
    return null;
  }

  void navigateTo(
    String path, {
    Map<String, String>? params,
    Map<String, dynamic>? queryParams,
    Object? arguments,
  }) {
    final delegate = _routerDelegate ?? AppRouterDelegate.instance;

    if (delegate != null) {
      delegate.pushRoute(path, params: params, queryParams: queryParams);
      return;
    }

    // ✅ Fallback for widget tests / non-router apps
    Navigator.of(this).pushNamed(path, arguments: arguments ?? queryParams);
  }

  void navigateReplace(
    String path, {
    Map<String, String>? params,
    Map<String, dynamic>? queryParams,
    Object? arguments,
  }) {
    var delegate = _routerDelegate ?? AppRouterDelegate.instance;

    if (delegate != null) {
      delegate.replaceRoute(path, params: params, queryParams: queryParams);
      return;
    }

    // ✅ Fallback for widget tests / non-router apps
    Navigator.of(
      this,
    ).pushReplacementNamed(path, arguments: arguments ?? queryParams);
  }

  void navigateBack() {
    final delegate = _routerDelegate ?? AppRouterDelegate.instance;

    if (delegate != null) {
      delegate.popRoute();
      return;
    }

    // ✅ Fallback for widget tests / non-router apps
    Navigator.of(this).maybePop();
  }

  void navigateToHome() {
    final delegate = _routerDelegate ?? AppRouterDelegate.instance;

    if (delegate != null) {
      delegate.replaceRoute(AppRoutes.home);
      return;
    }

    Navigator.of(this).pushNamedAndRemoveUntil(AppRoutes.home, (_) => false);
  }
}
