/**
 * Represents a cost estimate for a service booking.
 * Collection: estimates
 */
export interface Estimate {
  /** Appwrite document ID */
  $id: string;

  /** Auto-generated estimate number */
  estimateNumber: string;

  /** ID of the booking this estimate is for */
  bookingId: string;

  /** ID of the user who created the estimate */
  createdBy: string;

  /** Current status of the estimate */
  status: EstimateStatus;

  /** ISO datetime string until which the estimate is valid */
  validUntil: string;

  /**
   * Array of JSON strings, each representing a line item in the estimate.
   * @example "{\"type\":\"labor\",\"description\":\"1 hour diagnostic\",\"quantity\":1,\"unitCost\":7500,\"totalCost\":7500}"
   */
  lineItems: string[];

  /**
   * Subtotal cost in cents, before tax.
   * @example 15000 for 150.00 EUR
   */
  subtotal: number;

  /**
   * Tax amount in cents.
   * @example 2850 for 28.50 EUR
   */
  tax: number;

  /**
   * Total cost in cents (subtotal + tax).
   * @example 17850 for 178.50 EUR
   */
  total: number;

  /** Message for the customer included with the estimate */
  customerMessage?: string | null;

  /** ISO datetime string for the deadline to approve the estimate */
  approvalDeadline?: string | null;

  /** ISO datetime string when the estimate was approved */
  approvedAt?: string | null;

  /** ISO datetime string when the estimate was rejected */
  rejectedAt?: string | null;

  /** Reason for rejection, if provided */
  rejectionReason?: string | null;

  /** ISO datetime string of when the document was created. */
  $createdAt: string;

  /** ISO datetime string of when the document was last updated. */
  $updatedAt:string;
}

/**
 * Represents a single line item in an estimate, parsed from Estimate.lineItems.
 */
export interface LineItem {
  type: LineItemType;
  description: string;
  quantity: number;
  /**
   * Cost of a single unit in cents.
   * @example 7500 for 75.00 EUR
   */
  unitCost: number;
  /**
   * Total cost for this line item in cents (quantity * unitCost).
   * @example 7500 for 75.00 EUR
   */
  totalCost: number;
}

export const EstimateStatusEnum = [
  "draft",
  "pending",
  "approved",
  "rejected",
  "expired",
] as const;
export type EstimateStatus = (typeof EstimateStatusEnum)[number];

export const LineItemTypeEnum = ["labor", "parts", "other"] as const;
export type LineItemType = (typeof LineItemTypeEnum)[number];
