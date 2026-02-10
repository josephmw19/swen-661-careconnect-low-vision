import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';
import { useAuth } from '../../contexts/AuthContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function SignInScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { signIn, lastUsername } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [obscurePassword, setObscurePassword] = useState(true);

  useEffect(() => {
    if (lastUsername) {
      setUsername(lastUsername);
    }
  }, [lastUsername]);

  const handleSignIn = async () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      Alert.alert('Error', 'Please enter a username.');
      return;
    }

    try {
      // Demo-mode sign in (no backend)
      await signIn(trimmedUsername);

      // Navigate to home - need to reset navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Sign in to continue to CareConnect.
        </Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              testID="password-input"
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry={obscurePassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              testID="toggle-password-visibility"
              style={styles.eyeButton}
              onPress={() => setObscurePassword(!obscurePassword)}
            >
              <Ionicons
                name={obscurePassword ? 'eye-off-outline' : 'eye-outline'}
                size={26}
                color={Colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
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

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.replace('Landing')}
        >
          <Ionicons name="arrow-back" size={28} color={Colors.text} />
          <Text style={styles.backButtonText}>Return to Welcome</Text>
        </TouchableOpacity>
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
    paddingHorizontal: Spacing.xl,
    paddingVertical: 28,
  },
  content: {
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: FontSizes['4xl'],
    fontWeight: '700',
    color: 'white',
    lineHeight: 44.2,
    marginBottom: Spacing.lg,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: 'normal',
    color: Colors.text,
    lineHeight: 38.4,
    marginBottom: 28,
  },
  fieldContainer: {
    marginBottom: 22,
  },
  fieldLabel: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: '600',
    color: 'white',
    lineHeight: 30.8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.secondary,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.borderDarker,
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    color: Colors.text,
    lineHeight: 35.2,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: Colors.secondary,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.borderDarker,
    paddingHorizontal: 16,
    paddingVertical: 18,
    paddingRight: 50,
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    color: Colors.text,
    lineHeight: 35.2,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 18,
    padding: 4,
  },
  signInButton: {
    height: 72,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 20,
  },
  signInButtonText: {
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
    marginBottom: 12,
  },
  linkText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primaryLight,
    textDecorationLine: 'underline',
    lineHeight: 26,
  },
  backButton: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.border,
    marginTop: 28,
  },
  backButtonText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text,
    marginLeft: Spacing.md,
    lineHeight: 28.8,
  },
});
