import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppHeader } from '../../components/AppHeader';
import { MedicationCard } from '../../components/home/MedicationCard';
import { RefillReminderCard } from '../../components/home/RefillReminderCard';
import { TodayCard } from '../../components/home/TodayCard';
import { UpcomingAppointmentsCard } from '../../components/home/UpcomingAppointmentsCard';
import { Colors, Spacing } from '../../constants/Theme';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [medicationMarkedAsTaken, setMedicationMarkedAsTaken] = useState(false);
  const [medicationSnoozed, setMedicationSnoozed] = useState(false);
  const [bloodPressureCheckCompleted, setBloodPressureCheckCompleted] = useState(true);
  const [lunchMedicationCompleted, setLunchMedicationCompleted] = useState(false);
  const [eveningWalkCompleted, setEveningWalkCompleted] = useState(false);

  const handleMarkAsTaken = () => {
    setMedicationMarkedAsTaken(true);
    setMedicationSnoozed(false);
  };

  const handleSnooze = () => {
    setMedicationSnoozed(true);
  };

  const handleTaskToggle = (taskId: string) => {
    switch (taskId) {
      case 'blood_pressure':
        setBloodPressureCheckCompleted(!bloodPressureCheckCompleted);
        break;
      case 'lunch_medication':
        setLunchMedicationCompleted(!lunchMedicationCompleted);
        break;
      case 'evening_walk':
        setEveningWalkCompleted(!eveningWalkCompleted);
        break;
    }
  };

  const handleViewAllAppointments = () => {
    navigation.navigate('Appointments');
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <MedicationCard
          isMarkedAsTaken={medicationMarkedAsTaken}
          isSnoozed={medicationSnoozed}
          onMarkAsTaken={handleMarkAsTaken}
          onSnooze={handleSnooze}
        />
        <View style={styles.spacing} />
        <RefillReminderCard />
        <View style={styles.spacing} />
        <TodayCard
          bloodPressureCheckCompleted={bloodPressureCheckCompleted}
          lunchMedicationCompleted={lunchMedicationCompleted}
          eveningWalkCompleted={eveningWalkCompleted}
          onTaskToggle={handleTaskToggle}
        />
        <View style={styles.spacing} />
        <UpcomingAppointmentsCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
  },
  spacing: {
    height: Spacing['3xl'],
  },
});