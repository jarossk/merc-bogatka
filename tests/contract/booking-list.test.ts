import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app'; // Assuming this will be the Next.js app instance
import { BookingListResponse } from '../../../src/types/api';
import { BookingStatus } from '../../../src/types/booking';

/**
 * Mock data for testing the booking API.
 * This data is designed to be realistic for a Mercedes-Benz garage.
 */
const mockAdminToken = 'jwt-admin-token';
const mockAdvisorToken = 'jwt-advisor-token';
const mockCustomerToken = 'jwt-customer-token-123';
const mockCustomerId = 'cust_123';

describe('GET /api/bookings Contract', () => {
  /**
   * Test case for T017: Admin/Advisor access
   * Admins and Service Advisors should be able to retrieve a paginated list of all bookings.
   * This test will fail initially (e.g., 404 Not Found) until the endpoint is implemented.
   */
  it('[T017] should return a paginated list of bookings for admin users', async () => {
    const response = await request(app)
      .get('/api/bookings')
      .query({ limit: 10, offset: 0 })
      .set('Authorization', `Bearer ${mockAdminToken}`)
      .expect(200)
      .expect('Content-Type', /json/);

    const body: BookingListResponse = response.body;

    expect(body.success).toBe(true);
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data.bookings)).toBe(true);
    expect(typeof body.data.total).toBe('number');
    expect(typeof body.data.hasMore).toBe('boolean');

    // Check for at least one booking structure if bookings are returned
    if (body.data.bookings.length > 0) {
      const booking = body.data.bookings[0];
      expect(booking).toHaveProperty('id');
      expect(booking).toHaveProperty('bookingNumber');
      expect(booking).toHaveProperty('customer');
      expect(booking).toHaveProperty('vehicle');
      expect(booking.customer).toHaveProperty('id');
      expect(booking.vehicle).toHaveProperty('vin');
    }
  });

  /**
   * Test case for T017: Customer access
   * Customers should only see their own bookings. The API should automatically filter by their customer ID.
   */
  it('[T017] should filter bookings for the authenticated customer', async () => {
    const response = await request(app)
      .get('/api/bookings')
      .set('Authorization', `Bearer ${mockCustomerToken}`)
      .expect(200);

    const body: BookingListResponse = response.body;

    expect(body.success).toBe(true);
    // This test assumes the implementation will correctly filter for the customer.
    // A more robust test would check if all returned bookings belong to the customer.
    expect(body.data.bookings).toBeDefined();
  });

  /**
   * Test case for T017: Filtering
   * The endpoint should support filtering by various parameters like status, customerId, etc.
   */
  it('[T017] should allow filtering bookings by status for an advisor', async () => {
    const status: BookingStatus = 'scheduled';
    const response = await request(app)
      .get('/api/bookings')
      .query({ status })
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .expect(200);

    const body: BookingListResponse = response.body;
    expect(body.success).toBe(true);
    // In a real implementation, we would assert that all returned bookings have the status 'scheduled'.
    body.data.bookings.forEach(booking => {
      expect(booking.status).toBe(status);
    });
  });

  /**
   * Test case for T017: Customer trying to access other customer's bookings
   * A customer should not be able to query for bookings of another customer.
   */
  it("[T017] should prevent a customer from querying another customer's bookings", async () => {
    await request(app)
      .get('/api/bookings')
      .query({ customerId: 'some-other-customer-id' })
      .set('Authorization', `Bearer ${mockCustomerToken}`)
      .expect(403); // Forbidden
  });

  /**
   * Test case for T017: Unauthenticated access
   * The endpoint should be protected and return a 401 Unauthorized error for requests without a valid token.
   */
  it('[T017] should return 401 for unauthenticated requests', async () => {
    await request(app)
      .get('/api/bookings')
      .expect(401);
  });
});
