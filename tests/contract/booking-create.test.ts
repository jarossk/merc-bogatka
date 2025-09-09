import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { CreateBookingResponse } from '../../../src/types/api';
import { CreateBookingRequest } from '../../../src/types/booking';

/**
 * Mock data for creating bookings.
 */
const mockAdminToken = 'jwt-admin-token';
const mockAdvisorToken = 'jwt-advisor-token';
const mockCustomerToken = 'jwt-customer-token'; // Customers should not be able to create bookings directly

const validBookingRequest: CreateBookingRequest = {
  customerId: 'cust_12345',
  vehicleId: 'veh_67890',
  serviceAdvisorId: 'user_advisor_1',
  scheduledDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
  scheduledTime: '10:00',
  estimatedDuration: 120, // 2 hours
  priority: 'normal',
  serviceType: ['A-Service', 'Tire Rotation'],
  customerNotes: 'There is a rattling noise from the right rear side.',
};

describe('POST /api/bookings Contract', () => {
  /**
   * Test case for T018: Successful booking creation by an advisor.
   * The test expects a 201 Created response and the full booking object.
   * This will fail until the endpoint is implemented.
   */
  it('[T018] should create a new booking for a valid request from an advisor', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send(validBookingRequest)
      .expect(201)
      .expect('Content-Type', /json/);

    const body: CreateBookingResponse = response.body;

    expect(body.success).toBe(true);
    expect(body.message).toBe('Booking created successfully.');
    expect(body.data.booking).toBeDefined();

    const { booking } = body.data;
    expect(booking.id).toEqual(expect.any(String));
    expect(booking.bookingNumber).toEqual(expect.any(String));
    expect(booking.status).toBe('scheduled'); // Default status
    expect(booking.customer.id).toBe(validBookingRequest.customerId);
    expect(booking.vehicle.id).toBe(validBookingRequest.vehicleId);
  });

  /**
   * Test case for T018: Invalid request data.
   * The server should return a 400 Bad Request error if required fields are missing.
   */
  it('[T018] should return 400 for missing required fields', async () => {
    const invalidRequest = { ...validBookingRequest, customerId: undefined };

    await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${mockAdminToken}`)
      .send(invalidRequest)
      .expect(400);
  });

  /**
   * Test case for T018: Role-based access control.
   * Customers should not be allowed to create bookings via this endpoint.
   * They should use a different, more restricted endpoint or UI flow.
   */
  it('[T018] should return 403 Forbidden when a customer attempts to create a booking', async () => {
    await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${mockCustomerToken}`)
      .send(validBookingRequest)
      .expect(403);
  });

  /**
   * Test case for T018: Unauthenticated access.
   * The endpoint must be protected.
   */
  it('[T018] should return 401 for unauthenticated requests', async () => {
    await request(app)
      .post('/api/bookings')
      .send(validBookingRequest)
      .expect(401);
  });

  /**
   * Test case for T018: Invalid date.
   * The server should return a 400 Bad Request error if the scheduledDate is in the past.
   */
  it('[T018] should return 400 for a booking scheduled in the past', async () => {
    const pastDateRequest = {
      ...validBookingRequest,
      scheduledDate: '2020-01-01',
    };

    await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send(pastDateRequest)
      .expect(400);
  });
});
