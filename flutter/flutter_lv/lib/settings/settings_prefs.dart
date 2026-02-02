import 'package:shared_preferences/shared_preferences.dart';

class SettingsPrefs {
  static const _kTextSize = 'settings.textSize';
  static const _kLineSpacing = 'settings.lineSpacing';
  static const _kSpacingBetweenItems = 'settings.spacingBetweenItems';
  static const _kSpeechSpeed = 'settings.speechSpeed';
  static const _kMicrophoneAccess = 'settings.microphoneAccess';

  static const _kHighContrast = 'settings.highContrastDisplay';
  static const _kBoldText = 'settings.boldText';
  static const _kReduceVisualClutter = 'settings.reduceVisualClutter';
  static const _kReadScreenAloud = 'settings.readScreenAloud';
  static const _kReadNotificationsAloud = 'settings.readNotificationsAloud';
  static const _kVoiceNavigation = 'settings.voiceNavigation';
  static const _kVoiceFeedbackForActions = 'settings.voiceFeedbackForActions';

  static Future<Map<String, Object>> load() async {
    final prefs = await SharedPreferences.getInstance();

    return {
      _kTextSize: prefs.getString(_kTextSize) ?? 'Max',
      _kLineSpacing: prefs.getString(_kLineSpacing) ?? 'Maximum',
      _kSpacingBetweenItems:
          prefs.getString(_kSpacingBetweenItems) ?? 'Maximum',
      _kSpeechSpeed: prefs.getString(_kSpeechSpeed) ?? 'Normal',
      _kMicrophoneAccess: prefs.getString(_kMicrophoneAccess) ?? 'Allowed',

      _kHighContrast: prefs.getBool(_kHighContrast) ?? false,
      _kBoldText: prefs.getBool(_kBoldText) ?? true,
      _kReduceVisualClutter: prefs.getBool(_kReduceVisualClutter) ?? true,
      _kReadScreenAloud: prefs.getBool(_kReadScreenAloud) ?? true,
      _kReadNotificationsAloud: prefs.getBool(_kReadNotificationsAloud) ?? true,
      _kVoiceNavigation: prefs.getBool(_kVoiceNavigation) ?? false,
      _kVoiceFeedbackForActions:
          prefs.getBool(_kVoiceFeedbackForActions) ?? true,
    };
  }

  static Future<void> save({
    required String textSize,
    required String lineSpacing,
    required String spacingBetweenItems,
    required String speechSpeed,
    required String microphoneAccess,
    required bool highContrastDisplay,
    required bool boldText,
    required bool reduceVisualClutter,
    required bool readScreenAloud,
    required bool readNotificationsAloud,
    required bool voiceNavigation,
    required bool voiceFeedbackForActions,
  }) async {
    final prefs = await SharedPreferences.getInstance();

    await prefs.setString(_kTextSize, textSize);
    await prefs.setString(_kLineSpacing, lineSpacing);
    await prefs.setString(_kSpacingBetweenItems, spacingBetweenItems);
    await prefs.setString(_kSpeechSpeed, speechSpeed);
    await prefs.setString(_kMicrophoneAccess, microphoneAccess);

    await prefs.setBool(_kHighContrast, highContrastDisplay);
    await prefs.setBool(_kBoldText, boldText);
    await prefs.setBool(_kReduceVisualClutter, reduceVisualClutter);
    await prefs.setBool(_kReadScreenAloud, readScreenAloud);
    await prefs.setBool(_kReadNotificationsAloud, readNotificationsAloud);
    await prefs.setBool(_kVoiceNavigation, voiceNavigation);
    await prefs.setBool(_kVoiceFeedbackForActions, voiceFeedbackForActions);
  }
}
