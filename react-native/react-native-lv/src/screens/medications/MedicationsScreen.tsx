import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { MedicationListItem, MedicationStatus } from '../../components/medications/MedicationListItem';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

export function MedicationsScreen() {
  const [lisinoprilTaken, setLisinoprilTaken] = useState(false);
  const [aspirinTaken, setAspirinTaken] = useState(false);

  const handleMarkAsTaken = (medicationName: string) => {
    if (medicationName === 'Lisinopril 10mg') {
      setLisinoprilTaken(true);
    } else if (medicationName === 'Aspirin 81mg') {
      setAspirinTaken(true);
    }
  };

  const getTakenTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const displayMinute = minute.toString().padStart(2, '0');
    return `Taken today at ${displayHour}:${displayMinute} ${period}`;
  };

  const getFormattedDate = () => {
    const now = new Date();
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${weekdays[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.headerSection}>
        <Text style={styles.title}>Medications</Text>
        <Text style={styles.subtitle}>Today's Medications</Text>
        <Text style={styles.date}>{getFormattedDate()}</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <MedicationListItem
          name="Lisinopril 10mg"
          instructions="1 tablet every morning"
          additionalNotes="Take with food"
          status={lisinoprilTaken ? MedicationStatus.taken : MedicationStatus.dueNow}
          statusText={lisinoprilTaken ? undefined : 'Due now (9:00 AM)'}
          takenTime={lisinoprilTaken ? getTakenTime() : undefined}
          onMarkAsTaken={
            lisinoprilTaken ? undefined : () => handleMarkAsTaken('Lisinopril 10mg')
          }
        />
        <MedicationListItem
          name="Metformin 500mg"
          instructions="1 tablet with breakfast"
          additionalNotes="Take with food and water"
          status={MedicationStatus.taken}
          takenTime="Taken today at 8:15 AM"
        />
        <MedicationListItem
          name="Atorvastatin 20mg"
          instructions="1 tablet every evening"
          additionalNotes="Take before bedtime"
          status={MedicationStatus.scheduled}
          statusText="Scheduled for 9:00 PM"
        />
        <MedicationListItem
          name="Aspirin 81mg"
          instructions="1 tablet with lunch"
          additionalNotes="Take with food"
          status={aspirinTaken ? MedicationStatus.taken : MedicationStatus.dueSoon}
          statusText={aspirinTaken ? undefined : 'Due in 30 minutes (12:30 PM)'}
          takenTime={aspirinTaken ? getTakenTime() : undefined}
          onMarkAsTaken={
            aspirinTaken ? undefined : () => handleMarkAsTaken('Aspirin 81mg')
          }
        />
        <MedicationListItem
          name="Vitamin D 2000 IU"
          instructions="1 capsule every morning"
          additionalNotes="Take with breakfast"
          status={MedicationStatus.taken}
          takenTime="Taken today at 8:20 AM"
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
    paddingBottom: 2,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: FontSizes['4xl'],
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.3901,
    lineHeight: 44.2,
    marginBottom: 13.5,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: 'normal',
    color: Colors.text,
    letterSpacing: 0.2158,
    lineHeight: 39,
    marginBottom: 13.5,
  },
  date: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: 'normal',
    color: Colors.textMuted,
    letterSpacing: -0.2578,
    lineHeight: 33,
    marginBottom: 13.5,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    paddingTop: Spacing['3xl'],
  },
});
