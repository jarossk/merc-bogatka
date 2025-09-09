import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { BookingDetailResponse } from '../../../src/types/api';
import { BookingPriority, CreateBookingRequest } from '../../../src/types/booking';

/**
 * Mock data for booking update tests.
 */
const mockAdvisorToken = 'jwt-advisor-token';
const mockCustomerToken = 'jwt-customer-token';
const existingBookingId = 'booking_to_update_123';
const nonExistentBookingId = 'booking_999';

const validUpdatePayload: Partial<CreateBookingRequest> = {
  priority: 'high',
  internalNotes: 'Customer mentioned a new issue with the brakes.',
  serviceType: ['A-Service', 'Brake Inspection'],
};

describe('PUT /api/bookings/:id Contract', () => {
  /**
   * Test case for T020: Successful update by an advisor.
   * Expects a 200 OK response with the updated booking details.
   */
  it('[T020] should update a booking for a valid request from an advisor', async () => {
    const response = await request(app)
      .put(`/api/bookings/${existingBookingId}`)
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send(validUpdatePayload)
      .expect(200)
      .expect('Content-Type', /json/);

    const body: BookingDetailResponse = response.body;

    expect(body.success).toBe(true);
    const { booking } = body.data;
    expect(booking.id).toBe(existingBookingId);
    expect(booking.priority).toBe(validUpdatePayload.priority);
    // Assuming internalNotes is a field that gets returned. The spec implies it.
    // expect(booking.internalNotes).toBe(validUpdatePayload.internalNotes);
    expect(booking.serviceType).toEqual(validUpdatePayload.serviceType);
  });

  /**
   * Test case for T020: Attempting to update immutable fields.
   * The API should ignore or reject attempts to change fields like customerId or vehicleId.
   * A 400 Bad Request is an appropriate response.
   */
  it('[T020] should return 400 when attempting to update immutable fields', async () => {
    const invalidUpdatePayload = {
      ...validUpdatePayload,
      customerId: 'new_customer_id_should_fail',
      vehicleId: 'new_vehicle_id_should_fail',
    };

    await request(app)
      .put(`/api/bookings/${existingBookingId}`)
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send(invalidUpdatePayload)
      .expect(400);
  });

  /**
   * Test case for T020: Role-based access control.
   * A customer should not be able to update a booking's details.
   */
  it('[T020] should return 403 when a customer attempts to update a booking', async () => {
    await request(app)
      .put(`/api/bookings/${existingBookingId}`)
      .set('Authorization', `Bearer ${mockCustomerToken}`)
      .send(validUpdatePayload)
      .expect(403);
  });

  /**
   * Test case for T020: Updating a non-existent booking.
   * Should result in a 404 Not Found error.
   */
  it('[T020] should return 404 for a non-existent booking ID', async () => {
    await request(app)
      .put(`/api/bookings/${nonExistentBookingId}`)
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send(validUpdatePayload)
      .expect(404);
  });

  /**
   * Test case for T020: Unauthenticated access.
   */
  it('[T020] should return 401 for unauthenticated requests', async () => {
    await request(app)
      .put(`/api/bookings/${existingBookingId}`)
      .send(validUpdatePayload)
      .expect(401);
  });
});
