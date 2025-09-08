/**
 * Represents a standardized API response structure.
 * @template T The type of the data payload.
 */
export interface ApiResponse<T> {
  /** Indicates whether the API call was successful. */
  success: boolean;

  /** The data payload of the response. Only present on success. */
  data?: T;

  /** An error message. Only present on failure. */
  error?: string;

  /**
   * Metadata for paginated responses.
   * Only present for list endpoints.
   */
  meta?: {
    /** The total number of items available. */
    total: number;
    /** The current page number. */
    page: number;
    /** The number of items per page. */
    limit: number;
  };
}
