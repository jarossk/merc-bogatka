import http from 'http';

/**
 * This is a mock HTTP server for contract testing with Vitest and Supertest.
 *
 * Why is this needed?
 * --------------------
 * Our contract tests are designed to run against API endpoints that do not exist yet.
 * Supertest requires a server instance (`http.Server`) to make requests against.
 * The actual Next.js server is not easily available in the Vitest test environment
 * without a complex setup or running the dev server, which is more suited for
 * integration tests.
 *
 * How does this work?
 * --------------------
 * This server simply responds with a 404 "Not Found" for every request it receives.
 * This is the exact behavior we want for our initial failing tests. When a test
 * expects a 200 OK response from an endpoint like `GET /api/bookings`, it will
 * receive a 404 instead, causing the test assertion to fail correctly.
 *
 * This approach allows us to verify our test setup and test logic without
 * needing the actual API implementation to be present.
 */
const app = http.createServer((req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    error: 'Not Found',
    message: `Endpoint ${req.method} ${req.url} does not exist.`,
    code: 404,
    timestamp: new Date().toISOString(),
    path: req.url,
  }));
});

export { app };
