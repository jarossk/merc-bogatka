import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { CreateJobResponse } from '../../../src/types/api';
import { CreateJobRequest } from '../../../src/types/job';

/**
 * Mock data for creating jobs.
 */
const mockAdvisorToken = 'jwt-advisor-token';
const mockTechnicianToken = 'jwt-technician-token';

const validJobRequest: CreateJobRequest = {
  bookingId: 'booking_123',
  assignedTechnicianId: 'tech_1',
  checklistId: 'checklist_b_service_w213',
  title: 'Perform B-Service',
  description: 'Complete all items for B-Service on E-Class W213.',
  estimatedHours: 4.5,
  laborRate: 150,
  parts: [
    {
      partNumber: 'A0009898201',
      description: 'Engine Oil 5W-40',
      quantity: 7,
      unitCost: 15.50,
    },
    {
      partNumber: 'A2781840125',
      description: 'Oil Filter',
      quantity: 1,
      unitCost: 25.00,
    },
  ],
  customerApprovalRequired: false,
};

describe('POST /api/jobs Contract', () => {
  /**
   * Test case for T023: Successful job creation by an advisor.
   */
  it('[T023] should create a new job for a valid request from an advisor', async () => {
    const response = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send(validJobRequest)
      .expect(201)
      .expect('Content-Type', /json/);

    const body: CreateJobResponse = response.body;
    expect(body.success).toBe(true);
    expect(body.message).toBe('Job created successfully.');

    const { job } = body.data;
    expect(job.id).toEqual(expect.any(String));
    expect(job.jobNumber).toEqual(expect.any(String));
    expect(job.status).toBe('pending'); // Default status
    expect(job.title).toBe(validJobRequest.title);
    expect(job.booking.id).toBe(validJobRequest.bookingId);
    expect(job.assignedTechnician.id).toBe(validJobRequest.assignedTechnicianId);
  });

  /**
   * Test case for T023: Invalid request with missing required fields.
   */
  it('[T023] should return 400 for missing required fields', async () => {
    const invalidRequest = { ...validJobRequest, bookingId: undefined };

    await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .send(invalidRequest)
      .expect(400);
  });

  /**
   * Test case for T023: Role-based access control.
   * A technician should not be able to create a job.
   */
  it('[T023] should return 403 Forbidden when a technician attempts to create a job', async () => {
    await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${mockTechnicianToken}`)
      .send(validJobRequest)
      .expect(403);
  });

  /**
   * Test case for T023: Unauthenticated access.
   */
  it('[T023] should return 401 for unauthenticated requests', async () => {
    await request(app)
      .post('/api/jobs')
      .send(validJobRequest)
      .expect(401);
  });
});
