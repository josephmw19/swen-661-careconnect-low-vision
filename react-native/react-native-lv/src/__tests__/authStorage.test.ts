import AsyncStorage from '@react-native-async-storage/async-storage';
import { authStorage, USER_ROLES } from '../utils/authStorage';

describe('authStorage', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    // Ensure clean state for each test
    await AsyncStorage.clear();
  });

  describe('signed-in flag', () => {
    it('returns false by default when nothing is stored', async () => {
      const signedIn = await authStorage.isSignedIn();
      expect(signedIn).toBe(false);
    });

    it('setSignedIn(true) persists and isSignedIn returns true', async () => {
      await authStorage.setSignedIn(true);
      const signedIn = await authStorage.isSignedIn();
      expect(signedIn).toBe(true);
    });

    it('signOut sets signed-in to false', async () => {
      await authStorage.setSignedIn(true);
      await authStorage.signOut();
      const signedIn = await authStorage.isSignedIn();
      expect(signedIn).toBe(false);
    });
  });

  describe('user role', () => {
    it('returns null when no role is stored', async () => {
      const role = await authStorage.getUserRole();
      expect(role).toBeNull();
    });

    it('stores and retrieves PATIENT role', async () => {
      await authStorage.setUserRole(USER_ROLES.PATIENT);
      const role = await authStorage.getUserRole();
      expect(role).toBe(USER_ROLES.PATIENT);
    });

    it('stores and retrieves CAREGIVER role', async () => {
      await authStorage.setUserRole(USER_ROLES.CAREGIVER);
      const role = await authStorage.getUserRole();
      expect(role).toBe(USER_ROLES.CAREGIVER);
    });

    it('returns null if an invalid role string is stored', async () => {
      await AsyncStorage.setItem('auth.userRole', 'admin');
      const role = await authStorage.getUserRole();
      expect(role).toBeNull();
    });
  });

  describe('last username', () => {
    it('returns null when no username is stored', async () => {
      const username = await authStorage.getLastUsername();
      expect(username).toBeNull();
    });

    it('trims username before saving', async () => {
      await authStorage.setLastUsername('  joey  ');
      const username = await authStorage.getLastUsername();
      expect(username).toBe('joey');
    });
  });

  describe('clearAll', () => {
    it('removes signed-in flag, role, and last username', async () => {
      await authStorage.setSignedIn(true);
      await authStorage.setUserRole(USER_ROLES.PATIENT);
      await authStorage.setLastUsername('joey');

      await authStorage.clearAll();

      expect(await authStorage.isSignedIn()).toBe(false);
      expect(await authStorage.getUserRole()).toBeNull();
      expect(await authStorage.getLastUsername()).toBeNull();
    });
  });
});