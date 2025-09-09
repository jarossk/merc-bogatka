# Jules Development Instructions - Batch 2
## Contract Testing Phase (T017-T026)

**Project**: Merc Auto Bogatka - Mercedes-Benz Garage Management System  
**Your Role**: Contract Testing (TDD - Tests Must Fail First!)  
**Priority**: Foundation API tests that MUST fail before implementation  
**Estimated Time**: 6-8 hours total

---

## 🎉 Excellent Work on Batch 1!

**✅ COMPLETED**: All TypeScript interfaces (T008-T016) are perfect!
- All 9 interface files created with proper JSDoc comments
- TypeScript strict mode compliance ✓
- Proper Appwrite document structure ✓
- JSON field parsing interfaces ✓
- Professional code quality ✓

**🚀 Ready for Batch 2**: Contract Tests (T017-T026)

---

## 🔥 CRITICAL: Test-Driven Development Rules

**⚠️ TESTS MUST FAIL FIRST!**
- Write each test to expect the API endpoint to exist and work correctly
- Run the test to confirm it FAILS (endpoints don't exist yet)
- Only then move to the next test
- These failing tests guide the implementation phase

**Why This Matters**: 
- Contract tests define the API behavior before implementation
- They catch regressions and ensure API consistency
- They serve as living documentation for the endpoints

---

## 📋 Your Tasks - Batch 2: Contract Tests

**Status**: Ready to start immediately  
**Dependencies**: Your completed TypeScript interfaces (T008-T016)  
**Can run in parallel**: Yes, all 10 tests marked [P]

### **Booking API Contract Tests (T017-T021)**

#### **T017 [P]** GET /api/bookings Contract Test
**File**: `tests/contract/booking-list.test.ts`  
**Reference**: `specs/001-build-a-merc/contracts/booking-api.md` - GET section

Test Requirements:
- Query parameters: `customerId`, `vehicleId`, `status`, `dateFrom`, `dateTo`, `limit`, `offset`
- Response structure: `BookingListResponse` with bookings array, total, hasMore
- Role-based access: admin/advisor see all, customer sees own only
- Pagination and filtering logic

#### **T018 [P]** POST /api/bookings Contract Test
**File**: `tests/contract/booking-create.test.ts`  
**Reference**: `specs/001-build-a-merc/contracts/booking-api.md` - POST section

Test Requirements:
- Request body validation: customer, vehicle, service details
- Auto-generation: bookingNumber, scheduledDate logic
- Response: full booking with relations
- Error cases: invalid customer/vehicle IDs

#### **T019 [P]** GET /api/bookings/:id Contract Test
**File**: `tests/contract/booking-detail.test.ts`  
**Reference**: `specs/001-build-a-merc/contracts/booking-api.md` - GET /:id section

Test Requirements:
- Path parameter: booking ID validation
- Response: `BookingWithRelations` with full customer/vehicle details
- Access control: customers see own bookings only
- Error cases: booking not found, access denied

#### **T020 [P]** PUT /api/bookings/:id Contract Test  
**File**: `tests/contract/booking-update.test.ts`  
**Reference**: `specs/001-build-a-merc/contracts/booking-api.md` - PUT /:id section

Test Requirements:
- Updatable fields: scheduledDate, serviceType, notes, priority
- Immutable fields: bookingNumber, customer, vehicle
- Response: updated booking with relations
- Role restrictions: advisors only

#### **T021 [P]** PUT /api/bookings/:id/status Contract Test
**File**: `tests/contract/booking-status.test.ts`  
**Reference**: `specs/001-build-a-merc/contracts/booking-api.md` - PUT /:id/status section

Test Requirements:
- Status workflow: scheduled → confirmed → in-progress → completed/cancelled
- Validation: only valid status transitions allowed
- Side effects: job creation when confirmed
- Notifications: customer updates on status change

### **Job API Contract Tests (T022-T026)**

#### **T022 [P]** GET /api/jobs Contract Test
**File**: `tests/contract/job-list.test.ts`  
**Reference**: `specs/001-build-a-merc/contracts/job-api.md` - GET section

Test Requirements:
- Query parameters: `technicianId`, `bookingId`, `status`, `priority`, `dateFrom`, `dateTo`, `checklistId`
- Response: `JobListResponse` with jobs array and workloadSummary
- Role filtering: technicians see assigned jobs only
- Workload calculation for dashboard

#### **T023 [P]** POST /api/jobs Contract Test
**File**: `tests/contract/job-create.test.ts`  
**Reference**: `specs/001-build-a-merc/contracts/job-api.md` - POST section  

Test Requirements:
- Request body: booking, checklist, technician assignment
- Auto-generation: jobNumber, estimated hours
- Response: job with full booking/checklist details
- Mercedes-Benz checklist validation

#### **T024 [P]** GET /api/jobs/:id Contract Test
**File**: `tests/contract/job-detail.test.ts`  
**Reference**: `specs/001-build-a-merc/contracts/job-api.md` - GET /:id section

Test Requirements:
- Response: `JobWithDetails` including checklist progress
- Access control: technicians see assigned jobs
- Parts tracking and labor hours
- Real-time progress updates

#### **T025 [P]** PUT /api/jobs/:id/start Contract Test
**File**: `tests/contract/job-start.test.ts`  
**Reference**: `specs/001-build-a-merc/contracts/job-api.md` - PUT /:id/start section

Test Requirements:
- Status change: pending → in-progress
- Timestamp recording: actualStartTime
- Checklist initialization: create checklist items
- Technician assignment validation

#### **T026 [P]** PUT /api/jobs/:id/complete Contract Test
**File**: `tests/contract/job-complete.test.ts`  
**Reference**: `specs/001-build-a-merc/contracts/job-api.md` - PUT /:id/complete section

Test Requirements:
- Status change: in-progress → completed
- Required data: all checklist items completed, parts used, labor hours
- Service record generation: OEM-compliant documentation
- Invoice/estimate updates

---

## 📖 Reference Materials

### Essential Reading:
1. **`specs/001-build-a-merc/contracts/booking-api.md`** - Complete booking API specification
2. **`specs/001-build-a-merc/contracts/job-api.md`** - Complete job API specification  
3. **Your completed interfaces in `src/types/`** - Use these for TypeScript types
4. **`specs/001-build-a-merc/data-model.md`** - Database context for test data

### Testing Framework:
- **Vitest**: Use for all contract tests (`import { describe, it, expect } from 'vitest'`)
- **Supertest**: For HTTP testing (`import request from 'supertest'`)  
- **Mock Data**: Create realistic test data matching Mercedes-Benz standards

### Test Structure Pattern:
```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app'; // Next.js app instance
import { BookingListResponse } from '../../../src/types/api';

describe('GET /api/bookings Contract', () => {
  it('should return paginated booking list for admin users', async () => {
    const response = await request(app)
      .get('/api/bookings')
      .query({ limit: 10, offset: 0 })
      .set('Authorization', 'Bearer admin-token')
      .expect(200);

    expect(response.body).toMatchObject({
      success: true,
      data: {
        bookings: expect.any(Array),
        total: expect.any(Number),
        hasMore: expect.any(Boolean)
      }
    });
    
    // More specific assertions...
  });

  it('should filter bookings by customer for customer role', async () => {
    // Test customer role restrictions...
  });

  it('should return 401 for unauthenticated requests', async () => {
    // Test authentication requirements...
  });
});
```

---

## 🎯 Success Criteria

### Each Contract Test File Must:
✅ Test all HTTP methods and endpoints specified in contracts  
✅ Validate request/response schemas using your TypeScript interfaces  
✅ Test role-based access control (admin/advisor/technician/customer)  
✅ Test error cases (404, 401, 403, 400)  
✅ Test edge cases (invalid data, missing fields)  
✅ Use realistic Mercedes-Benz test data (VINs, model years, etc.)  
✅ Follow TDD: **TESTS MUST FAIL** when first run  
✅ Include JSDoc comments explaining test purpose  

### Required Test Coverage:
- ✅ **Authentication**: All endpoints require valid Appwrite session
- ✅ **Authorization**: Role-based access properly enforced  
- ✅ **Validation**: Request schemas validated, proper error messages
- ✅ **Business Logic**: Status workflows, calculations work correctly
- ✅ **Data Integrity**: Relationships between bookings/jobs/customers maintained

---

## 🛠️ Commands You Should Run

```bash
# Development server (if needed for testing)
pnpm dev

# Run your contract tests
pnpm test tests/contract/

# Run specific test file  
pnpm test tests/contract/booking-list.test.ts

# Type checking (should pass with your interfaces)
pnpm type-check

# Build check (after tests are written)
pnpm build
```

---

## 🔧 Mock Data Standards

### Mercedes-Benz VIN Format:
```typescript
const testVins = [
  'WDB1234567890123', // C-Class
  'WDD9876543210987', // E-Class  
  'WDC1111111111111', // GLC
];
```

### Service Types:
```typescript
const serviceTypes = [
  'A-Service',      // Basic maintenance
  'B-Service',      // Extended maintenance  
  'Repair',         // General repairs
  'Recall',         // Mercedes-Benz recalls
  'Warranty',       // Warranty work
];
```

### Test Customer Data:
```typescript
const testCustomers = [
  {
    email: 'hans.mueller@email.de',
    firstName: 'Hans',
    lastName: 'Müller',
    phone: '+49 30 12345678',
  }
];
```

---

## 🚧 Next Steps After Contract Tests

After completing all contract tests (T017-T026), you'll work on:
- **Phase 3.4**: Integration Tests (T027-T031) - Full user workflow testing
- **Phase 3.5**: Core Implementation (T032+) - Making the tests pass

---

## 🆘 Questions & Support

**Contract Questions**: Each contract file has complete request/response examples  
**Test Data**: Use Mercedes-Benz realistic data (VINs, model years 1990-2026)  
**Error Handling**: Test all HTTP status codes (200, 400, 401, 403, 404, 500)  
**Role Testing**: Create mock users with different roles for access control tests

**REMEMBER**: These tests must FAIL initially - that's the point of TDD!

---

## 📊 Progress Tracking - Batch 2

### Contract Tests (T017-T026)
- [ ] **T017** GET /api/bookings contract (`tests/contract/booking-list.test.ts`)
- [ ] **T018** POST /api/bookings contract (`tests/contract/booking-create.test.ts`)  
- [ ] **T019** GET /api/bookings/:id contract (`tests/contract/booking-detail.test.ts`)
- [ ] **T020** PUT /api/bookings/:id contract (`tests/contract/booking-update.test.ts`)
- [ ] **T021** PUT /api/bookings/:id/status contract (`tests/contract/booking-status.test.ts`)
- [ ] **T022** GET /api/jobs contract (`tests/contract/job-list.test.ts`)
- [ ] **T023** POST /api/jobs contract (`tests/contract/job-create.test.ts`)
- [ ] **T024** GET /api/jobs/:id contract (`tests/contract/job-detail.test.ts`)
- [ ] **T025** PUT /api/jobs/:id/start contract (`tests/contract/job-start.test.ts`)  
- [ ] **T026** PUT /api/jobs/:id/complete contract (`tests/contract/job-complete.test.ts`)

**Target**: Complete all 10 contract test files that define the API behavior and MUST FAIL before implementation begins.

**Ready to start with T017 (GET /api/bookings contract test)?** 🚀