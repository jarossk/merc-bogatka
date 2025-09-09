import { account, databases, DATABASE_ID, COLLECTIONS } from './appwrite';
import { User } from '../types/user';
import { ID, Models } from 'appwrite';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'service_advisor' | 'technician' | 'customer';
  phone?: string;
}

export interface AuthUser extends Models.User<Models.Preferences> {
  role?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Authentication service for Mercedes-Benz workshop management system
 * Handles user login, registration, and session management
 */
export class AuthService {
  /**
   * Login user with email and password
   */
  static async login(credentials: LoginCredentials): Promise<Models.Session> {
    try {
      const session = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      return session;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid email or password');
    }
  }

  /**
   * Register new user and create user profile
   */
  static async register(userData: RegisterData): Promise<{ user: Models.User<Models.Preferences>; userProfile: User }> {
    try {
      // Create Appwrite account
      const user = await account.create(
        ID.unique(),
        userData.email,
        userData.password,
        `${userData.firstName} ${userData.lastName}`
      );

      // Create session for the new user
      await account.createEmailPasswordSession(userData.email, userData.password);

      // Create user profile in database
      const userProfile = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        ID.unique(),
        {
          userId: user.$id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          phone: userData.phone || '',
          isActive: true,
          permissions: AuthService.getDefaultPermissions(userData.role)
        }
      ) as unknown as User;

      return { user, userProfile };
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    }
  }

  /**
   * Get current authenticated user
   */
  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const user = await account.get();
      
      // Get user profile from database
      const userProfile = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        [`userId="${user.$id}"`]
      );

      if (userProfile.documents.length > 0) {
        const profile = userProfile.documents[0] as unknown as User;
        return {
          ...user,
          role: profile.role,
          firstName: profile.firstName,
          lastName: profile.lastName
        };
      }

      return user;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  /**
   * Logout current user
   */
  static async logout(): Promise<void> {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Failed to logout');
    }
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const user = await account.get();
      return !!user;
    } catch {
      return false;
    }
  }

  /**
   * Get user role from database
   */
  static async getUserRole(userId: string): Promise<string | null> {
    try {
      const userProfile = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        [`userId="${userId}"`]
      );

      if (userProfile.documents.length > 0) {
        const profile = userProfile.documents[0] as unknown as User;
        return profile.role;
      }

      return null;
    } catch (error) {
      console.error('Failed to get user role:', error);
      return null;
    }
  }

  /**
   * Update user password
   */
  static async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await account.updatePassword(newPassword, currentPassword);
    } catch (error) {
      console.error('Password update failed:', error);
      throw new Error('Failed to update password');
    }
  }

  /**
   * Send password recovery email
   */
  static async sendPasswordRecovery(email: string): Promise<void> {
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error) {
      console.error('Password recovery failed:', error);
      throw new Error('Failed to send recovery email');
    }
  }

  /**
   * Complete password recovery
   */
  static async completePasswordRecovery(
    userId: string,
    secret: string,
    newPassword: string
  ): Promise<void> {
    try {
      await account.updateRecovery(userId, secret, newPassword);
    } catch (error) {
      console.error('Password recovery completion failed:', error);
      throw new Error('Failed to reset password');
    }
  }

  /**
   * Get default permissions for user role
   */
  private static getDefaultPermissions(role: string): string[] {
    switch (role) {
      case 'service_advisor':
        return ['bookings:create', 'bookings:read', 'bookings:update', 'customers:create', 'customers:read', 'customers:update'];
      case 'technician':
        return ['jobs:read', 'jobs:update', 'checklists:read', 'checklists:update'];
      case 'customer':
        return ['bookings:read', 'estimates:read'];
      default:
        return ['bookings:read'];
    }
  }

  /**
   * Check if user has specific permission
   */
  static async hasPermission(permission: string): Promise<boolean> {
    try {
      const user = await account.get();
      const userProfile = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        [`userId="${user.$id}"`]
      );

      if (userProfile.documents.length > 0) {
        const profile = userProfile.documents[0] as unknown as User;
        return (profile as any).permissions?.includes(permission) || false;
      }

      return false;
    } catch {
      return false;
    }
  }

  /**
   * Refresh current session
   */
  static async refreshSession(): Promise<Models.Session | null> {
    try {
      const session = await account.getSession('current');
      return session;
    } catch (error) {
      console.error('Failed to refresh session:', error);
      return null;
    }
  }
}