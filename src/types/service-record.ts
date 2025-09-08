/**
 * Represents a completed service record, compliant with OEM standards.
 * Collection: service_records
 */
export interface ServiceRecord {
  /** Appwrite document ID */
  $id: string;

  /** Auto-generated service record number (e.g., "SR-2025-001234") */
  recordNumber: string;

  /** ID of the vehicle serviced */
  vehicleId: string;

  /** ID of the booking associated with this service */
  bookingId: string;

  /** ID of the job associated with this service */
  jobId: string;

  /** ISO datetime string of when the service was performed */
  serviceDate: string;

  /**
   * Vehicle mileage in kilometers at the time of service.
   */
  mileageAtService: number;

  /** Type of service performed (e.g., "A-Service") */
  serviceType: string;

  /** Detailed description of the work performed */
  workPerformed: string;

  /** Array of parts used in the service */
  partsUsed: ServiceRecordPart[];

  /** Digital signature of the technician who performed the work */
  technicianSignature: string;

  /** Quality control check data */
  qualityControlCheck: QualityControlCheck;

  /** Whether the customer has been notified of service completion */
  customerNotified: boolean;

  /** Whether the vehicle's warranty information was updated */
  warrantyUpdated: boolean;

  /** Recommendations for the next service */
  nextServiceRecommendation: NextServiceRecommendation;

  /** OEM compliance certification data */
  complianceCertification: ComplianceCertification;

  /** Whether the PDF service report has been generated */
  pdfGenerated: boolean;

  /** URL to the generated PDF in Appwrite Storage (nullable) */
  pdfUrl?: string | null;

  /** ISO datetime string of when the document was created. */
  $createdAt: string;

  /** ISO datetime string of when the document was last updated. */
  $updatedAt: string;
}

/**
 * Represents a single part used in a service record.
 */
export interface ServiceRecordPart {
  partNumber: string;
  partName: string;
  manufacturer: string;
  quantity: number;
  /** Warranty period for the part (e.g., "24 months") */
  warrantyPeriod: string;
}

/**
 * Represents the quality control check performed after a service.
 */
export interface QualityControlCheck {
  /** ID of the technician who performed the check */
  performedBy: string;
  /** ISO datetime string of when the check was performed */
  checkDate: string;
  /** Whether the service passed the quality control check */
  passed: boolean;
  /** Notes from the quality control check */
  notes: string;
}

/**
 * Represents the recommendation for the next vehicle service.
 */
export interface NextServiceRecommendation {
  /** Recommended type of the next service (e.g., "B-Service") */
  type: string;
  /** Recommended date for the next service */
  recommendedDate: string;
  /** Recommended mileage interval for the next service in kilometers */
  mileageInterval: number;
}

/**
 * Represents the OEM compliance certification for a service record.
 */
export interface ComplianceCertification {
  /** Whether the service was OEM compliant */
  oemCompliant: boolean;
  /** Version of the OEM standards met (e.g., "MB-2025.Q3") */
  standardsVersion: string;
  /** ID of the person who certified the compliance */
  certifiedBy: string;
}
