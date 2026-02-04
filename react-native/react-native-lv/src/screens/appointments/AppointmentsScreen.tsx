import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

export function AppointmentsScreen() {
  return (
    <View style={styles.container}>
      <AppHeader />
      <View style={styles.headerSection}>
        <Text style={styles.title}>Appointments</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.emptyText}>No appointments scheduled</Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    paddingTop: Spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: 'normal',
    color: Colors.textMuted,
  },
});
