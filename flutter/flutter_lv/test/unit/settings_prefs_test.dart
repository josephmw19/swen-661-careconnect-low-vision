import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:flutter_lv/settings/settings_prefs.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    // Fresh in-memory SharedPreferences for each test.
    SharedPreferences.setMockInitialValues({});
  });

  group('SettingsPrefs', () {
    test('load() returns defaults when nothing is saved', () async {
      final data = await SettingsPrefs.load();

      // String defaults
      expect(data['settings.textSize'], 'Max');
      expect(data['settings.lineSpacing'], 'Maximum');
      expect(data['settings.spacingBetweenItems'], 'Maximum');
      expect(data['settings.speechSpeed'], 'Normal');
      expect(data['settings.microphoneAccess'], 'Allowed');

      // Bool defaults
      expect(data['settings.highContrastDisplay'], false);
      expect(data['settings.boldText'], true);
      expect(data['settings.reduceVisualClutter'], true);
      expect(data['settings.readScreenAloud'], true);
      expect(data['settings.readNotificationsAloud'], true);
      expect(data['settings.voiceNavigation'], false);
      expect(data['settings.voiceFeedbackForActions'], true);
    });

    test('save() persists values and load() returns them', () async {
      await SettingsPrefs.save(
        textSize: 'Large',
        lineSpacing: 'Normal',
        spacingBetweenItems: 'Medium',
        speechSpeed: 'Fast',
        microphoneAccess: 'Denied',
        highContrastDisplay: true,
        boldText: false,
        reduceVisualClutter: false,
        readScreenAloud: false,
        readNotificationsAloud: false,
        voiceNavigation: true,
        voiceFeedbackForActions: false,
      );

      final data = await SettingsPrefs.load();

      expect(data['settings.textSize'], 'Large');
      expect(data['settings.lineSpacing'], 'Normal');
      expect(data['settings.spacingBetweenItems'], 'Medium');
      expect(data['settings.speechSpeed'], 'Fast');
      expect(data['settings.microphoneAccess'], 'Denied');

      expect(data['settings.highContrastDisplay'], true);
      expect(data['settings.boldText'], false);
      expect(data['settings.reduceVisualClutter'], false);
      expect(data['settings.readScreenAloud'], false);
      expect(data['settings.readNotificationsAloud'], false);
      expect(data['settings.voiceNavigation'], true);
      expect(data['settings.voiceFeedbackForActions'], false);
    });

    test(
      'partial existing prefs keep stored values and default the rest',
      () async {
        // Only set a couple keys manually.
        SharedPreferences.setMockInitialValues({
          'settings.textSize': 'Small',
          'settings.highContrastDisplay': true,
          'settings.voiceNavigation': true,
        });

        final data = await SettingsPrefs.load();

        // Stored values should be returned
        expect(data['settings.textSize'], 'Small');
        expect(data['settings.highContrastDisplay'], true);
        expect(data['settings.voiceNavigation'], true);

        // Everything else should fall back to defaults
        expect(data['settings.lineSpacing'], 'Maximum');
        expect(data['settings.spacingBetweenItems'], 'Maximum');
        expect(data['settings.speechSpeed'], 'Normal');
        expect(data['settings.microphoneAccess'], 'Allowed');

        expect(data['settings.boldText'], true);
        expect(data['settings.reduceVisualClutter'], true);
        expect(data['settings.readScreenAloud'], true);
        expect(data['settings.readNotificationsAloud'], true);
        expect(data['settings.voiceFeedbackForActions'], true);
      },
    );
  });
}
