import 'package:shared_preferences/shared_preferences.dart';

class AuthPrefs {
  static const _kIsSignedIn = 'auth.isSignedIn';
  static const _kUserRole = 'auth.userRole'; // 'patient' | 'caregiver'
  static const _kLastUsername = 'auth.lastUsername';

  static const rolePatient = 'patient';
  static const roleCaregiver = 'caregiver';

  static Future<bool> isSignedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_kIsSignedIn) ?? false;
  }

  static Future<void> setSignedIn(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_kIsSignedIn, value);
  }

  static Future<String?> getUserRole() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_kUserRole);
  }

  static Future<void> setUserRole(String role) async {
    final normalized = role.trim().toLowerCase();
    if (normalized != rolePatient && normalized != roleCaregiver) {
      throw ArgumentError('Invalid role: $role');
    }
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kUserRole, normalized);
  }

  static Future<String?> getLastUsername() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_kLastUsername);
  }

  static Future<void> setLastUsername(String username) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kLastUsername, username.trim());
  }

  static Future<void> resetAuth() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_kIsSignedIn);
    await prefs.remove(_kUserRole);
    await prefs.remove(_kLastUsername);
  }

  /// Minimal sign-out, keeps role/username so "Welcome back" can prefill.
  static Future<void> signOut() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_kIsSignedIn, false);
  }

  static Future<void> clearAll() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_kIsSignedIn);
    await prefs.remove(_kUserRole);
    await prefs.remove(_kLastUsername);
  }

  /// Optional: use this if you want logout to fully reset the experience.
  static Future<void> clearAuth() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_kIsSignedIn);
    await prefs.remove(_kUserRole);
    await prefs.remove(_kLastUsername);
  }
}
