import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter_lv/auth/auth_prefs.dart';

void main() {
  setUp(() async {
    SharedPreferences.setMockInitialValues({});
    await AuthPrefs.resetAuth();
  });

  test('AuthPrefs: set/get user role', () async {
    await AuthPrefs.setUserRole(AuthPrefs.roleCaregiver);
    final role = await AuthPrefs.getUserRole();
    expect(role, AuthPrefs.roleCaregiver);

    await AuthPrefs.setUserRole(AuthPrefs.rolePatient);
    final role2 = await AuthPrefs.getUserRole();
    expect(role2, AuthPrefs.rolePatient);
  });

  test('AuthPrefs: signed in flag persists', () async {
    final signedIn1 = await AuthPrefs.isSignedIn();
    expect(signedIn1, isFalse);

    await AuthPrefs.setSignedIn(true);
    final signedIn2 = await AuthPrefs.isSignedIn();
    expect(signedIn2, isTrue);

    await AuthPrefs.setSignedIn(false);
    final signedIn3 = await AuthPrefs.isSignedIn();
    expect(signedIn3, isFalse);
  });

  test('AuthPrefs: last username set/get/reset', () async {
    final last1 = await AuthPrefs.getLastUsername();
    expect(last1, isNull);

    await AuthPrefs.setLastUsername('testuser');
    final last2 = await AuthPrefs.getLastUsername();
    expect(last2, 'testuser');

    await AuthPrefs.resetAuth();
    final last3 = await AuthPrefs.getLastUsername();
    expect(last3, isNull);
  });
}
