# Merc Auto Bogatka Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-09-06

## Active Technologies
- **Framework**: Next.js 15 with TypeScript and App Router (001-build-a-merc)
- **Backend**: Appwrite 1.7.4 (BaaS) deployed via Coolify with MariaDB (001-build-a-merc)
- **UI Library**: Shadcn/ui components with Radix primitives (001-build-a-merc)
- **Styling**: Tailwind CSS with Mercedes-Benz design tokens (001-build-a-merc)
- **State Management**: Zustand for client state, TanStack Query for server state (001-build-a-merc)
- **Forms**: React Hook Form with Zod validation (001-build-a-merc)
- **Testing**: Vitest + React Testing Library + Playwright, TDD mandatory (001-build-a-merc)

## Project Structure
```
src/
├── components/     # Shadcn/ui components and custom components
├── pages/         # Next.js App Router pages
├── lib/           # Utility functions and Appwrite client
├── types/         # TypeScript type definitions
└── hooks/         # Custom React hooks

tests/
├── unit/          # Vitest unit tests
├── integration/   # Playwright integration tests
└── fixtures/      # Test data and utilities
```

## Commands
```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm test                   # Run all tests
pnpm test:unit              # Run unit tests with Vitest
pnpm test:integration       # Run Playwright tests

# Code Quality
pnpm biome:check           # Run Biome linter
pnpm biome:fix             # Auto-fix code issues
pnpm type-check            # Run TypeScript compiler
```

## Code Style
**TypeScript-First**: All code must be TypeScript with strict mode. No `any` types without justification.
**Component-Driven**: Use Shadcn/ui primitives. Components must be self-contained and testable.
**Appwrite-Centric**: All backend operations through Appwrite SDK. No custom backend services.
**Test-First**: TDD mandatory. Tests written before implementation (Red-Green-Refactor cycle).

## Recent Changes
- 001-build-a-merc: Added Next.js 15 + Appwrite 1.7.4 + TypeScript stack with Mercedes-Benz OEM compliance requirements

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->