/**
 * Represents a Mercedes-Benz OEM service checklist.
 * Collection: checklists
 */
export interface Checklist {
  /** Appwrite document ID */
  $id: string;

  /** Name of the checklist (e.g., "C-Class A-Service Checklist") */
  name: string;

  /** The Mercedes-Benz model this checklist applies to (e.g., "C-Class") */
  vehicleModel: string;

  /** The type of service this checklist is for (e.g., "A-Service", "B-Service") */
  serviceType: string;

  /** Version of the checklist, following semantic versioning (e.g., "2025.1") */
  version: string;

  /** Whether this checklist is currently active and in use */
  isActive: boolean;

  /** Array of items in the checklist */
  items: ChecklistItem[];

  /** ISO datetime string of when the document was created. */
  $createdAt: string;

  /** ISO datetime string of when the document was last updated. */
  $updatedAt: string;
}

/**
 * Represents a single item within a service checklist.
 */
export interface ChecklistItem {
  /** Unique identifier for the checklist item */
  id: string;

  /** Title of the checklist item */
  title: string;

  /** Detailed description of the check or task */
  description: string;

  /** Category of the item (e.g., "engine", "brakes", "electrical") */
  category: string;

  /** Whether this item is required to be completed */
  required: boolean;

  /** Estimated time in minutes to complete this item */
  estimatedMinutes: number;

  /** Array of tools required for this item */
  tools: string[];

  /** Array of common parts needed for this item */
  parts: string[];
}
