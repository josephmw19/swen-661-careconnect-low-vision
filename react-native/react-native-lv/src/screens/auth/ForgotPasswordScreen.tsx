import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProp = RouteProp<RootStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const [email, setEmail] = useState('');

  const mode = route.params?.mode || 'password';
  const isUsername = mode === 'username';

  const title = isUsername ? 'Forgot Username' : 'Forgot Password';
  const bodyText = isUsername
    ? 'Enter your email address and we will send your username.'
    : 'Enter your email address and we will send a password reset link.';
  const buttonText = isUsername ? 'Send Username' : 'Send Reset Link';

  const handleSubmit = () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      Alert.alert('Error', 'Please enter an email address.');
      return;
    }
    Alert.alert('Success', 'Request sent. (Demo mode, no backend)');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{bodyText}</Text>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="name@example.com"
            placeholderTextColor={Colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color={Colors.text} />
          <Text style={styles.backButtonText}>Back</Text>
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
    marginBottom: 22,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: 24,
  },
  fieldLabel: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: '600',
    color: 'white',
    lineHeight: 30.8,
    marginBottom: 10,
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
    marginBottom: Spacing.lg,
  },
  submitButton: {
    height: 72,
    backgroundColor: Colors.primary,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: 'white',
    lineHeight: 28.8,
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
