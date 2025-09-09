'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthService, AuthUser, LoginCredentials, RegisterData } from '../lib/auth';
import { Models } from 'appwrite';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasPermission: (permission: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication Context Provider for Mercedes-Benz Workshop Management System
 * Provides authentication state and methods throughout the application
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Initialize authentication state on mount
   */
  const initializeAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const currentUser = await AuthService.getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login user with credentials
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      await AuthService.login(credentials);
      
      // Get user data after successful login
      const currentUser = await AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login error in context:', error);
      throw error; // Re-throw for component handling
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register new user
   */
  const register = useCallback(async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      const { user: newUser } = await AuthService.register(userData);
      
      // Get complete user data after registration
      const currentUser = await AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Registration error in context:', error);
      throw error; // Re-throw for component handling
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout current user
   */
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error in context:', error);
      // Even if logout fails on server, clear local state
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh user data
   */
  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  /**
   * Check if user has specific permission
   */
  const hasPermission = useCallback(async (permission: string): Promise<boolean> => {
    try {
      return await AuthService.hasPermission(permission);
    } catch (error) {
      console.error('Failed to check permission:', error);
      return false;
    }
  }, []);

  /**
   * Initialize auth state on component mount
   */
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  /**
   * Set up session refresh interval
   */
  useEffect(() => {
    if (!isAuthenticated) return;

    // Refresh session every 30 minutes
    const refreshInterval = setInterval(async () => {
      try {
        const session = await AuthService.refreshSession();
        if (!session) {
          // Session expired, logout user
          await logout();
        }
      } catch (error) {
        console.error('Session refresh failed:', error);
        // If session refresh fails, logout user
        await logout();
      }
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(refreshInterval);
  }, [isAuthenticated, logout]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use authentication context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * Hook to check if user has specific role
 */
export function useRole(requiredRole: string): boolean {
  const { user } = useAuth();
  return user?.role === requiredRole;
}

/**
 * Hook to check multiple roles
 */
export function useRoles(requiredRoles: string[]): boolean {
  const { user } = useAuth();
  return requiredRoles.includes(user?.role || '');
}

/**
 * HOC to protect components by role
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles?: string[]
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      );
    }

    if (requiredRoles && !requiredRoles.includes(user?.role || '')) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}