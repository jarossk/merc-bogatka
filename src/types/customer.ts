/**
 * Mercedes-Benz Customer entity from Appwrite
 * Collection ID: 68bd9672003c26009089
 */
export interface Customer {
  /** Appwrite document ID */
  $id: string;
  /** Customer email address (unique) */
  email: string;
  /** Customer's first name */
  firstName: string;
  /** Customer's last name */
  lastName: string;
  /** Customer's phone number */
  phone: string;
  /**
   * JSON string containing customer's address.
   * @example "{\"street\":\"123 Mercedes-Benz Ave\",\"city\":\"Stuttgart\",\"postalCode\":\"70372\",\"country\":\"Germany\"}"
   */
  address: string;
  /**
   * JSON string for communication preferences.
   * @example "{\"email\":true,\"sms\":false,\"push\":true}"
   */
  communicationPreferences: string;
  /** ISO datetime string of when the document was created. */
  $createdAt: string;
  /** ISO datetime string of when the document was last updated. */
  $updatedAt: string;
}

/** Parsed address object from Customer.address JSON string */
export interface CustomerAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

/** Parsed communication preferences from Customer.communicationPreferences JSON string */
export interface CommunicationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}
