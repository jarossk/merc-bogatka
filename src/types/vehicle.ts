/**
 * Represents a Mercedes-Benz vehicle in the system.
 * Collection ID: 68bd969e002c66b609db
 */
export interface Vehicle {
  /** Appwrite document ID */
  $id: string;

  /** Vehicle Identification Number (must be 17 characters and unique) */
  vin: string;

  /** ID of the customer who owns the vehicle */
  customerId: string;

  /** Vehicle manufacturer (defaults to "Mercedes-Benz") */
  make: "Mercedes-Benz";

  /** Vehicle model (e.g., "C-Class", "S-Class") */
  model: string;

  /**
   * Model year of the vehicle.
   * Validated to be between 1990 and current year + 1.
   */
  modelYear: number;

  /** Engine specification (e.g., "2.0L Turbo", "3.5L V6") */
  engine: string;

  /** Transmission type (e.g., "Automatic", "Manual") */
  transmission: string;

  /** Fuel type (e.g., "Gasoline", "Diesel", "Hybrid", "Electric") */
  fuelType: string;

  /** Current odometer reading in kilometers */
  mileage: number;

  /** Exterior color of the vehicle */
  color: string;

  /** Vehicle license plate number */
  licensePlate: string;

  /** ISO datetime string of the last service date (nullable) */
  lastServiceDate?: string | null;

  /** ISO datetime string for the next scheduled service (nullable) */
  nextServiceDue?: string | null;

  /** ISO datetime string for warranty expiration (nullable) */
  warrantyExpiration?: string | null;

  /** ISO datetime string of when the document was created. */
  $createdAt: string;

  /** ISO datetime string of when the document was last updated. */
  $updatedAt: string;
}
