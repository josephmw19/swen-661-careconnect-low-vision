import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

interface RefillReminderCardProps {
  onTap?: () => void;
}

export function RefillReminderCard({ onTap }: RefillReminderCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onTap} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <Ionicons name="warning" size={20} color="white" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Refill Reminder</Text>
        <Text style={styles.description}>
          Metformin refill due in 3 days. Tap to contact pharmacy.
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.warningBg,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.warningBorder,
    padding: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#FFD700',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4.5,
    marginRight: 18,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.2158,
    lineHeight: 39,
    marginBottom: Spacing.sm,
  },
  description: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: 'normal',
    color: Colors.warningText,
    letterSpacing: -0.2578,
    lineHeight: 35.2,
  },
});
