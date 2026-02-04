import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export enum TaskStatus {
  notCompleted = 'notCompleted',
  completed = 'completed',
  upcoming = 'upcoming',
}

interface TaskListItemProps {
  title: string;
  description?: string;
  status: TaskStatus;
  statusText?: string;
  completionText?: string;
  dueDate?: string;
  hasActionButton?: boolean;
  onMarkComplete?: () => void;
}

export function TaskListItem({
  title,
  description,
  status,
  statusText,
  completionText,
  dueDate,
  hasActionButton = false,
  onMarkComplete,
}: TaskListItemProps) {
  const navigation = useNavigation<NavigationProp>();

  const hasDarkerBorder = status === TaskStatus.notCompleted;

  const handlePress = () => {
    navigation.navigate('TaskDetails', {
      id: title,
      description,
      dueTime: dueDate || completionText,
    });
  };

  const getIcon = () => {
    if (status === TaskStatus.completed) {
      return 'checkmark-circle';
    } else if (status === TaskStatus.upcoming) {
      return 'calendar-outline';
    }
    return 'radio-button-off-outline';
  };

  const getIconColor = () => {
    if (status === TaskStatus.completed) {
      return Colors.successLight;
    }
    return Colors.primary;
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
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: getIconColor() },
          ]}
        >
          <Ionicons name={getIcon() as any} size={20} color="white" />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
          {statusText && <Text style={styles.statusText}>{statusText}</Text>}
          {completionText && (
            <Text style={styles.completionText}>{completionText}</Text>
          )}
          {dueDate && (
            <View style={styles.dueDateRow}>
              <Ionicons name="time-outline" size={20} color={Colors.textMuted} />
              <Text style={styles.dueDateText}>{dueDate}</Text>
            </View>
          )}
        </View>
      </View>

      {hasActionButton && (
        <TouchableOpacity style={styles.markButton} onPress={onMarkComplete}>
          <View style={styles.checkboxOutline} />
          <Text style={styles.markButtonText}>Mark as Complete</Text>
        </TouchableOpacity>
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
    marginBottom: Spacing['2xl'],
  },
  containerDarkerBorder: {
    borderColor: Colors.borderDarker,
  },
  content: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  details: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.2158,
    lineHeight: 39,
    marginBottom: Spacing.sm,
  },
  description: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: 'normal',
    color: Colors.text,
    letterSpacing: 0.0703,
    lineHeight: 38.4,
    marginBottom: Spacing.sm,
    minHeight: 76,
  },
  statusText: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: 'normal',
    color: Colors.textMuted,
    letterSpacing: -0.2578,
    lineHeight: 35.2,
    marginBottom: Spacing.sm,
  },
  completionText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: 'normal',
    color: Colors.successLight,
    letterSpacing: 0.0703,
    lineHeight: 38.4,
    marginBottom: Spacing.sm,
  },
  dueDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  dueDateText: {
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
    height: 77,
    backgroundColor: Colors.primary,
    borderRadius: 15.25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
  },
  checkboxOutline: {
    width: 27.5,
    height: 27.5,
    borderRadius: 13.75,
    borderWidth: 2,
    borderColor: 'white',
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
});
