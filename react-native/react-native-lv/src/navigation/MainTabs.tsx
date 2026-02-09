import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/home/HomeScreen';
import { MedicationsScreen } from '../screens/medications/MedicationsScreen';
import { MedicationDetailsScreen } from '../screens/medications/MedicationDetailsScreen';
import { TasksScreen } from '../screens/tasks/TasksScreen';
import { TaskDetailsScreen } from '../screens/tasks/TaskDetailsScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { Colors } from '../constants/Theme';

// add these imports near the top
import { AppointmentsScreen } from '../screens/appointments/AppointmentsScreen';
import { AppointmentDetailsScreen } from '../screens/appointments/AppointmentDetailsScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const MedicationsStack = createNativeStackNavigator();
const TasksStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

/* ---------- Stack Wrappers ---------- */

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />

      {/* Add these two screens */}
      <HomeStack.Screen name="Appointments" component={AppointmentsScreen} />
      <HomeStack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
    </HomeStack.Navigator>
  );
}

function MedicationsStackScreen() {
  return (
    <MedicationsStack.Navigator screenOptions={{ headerShown: false }}>
      <MedicationsStack.Screen
        name="MedicationsMain"
        component={MedicationsScreen}
      />
      <MedicationsStack.Screen
        name="MedicationDetails"
        component={MedicationDetailsScreen}
      />
    </MedicationsStack.Navigator>
  );
}

function TasksStackScreen() {
  return (
    <TasksStack.Navigator screenOptions={{ headerShown: false }}>
      <TasksStack.Screen name="TasksMain" component={TasksScreen} />
      <TasksStack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
      />
    </TasksStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen
        name="SettingsMain"
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
}

/* ---------- Tabs ---------- */

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 2,
          height: 108,
          paddingTop: 2,
        },
        tabBarActiveTintColor: Colors.primaryLight,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 20,
          fontWeight: '500',
          letterSpacing: -0.4492,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={32}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Medications"
        component={MedicationsStackScreen}
        options={{
          tabBarLabel: 'Medications',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'medical' : 'medical-outline'}
              size={32}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Tasks"
        component={TasksStackScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'list' : 'list-outline'}
              size={32}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={32}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}