import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { UpdateStatusResponse } from '../../../src/types/api';
import { BookingStatus } from '../../../src/types/booking';

/**
 * Mock data for booking status update tests.
 */
const mockAdvisorToken = 'jwt-advisor-token';
const mockTechnicianToken = 'jwt-technician-token';
const mockCustomerToken = 'jwt-customer-token';

const bookingInScheduledStateId = 'booking_scheduled_1';
const bookingInConfirmedStateId = 'booking_confirmed_1';
const bookingInCompletedStateId = 'booking_completed_1';

describe('PUT /api/bookings/:id/status Contract', () => {
  /**
   * Test case for T021: Valid status transition by an advisor.
   * Testing 'scheduled' -> 'confirmed'.
   */
  it("[T021] should allow an advisor to change status from 'scheduled' to 'confirmed'", async () => {
    const newStatus: BookingStatus = 'confirmed';
    const response = await request(app)
      .put(`/api/bookings/${bookingInScheduledStateId}/status`)
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send({ status: newStatus, notifyCustomer: true })
      .expect(200);

    const body: UpdateStatusResponse = response.body;
    expect(body.success).toBe(true);
    expect(body.data.booking.status).toBe(newStatus);
    expect(body.data.notificationSent).toBe(true);
    expect(body.message).toContain('Status updated successfully');
  });

  /**
   * Test case for T021: Valid status transition by a technician.
   * Testing 'confirmed' -> 'in-progress'.
   */
  it("[T021] should allow a technician to change status from 'confirmed' to 'in-progress'", async () => {
    const newStatus: BookingStatus = 'in-progress';
    await request(app)
      .put(`/api/bookings/${bookingInConfirmedStateId}/status`)
      .set('Authorization', `Bearer ${mockTechnicianToken}`)
      .send({ status: newStatus })
      .expect(200);
  });

  /**
   * Test case for T021: Invalid status transition.
   * Testing 'completed' -> 'scheduled'. This should not be allowed.
   */
  it('[T021] should return 400 for an invalid status transition', async () => {
    const newStatus: BookingStatus = 'scheduled';
    await request(app)
      .put(`/api/bookings/${bookingInCompletedStateId}/status`)
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send({ status: newStatus })
      .expect(400); // Bad Request for invalid workflow
  });

  /**
   * Test case for T021: Cancellation without a reason.
   * The API should require a reason for cancellation.
   */
  it('[T021] should return 400 when cancelling a booking without a reason', async () => {
    const newStatus: BookingStatus = 'cancelled';
    await request(app)
      .put(`/api/bookings/${bookingInScheduledStateId}/status`)
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send({ status: newStatus }) // Missing 'reason' field
      .expect(400);
  });

  /**
   * Test case for T021: Successful cancellation with a reason.
   */
  it('[T021] should allow cancelling a booking when a reason is provided', async () => {
    const newStatus: BookingStatus = 'cancelled';
    const response = await request(app)
      .put(`/api/bookings/${bookingInScheduledStateId}/status`)
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send({ status: newStatus, reason: 'Customer requested cancellation.' })
      .expect(200);

    const body: UpdateStatusResponse = response.body;
    expect(body.data.booking.status).toBe(newStatus);
  });

  /**
   * Test case for T021: Role-based access control.
   * A customer should not be able to change the status.
   */
  it('[T021] should return 403 when a customer attempts to change status', async () => {
    await request(app)
      .put(`/api/bookings/${bookingInScheduledStateId}/status`)
      .set('Authorization', `Bearer ${mockCustomerToken}`)
      .send({ status: 'confirmed' })
      .expect(403);
  });

  /**
   * Test case for T021: Unauthenticated access.
   */
  it('[T021] should return 401 for unauthenticated requests', async () => {
    await request(app)
      .put(`/api/bookings/${bookingInScheduledStateId}/status`)
      .send({ status: 'confirmed' })
      .expect(401);
  });
});
