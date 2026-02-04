export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Landing: undefined;
  RoleSelect: undefined;
  SignIn: undefined;
  ForgotPassword: { mode?: 'username' | 'password' };
  Home: undefined;
  Medications: undefined;
  MedicationDetails: { 
    id: string;
    dosage?: string;
    instructions?: string;
    nextDose?: string;
    statusMessage?: string;
  };
  Tasks: undefined;
  TaskDetails: {
    id: string;
    description?: string;
    dueTime?: string;
    statusMessage?: string;
  };
  Appointments: undefined;
  AppointmentDetails: {
    id: string;
    doctorName?: string;
    dateTime?: string;
    location?: string;
    appointmentType?: string;
    clinicName?: string;
  };
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
