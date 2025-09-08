/**
 * Represents a service booking in the system.
 * Collection: bookings
 */
export interface Booking {
  /** Appwrite document ID */
  $id: string;

  /** Auto-generated booking number (e.g., "MB-2025-001234") */
  bookingNumber: string;

  /** ID of the customer making the booking */
  customerId: string;

  /** ID of the vehicle being serviced */
  vehicleId: string;

  /** ID of the service advisor managing the booking */
  serviceAdvisorId: string;

  /** ISO datetime string for the scheduled date of the booking */
  scheduledDate: string;

  /** Time of the scheduled booking (e.g., "14:30") */
  scheduledTime: string;

  /** Estimated duration of the service in minutes */
  estimatedDuration: number;

  /** Current status of the booking */
  status: BookingStatus;

  /** Priority level of the booking */
  priority: BookingPriority;

  /** Array of service types requested (e.g., ["maintenance", "repair"]) */
  serviceType: string[];

  /** Notes provided by the customer */
  customerNotes?: string | null;

  /** Internal notes for the service team */
  internalNotes?: string | null;

  /**
   * Estimated cost of the service in cents (integer).
   * @example 10050 for 100.50 EUR
   */
  estimatedCost?: number | null;

  /**
   * Actual cost of the service in cents (integer).
   * @example 11000 for 110.00 EUR
   */
  actualCost?: number | null;

  /** ISO datetime string of when the document was created. */
  $createdAt: string;

  /** ISO datetime string of when the document was last updated. */
  $updatedAt: string;
}

export const BookingStatusEnum = [
  "scheduled",
  "confirmed",
  "in-progress",
  "completed",
  "cancelled",
] as const;
export type BookingStatus = (typeof BookingStatusEnum)[number];

export const BookingPriorityEnum = [
  "normal",
  "high",
  "emergency",
] as const;
export type BookingPriority = (typeof BookingPriorityEnum)[number];
