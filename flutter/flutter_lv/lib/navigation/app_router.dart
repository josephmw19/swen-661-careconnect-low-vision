import 'package:flutter/material.dart';
import '../main.dart';
import '../medications/medications_page.dart';
import '../medications/medication_details_page.dart';
import '../tasks/tasks_page.dart';
import '../tasks/task_details_page.dart';
import '../appointments/appointments_page.dart';
import '../appointments/appointment_details_page.dart';
import '../settings/settings_page.dart';
import '../auth/landing_page.dart';
import '../auth/role_select_page.dart';
import '../auth/sign_in_page.dart';
import '../auth/forgot_password_page.dart';
import '../auth/auth_prefs.dart';

// Route paths
class AppRoutes {
  static const String home = '/';
  static const String landing = '/landing';
  static const String roleSelect = '/role-select';
  static const String signIn = '/sign-in';
  static const String forgotPassword = '/forgot-password';
  static const String medications = '/medications';
  static const String medicationDetails = '/medications/:id';
  static const String tasks = '/tasks';
  static const String taskDetails = '/tasks/:id';
  static const String appointments = '/appointments';
  static const String appointmentDetails = '/appointments/:id';
  static const String settings = '/settings';
}

// Route configuration
class AppRouteConfig {
  final String path;
  final Map<String, String>? params;
  final Map<String, dynamic>? queryParams;

  AppRouteConfig({required this.path, this.params, this.queryParams});

  static AppRouteConfig fromUri(Uri uri) {
    String path = uri.path;
    // Replace path parameters with placeholders
    final segments = path.split('/');
    final normalizedSegments = segments.map((segment) {
      if (segment.isEmpty) return segment;
      // Check if it's a numeric ID or specific identifier
      if (RegExp(r'^\d+$').hasMatch(segment)) {
        return ':id';
      }
      return segment;
    }).toList();
    path = normalizedSegments.join('/');

    return AppRouteConfig(
      path: path,
      params: _extractParams(uri.path),
      queryParams: uri.queryParameters.isEmpty ? null : uri.queryParameters,
    );
  }

  static Map<String, String>? _extractParams(String path) {
    final segments = path.split('/');
    final params = <String, String>{};

    // Extract IDs from paths like /medications/123 or /tasks/456
    for (int i = 0; i < segments.length; i++) {
      final segment = segments[i];
      if (i > 0 && RegExp(r'^\d+$').hasMatch(segment)) {
        params['id'] = segment;
      }
    }

    return params.isEmpty ? null : params;
  }

  Uri toUri() {
    String path = this.path;
    if (params != null) {
      params!.forEach((key, value) {
        path = path.replaceAll(':$key', value);
      });
    }

    return Uri(path: path, queryParameters: queryParams);
  }
}

// App Router Delegate
class AppRouterDelegate extends RouterDelegate<AppRouteConfig>
    with ChangeNotifier, PopNavigatorRouterDelegateMixin<AppRouteConfig> {
  @override
  final GlobalKey<NavigatorState> navigatorKey;

  AppRouteConfig _currentConfiguration;
  final List<Page> _pages = [];
  final Function(int)? onNavItemTapped;

  // Static reference for global access (used as fallback)
  static AppRouterDelegate? _instance;

  static AppRouterDelegate? get instance => _instance;

  AppRouterDelegate({
    required AppRouteConfig initialRoute,
    this.onNavItemTapped,
  }) : _currentConfiguration = initialRoute,
       navigatorKey = GlobalKey<NavigatorState>() {
    // Initialize pages immediately
    _updatePages();
    // Set static instance for global access
    _instance = this;
  }

  @override
  AppRouteConfig get currentConfiguration => _currentConfiguration;

  void pushRoute(
    String path, {
    Map<String, String>? params,
    Map<String, dynamic>? queryParams,
  }) {
    _currentConfiguration = AppRouteConfig(
      path: path,
      params: params,
      queryParams: queryParams,
    );
    _updatePages();
    notifyListeners();
  }

  @override
  Future<bool> popRoute() async {
    if (_pages.length > 1) {
      _pages.removeLast();
      if (_pages.isNotEmpty) {
        final lastPage = _pages.last;
        _currentConfiguration = _getConfigFromPage(lastPage);
      }
      notifyListeners();
      return true;
    }
    return false;
  }

  void replaceRoute(
    String path, {
    Map<String, String>? params,
    Map<String, dynamic>? queryParams,
  }) {
    final newConfig = AppRouteConfig(
      path: path,
      params: params,
      queryParams: queryParams,
    );
    // Use setNewRoutePath to ensure proper notification
    setNewRoutePath(newConfig);
  }

  void _updatePages() {
    _pages.clear();
    _pages.addAll(_buildPages(_currentConfiguration));
  }

  List<Page> _buildPages(AppRouteConfig config) {
    final pages = <Page>[];

    // Check if we need to show landing/auth pages
    final isAuthRoute =
        config.path == AppRoutes.landing ||
        config.path == AppRoutes.roleSelect ||
        config.path == AppRoutes.signIn ||
        config.path == AppRoutes.forgotPassword;

    // Build the navigation stack
    if (isAuthRoute) {
      // For auth routes, just show that page
      pages.add(_buildPage(config.path, config));
    } else {
      // For app routes, always start with home, then add the specific route if different
      pages.add(_buildPage(AppRoutes.home, config));
      if (config.path != AppRoutes.home) {
        pages.add(_buildPage(config.path, config));
      }
    }

    // Ensure we always have at least one page
    if (pages.isEmpty) {
      pages.add(_buildPage(AppRoutes.home, config));
    }

    return pages;
  }

  Page _buildPage(String path, AppRouteConfig config) {
    switch (path) {
      case AppRoutes.home:
        return MaterialPage(
          key: const ValueKey('home'),
          child: const MyHomePage(title: 'CareConnect'),
        );

      case AppRoutes.landing:
        return MaterialPage(
          key: const ValueKey('landing'),
          child: const LandingPage(),
        );

      case AppRoutes.roleSelect:
        return MaterialPage(
          key: const ValueKey('role-select'),
          child: const RoleSelectPage(),
        );

      case AppRoutes.signIn:
        return MaterialPage(
          key: const ValueKey('sign-in'),
          child: const SignInPage(),
        );

      case AppRoutes.forgotPassword:
        final modeStr = config.queryParams?['mode'] ?? 'password';
        final mode = modeStr == 'username'
            ? ForgotMode.username
            : ForgotMode.password;
        return MaterialPage(
          key: const ValueKey('forgot-password'),
          child: ForgotPasswordPage(mode: mode),
        );

      case AppRoutes.medications:
        return MaterialPage(
          key: const ValueKey('medications'),
          child: MedicationsPage(onNavItemTapped: onNavItemTapped),
        );

      case AppRoutes.medicationDetails:
        final medicationName = config.params?['id'] ?? '';
        return MaterialPage(
          key: ValueKey('medication-$medicationName'),
          child: MedicationDetailsPage(
            medicationName: medicationName,
            dosage: config.queryParams?['dosage'] ?? '',
            instructions: config.queryParams?['instructions'] ?? '',
            nextDose: config.queryParams?['nextDose'],
            statusMessage: config.queryParams?['statusMessage'],
            onNavItemTapped: onNavItemTapped,
          ),
        );

      case AppRoutes.tasks:
        return MaterialPage(
          key: const ValueKey('tasks'),
          child: TasksPage(onNavItemTapped: onNavItemTapped),
        );

      case AppRoutes.taskDetails:
        final taskTitle = config.params?['id'] ?? '';
        return MaterialPage(
          key: ValueKey('task-$taskTitle'),
          child: TaskDetailsPage(
            taskTitle: taskTitle,
            description: config.queryParams?['description'],
            dueTime: config.queryParams?['dueTime'],
            statusMessage: config.queryParams?['statusMessage'],
            onNavItemTapped: onNavItemTapped,
          ),
        );

      case AppRoutes.appointments:
        return MaterialPage(
          key: const ValueKey('appointments'),
          child: AppointmentsPage(onNavItemTapped: onNavItemTapped),
        );

      case AppRoutes.appointmentDetails:
        final qp = config.queryParams;

        return MaterialPage(
          key: ValueKey('appointment-${config.params?['id']}'),
          child: AppointmentDetailsPage(
            doctorName: (qp?['doctorName'] ?? qp?['provider'] ?? '') as String,
            dateTime: (qp?['dateTime'] ?? '') as String,
            location: (qp?['location'] ?? '') as String,
            appointmentType: (qp?['appointmentType'] ?? '') as String,
            clinicName: (qp?['clinicName'] ?? '') as String,
            onNavItemTapped: onNavItemTapped,
          ),
        );

      case AppRoutes.settings:
        return MaterialPage(
          key: const ValueKey('settings'),
          child: SettingsPage(onNavItemTapped: onNavItemTapped),
        );

      default:
        return MaterialPage(
          key: const ValueKey('home'),
          child: const MyHomePage(title: 'CareConnect'),
        );
    }
  }

  AppRouteConfig _getConfigFromPage(Page page) {
    final key = page.key as ValueKey<String>?;
    if (key == null) return AppRouteConfig(path: AppRoutes.home);

    final value = key.value;
    if (value.startsWith('medication-')) {
      return AppRouteConfig(
        path: AppRoutes.medicationDetails,
        params: {'id': value.replaceFirst('medication-', '')},
      );
    } else if (value.startsWith('task-')) {
      return AppRouteConfig(
        path: AppRoutes.taskDetails,
        params: {'id': value.replaceFirst('task-', '')},
      );
    } else if (value.startsWith('appointment-')) {
      return AppRouteConfig(
        path: AppRoutes.appointmentDetails,
        params: {'id': value.replaceFirst('appointment-', '')},
      );
    }

    // Map page keys to routes
    switch (value) {
      case 'home':
        return AppRouteConfig(path: AppRoutes.home);
      case 'landing':
        return AppRouteConfig(path: AppRoutes.landing);
      case 'role-select':
        return AppRouteConfig(path: AppRoutes.roleSelect);
      case 'sign-in':
        return AppRouteConfig(path: AppRoutes.signIn);
      case 'forgot-password':
        return AppRouteConfig(path: AppRoutes.forgotPassword);
      case 'medications':
        return AppRouteConfig(path: AppRoutes.medications);
      case 'tasks':
        return AppRouteConfig(path: AppRoutes.tasks);
      case 'appointments':
        return AppRouteConfig(path: AppRoutes.appointments);
      case 'settings':
        return AppRouteConfig(path: AppRoutes.settings);
      default:
        return AppRouteConfig(path: AppRoutes.home);
    }
  }

  @override
  Widget build(BuildContext context) {
    // Always update pages based on current configuration to ensure they're in sync
    _updatePages();

    return Navigator(
      key: navigatorKey,
      pages: List.unmodifiable(_pages),
      onDidRemovePage: (page) {
        // Keep router state in sync when Navigator pops.
        if (_pages.isNotEmpty) {
          _pages.remove(page);

          if (_pages.isNotEmpty) {
            _currentConfiguration = _getConfigFromPage(_pages.last);
          } else {
            _currentConfiguration = AppRouteConfig(path: AppRoutes.home);
          }

          notifyListeners();
        }
      },
    );
  }

  @override
  Future<void> setNewRoutePath(AppRouteConfig configuration) async {
    // If you don't already import AuthPrefs in this file, add the import (see step 2).
    final signedIn = await AuthPrefs.isSignedIn();

    final isAuthRoute =
        configuration.path == AppRoutes.landing ||
        configuration.path == AppRoutes.roleSelect ||
        configuration.path == AppRoutes.signIn ||
        configuration.path == AppRoutes.forgotPassword;

    // If signed out, force landing for any non-auth route (including '/')
    if (!signedIn && !isAuthRoute) {
      _currentConfiguration = AppRouteConfig(path: AppRoutes.landing);
    } else {
      _currentConfiguration = configuration;
    }

    _updatePages();
    notifyListeners();
  }
}

// Route Information Parser
class AppRouteInformationParser extends RouteInformationParser<AppRouteConfig> {
  @override
  Future<AppRouteConfig> parseRouteInformation(
    RouteInformation routeInformation,
  ) async {
    final uri = routeInformation.uri;
    final config = AppRouteConfig.fromUri(uri);
    return config;
  }

  @override
  RouteInformation? restoreRouteInformation(AppRouteConfig configuration) {
    return RouteInformation(uri: configuration.toUri());
  }
}
