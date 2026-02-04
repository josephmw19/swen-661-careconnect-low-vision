import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export enum MedicationStatus {
  dueNow = 'dueNow',
  taken = 'taken',
  scheduled = 'scheduled',
  dueSoon = 'dueSoon',
}

interface MedicationListItemProps {
  name: string;
  instructions: string;
  additionalNotes?: string;
  status: MedicationStatus;
  statusText?: string;
  takenTime?: string;
  onMarkAsTaken?: () => void;
}

export function MedicationListItem({
  name,
  instructions,
  additionalNotes,
  status,
  statusText,
  takenTime,
  onMarkAsTaken,
}: MedicationListItemProps) {
  const navigation = useNavigation<NavigationProp>();

  const hasDarkerBorder =
    status === MedicationStatus.dueNow || status === MedicationStatus.dueSoon;

  const handlePress = () => {
    navigation.navigate('MedicationDetails', {
      id: name,
      dosage: instructions,
      instructions: additionalNotes,
    });
  };

  const renderStatusSection = () => {
    switch (status) {
      case MedicationStatus.dueNow:
      case MedicationStatus.dueSoon:
        return (
          <View style={styles.statusRow}>
            <Ionicons name="time-outline" size={22} color={Colors.warning} />
            <Text style={styles.statusTextWarning}>{statusText}</Text>
          </View>
        );
      case MedicationStatus.scheduled:
        return (
          <View style={styles.statusRow}>
            <Ionicons name="time-outline" size={20} color={Colors.textMuted} />
            <Text style={styles.statusTextMuted}>{statusText}</Text>
          </View>
        );
      case MedicationStatus.taken:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        hasDarkerBorder && styles.containerDarkerBorder,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="medical" size={20} color="white" />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          {additionalNotes && (
            <Text style={styles.additionalNotes}>{additionalNotes}</Text>
          )}
          {renderStatusSection()}
        </View>
      </View>

      {(status === MedicationStatus.dueNow ||
        status === MedicationStatus.dueSoon) && (
        <TouchableOpacity
          style={styles.markButton}
          onPress={onMarkAsTaken}
        >
          <View style={styles.checkIconContainer}>
            <Ionicons name="checkmark" size={20} color={Colors.primary} />
          </View>
          <Text style={styles.markButtonText}>Mark as Taken</Text>
        </TouchableOpacity>
      )}

      {status === MedicationStatus.taken && (
        <View style={styles.takenStatus}>
          <Ionicons
            name="checkmark-circle"
            size={25}
            color={Colors.successLight}
          />
          <Text style={styles.takenText}>{takenTime || 'Taken today'}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: Spacing['2xl'],
    marginBottom: Spacing['3xl'],
  },
  containerDarkerBorder: {
    borderColor: Colors.borderDarker,
  },
  content: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4.5,
    marginRight: Spacing.md,
  },
  details: {
    flex: 1,
  },
  name: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.2158,
    lineHeight: 39,
    marginBottom: Spacing.sm,
  },
  instructions: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: 'normal',
    color: Colors.text,
    letterSpacing: 0.0703,
    lineHeight: 38.4,
    marginBottom: Spacing.sm,
    minHeight: 76,
  },
  additionalNotes: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: 'normal',
    color: Colors.textMuted,
    letterSpacing: -0.2578,
    lineHeight: 35.2,
    marginBottom: Spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  statusTextWarning: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '500',
    color: Colors.warning,
    letterSpacing: 0.0703,
    lineHeight: 38.4,
    marginLeft: Spacing.md,
    flex: 1,
  },
  statusTextMuted: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: 'normal',
    color: Colors.textMuted,
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
  takenStatus: {
    backgroundColor: Colors.completedBg,
    borderRadius: 15.25,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  takenText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '500',
    color: Colors.successLight,
    letterSpacing: 0.0703,
    lineHeight: 36,
    marginLeft: Spacing.md,
    flex: 1,
  },
});
