import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AppointmentItemProps {
  provider: string;
  date: string;
}

function AppointmentItem({ provider, date }: AppointmentItemProps) {
  return (
    <View style={styles.appointmentItem}>
      <Text style={styles.providerText}>{provider}</Text>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );
}

export function UpcomingAppointmentsCard() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar-outline" size={20} color="white" />
        </View>
        <Text style={styles.headerText}>Upcoming Appointments</Text>
      </View>

      <View style={styles.appointmentsContainer}>
        <AppointmentItem provider="Dr. Rodriguez" date="Feb 10, 3:45 PM" />
        <View style={styles.appointmentSpacing} />
        <AppointmentItem provider="Vision Care Center" date="Mar 2, 9:00 AM" />
        <View style={styles.appointmentSpacing} />
        <AppointmentItem provider="Physical Therapy" date="Mar 8, 11:30 AM" />
      </View>

      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={() => navigation.navigate('Appointments')}
      >
        <Text style={styles.viewAllButtonText}>View All Appointments</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: Spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  headerText: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.3828,
    lineHeight: 39.2,
    flex: 1,
  },
  appointmentsContainer: {
    marginBottom: Spacing['2xl'],
  },
  appointmentSpacing: {
    height: Spacing.lg,
  },
  appointmentItem: {
    backgroundColor: Colors.secondary,
    borderRadius: 15.25,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 20,
  },
  providerText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.0703,
    lineHeight: 38.4,
    marginBottom: 4.5,
  },
  dateText: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: 'normal',
    color: Colors.textMuted,
    letterSpacing: -0.2578,
    lineHeight: 33,
  },
  viewAllButton: {
    width: '100%',
    height: 77,
    backgroundColor: Colors.primary,
    borderRadius: 15.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllButtonText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.0703,
  },
});
