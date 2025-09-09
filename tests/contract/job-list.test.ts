import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { JobListResponse } from '../../../src/types/api';
import { JobStatus, JobPriority } from '../../../src/types/job';

/**
 * Mock data for job list tests.
 */
const mockAdminToken = 'jwt-admin-token';
const mockTechnicianToken = 'jwt-technician-token-tech1';
const mockTechnicianId = 'tech_1';

describe('GET /api/jobs Contract', () => {
  /**
   * Test case for T022: Admin retrieving a list of all jobs.
   * Expects a 200 OK with a paginated list and workload summary.
   */
  it('[T022] should return a paginated list of jobs for an admin', async () => {
    const response = await request(app)
      .get('/api/jobs')
      .set('Authorization', `Bearer ${mockAdminToken}`)
      .query({ limit: 10, offset: 0 })
      .expect(200);

    const body: JobListResponse = response.body;

    expect(body.success).toBe(true);
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data.jobs)).toBe(true);
    expect(typeof body.data.total).toBe('number');
    expect(typeof body.data.hasMore).toBe('boolean');

    // Check for workload summary
    expect(body.data.workloadSummary).toBeDefined();
    expect(typeof body.data.workloadSummary.pending).toBe('number');
    expect(typeof body.data.workloadSummary.inProgress).toBe('number');
    expect(typeof body.data.workloadSummary.estimatedHoursRemaining).toBe('number');

    // Check job structure
    if (body.data.jobs.length > 0) {
      const job = body.data.jobs[0];
      expect(job).toHaveProperty('id');
      expect(job).toHaveProperty('jobNumber');
      expect(job).toHaveProperty('booking');
      expect(job).toHaveProperty('assignedTechnician');
    }
  });

  /**
   * Test case for T022: Technician retrieving their own jobs.
   * The API should automatically filter jobs for the authenticated technician.
   */
  it('[T022] should return a list of jobs assigned to the authenticated technician', async () => {
    const response = await request(app)
      .get('/api/jobs')
      .set('Authorization', `Bearer ${mockTechnicianToken}`)
      .expect(200);

    const body: JobListResponse = response.body;
    expect(body.success).toBe(true);
    // In a real test, we would assert that every job in the list
    // has `assignedTechnician.id` equal to the mockTechnicianId.
    body.data.jobs.forEach(job => {
      expect(job.assignedTechnician.id).toBe(mockTechnicianId);
    });
  });

  /**
   * Test case for T022: Admin filtering by status.
   * Tests the query parameter functionality.
   */
  it('[T022] should allow an admin to filter jobs by status', async () => {
    const status: JobStatus = 'in-progress';
    const response = await request(app)
      .get('/api/jobs')
      .set('Authorization', `Bearer ${mockAdminToken}`)
      .query({ status })
      .expect(200);

    const body: JobListResponse = response.body;
    expect(body.success).toBe(true);
    body.data.jobs.forEach(job => {
      expect(job.status).toBe(status);
    });
  });

  /**
   * Test case for T022: Admin filtering by priority.
   * Tests the query parameter functionality.
   */
  it('[T022] should allow an admin to filter jobs by priority', async () => {
    const priority: JobPriority = 'high';
    const response = await request(app)
      .get('/api/jobs')
      .set('Authorization', `Bearer ${mockAdminToken}`)
      .query({ priority })
      .expect(200);

    const body: JobListResponse = response.body;
    expect(body.success).toBe(true);
    body.data.jobs.forEach(job => {
      expect(job.priority).toBe(priority);
    });
  });

  /**
   * Test case for T022: Unauthenticated access.
   */
  it('[T022] should return 401 for unauthenticated requests', async () => {
    await request(app)
      .get('/api/jobs')
      .expect(401);
  });
});
