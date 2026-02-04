import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

interface MedicationCardProps {
  isMarkedAsTaken?: boolean;
  isSnoozed?: boolean;
  onMarkAsTaken?: () => void;
  onSnooze?: () => void;
}

export function MedicationCard({
  isMarkedAsTaken = false,
  isSnoozed = false,
  onMarkAsTaken,
  onSnooze,
}: MedicationCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="medical" size={20} color="white" />
        </View>
        <Text style={styles.headerText}>Next Medication</Text>
      </View>

      <View style={styles.medicationInfo}>
        <Text style={styles.medicationName}>Metformin 500mg</Text>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={18} color={Colors.successLight} />
          <Text style={styles.timeText}>
            Due at 2:00 PM (in 15 minutes)
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.markButton,
          isMarkedAsTaken && styles.markButtonTaken,
        ]}
        onPress={onMarkAsTaken}
        disabled={isMarkedAsTaken}
      >
        <View style={styles.checkIconContainer}>
          <Ionicons name="checkmark" size={20} color={Colors.primary} />
        </View>
        <Text style={styles.markButtonText}>
          {isMarkedAsTaken ? 'Marked as Taken' : 'Mark as Taken'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.snoozeButton,
          isSnoozed && styles.snoozeButtonActive,
        ]}
        onPress={onSnooze}
        disabled={isMarkedAsTaken || isSnoozed}
      >
        <Ionicons name="time-outline" size={28} color={Colors.text} />
        <Text style={styles.snoozeButtonText}>
          {isSnoozed ? 'Snoozed' : 'Snooze 10 min'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.borderDarker,
    padding: Spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#FFB3BA',
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
  },
  medicationInfo: {
    marginBottom: Spacing['2xl'],
  },
  medicationName: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.2158,
    lineHeight: 41.6,
    marginBottom: Spacing.sm,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: 'normal',
    color: Colors.successLight,
    letterSpacing: 0.0703,
    lineHeight: 38.4,
    marginLeft: Spacing.md,
    flex: 1,
  },
  markButton: {
    width: '100%',
    height: 90,
    backgroundColor: Colors.primary,
    borderRadius: 15.25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  markButtonTaken: {
    backgroundColor: Colors.success,
  },
  checkIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  markButtonText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.2158,
    flex: 1,
    textAlign: 'center',
  },
  snoozeButton: {
    width: '100%',
    height: 77,
    backgroundColor: Colors.secondary,
    borderRadius: 15.25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  snoozeButtonActive: {
    backgroundColor: Colors.primary,
  },
  snoozeButtonText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '500',
    color: Colors.text,
    letterSpacing: 0.0703,
    marginLeft: Spacing.lg,
    flex: 1,
    textAlign: 'center',
  },
});
