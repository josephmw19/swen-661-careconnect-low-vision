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
type AppointmentDetailsRouteProp = RouteProp<RootStackParamList, 'AppointmentDetails'>;

export function AppointmentDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AppointmentDetailsRouteProp>();

  const {
    id,
    doctorName = '',
    dateTime = '',
    location = '',
    appointmentType = '',
    clinicName = '',
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
          <Text style={styles.title}>Appointment Details</Text>
        </View>

        {doctorName && (
          <View style={styles.card}>
            <Text style={styles.label}>Doctor</Text>
            <Text style={styles.value}>{doctorName}</Text>
          </View>
        )}

        {clinicName && (
          <View style={styles.card}>
            <Text style={styles.label}>Clinic</Text>
            <Text style={styles.value}>{clinicName}</Text>
          </View>
        )}

        {dateTime && (
          <View style={styles.card}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.value}>{dateTime}</Text>
          </View>
        )}

        {location && (
          <View style={styles.card}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{location}</Text>
          </View>
        )}

        {appointmentType && (
          <View style={styles.card}>
            <Text style={styles.label}>Appointment Type</Text>
            <Text style={styles.value}>{appointmentType}</Text>
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
});
