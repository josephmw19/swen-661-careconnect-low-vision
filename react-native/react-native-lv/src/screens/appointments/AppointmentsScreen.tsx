import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { AppointmentCard } from '../../components/appointments/AppointmentCard';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

export function AppointmentsScreen() {
  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.headerSection}>
        <Text style={styles.title}>Appointments</Text>
        <Text style={styles.subtitle}>Upcoming Appointments</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <AppointmentCard
          doctorName="Dr. Sarah Johnson"
          dateTime="Monday, February 3 at 2:30 PM"
          location="Main Street Medical Center"
          appointmentType="Annual checkup"
          hasDarkerBorder={true}
        />
        <View style={styles.cardSpacing} />
        <AppointmentCard
          doctorName="Dr. Michael Chen"
          dateTime="Thursday, February 6 at 10:00 AM"
          location="Cardiology Associates"
          appointmentType="Follow-up visit"
        />
        <View style={styles.cardSpacing} />
        <AppointmentCard
          doctorName="Dr. Emily Rodriguez"
          dateTime="Monday, February 10 at 3:45 PM"
          location="Vision Care Center"
          appointmentType="Eye examination"
        />
        <View style={styles.cardSpacing} />
        <AppointmentCard
          doctorName="Dr. James Patterson"
          dateTime="Friday, February 14 at 11:15 AM"
          location="Community Health Clinic"
          appointmentType="Blood work and consultation"
        />
        <View style={styles.cardSpacing} />
        <AppointmentCard
          doctorName="Dr. Lisa Martinez"
          dateTime="Wednesday, February 19 at 1:00 PM"
          location="Downtown Physical Therapy"
          appointmentType="Physical therapy session"
        />
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
    paddingHorizontal: Spacing.xl,
    paddingTop: 27,
    paddingBottom: 22.5,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: FontSizes['4xl'],
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.3901,
    lineHeight: 44.2,
    marginBottom: 13.5,
    height: 44,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: 'normal',
    color: Colors.text,
    letterSpacing: 0.2158,
    lineHeight: 39,
    height: 38,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    paddingTop: Spacing['3xl'],
  },
  cardSpacing: {
    height: Spacing['3xl'],
  },
});
