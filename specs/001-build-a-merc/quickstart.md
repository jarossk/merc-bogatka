# Quickstart: Merc Auto Garage Integration Tests

**Purpose**: End-to-end test scenarios validating core user workflows  
**Phase**: 1 (Design & Contracts)  
**Test Framework**: Playwright with Appwrite Test Database

## Test Environment Setup

### Prerequisites
```bash
# Install dependencies
pnpm install

# Configure test environment
cp .env.test.example .env.test

# Start Appwrite test instance
docker compose -f docker-compose.test.yml up -d

# Initialize test database
pnpm run test:db:init

# Seed test data
pnpm run test:db:seed
```

### Test Data Fixtures
```typescript
// Test users created by seed script
const testUsers = {
  admin: { email: 'admin@example.com', password: 'Test123!' },
  advisor: { email: 'advisor@example.com', password: 'Test123!' },
  technician: { email: 'tech@example.com', password: 'Test123!' },
  customer: { email: 'customer@example.com', password: 'Test123!' }
};

// Test vehicle data
const testVehicle = {
  vin: 'WDDHF8JB1CA123456',
  model: 'C-Class',
  modelYear: 2023,
  licensePlate: 'B-MW 1234'
};
```

---

## Core User Workflows

### Workflow 1: Service Advisor Creates Booking
**User Story**: Service advisor creates booking and estimate for customer

**Test Steps**:
```typescript
test('Service advisor creates complete booking workflow', async ({ page }) => {
  // 1. Login as service advisor
  await page.goto('/login');
  await page.fill('[data-testid=email]', 'advisor@example.com');
  await page.fill('[data-testid=password]', 'Test123!');
  await page.click('[data-testid=login-btn]');
  
  // Verify dashboard loads
  await expect(page.locator('[data-testid=advisor-dashboard]')).toBeVisible();
  
  // 2. Create new booking
  await page.click('[data-testid=new-booking-btn]');
  await expect(page.locator('[data-testid=booking-form]')).toBeVisible();
  
  // Select existing customer
  await page.click('[data-testid=customer-select]');
  await page.click('[data-testid=customer-option-1]');
  
  // Select customer's vehicle
  await page.waitForSelector('[data-testid=vehicle-select]:not([disabled])');
  await page.click('[data-testid=vehicle-select]');
  await page.click('[data-testid=vehicle-option-0]');
  
  // Schedule appointment
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  await page.fill('[data-testid=scheduled-date]', tomorrow.toISOString().split('T')[0]);
  await page.fill('[data-testid=scheduled-time]', '09:00');
  await page.fill('[data-testid=estimated-duration]', '120');
  
  // Select service type
  await page.check('[data-testid=service-type-maintenance]');
  await page.fill('[data-testid=customer-notes]', 'Customer reports strange noise from engine');
  
  // Submit booking
  await page.click('[data-testid=create-booking-btn]');
  
  // Verify booking created
  await expect(page.locator('[data-testid=booking-success]')).toBeVisible();
  const bookingNumber = await page.textContent('[data-testid=booking-number]');
  expect(bookingNumber).toMatch(/^MB-\d{4}-\d{6}$/);
  
  // 3. Create estimate for booking
  await page.click('[data-testid=create-estimate-btn]');
  
  // Add labor line item
  await page.click('[data-testid=add-line-item]');
  await page.selectOption('[data-testid=line-item-type-0]', 'labor');
  await page.fill('[data-testid=line-item-description-0]', 'Engine diagnostic');
  await page.fill('[data-testid=line-item-quantity-0]', '2');
  await page.fill('[data-testid=line-item-rate-0]', '85');
  
  // Add parts line item
  await page.click('[data-testid=add-line-item]');
  await page.selectOption('[data-testid=line-item-type-1]', 'parts');
  await page.fill('[data-testid=line-item-description-1]', 'Oil filter');
  await page.fill('[data-testid=line-item-quantity-1]', '1');
  await page.fill('[data-testid=line-item-rate-1]', '25');
  
  // Verify total calculation
  await expect(page.locator('[data-testid=estimate-subtotal]')).toHaveText('€195.00');
  await expect(page.locator('[data-testid=estimate-tax]')).toHaveText('€37.05'); // 19% VAT
  await expect(page.locator('[data-testid=estimate-total]')).toHaveText('€232.05');
  
  // Send estimate to customer
  await page.fill('[data-testid=customer-message]', 'Please approve this estimate to begin work');
  await page.click('[data-testid=send-estimate-btn]');
  
  // Verify estimate sent
  await expect(page.locator('[data-testid=estimate-sent]')).toBeVisible();
});
```

**Expected Results**:
- Booking created with valid booking number
- Estimate calculated correctly with tax
- Customer receives email notification
- Real-time updates sent to technician dashboard

---

### Workflow 2: Technician Follows Checklist
**User Story**: Technician logs job progress using model-specific checklist

**Test Steps**:
```typescript
test('Technician completes job with checklist', async ({ page, context }) => {
  // 1. Login as technician
  await page.goto('/login');
  await page.fill('[data-testid=email]', 'tech@example.com');
  await page.fill('[data-testid=password]', 'Test123!');
  await page.click('[data-testid=login-btn]');
  
  // Verify technician dashboard
  await expect(page.locator('[data-testid=tech-dashboard]')).toBeVisible();
  await expect(page.locator('[data-testid=assigned-jobs]')).toBeVisible();
  
  // 2. Select assigned job
  const jobCard = page.locator('[data-testid=job-card]').first();
  await expect(jobCard).toBeVisible();
  await jobCard.click();
  
  // Verify job details page
  await expect(page.locator('[data-testid=job-details]')).toBeVisible();
  await expect(page.locator('[data-testid=checklist-progress]')).toBeVisible();
  
  // 3. Start job work
  await page.click('[data-testid=start-job-btn]');
  await page.fill('[data-testid=start-notes]', 'Beginning engine diagnostic');
  await page.click('[data-testid=confirm-start]');
  
  // Verify job status updated
  await expect(page.locator('[data-testid=job-status]')).toHaveText('In Progress');
  await expect(page.locator('[data-testid=job-timer]')).toBeVisible();
  
  // 4. Complete checklist items
  const checklistItems = page.locator('[data-testid=checklist-item]');
  const itemCount = await checklistItems.count();
  
  for (let i = 0; i < Math.min(3, itemCount); i++) {
    const item = checklistItems.nth(i);
    await item.scrollIntoViewIfNeeded();
    
    // Check item as completed
    await item.locator('[data-testid=item-checkbox]').check();
    await item.locator('[data-testid=item-notes]').fill(`Completed step ${i + 1} - all normal`);
    await item.locator('[data-testid=actual-minutes]').fill('15');
    await item.locator('[data-testid=save-item]').click();
    
    // Verify item saved
    await expect(item.locator('[data-testid=item-status]')).toHaveText('Completed');
  }
  
  // Verify progress updated
  const progressText = await page.textContent('[data-testid=progress-percentage]');
  expect(progressText).toMatch(/\d+%/);
  
  // 5. Request additional work approval
  await page.click('[data-testid=request-approval-btn]');
  await page.fill('[data-testid=approval-description]', 'Found worn brake pads during inspection');
  await page.fill('[data-testid=additional-work-title]', 'Brake pad replacement');
  await page.fill('[data-testid=additional-work-description]', 'Replace front brake pads and resurface rotors');
  await page.fill('[data-testid=estimated-hours]', '2');
  await page.fill('[data-testid=part-cost]', '125');
  
  // Submit approval request
  await page.click('[data-testid=submit-approval]');
  
  // Verify approval request sent
  await expect(page.locator('[data-testid=approval-pending]')).toBeVisible();
  await expect(page.locator('[data-testid=job-status]')).toHaveText('Waiting for Approval');
});
```

**Expected Results**:
- Job status updates in real-time
- Checklist progress tracked accurately
- Time tracking functions correctly
- Approval request sent to customer
- Job automatically paused pending approval

---

### Workflow 3: Customer Receives Updates and Approves Work
**User Story**: Customer receives real-time updates and approves additional work online

**Test Steps**:
```typescript
test('Customer receives updates and approves additional work', async ({ page, context }) => {
  // Simulate customer receiving email notification
  // In real scenario, this would be triggered by previous test
  
  // 1. Customer accesses booking status via email link
  const magicLink = 'http://localhost:3000/booking/status/MB-2025-001234?token=customer-access-token';
  await page.goto(magicLink);
  
  // Verify customer can see booking without login
  await expect(page.locator('[data-testid=booking-status-page]')).toBeVisible();
  await expect(page.locator('[data-testid=customer-name]')).toHaveText('John Doe');
  await expect(page.locator('[data-testid=vehicle-info]')).toContainText('2023 Mercedes-Benz C-Class');
  
  // 2. View current service progress
  await expect(page.locator('[data-testid=service-progress]')).toBeVisible();
  const progressItems = page.locator('[data-testid=progress-item]');
  
  // Verify completed items shown
  await expect(progressItems.filter({ hasText: 'Engine diagnostic' }))
    .toHaveClass(/completed/);
  await expect(progressItems.filter({ hasText: 'Oil change' }))
    .toHaveClass(/completed/);
  
  // 3. Review additional work approval request
  await expect(page.locator('[data-testid=approval-request]')).toBeVisible();
  await expect(page.locator('[data-testid=approval-title]')).toHaveText('Brake pad replacement');
  await expect(page.locator('[data-testid=approval-cost]')).toHaveText('€245.00');
  await expect(page.locator('[data-testid=approval-description]'))
    .toContainText('Replace front brake pads and resurface rotors');
  
  // View detailed breakdown
  await page.click('[data-testid=view-breakdown]');
  await expect(page.locator('[data-testid=labor-cost]')).toHaveText('€120.00');
  await expect(page.locator('[data-testid=parts-cost]')).toHaveText('€125.00');
  
  // 4. Approve additional work
  await page.check('[data-testid=approval-agreement]'); // Terms checkbox
  await page.fill('[data-testid=customer-notes]', 'Please proceed with brake work');
  await page.click('[data-testid=approve-work-btn]');
  
  // Verify approval confirmation
  await expect(page.locator('[data-testid=approval-success]')).toBeVisible();
  await expect(page.locator('[data-testid=approval-timestamp]')).toBeVisible();
  
  // 5. Verify real-time updates
  // Service advisor and technician should receive instant notification
  await expect(page.locator('[data-testid=work-approved-status]')).toHaveText('Additional work approved');
  await expect(page.locator('[data-testid=estimated-completion]')).toBeVisible();
  
  // 6. Check notification preferences
  await page.click('[data-testid=notification-settings]');
  await expect(page.locator('[data-testid=email-notifications]')).toBeChecked();
  await page.check('[data-testid=sms-notifications]');
  await page.click('[data-testid=save-preferences]');
  
  // Verify preferences saved
  await expect(page.locator('[data-testid=preferences-saved]')).toBeVisible();
});
```

**Expected Results**:
- Customer accesses status without account creation
- Real-time progress updates display correctly
- Approval process completes successfully
- Notifications sent to service team immediately
- Customer preferences updated

---

### Workflow 4: OEM-Compliant Service Record Generation
**User Story**: System generates Mercedes-Benz compliant service record upon job completion

**Test Steps**:
```typescript
test('System generates OEM-compliant service record', async ({ page, context }) => {
  // Continue from technician completing job after approval
  
  // 1. Technician resumes and completes job
  await page.goto('/technician/jobs/JOB-2025-001234');
  await page.click('[data-testid=resume-job-btn]');
  
  // Complete remaining checklist items
  const remainingItems = page.locator('[data-testid=checklist-item][data-completed=false]');
  const count = await remainingItems.count();
  
  for (let i = 0; i < count; i++) {
    const item = remainingItems.nth(0); // Always get first remaining item
    await item.locator('[data-testid=item-checkbox]').check();
    await item.locator('[data-testid=item-notes]').fill('Work completed successfully');
    await item.locator('[data-testid=save-item]').click();
  }
  
  // 2. Complete job with final details
  await page.click('[data-testid=complete-job-btn]');
  
  // Fill completion form
  await page.fill('[data-testid=technician-notes]', 
    'Engine diagnostic completed. Oil changed. Brake pads replaced. All systems normal.');
  
  // Record actual parts used
  await page.click('[data-testid=add-part-used]');
  await page.fill('[data-testid=part-number-0]', 'A0009898301');
  await page.fill('[data-testid=part-description-0]', 'Mercedes-Benz Original Oil Filter');
  await page.fill('[data-testid=part-quantity-0]', '1');
  
  await page.click('[data-testid=add-part-used]');
  await page.fill('[data-testid=part-number-1]', 'A0064201020');
  await page.fill('[data-testid=part-description-1]', 'Front Brake Pad Set');
  await page.fill('[data-testid=part-quantity-1]', '1');
  
  // Quality control check
  await page.check('[data-testid=quality-check-passed]');
  await page.fill('[data-testid=qc-notes]', 'All work verified. Vehicle test drive completed.');
  
  // Next service recommendation
  await page.fill('[data-testid=next-service-type]', 'B-Service');
  await page.fill('[data-testid=next-service-miles]', '20000');
  
  // Digital signature
  await page.click('[data-testid=sign-completion]');
  // In real app, this would open signature pad
  await page.fill('[data-testid=digital-signature]', 'Max Mustermann');
  
  // Submit completion
  await page.click('[data-testid=submit-completion]');
  
  // 3. Verify service record generation
  await expect(page.locator('[data-testid=completion-success]')).toBeVisible();
  
  // Verify service record details
  const recordNumber = await page.textContent('[data-testid=service-record-number]');
  expect(recordNumber).toMatch(/^SR-\d{4}-\d{6}$/);
  
  await expect(page.locator('[data-testid=oem-compliant]')).toHaveText('✓ OEM Compliant');
  await expect(page.locator('[data-testid=record-certified]')).toBeVisible();
  
  // 4. Verify PDF generation
  await page.click('[data-testid=view-service-record]');
  
  // Should open PDF in new tab
  const [pdfPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('[data-testid=download-pdf]')
  ]);
  
  // Verify PDF contains required elements
  await pdfPage.waitForLoadState();
  expect(pdfPage.url()).toContain('.pdf');
  
  // 5. Verify customer notification
  await page.goto('/admin/notifications');
  
  const notifications = page.locator('[data-testid=notification-log]');
  await expect(notifications.filter({ hasText: 'Service completed' })).toBeVisible();
  await expect(notifications.filter({ hasText: 'john.doe@example.com' })).toBeVisible();
  
  // 6. Verify data retention compliance
  await page.goto('/admin/data-compliance');
  
  const serviceRecord = page.locator(`[data-testid=service-record-${recordNumber}]`);
  await expect(serviceRecord.locator('[data-testid=retention-period]'))
    .toHaveText('7 years');
  await expect(serviceRecord.locator('[data-testid=gdpr-compliant]'))
    .toHaveText('✓ Compliant');
});
```

**Expected Results**:
- Service record generated with unique number
- All OEM compliance requirements met
- PDF report contains all required fields
- Customer automatically notified
- Data retention policies applied correctly
- Digital signature captured and validated

---

## Performance Benchmarks

### Page Load Performance
```typescript
test('Page load performance meets targets', async ({ page }) => {
  // Test critical pages load under 200ms
  const pages = [
    '/dashboard',
    '/bookings',
    '/jobs',
    '/customers'
  ];
  
  for (const path of pages) {
    const startTime = Date.now();
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(200);
  }
});
```

### Real-time Update Latency
```typescript
test('Real-time updates under 1 second', async ({ page, context }) => {
  // Test that job status changes propagate quickly
  const advisorPage = await context.newPage();
  const technicianPage = await context.newPage();
  
  // Setup real-time listeners
  let updateReceived = false;
  let updateTime = 0;
  
  await advisorPage.goto('/bookings/MB-2025-001234');
  await advisorPage.evaluate(() => {
    window.updateReceived = false;
    // Listen for real-time updates
    window.appwrite.subscribe('databases.main.collections.jobs', (response) => {
      window.updateReceived = true;
      window.updateTime = Date.now();
    });
  });
  
  // Trigger update from technician
  await technicianPage.goto('/jobs/JOB-2025-001234');
  const triggerTime = Date.now();
  await technicianPage.click('[data-testid=start-job-btn]');
  
  // Wait for update to propagate
  await advisorPage.waitForFunction(() => window.updateReceived);
  
  const latency = await advisorPage.evaluate(() => window.updateTime) - triggerTime;
  expect(latency).toBeLessThan(1000); // Under 1 second
});
```

## Test Execution

### Run All Integration Tests
```bash
# Run full test suite
pnpm run test:integration

# Run specific workflow
pnpm run test:integration --grep "Service advisor creates booking"

# Run with UI mode for debugging
pnpm run test:integration:ui

# Generate test report
pnpm run test:integration:report
```

### Test Data Cleanup
```bash
# Clean test database after run
pnpm run test:db:clean

# Reset to initial state
pnpm run test:db:reset
```

This quickstart validates all core workflows end-to-end, ensuring the application meets Mercedes-Benz OEM compliance requirements and provides the expected user experience for service centers.