import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function LandingScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="heart" size={44} color="white" />
          </View>
        </View>

        <Text style={styles.title}>CareConnect</Text>

        <Text style={styles.subtitle}>
          Supporting care, made{'\n'}easier.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('RoleSelect')}
        >
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            Alert.alert('Create Account', 'Create Account is not implemented yet.');
          }}
        >
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            navigation.navigate('ForgotPassword', { mode: 'username' })
          }
        >
          <Text style={styles.linkText}>Forgot username?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            navigation.navigate('ForgotPassword', { mode: 'password' })
          }
        >
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Designed for accessibility and{'\n'}ease of use
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  content: {
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 22,
  },
  logo: {
    width: 84,
    height: 84,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: FontSizes['4xl'],
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 44.2,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: '500',
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 35.2,
    marginBottom: 28,
  },
  primaryButton: {
    height: 72,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  primaryButtonText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: 'white',
    lineHeight: 28.8,
  },
  secondaryButton: {
    height: 72,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  secondaryButtonText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: 'white',
    lineHeight: 28.8,
  },
  linkButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  linkText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primaryLight,
    textDecorationLine: 'underline',
    lineHeight: 26,
  },
  footerText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 32,
    marginTop: 28,
  },
});
