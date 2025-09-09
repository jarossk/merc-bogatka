import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { JobDetailResponse } from '../../../src/types/api';

/**
 * Mock data for job detail tests.
 */
const mockAdminToken = 'jwt-admin-token';
const mockAssignedTechnicianToken = 'jwt-technician-assigned-token';
const mockOtherTechnicianToken = 'jwt-technician-other-token';

const existingJobId = 'job_12345';
const nonExistentJobId = 'job_99999';

describe('GET /api/jobs/:id Contract', () => {
  /**
   * Test case for T024: Successful retrieval by an admin.
   * Expects a 200 OK with the full job details including nested objects.
   */
  it('[T024] should return full job details for an admin', async () => {
    const response = await request(app)
      .get(`/api/jobs/${existingJobId}`)
      .set('Authorization', `Bearer ${mockAdminToken}`)
      .expect(200);

    const body: JobDetailResponse = response.body;

    expect(body.success).toBe(true);
    const { job, checklistProgress, timeEntries, approvalHistory } = body.data;

    // Check main job object
    expect(job).toBeDefined();
    expect(job.id).toBe(existingJobId);
    expect(job).toHaveProperty('jobNumber');
    expect(job).toHaveProperty('status');

    // Check nested detail objects
    expect(checklistProgress).toBeDefined();
    expect(checklistProgress).toHaveProperty('items');
    expect(checklistProgress).toHaveProperty('completionPercentage');
    expect(Array.isArray(checklistProgress.items)).toBe(true);

    expect(Array.isArray(timeEntries)).toBe(true);
    expect(Array.isArray(approvalHistory)).toBe(true);
  });

  /**
   * Test case for T024: Access control for assigned technician.
   * The technician assigned to the job should be able to view its details.
   */
  it('[T024] should allow the assigned technician to retrieve job details', async () => {
    await request(app)
      .get(`/api/jobs/${existingJobId}`)
      .set('Authorization', `Bearer ${mockAssignedTechnicianToken}`)
      .expect(200);
  });

  /**
   * Test case for T024: Access control for other technicians.
   * A technician not assigned to the job should be denied access.
   */
  it('[T024] should return 403 when a non-assigned technician tries to access job details', async () => {
    await request(app)
      .get(`/api/jobs/${existingJobId}`)
      .set('Authorization', `Bearer ${mockOtherTechnicianToken}`)
      .expect(403);
  });

  /**
   * Test case for T024: Job not found.
   */
  it('[T024] should return 404 for a non-existent job ID', async () => {
    await request(app)
      .get(`/api/jobs/${nonExistentJobId}`)
      .set('Authorization', `Bearer ${mockAdminToken}`)
      .expect(404);
  });

  /**
   * Test case for T024: Unauthenticated access.
   */
  it('[T024] should return 401 for unauthenticated requests', async () => {
    await request(app)
      .get(`/api/jobs/${existingJobId}`)
      .expect(401);
  });
});
