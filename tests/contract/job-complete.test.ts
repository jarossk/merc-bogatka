import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { CompleteJobResponse } from '../../../src/types/api';
import { CompleteJobRequest } from '../../../src/types/job';

/**
 * Mock data for completing jobs.
 */
const mockAssignedTechnicianToken = 'jwt-technician-assigned-token';
const mockAdvisorToken = 'jwt-advisor-token';

const inProgressJobId = 'job_inprogress_123';
const jobWithIncompleteChecklistId = 'job_incomplete_checklist_456';
const pendingJobId = 'job_pending_789';

const validCompleteRequest: CompleteJobRequest = {
  technicianNotes: 'All work completed as per checklist. Vehicle tested and running smoothly.',
  actualPartsUsed: [
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
  qualityCheckPassed: true,
  customerNotificationRequired: true,
};

describe('PUT /api/jobs/:id/complete Contract', () => {
  /**
   * Test case for T026: Successful completion of a job by the assigned technician.
   */
  it('[T026] should complete an in-progress job for a valid request', async () => {
    const response = await request(app)
      .put(`/api/jobs/${inProgressJobId}/complete`)
      .set('Authorization', `Bearer ${mockAssignedTechnicianToken}`)
      .send(validCompleteRequest)
      .expect(200);

    const body: CompleteJobResponse = response.body;
    expect(body.success).toBe(true);
    expect(body.message).toBe('Job completed successfully.');

    const { job, serviceRecord, notificationSent } = body.data;
    expect(job.id).toBe(inProgressJobId);
    expect(job.status).toBe('completed');
    expect(job.endTime).not.toBeNull();

    expect(serviceRecord).toBeDefined();
    expect(serviceRecord.id).toEqual(expect.any(String));
    expect(serviceRecord.recordNumber).toEqual(expect.any(String));

    expect(notificationSent).toBe(true);
  });

  /**
   * Test case for T026: Attempting to complete a job with an incomplete checklist.
   */
  it('[T026] should return 422 if the checklist is not fully completed', async () => {
    await request(app)
      .put(`/api/jobs/${jobWithIncompleteChecklistId}/complete`)
      .set('Authorization', `Bearer ${mockAssignedTechnicianToken}`)
      .send(validCompleteRequest)
      .expect(422); // Unprocessable Entity
  });

  /**
   * Test case for T026: Attempting to complete a job that is not in-progress.
   */
  it('[T026] should return 400 if the job is not in-progress', async () => {
    await request(app)
      .put(`/api/jobs/${pendingJobId}/complete`)
      .set('Authorization', `Bearer ${mockAssignedTechnicianToken}`)
      .send(validCompleteRequest)
      .expect(400);
  });

  /**
   * Test case for T026: Invalid request with missing required fields.
   */
  it('[T026] should return 400 for a request missing required fields', async () => {
    const invalidRequest = { ...validCompleteRequest, qualityCheckPassed: undefined };
    await request(app)
      .put(`/api/jobs/${inProgressJobId}/complete`)
      .set('Authorization', `Bearer ${mockAssignedTechnicianToken}`)
      .send(invalidRequest)
      .expect(400);
  });

  /**
   * Test case for T026: Unauthenticated access.
   */
  it('[T026] should return 401 for unauthenticated requests', async () => {
    await request(app)
      .put(`/api/jobs/${inProgressJobId}/complete`)
      .send(validCompleteRequest)
      .expect(401);
  });
});
