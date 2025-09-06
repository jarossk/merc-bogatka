# Implementation Plan: Merc Auto Garage Workshop Management System

**Branch**: `001-build-a-merc` | **Date**: 2025-09-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-build-a-merc/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Workshop management tool for Mercedes-Benz service centers enabling service advisors to create bookings and estimates, technicians to follow model-specific checklists, and customers to receive updates and approve work online. Built as a modern web application using Next.js 15 with TypeScript, Appwrite BaaS backend, and real-time collaboration features to reduce paperwork and ensure OEM compliance.

## Technical Context
**Language/Version**: TypeScript with Next.js 15 (strict mode enabled)
**Primary Dependencies**: Next.js 15, Appwrite SDK 1.7.4, Shadcn/ui, TanStack Query, Zustand, React Hook Form, Zod
**Storage**: Appwrite Database (MariaDB) via Coolify deployment, Appwrite Storage for files
**Testing**: Vitest + React Testing Library (unit), Playwright (integration), TDD mandatory
**Target Platform**: Web application (Chrome/Firefox/Safari), responsive design for tablets in workshop
**Project Type**: web - Next.js frontend with Appwrite BaaS backend
**Performance Goals**: <200ms page load, Core Web Vitals compliance, real-time updates <1s latency
**Constraints**: Mercedes-Benz OEM compliance, GDPR data handling, offline-capable for workshop environments
**Scale/Scope**: 50-100 concurrent users per service center, 10k+ service records annually, multi-tenant architecture

**Technical Context from Arguments**: Generate a technical implementation plan for the "Merc Auto Garage" app.

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (Next.js web app with Appwrite backend) ✅
- Using framework directly? (Next.js App Router, Appwrite SDK) ✅
- Single data model? (TypeScript interfaces, no DTOs) ✅
- Avoiding patterns? (Direct Appwrite calls, no Repository layer) ✅

**Architecture**:
- Component-driven architecture (Shadcn/ui primitives) ✅
- TypeScript-first with strict typing ✅
- Real-time features via Appwrite Realtime ✅
- Appwrite-centric backend (no custom backend) ✅

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? (TDD mandatory per constitution) ✅
- Git commits show tests before implementation? (Will enforce) ✅
- Order: Contract→Integration→E2E→Unit strictly followed? ✅
- Real dependencies used? (Actual Appwrite instance, not mocks) ✅
- Integration tests for: booking flows, customer approvals, OEM compliance ✅
- FORBIDDEN: Implementation before test, skipping RED phase ✅

**Observability**:
- Structured logging included? (Console + Appwrite logging) ✅
- Frontend logs → backend? (Via Appwrite Functions) ✅
- Error context sufficient? (TypeScript error boundaries) ✅

**Versioning**:
- Version number assigned? (1.0.0 initial release) ✅
- BUILD increments on every change? (Semantic versioning) ✅
- Breaking changes handled? (Migration strategies for data model) ✅

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: Option 1 - Next.js web application with integrated frontend/backend structure

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `/scripts/update-agent-context.sh [claude|gemini|copilot]` for your AI assistant
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
Based on Phase 1 artifacts (data-model.md, contracts/, quickstart.md), the /tasks command will:

1. **Setup Tasks**: Project initialization, dependency installation, Appwrite configuration
2. **Test Tasks [P]**: Contract tests for booking-api.md and job-api.md (parallel execution)
3. **Core Entity Tasks [P]**: TypeScript interfaces for Customer, Vehicle, Booking, User, Job, Checklist, Estimate, ServiceRecord
4. **Component Tasks**: Shadcn/ui components for booking forms, job dashboards, customer status pages
5. **Integration Tasks**: Appwrite SDK integration, real-time subscriptions, authentication flows
6. **Compliance Tasks**: OEM service record generation, PDF export, digital signatures
7. **Polish Tasks [P]**: Unit tests, performance optimization, accessibility testing

**Ordering Strategy**:
1. **TDD Enforcement**: Contract tests → Integration tests → Implementation
2. **Dependency Order**: 
   - Setup → Database schemas → Authentication
   - Data models → API endpoints → UI components
   - Core workflows → Real-time features → Compliance features
3. **Parallel Execution [P]**: Independent components and tests marked for concurrent development

**Task Categories by Feature Area**:
- **Authentication & Authorization**: 8-10 tasks (Appwrite Auth setup, role-based access)
- **Booking Management**: 12-15 tasks (advisor workflow, customer interactions)
- **Job & Checklist System**: 15-18 tasks (technician workflow, OEM compliance)
- **Real-time Features**: 6-8 tasks (Appwrite Realtime, notifications)
- **Mercedes-Benz Integration**: 5-7 tasks (VIN validation, service records, PDF generation)

**Estimated Output**: 45-58 numbered, ordered tasks in tasks.md with clear dependencies and parallel execution opportunities

**Implementation Approach**:
- Each task targets 2-4 hours of focused development work
- Contract tests written first (must fail initially)
- Progressive enhancement: basic functionality → real-time features → compliance
- Continuous integration with Biome linting and TypeScript strict mode

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command) - research.md generated
- [x] Phase 1: Design complete (/plan command) - data-model.md, contracts/, quickstart.md, CLAUDE.md generated  
- [x] Phase 2: Task planning complete (/plan command - describe approach only) - Strategy documented
- [ ] Phase 3: Tasks generated (/tasks command) - Ready for /tasks command
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS - All constitutional requirements met
- [x] Post-Design Constitution Check: PASS - Architecture aligns with principles
- [x] All NEEDS CLARIFICATION resolved - Research phase addressed all unknowns
- [x] Complexity deviations documented - No constitutional violations, no complexity tracking needed

**Artifacts Generated**:
- [x] `/specs/001-build-a-merc/research.md` - Technical decisions and OEM compliance research
- [x] `/specs/001-build-a-merc/data-model.md` - Complete entity definitions for Appwrite Database
- [x] `/specs/001-build-a-merc/contracts/booking-api.md` - Booking management API specification
- [x] `/specs/001-build-a-merc/contracts/job-api.md` - Job and technician workflow API specification  
- [x] `/specs/001-build-a-merc/quickstart.md` - End-to-end integration test scenarios
- [x] `/CLAUDE.md` - Agent context file with technical stack and conventions

**Ready for Next Phase**: ✅ /tasks command can now be executed to generate detailed implementation tasks

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*