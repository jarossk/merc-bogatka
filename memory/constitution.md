# Merc Auto Garage Constitution

## Core Principles

### I. TypeScript-First Development

All code must be written in TypeScript with strict type checking enabled; No `any` types without explicit justification and comment; Component props, API responses, and database schemas must have explicit type definitions; Type safety is non-negotiable for automotive service data integrity.

### II. Component-Driven Architecture

Every UI feature starts as a reusable component using Shadcn/ui primitives; Components must be self-contained, independently testable, and documented with Storybook; Clear separation between presentation components and business logic containers; Mercedes-Benz brand guidelines must be consistently applied through design tokens.

### III. Test-First Development (NON-NEGOTIABLE)

TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced using Vitest for units, Playwright for integration; All customer-facing workflows (booking, estimates, approvals) require comprehensive test coverage; OEM compliance features must have dedicated test suites.

### IV. Appwrite-Centric Backend

All backend operations must use Appwrite SDK and services; Database operations through Appwrite Database (MariaDB), authentication via Appwrite Auth, file storage via Appwrite Storage; No direct database connections or custom backend services; Appwrite Functions for complex business logic (PDF generation, compliance reporting).

### V. Real-Time User Experience

Customer updates, technician progress, and service advisor notifications must use Appwrite Realtime; State synchronization across multiple technician sessions using TanStack Query; Form handling with React Hook Form for optimal user experience; Progressive enhancement with offline-first considerations for workshop environments.

## Technology Stack Requirements

### Required Dependencies

- **Framework**: Next.js 15 with TypeScript and App Router
- **Backend**: Appwrite 1.7.4 (BaaS) deployed via Coolify with MariaDB
- **UI Library**: Shadcn/ui components with Radix primitives
- **Styling**: Tailwind CSS with Mercedes-Benz design tokens
- **Code Quality**: Biome for linting and formatting (no ESLint/Prettier)
- **Package Manager**: pnpm for dependency management
- **State Management**: Zustand for client state, TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest + React Testing Library + Playwright
- **Data Tables**: TanStack Table for service records and reporting
- **Notifications**: Appwrite Realtime + react-hot-toast for UI feedback

### Security & Compliance Standards

Mercedes-Benz OEM data handling requirements must be followed; Customer PII and vehicle data encrypted at rest and in transit; Role-based access control with minimum privilege principle; Audit logging for all service record modifications; Session timeout and secure authentication flows; GDPR compliance for customer data retention and deletion.

## Development Workflow

### Code Quality Gates

All code must pass Biome checks before commit; TypeScript strict mode with zero errors; Test coverage minimum 80% for business logic; Component accessibility testing required; Performance budgets enforced (Core Web Vitals); Security scanning for dependencies and code.

### Review Process

Feature branches from main with descriptive names; Pull requests require test coverage and documentation updates; Playwright tests must pass in CI/CD; Manual QA for customer-facing workflows; Architecture review for new integrations or major changes.

## Governance

### Constitutional Authority

This constitution supersedes all other development practices and preferences; All implementation decisions must align with these principles; Amendments require documentation, technical justification, and update to affected documentation; No exceptions without explicit architectural review and approval.

### Compliance Verification

All pull requests must verify constitutional compliance; Architecture decisions must reference constitutional principles; Code complexity must be justified against business value; Performance and security standards are non-negotiable; Mercedes-Benz brand and OEM compliance takes precedence over development convenience.

### Runtime Guidance

Use Spec Kit workflow for all feature development; Consult `/specs/001-build-a-merc/` documentation for business requirements; Technical implementation must respect Appwrite service boundaries; Customer data privacy and service compliance are paramount considerations.

**Version**: 1.0.1 | **Ratified**: 2025-09-06 | **Last Amended**: 2025-09-06
