import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

interface TodayCardProps {
  bloodPressureCheckCompleted?: boolean;
  lunchMedicationCompleted?: boolean;
  eveningWalkCompleted?: boolean;
  onTaskToggle?: (taskId: string) => void;
}

interface TaskItemProps {
  title: string;
  time: string;
  isCompleted: boolean;
  height: number;
  onTap?: () => void;
}

function TaskItem({ title, time, isCompleted, height, onTap }: TaskItemProps) {
  return (
    <TouchableOpacity
      style={[styles.taskItem, { height }]}
      onPress={onTap}
      activeOpacity={0.8}
    >
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={styles.taskTime}>{time}</Text>
      </View>
      {isCompleted ? (
        <Ionicons name="checkmark-circle" size={27} color={Colors.successLight} />
      ) : (
        <View style={styles.checkbox} />
      )}
    </TouchableOpacity>
  );
}

export function TodayCard({
  bloodPressureCheckCompleted = true,
  lunchMedicationCompleted = false,
  eveningWalkCompleted = false,
  onTaskToggle,
}: TodayCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar-outline" size={20} color="white" />
        </View>
        <Text style={styles.headerText}>Today</Text>
      </View>

      <View style={styles.tasksContainer}>
        <TaskItem
          title="Blood Pressure Check"
          time="9:00 AM"
          isCompleted={bloodPressureCheckCompleted}
          height={157.5}
          onTap={() => onTaskToggle?.('blood_pressure')}
        />
        <View style={styles.taskSpacing} />
        <TaskItem
          title="Lunch Medication"
          time="12:30 PM"
          isCompleted={lunchMedicationCompleted}
          height={119.5}
          onTap={() => onTaskToggle?.('lunch_medication')}
        />
        <View style={styles.taskSpacing} />
        <TaskItem
          title="Evening Walk"
          time="6:00 PM"
          isCompleted={eveningWalkCompleted}
          height={119.5}
          onTap={() => onTaskToggle?.('evening_walk')}
        />
      </View>
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
  },
  tasksContainer: {
    marginTop: 0,
  },
  taskSpacing: {
    height: Spacing.lg,
  },
  taskItem: {
    backgroundColor: Colors.secondary,
    borderRadius: 15.25,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.0703,
    lineHeight: 38.4,
    marginBottom: 4.5,
  },
  taskTime: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: 'normal',
    color: Colors.textMuted,
    letterSpacing: -0.2578,
    lineHeight: 33,
  },
  checkbox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#5A6270',
  },
});
