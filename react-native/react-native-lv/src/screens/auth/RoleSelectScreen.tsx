import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';
import { useAuth } from '../../contexts/AuthContext';
import { USER_ROLES, UserRole } from '../../utils/authStorage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function RoleSelectScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { setUserRole } = useAuth();

  const handleRoleSelect = async (role: UserRole) => {
    try {
      await setUserRole(role);
      navigation.replace('SignIn');
    } catch (error) {
      console.error('Error setting user role:', error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Role</Text>

        <Text style={styles.subtitle}>
          Select the option that best describes how you use CareConnect.
        </Text>

        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => handleRoleSelect(USER_ROLES.CAREGIVER)}
        >
          <View style={styles.roleCardContent}>
            <View style={styles.roleHeader}>
              <Ionicons name="people-outline" size={40} color={Colors.primaryLight} />
              <Text style={styles.roleTitle}>Caregiver</Text>
            </View>
            <Text style={styles.roleSubtitle}>
              I provide care and support for patients.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => handleRoleSelect(USER_ROLES.PATIENT)}
        >
          <View style={styles.roleCardContent}>
            <View style={styles.roleHeader}>
              <Ionicons name="person-outline" size={40} color={Colors.successLight} />
              <Text style={styles.roleTitle}>Patient</Text>
            </View>
            <Text style={styles.roleSubtitle}>
              I receive care and manage my health.
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.note}>
          You can change your role later in Settings if needed.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.replace('Landing')}
        >
          <Ionicons name="arrow-back" size={32} color={Colors.text} />
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
    fontSize: FontSizes.xl,
    fontWeight: 'normal',
    color: Colors.text,
    lineHeight: 41.6,
    marginBottom: 28,
  },
  roleCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.borderDarker,
    marginBottom: Spacing.lg,
    minHeight: 140,
  },
  roleCardContent: {
    padding: Spacing.xl,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  roleTitle: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: 'white',
    marginLeft: 14,
    lineHeight: 36.4,
  },
  roleSubtitle: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: 'normal',
    color: Colors.text,
    lineHeight: 38.4,
  },
  note: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: 'normal',
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 38.4,
    marginBottom: 28,
  },
  backButton: {
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.borderDarker,
    paddingHorizontal: Spacing.lg,
  },
  backButtonText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: Spacing.md,
    lineHeight: 36.4,
  },
});
