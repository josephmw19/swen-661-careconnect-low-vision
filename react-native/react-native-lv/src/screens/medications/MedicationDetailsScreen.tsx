import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { AppHeader } from '../../components/AppHeader';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProp = RouteProp<RootStackParamList, 'MedicationDetails'>;

export function MedicationDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();

  const {
    id: medicationName,
    dosage = '',
    instructions = '',
    nextDose = '',
    statusMessage = '',
  } = route.params;

  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Medication Details</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Medication Name</Text>
          <Text style={styles.value}>{medicationName}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Dosage</Text>
          <Text style={styles.value}>{dosage}</Text>
        </View>

        {instructions && (
          <View style={styles.card}>
            <Text style={styles.label}>Instructions</Text>
            <Text style={styles.value}>{instructions}</Text>
          </View>
        )}

        {nextDose && (
          <View style={styles.card}>
            <Text style={styles.label}>Next Dose</Text>
            <Text style={styles.value}>{nextDose}</Text>
          </View>
        )}

        {statusMessage && (
          <View style={styles.statusCard}>
            <Ionicons name="information-circle" size={24} color={Colors.warning} />
            <Text style={styles.statusText}>{statusMessage}</Text>
          </View>
        )}
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
    paddingTop: 27,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
    height: 44,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: FontSizes['4xl'],
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.3901,
    lineHeight: 44.2,
    flex: 1,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: Spacing['2xl'],
    marginBottom: Spacing['3xl'],
  },
  label: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: '600',
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  value: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: 'normal',
    color: 'white',
    lineHeight: 38.4,
  },
  statusCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.warning,
    padding: Spacing['2xl'],
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: 'normal',
    color: Colors.warning,
    marginLeft: Spacing.md,
    flex: 1,
  },
});
