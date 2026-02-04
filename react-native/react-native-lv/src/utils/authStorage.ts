import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  IS_SIGNED_IN: 'auth.isSignedIn',
  USER_ROLE: 'auth.userRole',
  LAST_USERNAME: 'auth.lastUsername',
} as const;

export const USER_ROLES = {
  PATIENT: 'patient',
  CAREGIVER: 'caregiver',
} as const;

export type UserRole = typeof USER_ROLES.PATIENT | typeof USER_ROLES.CAREGIVER;

export const authStorage = {
  async isSignedIn(): Promise<boolean> {
    const value = await AsyncStorage.getItem(KEYS.IS_SIGNED_IN);
    return value === 'true';
  },

  async setSignedIn(value: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.IS_SIGNED_IN, value ? 'true' : 'false');
  },

  async getUserRole(): Promise<UserRole | null> {
    const role = await AsyncStorage.getItem(KEYS.USER_ROLE);
    if (role === USER_ROLES.PATIENT || role === USER_ROLES.CAREGIVER) {
      return role;
    }
    return null;
  },

  async setUserRole(role: UserRole): Promise<void> {
    await AsyncStorage.setItem(KEYS.USER_ROLE, role);
  },

  async getLastUsername(): Promise<string | null> {
    return await AsyncStorage.getItem(KEYS.LAST_USERNAME);
  },

  async setLastUsername(username: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.LAST_USERNAME, username.trim());
  },

  async signOut(): Promise<void> {
    await AsyncStorage.setItem(KEYS.IS_SIGNED_IN, 'false');
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([
      KEYS.IS_SIGNED_IN,
      KEYS.USER_ROLE,
      KEYS.LAST_USERNAME,
    ]);
  },
};
