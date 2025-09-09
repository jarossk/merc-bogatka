import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { BookingDetailResponse } from '../../../src/types/api';

/**
 * Mock data for the booking detail tests.
 */
const mockAdminToken = 'jwt-admin-token';
const mockCustomerToken = 'jwt-customer-token-owned';
const mockOtherCustomerToken = 'jwt-customer-token-other';

const existingBookingId = 'booking_123';
const ownedBookingId = 'booking_owned_by_customer';
const nonExistentBookingId = 'booking_999';

describe('GET /api/bookings/:id Contract', () => {
  /**
   * Test case for T019: Successful retrieval by an admin.
   * Expects a 200 OK response with the full booking details.
   */
  it('[T019] should return full booking details for an admin', async () => {
    const response = await request(app)
      .get(`/api/bookings/${existingBookingId}`)
      .set('Authorization', `Bearer ${mockAdminToken}`)
      .expect(200)
      .expect('Content-Type', /json/);

    const body: BookingDetailResponse = response.body;

    expect(body.success).toBe(true);
    expect(body.data).toBeDefined();

    const { booking, jobs, estimates, serviceRecords } = body.data;
    expect(booking.id).toBe(existingBookingId);
    expect(booking).toHaveProperty('bookingNumber');
    expect(booking).toHaveProperty('customer');
    expect(booking).toHaveProperty('vehicle');

    expect(Array.isArray(jobs)).toBe(true);
    expect(Array.isArray(estimates)).toBe(true);
    expect(Array.isArray(serviceRecords)).toBe(true);
  });

  /**
   * Test case for T019: Customer retrieving their own booking.
   */
  it('[T019] should allow a customer to retrieve their own booking', async () => {
    await request(app)
      .get(`/api/bookings/${ownedBookingId}`)
      .set('Authorization', `Bearer ${mockCustomerToken}`)
      .expect(200);
  });

  /**
   * Test case for T019: Customer attempting to retrieve another's booking.
   * This should be forbidden.
   */
  it("[T019] should return 403 when a customer tries to access another customer's booking", async () => {
    await request(app)
      .get(`/api/bookings/${existingBookingId}`) // Belongs to another customer
      .set('Authorization', `Bearer ${mockOtherCustomerToken}`)
      .expect(403);
  });

  /**
   * Test case for T019: Booking not found.
   * The API should return a 404 error for a non-existent booking ID.
   */
  it('[T019] should return 404 for a non-existent booking ID', async () => {
    await request(app)
      .get(`/api/bookings/${nonExistentBookingId}`)
      .set('Authorization', `Bearer ${mockAdminToken}`)
      .expect(404);
  });

  /**
   * Test case for T019: Unauthenticated access.
   * The endpoint must be protected.
   */
  it('[T019] should return 401 for unauthenticated requests', async () => {
    await request(app)
      .get(`/api/bookings/${existingBookingId}`)
      .expect(401);
  });
});
