import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { TaskListItem, TaskStatus } from '../../components/tasks/TaskListItem';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

export function TasksScreen() {
  const [morningVitaminsCompleted, setMorningVitaminsCompleted] = useState(false);
  const [drinkWaterCompleted, setDrinkWaterCompleted] = useState(false);

  const handleMarkComplete = (taskTitle: string) => {
    if (taskTitle === 'Take morning vitamins') {
      setMorningVitaminsCompleted(true);
    } else if (taskTitle === 'Drink 8 glasses of water') {
      setDrinkWaterCompleted(true);
    }
  };

  const getCompletionTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const displayMinute = minute.toString().padStart(2, '0');
    return `Completed at ${displayHour}:${displayMinute} ${period}`;
  };

  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.headerSection}>
        <Text style={styles.title}>Tasks</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.sectionHeader}>Today</Text>
        <View style={styles.sectionSpacing} />

        <TaskListItem
          title="Take morning vitamins"
          status={
            morningVitaminsCompleted
              ? TaskStatus.completed
              : TaskStatus.notCompleted
          }
          statusText={
            morningVitaminsCompleted ? undefined : 'Status: Not completed'
          }
          completionText={
            morningVitaminsCompleted ? getCompletionTime() : undefined
          }
          hasActionButton={!morningVitaminsCompleted}
          onMarkComplete={
            morningVitaminsCompleted
              ? undefined
              : () => handleMarkComplete('Take morning vitamins')
          }
        />

        <TaskListItem
          title="Check blood pressure"
          status={TaskStatus.completed}
          completionText="Completed at 7:45 AM"
        />

        <TaskListItem
          title="Drink 8 glasses of water"
          description="Stay hydrated throughout the day"
          status={
            drinkWaterCompleted
              ? TaskStatus.completed
              : TaskStatus.notCompleted
          }
          statusText={
            drinkWaterCompleted ? undefined : 'Status: Not completed'
          }
          completionText={
            drinkWaterCompleted ? getCompletionTime() : undefined
          }
          hasActionButton={!drinkWaterCompleted}
          onMarkComplete={
            drinkWaterCompleted
              ? undefined
              : () => handleMarkComplete('Drink 8 glasses of water')
          }
        />

        <TaskListItem
          title="30-minute morning walk"
          status={TaskStatus.completed}
          completionText="Completed at 6:30 AM"
        />

        <View style={styles.sectionSpacingLarge} />
        <Text style={styles.sectionHeader}>Upcoming</Text>
        <View style={styles.sectionSpacing} />

        <TaskListItem
          title="Call pharmacy for refill"
          status={TaskStatus.upcoming}
          dueDate="Due February 2, 2026"
        />

        <TaskListItem
          title="Schedule annual physical"
          status={TaskStatus.upcoming}
          dueDate="Due February 10, 2026"
        />

        <TaskListItem
          title="Order blood pressure monitor batteries"
          description="Current batteries running low"
          status={TaskStatus.upcoming}
          dueDate="Due February 5, 2026"
        />

        <View style={styles.sectionSpacingLarge} />
        <Text style={styles.sectionHeader}>Completed</Text>
        <View style={styles.sectionSpacing} />

        <TaskListItem
          title="Review medication list with doctor"
          status={TaskStatus.completed}
          completionText="Completed January 25, 2026"
        />

        <TaskListItem
          title="Update emergency contact information"
          status={TaskStatus.completed}
          completionText="Completed January 24, 2026"
        />

        <TaskListItem
          title="Pick up prescription refills"
          description="Collected from Pharmacy"
          status={TaskStatus.completed}
          completionText="Completed January 23, 2026"
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: FontSizes['4xl'],
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.3901,
    lineHeight: 44.2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    paddingTop: Spacing['3xl'],
  },
  sectionHeader: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.3828,
    lineHeight: 39.2,
    marginLeft: 9,
  },
  sectionSpacing: {
    height: Spacing['2xl'],
  },
  sectionSpacingLarge: {
    height: Spacing['4xl'],
  },
});
