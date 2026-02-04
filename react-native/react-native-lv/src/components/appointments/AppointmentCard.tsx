import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Colors, FontSizes, Spacing } from '../../constants/Theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AppointmentCardProps {
  doctorName: string;
  dateTime: string;
  location: string;
  appointmentType: string;
  hasDarkerBorder?: boolean;
}

export function AppointmentCard({
  doctorName,
  dateTime,
  location,
  appointmentType,
  hasDarkerBorder = false,
}: AppointmentCardProps) {
  const navigation = useNavigation<NavigationProp>();

  const handleViewDetails = () => {
    navigation.navigate('AppointmentDetails', {
      id: doctorName,
      doctorName,
      dateTime,
      location,
      appointmentType,
      clinicName: location,
    });
  };

  return (
    <View
      style={[
        styles.container,
        hasDarkerBorder && styles.containerDarkerBorder,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="medical-outline" size={20} color="white" />
        </View>
        <View style={styles.details}>
          <Text style={styles.doctorName}>{doctorName}</Text>

          <View style={styles.spacing} />

          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={26} color={Colors.successLight} />
            <Text style={styles.dateTime}>{dateTime}</Text>
          </View>

          <View style={styles.infoRowSpacing} />

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={26} color={Colors.warning} />
            <Text style={styles.location}>{location}</Text>
          </View>

          <View style={styles.infoRowSpacing} />

          <Text style={styles.appointmentType}>{appointmentType}</Text>
        </View>
      </View>

      <View style={styles.buttonSpacing} />

      <TouchableOpacity style={styles.viewDetailsButton} onPress={handleViewDetails}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <Ionicons name="arrow-forward" size={32} color="white" />
      </TouchableOpacity>
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
  containerDarkerBorder: {
    borderColor: Colors.borderDarker,
  },
  content: {
    flexDirection: 'row',
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
  details: {
    flex: 1,
  },
  doctorName: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.2158,
    lineHeight: 39,
  },
  spacing: {
    height: Spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoRowSpacing: {
    height: Spacing.lg,
  },
  dateTime: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: 'normal',
    color: Colors.text,
    letterSpacing: 0.0703,
    lineHeight: 38.4,
    marginLeft: Spacing.md,
    flex: 1,
  },
  location: {
    fontFamily: 'Inter',
    fontSize: FontSizes['2xl'],
    fontWeight: 'normal',
    color: Colors.textMuted,
    letterSpacing: -0.2578,
    lineHeight: 35.2,
    marginLeft: Spacing.md,
    flex: 1,
  },
  appointmentType: {
    fontFamily: 'Inter',
    fontSize: FontSizes.lg,
    fontWeight: '500',
    color: Colors.primaryLight,
    letterSpacing: 0.0703,
    lineHeight: 38.4,
  },
  buttonSpacing: {
    height: Spacing.xl,
  },
  viewDetailsButton: {
    width: '100%',
    height: 90,
    backgroundColor: Colors.primary,
    borderRadius: 15.25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontFamily: 'Inter',
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.2158,
    marginRight: 8,
  },
});
