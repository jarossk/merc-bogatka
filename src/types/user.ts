/**
 * Represents a user in the system (staff or customer).
 * Collection: users (synced with Appwrite Auth)
 */
export interface User {
  /** Appwrite user ID */
  $id: string;

  /** User's email address (unique) */
  email: string;

  /** User's first name */
  firstName: string;

  /** User's last name */
  lastName: string;

  /** Role of the user within the system */
  role: UserRole;

  /** Employee ID for staff members (nullable for customers) */
  employeeId?: string | null;

  /**
   * Array of specializations for technicians.
   * @example ["engine", "electrical", "transmission"]
   */
  specializations?: string[];

  /** Whether the user account is active */
  isActive: boolean;

  /** ISO datetime string of the user's last login (nullable) */
  lastLogin?: string | null;

  /** ISO datetime string of when the user was created. */
  $createdAt: string;

  /** ISO datetime string of when the user was last updated. */
  $updatedAt: string;
}

export const UserRoleEnum = [
  "admin",
  "advisor",
  "technician",
  "customer",
] as const;
export type UserRole = (typeof UserRoleEnum)[number];
