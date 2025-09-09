import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { StartJobResponse } from '../../../src/types/api';

/**
 * Mock data for starting jobs.
 */
const mockAssignedTechnicianToken = 'jwt-technician-assigned-token';
const mockOtherTechnicianToken = 'jwt-technician-other-token';
const mockAdvisorToken = 'jwt-advisor-token';

const pendingJobId = 'job_pending_123';
const inProgressJobId = 'job_inprogress_456';
const nonExistentJobId = 'job_99999';

describe('PUT /api/jobs/:id/start Contract', () => {
  /**
   * Test case for T025: Successful start of a job by the assigned technician.
   */
  it('[T025] should start a pending job for the assigned technician', async () => {
    const response = await request(app)
      .put(`/api/jobs/${pendingJobId}/start`)
      .set('Authorization', `Bearer ${mockAssignedTechnicianToken}`)
      .send({ notes: 'Starting work now.' })
      .expect(200);

    const body: StartJobResponse = response.body;
    expect(body.success).toBe(true);
    expect(body.message).toBe('Job started successfully.');

    const { job, timeEntry } = body.data;
    expect(job.id).toBe(pendingJobId);
    expect(job.status).toBe('in-progress');
    expect(job.startTime).not.toBeNull();
    expect(job.startTime).toEqual(expect.any(String)); // Should be an ISO date string

    expect(timeEntry).toBeDefined();
    expect(timeEntry.id).toEqual(expect.any(String));
    expect(timeEntry.startTime).toBe(job.startTime);
    expect(timeEntry.endTime).toBeNull();
  });

  /**
   * Test case for T025: Attempting to start a job that is already in progress.
   */
  it('[T025] should return 400 when trying to start a job that is already in-progress', async () => {
    await request(app)
      .put(`/api/jobs/${inProgressJobId}/start`)
      .set('Authorization', `Bearer ${mockAssignedTechnicianToken}`)
      .expect(400); // Or 409 Conflict
  });

  /**
   * Test case for T025: Access control for other technicians.
   */
  it('[T025] should return 403 when a non-assigned technician tries to start a job', async () => {
    await request(app)
      .put(`/api/jobs/${pendingJobId}/start`)
      .set('Authorization', `Bearer ${mockOtherTechnicianToken}`)
      .expect(403);
  });

  /**
   * Test case for T025: Successful start by an advisor.
   */
  it('[T025] should allow an advisor to start a job', async () => {
    await request(app)
      .put(`/api/jobs/${pendingJobId}/start`)
      .set('Authorization', `Bearer ${mockAdvisorToken}`)
      .expect(200);
  });

  /**
   * Test case for T025: Job not found.
   */
  it('[T025] should return 404 for a non-existent job ID', async () => {
    await request(app)
      .put(`/api/jobs/${nonExistentJobId}/start`)
      .set('Authorization', `Bearer ${mockAssignedTechnicianToken}`)
      .expect(404);
  });

  /**
   * Test case for T025: Unauthenticated access.
   */
  it('[T025] should return 401 for unauthenticated requests', async () => {
    await request(app)
      .put(`/api/jobs/${pendingJobId}/start`)
      .expect(401);
  });
});
