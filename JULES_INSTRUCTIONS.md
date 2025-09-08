# Jules Development Instructions
## Merc Auto Bogatka - Mercedes-Benz Garage Management System

**Project**: Next.js 15 + TypeScript + Appwrite Mercedes-Benz OEM Workshop Management  
**Your Role**: TypeScript Interfaces & Contract Testing  
**Priority**: Foundation work for entire application  
**Estimated Time**: 6-8 hours total

---

## 🚀 Project Context

You're working on a **Mercedes-Benz certified workshop management system** with:
- **Stack**: Next.js 15, TypeScript (strict mode), Appwrite 1.7.4, Shadcn/ui
- **Database**: Already implemented in Appwrite with sample data
- **Focus**: OEM compliance, GDPR compliance, real-time collaboration
- **Architecture**: Appwrite-centric BaaS, no custom backend

### Key Requirements:
- **TypeScript Strict Mode**: No `any` types, full type safety
- **Mercedes-Benz OEM**: VIN validation, service documentation, compliance
- **TDD Approach**: Tests written before implementation
- **Biome Linting**: All code must pass quality checks

---

## 📋 Your Tasks - Batch 1: TypeScript Interfaces

**Status**: Ready to start immediately  
**Dependencies**: None (all files are independent)  
**Can run in parallel**: Yes, all 9 tasks marked [P]

### Task List (T008-T016):

#### **T008 [P]** Customer Entity Interfaces
**File**: `src/types/customer.ts`  
**Reference**: `specs/001-build-a-merc/data-model.md` Customer section

Create TypeScript interfaces for:
```typescript
// Customer from Appwrite collection: 68bd9672003c26009089
interface Customer {
  $id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string; // JSON string: {"street": "...", "city": "...", "postalCode": "...", "country": "..."}
  communicationPreferences: string; // JSON string: {"email": true, "sms": false, "push": true}
  $createdAt: string; // ISO datetime
  $updatedAt: string; // ISO datetime
}
```

#### **T009 [P]** Vehicle Entity Interfaces  
**File**: `src/types/vehicle.ts`  
**Reference**: `specs/001-build-a-merc/data-model.md` Vehicle section

Key fields:
- VIN validation (exactly 17 chars, unique)
- Mercedes-Benz specific fields (model, modelYear 1990-2026)
- Service tracking (lastServiceDate, nextServiceDue, warrantyExpiration)

#### **T010 [P]** Booking Entity Interfaces
**File**: `src/types/booking.ts`  
**Reference**: `specs/001-build-a-merc/data-model.md` Booking section

Important:
- Status enum: `["scheduled", "confirmed", "in-progress", "completed", "cancelled"]`
- Priority enum: `["normal", "high", "emergency"]`
- serviceType as string array
- Currency fields as integers (stored in cents)

#### **T011 [P]** User Entity Interfaces
**File**: `src/types/user.ts`  
**Reference**: `specs/001-build-a-merc/data-model.md` User section

Role-based access:
- Role enum: `["admin", "advisor", "technician", "customer"]`
- Specializations array for technicians
- Employee ID for staff

#### **T012 [P]** Job Entity Interfaces
**File**: `src/types/job.ts`  
**Reference**: `specs/001-build-a-merc/data-model.md` Job section

Complex fields:
- Status enum: `["pending", "in-progress", "completed", "on-hold", "cancelled"]`
- Priority enum: `["low", "normal", "high", "critical"]`
- Parts as string array (JSON objects): `["{\"partNumber\":\"A001\",\"description\":\"Oil Filter\",\"quantity\":1,\"unitCost\":2550}"]`

#### **T013 [P]** Checklist Entity Interfaces
**File**: `src/types/checklist.ts`  
**Reference**: `specs/001-build-a-merc/data-model.md` Checklist section

Mercedes-Benz OEM checklists:
- Vehicle model specific (C-Class, E-Class, etc.)
- Service type (A-Service, B-Service, Repair)
- Version controlled procedures

#### **T014 [P]** Estimate Entity Interfaces
**File**: `src/types/estimate.ts`  
**Reference**: `specs/001-build-a-merc/data-model.md` Estimate section

Financial calculations:
- Status enum: `["draft", "pending", "approved", "rejected", "expired"]`
- Line items as JSON string array
- Currency handling (integers in cents)

#### **T015 [P]** ServiceRecord Entity Interfaces
**File**: `src/types/service-record.ts`  
**Reference**: `specs/001-build-a-merc/data-model.md` ServiceRecord section

OEM compliance documentation:
- Digital signatures
- Quality control data
- Compliance certification
- PDF generation support

#### **T016 [P]** API Response Types
**File**: `src/types/api.ts`  
**Reference**: `specs/001-build-a-merc/contracts/` folder

Standard API response patterns:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}
```

---

## 📖 Reference Materials

### Essential Reading:
1. **`specs/001-build-a-merc/data-model.md`** - Complete database schema (UPDATED to match implementation)
2. **`specs/001-build-a-merc/database_structure_doc.md`** - Actual database structure with examples
3. **`CLAUDE.md`** - Development guidelines and commands
4. **`.env.example`** - Environment variables configuration (Appwrite, Mercedes-Benz API, etc.)

### Database Context:
- **Database ID**: `68bd62a8000016ba6f75`
- **Customer Collection**: `68bd9672003c26009089`  
- **Vehicle Collection**: `68bd969e002c66b609db`
- **Other collections**: `bookings`, `users`, `jobs`, `checklists`, `estimates`, `service_records`

### Code Quality Standards:
```bash
# Commands you should run:
pnpm biome:check    # Must pass
pnpm type-check     # Must pass  
pnpm test          # After creating tests
```

---

## 🎯 Success Criteria

### Each Interface File Must:
✅ Export proper TypeScript interfaces  
✅ Match Appwrite document structure exactly  
✅ Include all enum types with correct values  
✅ Handle JSON string fields appropriately  
✅ Pass TypeScript strict mode compilation  
✅ Pass Biome linting checks  
✅ Include JSDoc comments for complex fields  

### Example Pattern:
```typescript
/**
 * Mercedes-Benz Customer entity from Appwrite
 * Collection ID: 68bd9672003c26009089
 */
export interface Customer {
  /** Appwrite document ID */
  $id: string;
  /** Customer email address (unique) */
  email: string;
  // ... rest of fields
}

/** Parsed address object from Customer.address JSON string */
export interface CustomerAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

/** Communication preferences from JSON string */
export interface CommunicationPreferences {
  email: boolean;
  sms: boolean;  
  push: boolean;
}

// Export enums for reuse
export const CustomerStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
} as const;
```

---

## 🚧 Next Batch (Coming Soon)

After completing interfaces, you'll work on:
- **Batch 2**: Contract Tests (T017-T026) - API endpoint testing
- **Batch 3**: Integration Tests (T027-T031) - User workflow testing

These will use your interface work as foundation.

---

## 🆘 Questions & Support

**Database Questions**: Check `database_structure_doc.md` for examples  
**Mercedes-Benz Standards**: All VIN fields exactly 17 chars, model validation required  
**JSON Fields**: Parse string fields into proper TypeScript interfaces  
**Enum Values**: Must match database constraints exactly  

**Ready to start with T008 (Customer interfaces)?** The data-model.md file has all the specifications you need.

---

## 📊 Progress Tracking

- [ ] **T008** Customer interfaces (`src/types/customer.ts`)
- [ ] **T009** Vehicle interfaces (`src/types/vehicle.ts`)  
- [ ] **T010** Booking interfaces (`src/types/booking.ts`)
- [ ] **T011** User interfaces (`src/types/user.ts`)
- [ ] **T012** Job interfaces (`src/types/job.ts`)
- [ ] **T013** Checklist interfaces (`src/types/checklist.ts`)
- [ ] **T014** Estimate interfaces (`src/types/estimate.ts`)
- [ ] **T015** ServiceRecord interfaces (`src/types/service-record.ts`)
- [ ] **T016** API response types (`src/types/api.ts`)

**Target**: Complete all 9 interface files with full type safety for Mercedes-Benz workshop management system.