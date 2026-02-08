import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes } from '../constants/Theme';

interface AppHeaderProps {
  onReadTap?: () => void;
  onVoiceTap?: () => void;
  isReading?: boolean;
  isListening?: boolean;
}

export function AppHeader({
  onReadTap,
  onVoiceTap,
  isReading = false,
  isListening = false,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CareConnect</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, isReading && styles.actionButtonActive]}
            onPress={onReadTap}
          >
            <Ionicons
              name="volume-high-outline"
              size={28}
              color={Colors.primaryLight}
            />
            <Text style={styles.actionLabel}>Read</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.actionButtonSpacing,
              isListening && styles.actionButtonActive,
            ]}
            onPress={onVoiceTap}
          >
            <Ionicons
              name="mic-outline"
              size={28}
              color={Colors.primaryLight}
            />
            <Text style={styles.actionLabel}>Voice</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
    paddingHorizontal: 22.5,
    paddingTop: 60,
    paddingBottom: 2,
  },
  content: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: FontSizes['3xl'],
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.4063,
    lineHeight: 41.6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 50,
    height: 64,
    backgroundColor: Colors.secondary,
    borderRadius: 15.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  actionButtonActive: {
    backgroundColor: Colors.primary,
  },
  actionButtonSpacing: {
    marginLeft: 13.5,
  },
  actionLabel: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xs,
    fontWeight: 'normal',
    color: Colors.primaryLight,
    letterSpacing: -0.4395,
    lineHeight: 23.4,
    marginTop: 4.5,
  },
});
