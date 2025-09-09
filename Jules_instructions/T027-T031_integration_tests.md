# T027-T031: Integration Tests Instructions

**Tasks**: T027, T028, T029, T030, T031  
**Phase**: 3.4 Integration Tests (TDD - User Stories)  
**Dependencies**: T008-T016 (Types ✅), T017-T026 (Contract tests ✅)  
**Must complete before**: T041+ (API Endpoints implementation)

## Overview
Create 5 integration test files that validate complete end-to-end workflows for all user types in the Mercedes-Benz workshop management system. These tests simulate real user journeys and MUST FAIL initially (TDD approach).

---

## T027: Service Advisor Booking Creation Workflow
**File**: `tests/integration/advisor-booking.test.ts`

### Test Scenarios:
1. **Complete booking creation workflow** - Login → Customer selection → Vehicle selection → Service type → Scheduling → Cost estimate → Confirmation
2. **New customer creation during booking** - Create customer + vehicle + booking in one flow
3. **VIN validation and vehicle lookup** - Mercedes-Benz API integration (mocked)
4. **Cost calculation** - Service type + vehicle model pricing
5. **Scheduling conflicts** - Prevent double-booking
6. **Error handling** - Network failures, validation errors

### Key Test Data:
```typescript
const mockServiceAdvisor = {
  $id: 'advisor_123', role: 'service_advisor', firstName: 'Hans', lastName: 'Mueller'
};
const mockBookingData = {
  serviceType: ['B-Service', 'Tire Rotation'],
  scheduledDate: '2025-01-15', scheduledTime: '10:00',
  estimatedCost: 45000 // 450 EUR in cents
};
```

---

## T028: Technician Checklist Completion Workflow
**File**: `tests/integration/technician-workflow.test.ts`

### Test Scenarios:
1. **Job assignment and checklist access** - Technician logs in → Views assigned jobs → Opens checklist
2. **Step-by-step checklist completion** - Mark items complete → Add notes → Time tracking
3. **Mercedes-Benz OEM compliance** - Required fields, digital signatures, timestamps
4. **Photo documentation** - Attach images to checklist items
5. **Additional work discovery** - Create estimates for extra work found
6. **Job completion and handoff** - Final checklist submission → Customer notification

### Key Test Data:
```typescript
const mockTechnician = {
  $id: 'tech_456', role: 'technician', firstName: 'Klaus', lastName: 'Weber'
};
const mockChecklist = {
  $id: 'checklist_b_service_w213',
  items: [
    { id: 1, description: 'Check engine oil level', required: true, completed: false },
    { id: 2, description: 'Inspect brake pads', required: true, completed: false }
  ]
};
```

---

## T029: Customer Approval Process Workflow
**File**: `tests/integration/customer-approval.test.ts`

### Test Scenarios:
1. **Customer notification of additional work** - Real-time notification → Email/SMS → Web portal access
2. **Online estimate review** - Customer views detailed breakdown → Photos of issues
3. **Approval/rejection workflow** - Customer accepts/declines → Technician notification
4. **Multi-stage approvals** - Multiple additional work items over service duration
5. **Timeout handling** - Auto-escalation if no response within timeframe
6. **Communication preferences** - Email vs SMS vs push notifications

### Key Test Data:
```typescript
const mockCustomer = {
  $id: 'customer_789', email: 'maria@example.com', 
  communicationPreferences: '{"email":true,"sms":true,"push":false}'
};
const mockAdditionalWork = {
  description: 'Replace worn brake pads - front axle',
  estimatedCost: 25000, // 250 EUR
  urgency: 'medium',
  photos: ['brake_pad_1.jpg', 'brake_pad_2.jpg']
};
```

---

## T030: OEM Service Record Generation Workflow  
**File**: `tests/integration/service-record.test.ts`

### Test Scenarios:
1. **Complete service documentation** - All checklist items → Service record generation
2. **Mercedes-Benz OEM compliance** - Required fields, timestamps, technician signatures
3. **PDF generation and storage** - Official service record format → Appwrite storage
4. **Digital signatures** - Technician + customer signatures → Legal compliance
5. **Service history integration** - Link to vehicle service history → Warranty tracking
6. **Audit trail** - All changes logged → Compliance reporting

### Key Test Data:
```typescript
const mockServiceRecord = {
  vehicleVin: 'WDD2130461A123456',
  serviceType: ['B-Service'],
  technicianSignature: 'digital_signature_hash_123',
  customerSignature: 'digital_signature_hash_456',
  odometerReading: 45250,
  completedAt: '2025-01-15T16:30:00Z',
  complianceChecks: { oemStandards: true, warranties: ['powertrain', 'emission'] }
};
```

---

## T031: Real-time Notifications Workflow
**File**: `tests/integration/realtime-updates.test.ts`

### Test Scenarios:
1. **Multi-user real-time updates** - Service advisor → Technician → Customer simultaneous updates
2. **Job status broadcasting** - Status changes propagate to all stakeholders
3. **Appwrite Realtime integration** - WebSocket connections → Event subscriptions
4. **Cross-device synchronization** - Mobile + desktop updates
5. **Notification preferences** - User-specific notification settings
6. **Offline/online state handling** - Queue notifications when offline → Sync when back online

### Key Test Data:
```typescript
const mockRealtimeEvent = {
  type: 'booking.status.updated',
  bookingId: 'booking_123',
  newStatus: 'in-progress',
  timestamp: '2025-01-15T14:30:00Z',
  userId: 'tech_456',
  subscribers: ['advisor_123', 'customer_789']
};
```

---

## Common Test Setup (All Files)

### Required Imports:
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock Appwrite services
vi.mock('../../../src/lib/appwrite', () => ({
  databases: { createDocument: vi.fn(), getDocument: vi.fn(), listDocuments: vi.fn() },
  account: { get: vi.fn() },
  realtime: { subscribe: vi.fn(), unsubscribe: vi.fn() },
  storage: { createFile: vi.fn(), getFile: vi.fn() }
}));
```

### Mock Data Structure:
```typescript
// Common test data across all integration tests
const mockData = {
  customer: { $id: 'customer_123', email: 'test@example.com' },
  vehicle: { $id: 'vehicle_456', vin: 'WDD2130461A123456', model: 'E-Class' },
  booking: { $id: 'booking_789', status: 'scheduled' },
  job: { $id: 'job_012', status: 'pending' },
  user: { $id: 'user_345', role: 'service_advisor' }
};
```

## TDD Requirements ⚠️

**CRITICAL**: All tests MUST FAIL initially because:
- No React components exist yet
- No API endpoints implemented  
- No authentication system
- No real-time infrastructure
- No PDF generation service

Each test should clearly show what needs to be built in T032+ implementation tasks.

## File Checklist

- [ ] `tests/integration/advisor-booking.test.ts` - Complete booking workflow
- [ ] `tests/integration/technician-workflow.test.ts` - Checklist completion process
- [ ] `tests/integration/customer-approval.test.ts` - Customer approval/notification flow  
- [ ] `tests/integration/service-record.test.ts` - OEM-compliant record generation
- [ ] `tests/integration/realtime-updates.test.ts` - Multi-user real-time updates

## Success Criteria

1. All 5 integration test files created
2. Tests cover complete user journeys for each role
3. Tests FAIL appropriately (no implementation exists)
4. Mock data follows existing type definitions
5. Tests are comprehensive but maintainable
6. Mercedes-Benz OEM compliance requirements included
7. Real-time functionality properly tested
8. Error scenarios and edge cases covered