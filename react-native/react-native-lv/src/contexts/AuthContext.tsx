import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authStorage, UserRole } from '../utils/authStorage';

interface AuthContextType {
  isSignedIn: boolean;
  isLoading: boolean;
  userRole: UserRole | null;
  lastUsername: string | null;
  signIn: (username: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUserRole: (role: UserRole) => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRoleState] = useState<UserRole | null>(null);
  const [lastUsername, setLastUsername] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const signedIn = await authStorage.isSignedIn();
      const role = await authStorage.getUserRole();
      const username = await authStorage.getLastUsername();
      
      setIsSignedIn(signedIn);
      setUserRoleState(role);
      setLastUsername(username);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signIn = useCallback(async (username: string) => {
    try {
      await authStorage.setLastUsername(username);
      await authStorage.setSignedIn(true);
      setIsSignedIn(true);
      setLastUsername(username);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authStorage.signOut();
      setIsSignedIn(false);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }, []);

  const setUserRole = useCallback(async (role: UserRole) => {
    try {
      await authStorage.setUserRole(role);
      setUserRoleState(role);
    } catch (error) {
      console.error('Error setting user role:', error);
      throw error;
    }
  }, []);

  const value: AuthContextType = {
    isSignedIn,
    isLoading,
    userRole,
    lastUsername,
    signIn,
    signOut,
    setUserRole,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
