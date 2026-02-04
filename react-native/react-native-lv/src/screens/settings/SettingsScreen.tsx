import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { AppHeader } from '../../components/AppHeader';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';
import { useSettings } from '../../contexts/SettingsContext';
import { useAuth } from '../../contexts/AuthContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  height: number;
  onPress: () => void;
}

function OptionButton({ label, isSelected, height, onPress }: OptionButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.optionButton,
        { height },
        isSelected && styles.optionButtonSelected,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.optionButtonText,
          isSelected && styles.optionButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface ToggleButtonProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
}

function ToggleButton({ isOn, onToggle }: ToggleButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.toggleButton, isOn && styles.toggleButtonOn]}
      onPress={() => onToggle(!isOn)}
    >
      <Text style={[styles.toggleText, isOn && styles.toggleTextOn]}>
        {isOn ? 'On' : 'Off'}
      </Text>
    </TouchableOpacity>
  );
}

interface SectionHeaderProps {
  icon: string;
  title: string;
}

function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon as any} size={32} color="white" />
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
}

export function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { settings, updateSetting } = useSettings();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign out?',
      'You will be returned to the welcome screen.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Landing' }],
              });
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const getCurrentSettingLabel = (size: string) => {
    switch (size) {
      case 'Large':
        return 'Large';
      case 'Extra Large':
        return 'Extra Large';
      case 'Max':
        return 'Maximum';
      default:
        return 'Maximum';
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.headerSection}>
        <Text style={styles.title}>Accessibility Settings</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <SectionHeader icon="eye-outline" title="Vision" />
        <View style={styles.sectionSpacing} />

        {/* Text Size */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Text Size</Text>
          <Text style={styles.cardSubtitle}>
            Current setting: {getCurrentSettingLabel(settings.textSize)}
          </Text>
          <View style={styles.optionsRow}>
            <OptionButton
              label="Large"
              isSelected={settings.textSize === 'Large'}
              height={109}
              onPress={() => updateSetting('textSize', 'Large')}
            />
            <View style={styles.optionSpacing} />
            <OptionButton
              label="Extra Large"
              isSelected={settings.textSize === 'Extra Large'}
              height={109}
              onPress={() => updateSetting('textSize', 'Extra Large')}
            />
            <View style={styles.optionSpacing} />
            <OptionButton
              label="Max"
              isSelected={settings.textSize === 'Max'}
              height={109}
              onPress={() => updateSetting('textSize', 'Max')}
            />
          </View>
        </View>

        <View style={styles.cardSpacing} />

        {/* Line Spacing */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Line Spacing</Text>
          <Text style={styles.cardSubtitle}>
            Current setting: {settings.lineSpacing}
          </Text>
          <View style={styles.optionsRow}>
            <OptionButton
              label="Increased"
              isSelected={settings.lineSpacing === 'Increased'}
              height={77}
              onPress={() => updateSetting('lineSpacing', 'Increased')}
            />
            <View style={styles.optionSpacing} />
            <OptionButton
              label="Maximum"
              isSelected={settings.lineSpacing === 'Maximum'}
              height={77}
              onPress={() => updateSetting('lineSpacing', 'Maximum')}
            />
          </View>
        </View>

        <View style={styles.cardSpacing} />

        {/* Spacing Between Items */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Spacing Between Items</Text>
          <Text style={styles.cardSubtitle}>
            Current setting: {settings.spacingBetweenItems}
          </Text>
          <View style={styles.optionsRow}>
            <OptionButton
              label="Increased"
              isSelected={settings.spacingBetweenItems === 'Increased'}
              height={77}
              onPress={() =>
                updateSetting('spacingBetweenItems', 'Increased')
              }
            />
            <View style={styles.optionSpacing} />
            <OptionButton
              label="Maximum"
              isSelected={settings.spacingBetweenItems === 'Maximum'}
              height={77}
              onPress={() => updateSetting('spacingBetweenItems', 'Maximum')}
            />
          </View>
        </View>

        <View style={styles.cardSpacing} />

        {/* High Contrast Display */}
        <View style={styles.card}>
          <View style={styles.toggleCardContent}>
            <Text style={styles.cardTitle}>High Contrast Display</Text>
            <ToggleButton
              isOn={settings.highContrastDisplay}
              onToggle={(value) => updateSetting('highContrastDisplay', value)}
            />
          </View>
        </View>

        <View style={styles.cardSpacing} />

        {/* Bold Text */}
        <View style={styles.card}>
          <View style={styles.toggleCardContent}>
            <Text style={styles.cardTitle}>Bold Text</Text>
            <ToggleButton
              isOn={settings.boldText}
              onToggle={(value) => updateSetting('boldText', value)}
            />
          </View>
        </View>

        <View style={styles.cardSpacing} />

        {/* Reduce Visual Clutter */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reduce Visual Clutter</Text>
          <Text style={styles.cardSubtitle}>
            Hides non-essential elements to improve clarity
          </Text>
          <View style={styles.toggleRow}>
            <ToggleButton
              isOn={settings.reduceVisualClutter}
              onToggle={(value) => updateSetting('reduceVisualClutter', value)}
            />
          </View>
        </View>

        <View style={styles.sectionSpacingLarge} />

        <SectionHeader icon="volume-high-outline" title="Read Aloud and Voice" />
        <View style={styles.sectionSpacing} />

        {/* Read Screen Aloud */}
        <View style={styles.card}>
          <View style={styles.toggleCardContent}>
            <Text style={styles.cardTitle}>Read Screen Aloud</Text>
            <ToggleButton
              isOn={settings.readScreenAloud}
              onToggle={(value) => updateSetting('readScreenAloud', value)}
            />
          </View>
        </View>

        <View style={styles.cardSpacing} />

        {/* Read Notifications Aloud */}
        <View style={styles.card}>
          <View style={styles.toggleCardContent}>
            <Text style={styles.cardTitle}>Read Notifications Aloud</Text>
            <ToggleButton
              isOn={settings.readNotificationsAloud}
              onToggle={(value) =>
                updateSetting('readNotificationsAloud', value)
              }
            />
          </View>
        </View>

        <View style={styles.cardSpacing} />

        {/* Voice Navigation */}
        <View style={styles.card}>
          <View style={styles.toggleCardContent}>
            <Text style={styles.cardTitle}>Voice Navigation</Text>
            <ToggleButton
              isOn={settings.voiceNavigation}
              onToggle={(value) => updateSetting('voiceNavigation', value)}
            />
          </View>
        </View>

        <View style={styles.cardSpacing} />

        {/* Voice Feedback for Actions */}
        <View style={styles.card}>
          <View style={styles.toggleCardContent}>
            <Text style={styles.cardTitle}>Voice Feedback for Actions</Text>
            <ToggleButton
              isOn={settings.voiceFeedbackForActions}
              onToggle={(value) =>
                updateSetting('voiceFeedbackForActions', value)
              }
            />
          </View>
        </View>

        <View style={styles.cardSpacing} />

        {/* Speech Speed */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Speech Speed</Text>
          <Text style={styles.cardSubtitle}>
            Current setting: {settings.speechSpeed}
          </Text>
          <View style={styles.optionsRow}>
            <OptionButton
              label="Slow"
              isSelected={settings.speechSpeed === 'Slow'}
              height={77}
              onPress={() => updateSetting('speechSpeed', 'Slow')}
            />
            <View style={styles.optionSpacing} />
            <OptionButton
              label="Normal"
              isSelected={settings.speechSpeed === 'Normal'}
              height={77}
              onPress={() => updateSetting('speechSpeed', 'Normal')}
            />
            <View style={styles.optionSpacing} />
            <OptionButton
              label="Fast"
              isSelected={settings.speechSpeed === 'Fast'}
              height={77}
              onPress={() => updateSetting('speechSpeed', 'Fast')}
            />
          </View>
        </View>

        <View style={styles.sectionSpacingLarge} />

        <SectionHeader icon="mic-outline" title="Microphone Access" />
        <View style={styles.sectionSpacing} />

        {/* Microphone Access */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Microphone Access</Text>
          <Text style={styles.cardSubtitle}>
            Required for voice commands and read-aloud features
          </Text>
          <View style={styles.optionsRow}>
            <OptionButton
              label="Allowed"
              isSelected={settings.microphoneAccess === 'Allowed'}
              height={109}
              onPress={() => updateSetting('microphoneAccess', 'Allowed')}
            />
            <View style={styles.optionSpacing} />
            <OptionButton
              label="Not Allowed"
              isSelected={settings.microphoneAccess === 'Not Allowed'}
              height={109}
              onPress={() => updateSetting('microphoneAccess', 'Not Allowed')}
            />
          </View>
        </View>

        <View style={styles.sectionSpacingLarge} />

        <SectionHeader icon="person-outline" title="Account" />
        <View style={styles.sectionSpacing} />

        {/* Sign Out */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign Out</Text>
          <Text style={styles.cardSubtitle}>
            Returns you to the welcome screen and clears your sign-in status on
            this device.
          </Text>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={30} color={Colors.text} />
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerSection: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    padding: 10,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: FontSizes['4xl'],
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.3901,
    lineHeight: 44.2,
    height: 88,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  sectionHeaderText: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.3828,
    lineHeight: 39.2,
    marginLeft: Spacing.md,
  },
  sectionSpacing: {
    height: Spacing['2xl'],
  },
  sectionSpacingLarge: {
    height: Spacing['4xl'],
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: Spacing['2xl'],
  },
  cardSpacing: {
    height: Spacing['2xl'],
  },
  cardTitle: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.2158,
    lineHeight: 39,
    marginBottom: Spacing.sm,
  },
  cardSubtitle: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: 'normal',
    color: Colors.textMuted,
    letterSpacing: -0.2578,
    lineHeight: 35.2,
    marginBottom: Spacing.xl,
  },
  optionsRow: {
    flexDirection: 'row',
  },
  optionSpacing: {
    width: 12,
  },
  optionButton: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderRadius: 15.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: Colors.primary,
  },
  optionButtonText: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: '500',
    color: Colors.text,
    letterSpacing: 0.0703,
    textAlign: 'center',
  },
  optionButtonTextSelected: {
    fontWeight: '600',
    color: 'white',
  },
  toggleCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.sm,
  },
  toggleButton: {
    width: 120,
    height: 68,
    backgroundColor: Colors.secondary,
    borderRadius: 15.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonOn: {
    backgroundColor: Colors.success,
  },
  toggleText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '500',
    color: Colors.textMuted,
    letterSpacing: 0.0703,
  },
  toggleTextOn: {
    color: 'white',
  },
  signOutButton: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.border,
    marginTop: Spacing.lg,
  },
  signOutButtonText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text,
    marginLeft: Spacing.md,
    lineHeight: 28.8,
  },
  bottomSpacing: {
    height: Spacing['3xl'],
  },
});
