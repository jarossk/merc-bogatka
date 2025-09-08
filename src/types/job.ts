/**
 * Represents an individual work job for a technician.
 * Collection: jobs
 */
export interface Job {
  /** Appwrite document ID */
  $id: string;

  /** Auto-generated job number (e.g., "JOB-2025-001234") */
  jobNumber: string;

  /** ID of the booking this job belongs to */
  bookingId: string;

  /** ID of the technician assigned to this job */
  assignedTechnicianId: string;

  /** ID of the checklist to be used for this job */
  checklistId: string;

  /** Title of the job (e.g., "Engine Oil Change") */
  title: string;

  /** Detailed description of the work to be done */
  description: string;

  /** Current status of the job */
  status: JobStatus;

  /** Priority level of the job */
  priority: JobPriority;

  /** Estimated hours to complete the job */
  estimatedHours: number;

  /** Actual hours taken to complete the job */
  actualHours?: number | null;

  /**
   * Labor rate per hour in cents.
   * @example 7500 for 75.00 EUR
   */
  laborRate: number;

  /**
   * Array of JSON strings, each representing a part used in the job.
   * @example "{\"partNumber\":\"A001\",\"description\":\"Oil Filter\",\"quantity\":1,\"unitCost\":2550}"
   */
  parts: string[];

  /** ISO datetime string when the job was started */
  startTime?: string | null;

  /** ISO datetime string when the job was completed */
  endTime?: string | null;

  /** Notes from the technician performing the job */
  technicianNotes?: string | null;

  /** Whether customer approval is required for this job (e.g., for extra work) */
  customerApprovalRequired: boolean;

  /** Whether the customer has approved the job */
  customerApproved?: boolean | null;

  /** ISO datetime string when the customer approval was given */
  approvalTimestamp?: string | null;

  /** ISO datetime string of when the document was created. */
  $createdAt: string;

  /** ISO datetime string of when the document was last updated. */
  $updatedAt: string;
}

/**
 * Represents a single part used in a job, parsed from the Job.parts JSON string.
 */
export interface JobPart {
  partNumber: string;
  description: string;
  quantity: number;
  /**
   * Cost of a single unit of the part in cents.
   * @example 2550 for 25.50 EUR
   */
  unitCost: number;
}

export const JobStatusEnum = [
  "pending",
  "in-progress",
  "completed",
  "on-hold",
  "cancelled",
] as const;
export type JobStatus = (typeof JobStatusEnum)[number];

export const JobPriorityEnum = [
  "low",
  "normal",
  "high",
  "critical",
] as const;
export type JobPriority = (typeof JobPriorityEnum)[number];
