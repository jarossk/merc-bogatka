# Tasks: Merc Auto Garage Workshop Management System

**Input**: Design documents from `/specs/001-build-a-merc/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/, quickstart.md
**Focus**: First release - bookings, job cards, checklists, notifications, invoices

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → ✅ Found: Next.js 15 + TypeScript + Appwrite 1.7.4 stack
2. Load optional design documents:
   → ✅ data-model.md: 8 entities (Customer, Vehicle, Booking, User, Job, Checklist, Estimate, ServiceRecord)
   → ✅ contracts/: booking-api.md, job-api.md
   → ✅ research.md: Technical decisions and OEM compliance requirements
   → ✅ quickstart.md: End-to-end test scenarios
3. Generate tasks by category: Setup → Tests → Core → Integration → Polish
4. Apply task rules: Different files = [P] parallel, Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Validate task completeness: All contracts tested, all entities modeled
7. Return: SUCCESS (50 tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- File paths use Next.js 15 App Router structure: `src/app/`, `src/components/`, `src/lib/`

## Phase 3.1: Project Setup
- [x] **T001** Create Next.js 15 project structure with TypeScript and App Router in project root
- [x] **T002** Install core dependencies: Next.js 15, TypeScript, Appwrite SDK 1.7.4, Shadcn/ui, TanStack Query, Zustand
- [x] **T003** [P] Configure Biome linting and formatting in `biome.json`
- [x] **T004** [P] Setup Appwrite client configuration in `src/lib/appwrite.ts`
- [x] **T005** [P] Configure TypeScript strict mode in `tsconfig.json`
- [x] **T006** [P] Setup Tailwind CSS with Mercedes-Benz design tokens in `tailwind.config.ts`
- [x] **T007** [P] Initialize Shadcn/ui components with `components.json` configuration

## Phase 3.2: Type Definitions (TDD Prep) ✅ COMPLETED BY JULES
- [x] **T008** [P] Customer entity TypeScript interfaces in `src/types/customer.ts`
- [x] **T009** [P] Vehicle entity TypeScript interfaces in `src/types/vehicle.ts`
- [x] **T010** [P] Booking entity TypeScript interfaces in `src/types/booking.ts`
- [x] **T011** [P] User entity TypeScript interfaces in `src/types/user.ts`
- [x] **T012** [P] Job entity TypeScript interfaces in `src/types/job.ts`
- [x] **T013** [P] Checklist entity TypeScript interfaces in `src/types/checklist.ts`
- [x] **T014** [P] Estimate entity TypeScript interfaces in `src/types/estimate.ts`
- [x] **T015** [P] ServiceRecord entity TypeScript interfaces in `src/types/service-record.ts`
- [x] **T016** [P] API response types in `src/types/api.ts`

## Phase 3.3: Contract Tests (TDD - MUST FAIL FIRST) ✅ COMPLETED BY JULES
**CRITICAL: These tests MUST be written and MUST FAIL before ANY API implementation** 
⚠️ **STATUS**: Tests are properly failing due to missing implementations (supertest dependency and missing API endpoints)
- [x] **T017** [P] Contract test GET /api/bookings in `tests/contract/booking-list.test.ts`
- [x] **T018** [P] Contract test POST /api/bookings in `tests/contract/booking-create.test.ts`
- [x] **T019** [P] Contract test GET /api/bookings/:id in `tests/contract/booking-detail.test.ts`
- [x] **T020** [P] Contract test PUT /api/bookings/:id in `tests/contract/booking-update.test.ts`
- [x] **T021** [P] Contract test PUT /api/bookings/:id/status in `tests/contract/booking-status.test.ts`
- [x] **T022** [P] Contract test GET /api/jobs in `tests/contract/job-list.test.ts`
- [x] **T023** [P] Contract test POST /api/jobs in `tests/contract/job-create.test.ts`
- [x] **T024** [P] Contract test GET /api/jobs/:id in `tests/contract/job-detail.test.ts`
- [x] **T025** [P] Contract test PUT /api/jobs/:id/start in `tests/contract/job-start.test.ts`
- [x] **T026** [P] Contract test PUT /api/jobs/:id/complete in `tests/contract/job-complete.test.ts`

## Phase 3.4: Integration Tests (TDD - User Stories)
- [x] **T027** [P] Integration test service advisor booking creation workflow in `tests/integration/advisor-booking.test.ts`
- [x] **T028** [P] Integration test technician checklist completion in `tests/integration/technician-workflow.test.ts`
- [x] **T029** [P] Integration test customer approval process in `tests/integration/customer-approval.test.ts`
- [x] **T030** [P] Integration test OEM service record generation in `tests/integration/service-record.test.ts`
- [x] **T031** [P] Integration test real-time notifications in `tests/integration/realtime-updates.test.ts`

## Phase 3.5: Core Implementation (ONLY after tests are failing)

### Authentication & User Management
- [ ] **T032** Appwrite authentication setup in `src/lib/auth.ts`
- [ ] **T033** User context provider with role-based access in `src/contexts/auth-context.tsx`
- [ ] **T034** Login page with email/password auth at `src/app/login/page.tsx`
- [ ] **T035** Protected route middleware in `src/middleware.ts`

### Database Models & Services
- [ ] **T036** [P] Customer service with Appwrite operations in `src/lib/services/customer-service.ts`
- [ ] **T037** [P] Vehicle service with VIN validation in `src/lib/services/vehicle-service.ts`
- [ ] **T038** [P] Booking service with status workflow in `src/lib/services/booking-service.ts`
- [ ] **T039** [P] Job service with checklist integration in `src/lib/services/job-service.ts`
- [ ] **T040** [P] Estimate service with cost calculations in `src/lib/services/estimate-service.ts`

### API Endpoints (Route Handlers)
- [ ] **T041** GET /api/bookings endpoint in `src/app/api/bookings/route.ts`
- [ ] **T042** POST /api/bookings endpoint in `src/app/api/bookings/route.ts`
- [ ] **T043** GET /api/bookings/[id] endpoint in `src/app/api/bookings/[id]/route.ts`
- [ ] **T044** PUT /api/bookings/[id] endpoint in `src/app/api/bookings/[id]/route.ts`
- [ ] **T045** PUT /api/bookings/[id]/status endpoint in `src/app/api/bookings/[id]/status/route.ts`
- [ ] **T046** GET /api/jobs endpoint in `src/app/api/jobs/route.ts`
- [ ] **T047** POST /api/jobs endpoint in `src/app/api/jobs/route.ts`
- [ ] **T048** PUT /api/jobs/[id]/start endpoint in `src/app/api/jobs/[id]/start/route.ts`
- [ ] **T049** PUT /api/jobs/[id]/complete endpoint in `src/app/api/jobs/[id]/complete/route.ts`

## Phase 3.6: User Interface Components

### Shared Components
- [ ] **T050** [P] Booking form component in `src/components/booking/booking-form.tsx`
- [ ] **T051** [P] Customer selector component in `src/components/customer/customer-select.tsx`
- [ ] **T052** [P] Vehicle selector component in `src/components/vehicle/vehicle-select.tsx`
- [ ] **T053** [P] Job card component in `src/components/job/job-card.tsx`
- [ ] **T054** [P] Checklist component with progress tracking in `src/components/checklist/checklist.tsx`
- [ ] **T055** [P] Estimate form component in `src/components/estimate/estimate-form.tsx`
- [ ] **T056** [P] Status badge component in `src/components/ui/status-badge.tsx`
- [ ] **T057** [P] Real-time notification component in `src/components/notifications/notification-toast.tsx`

### Dashboard Pages
- [ ] **T058** Service advisor dashboard at `src/app/advisor/page.tsx`
- [ ] **T059** Technician dashboard at `src/app/technician/page.tsx`
- [ ] **T060** Customer status page at `src/app/booking/[id]/status/page.tsx`
- [ ] **T061** Booking detail page at `src/app/bookings/[id]/page.tsx`
- [ ] **T062** Job detail page at `src/app/jobs/[id]/page.tsx`

## Phase 3.7: Real-time Features & Integration
- [ ] **T063** Appwrite Realtime setup in `src/lib/realtime.ts`
- [ ] **T064** Real-time booking updates with TanStack Query integration in `src/hooks/use-booking-realtime.ts`
- [ ] **T065** Real-time job progress notifications in `src/hooks/use-job-realtime.ts`
- [ ] **T066** Customer approval notification system in `src/lib/notifications.ts`
- [ ] **T067** Service completion notifications with email integration

## Phase 3.8: Mercedes-Benz OEM Compliance
- [ ] **T068** Mercedes-Benz VIN validation service using official Developer API in `src/lib/vin-validation.ts`
- [ ] **T069** OEM-compliant service record generation in `src/lib/service-record.ts`
- [ ] **T070** Digital signature component for technicians in `src/components/signature/digital-signature.tsx`
- [ ] **T071** PDF generation for service reports using Appwrite Functions in `src/lib/pdf-generator.ts`
- [ ] **T072** Service record archival and retention compliance in `src/lib/compliance.ts`

## Phase 3.9: State Management & Data Flow
- [ ] **T073** Zustand store for booking management in `src/store/booking-store.ts`
- [ ] **T074** Zustand store for job tracking in `src/store/job-store.ts`
- [ ] **T075** TanStack Query setup for server state caching in `src/lib/query-client.ts`
- [ ] **T076** React Hook Form integration for all forms in `src/hooks/use-form-validation.ts`
- [ ] **T077** Zod schema validation for all entities in `src/lib/validation.ts`

## Phase 3.10: Testing & Polish
- [ ] **T078** [P] Unit tests for booking service in `tests/unit/booking-service.test.ts`
- [ ] **T079** [P] Unit tests for job workflow in `tests/unit/job-workflow.test.ts`
- [ ] **T080** [P] Unit tests for VIN validation in `tests/unit/vin-validation.test.ts`
- [ ] **T081** [P] Unit tests for OEM compliance in `tests/unit/compliance.test.ts`
- [ ] **T082** Performance optimization for dashboard loading (<200ms target)
- [ ] **T083** Accessibility testing with screen readers for all forms
- [ ] **T084** Error boundary implementation in `src/components/error-boundary.tsx`
- [ ] **T085** Loading states and skeleton components in `src/components/ui/loading.tsx`

## Dependencies & Execution Order

### Critical Path Dependencies:
1. **Setup First**: T001-T007 (project foundation)
2. **Types Before Tests**: T008-T016 before T017-T031
3. **Tests Must Fail**: T017-T031 must fail before T036-T049 implementation
4. **Auth Blocks Everything**: T032-T035 required before any protected features
5. **Services Before Endpoints**: T036-T040 before T041-T049
6. **APIs Before UI**: T041-T049 before T050-T062
7. **Core Before Integration**: T036-T062 before T063-T077
8. **Implementation Before Polish**: T036-T077 before T078-T085

### Parallel Execution Groups:

**Group A - Setup (can run together):**
```bash
# T003, T004, T005, T006, T007 - Independent configuration files
Task: "Configure Biome linting in biome.json"
Task: "Setup Appwrite client in src/lib/appwrite.ts"  
Task: "Configure TypeScript strict mode in tsconfig.json"
Task: "Setup Tailwind with Mercedes-Benz tokens in tailwind.config.ts"
Task: "Initialize Shadcn/ui in components.json"
```

**Group B - Type Definitions (can run together):**
```bash
# T008-T016 - Independent interface files
Task: "Customer interfaces in src/types/customer.ts"
Task: "Vehicle interfaces in src/types/vehicle.ts"
Task: "Booking interfaces in src/types/booking.ts"
Task: "Job interfaces in src/types/job.ts"
Task: "API response types in src/types/api.ts"
```

**Group C - Contract Tests (can run together):**
```bash
# T017-T026 - Independent test files
Task: "Contract test GET /api/bookings in tests/contract/booking-list.test.ts"
Task: "Contract test POST /api/bookings in tests/contract/booking-create.test.ts"
Task: "Contract test GET /api/jobs in tests/contract/job-list.test.ts"
Task: "Contract test POST /api/jobs in tests/contract/job-create.test.ts"
```

**Group D - Integration Tests (can run together):**
```bash
# T027-T031 - Independent test scenarios  
Task: "Integration test advisor booking workflow in tests/integration/advisor-booking.test.ts"
Task: "Integration test technician checklist in tests/integration/technician-workflow.test.ts"
Task: "Integration test customer approval in tests/integration/customer-approval.test.ts"
Task: "Integration test service record generation in tests/integration/service-record.test.ts"
```

**Group E - Services (can run together):**
```bash
# T036-T040 - Independent service files
Task: "Customer service in src/lib/services/customer-service.ts"
Task: "Vehicle service in src/lib/services/vehicle-service.ts"
Task: "Booking service in src/lib/services/booking-service.ts"
Task: "Job service in src/lib/services/job-service.ts"
```

**Group F - UI Components (can run together):**
```bash
# T050-T057 - Independent component files
Task: "Booking form component in src/components/booking/booking-form.tsx"
Task: "Customer selector in src/components/customer/customer-select.tsx"
Task: "Job card component in src/components/job/job-card.tsx"
Task: "Checklist component in src/components/checklist/checklist.tsx"
```

## Validation Checklist
*GATE: All items must pass before tasks are considered complete*

- [x] All contracts (booking-api.md, job-api.md) have corresponding test tasks
- [x] All entities (Customer, Vehicle, Booking, User, Job, Checklist, Estimate, ServiceRecord) have type definition tasks
- [x] All tests come before implementation tasks (TDD enforced)
- [x] Parallel tasks [P] are truly independent (different files)
- [x] Each task specifies exact file path in Next.js 15 App Router structure
- [x] No task modifies same file as another [P] task
- [x] Focus on first release features: bookings, job cards, checklists, notifications, invoices
- [x] Mercedes-Benz OEM compliance requirements covered (VIN validation, service records, PDF generation)
- [x] Real-time collaboration features included (Appwrite Realtime integration)
- [x] Authentication and role-based access implemented
- [x] TypeScript strict mode and constitutional compliance maintained

## Notes for Implementation
- **TDD Enforcement**: Contract and integration tests (T017-T031) MUST fail before implementing corresponding features
- **Constitutional Compliance**: All code must pass Biome checks, use TypeScript strict mode, follow Appwrite-centric architecture
- **Mercedes-Benz Standards**: VIN validation, OEM-compliant service records, digital signatures required
- **Performance Targets**: <200ms page loads, <1s real-time update latency
- **Focus Areas**: Prioritize booking creation, job tracking, customer notifications, and invoice generation for first release
- **Multi-agent Friendly**: Each task is specific enough for different AI agents to complete independently

**Total Tasks**: 85 tasks with clear dependencies and 40+ parallel execution opportunities