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

  void navigateTo(String path, {
    Map<String, String>? params,
    Map<String, dynamic>? queryParams,
  }) {
    _routerDelegate?.pushRoute(path, params: params, queryParams: queryParams);
  }

  void navigateReplace(String path, {
    Map<String, String>? params,
    Map<String, dynamic>? queryParams,
  }) {
    var delegate = _routerDelegate;
    if (delegate == null) {
      // Try alternative approach - find router in widget tree
      final router = Router.maybeOf(this);
      if (router != null && router.routerDelegate is AppRouterDelegate) {
        delegate = router.routerDelegate as AppRouterDelegate;
      } else {
        // Fallback to static instance
        delegate = AppRouterDelegate.instance;
      }
    }
    
    if (delegate == null) {
      debugPrint('Error: Could not navigate to $path - router delegate not accessible');
      return;
    }
    
    delegate.replaceRoute(path, params: params, queryParams: queryParams);
  }

  void navigateBack() {
    _routerDelegate?.popRoute();
  }

  void navigateToHome() {
    _routerDelegate?.replaceRoute(AppRoutes.home);
  }
}
