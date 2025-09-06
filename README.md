# Merc Auto Garage 🚗⚙️

**Workshop Management System for Mercedes-Benz Service Centers**

A modern web application built with **Next.js 15** and **Appwrite** that streamlines service operations, reduces paperwork, and ensures OEM-compliant service records for Mercedes-Benz dealerships.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Appwrite](https://img.shields.io/badge/Appwrite-1.7.4-f02e65?logo=appwrite)](https://appwrite.io)

## 🎯 Overview

Merc Auto Garage eliminates paperwork and admin overhead while improving customer transparency through:

- **Service Advisors**: Create bookings, generate estimates, track service progress
- **Technicians**: Follow model-specific checklists, log job progress with digital signatures
- **Customers**: Receive real-time updates, approve additional work online
- **Management**: OEM-compliant service records, automated reporting, audit trails

## ✨ Features

### 🔧 **Workshop Management**
- **Digital Bookings**: Streamlined appointment scheduling with vehicle history
- **Job Tracking**: Real-time progress updates with model-specific Mercedes-Benz checklists
- **Technician Dashboard**: Work assignments, time tracking, parts integration
- **Customer Notifications**: SMS/Email updates, online approval workflow

### 📋 **Mercedes-Benz Compliance**
- **OEM Standards**: Compliant service record generation and archival
- **VIN Validation**: Integration with Mercedes-Benz vehicle database
- **Digital Signatures**: Technician sign-off with audit trails
- **PDF Generation**: Automated service reports and invoices

### 🚀 **Modern Technology**
- **Real-time Collaboration**: Multi-technician coordination with live updates
- **Mobile Responsive**: Tablet-optimized for workshop environments
- **Offline Support**: Progressive Web App capabilities
- **Role-based Access**: Secure multi-tenant architecture

## 🏗️ Architecture

### **Technology Stack**
- **Frontend**: Next.js 15 with TypeScript, Shadcn/ui, Tailwind CSS
- **Backend**: Appwrite 1.7.4 (BaaS) with MariaDB
- **State Management**: Zustand (client) + TanStack Query (server state)
- **Authentication**: Appwrite Auth with role-based access control
- **Real-time**: Appwrite Realtime for live updates
- **Testing**: Vitest + Playwright with TDD methodology
- **Code Quality**: Biome linting and formatting

### **Project Structure**
```
merc-bogatka-garage/
├── src/
│   ├── app/                 # Next.js 15 App Router
│   ├── components/          # Shadcn/ui components
│   ├── lib/                 # Utilities and services
│   ├── types/               # TypeScript definitions
│   └── hooks/               # Custom React hooks
├── tests/
│   ├── unit/                # Vitest unit tests
│   ├── integration/         # Playwright E2E tests
│   └── contract/            # API contract tests
└── specs/
    └── 001-build-a-merc/    # Complete specification docs
```

## 📚 Documentation

This project uses **[Spec Kit](https://github.com/github/spec-kit)** for specification-driven development:

### **📋 Core Documentation**
- [`specs/001-build-a-merc/spec.md`](specs/001-build-a-merc/spec.md) - Complete requirements and user stories
- [`specs/001-build-a-merc/plan.md`](specs/001-build-a-merc/plan.md) - Technical implementation plan  
- [`specs/001-build-a-merc/tasks.md`](specs/001-build-a-merc/tasks.md) - **85 detailed implementation tasks**

### **🔍 Technical Details**
- [`specs/001-build-a-merc/data-model.md`](specs/001-build-a-merc/data-model.md) - Database schemas (8 entities)
- [`specs/001-build-a-merc/contracts/`](specs/001-build-a-merc/contracts/) - API specifications
- [`specs/001-build-a-merc/research.md`](specs/001-build-a-merc/research.md) - Technical decisions
- [`specs/001-build-a-merc/quickstart.md`](specs/001-build-a-merc/quickstart.md) - Integration test scenarios

### **⚙️ Development Guidelines**
- [`CLAUDE.md`](CLAUDE.md) - AI agent development context
- [`memory/constitution.md`](memory/constitution.md) - Project architecture principles

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ with pnpm
- Appwrite 1.7.4 instance (deployed via Coolify)
- Git and SSH access

### **Installation**
```bash
# Clone the repository
git clone git@github.com:jarossk/merc-bogatka.git
cd merc-bogatka

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your Appwrite configuration

# Setup development database
pnpm run db:setup

# Start development server
pnpm run dev
```

### **Development Workflow**
```bash
# Run tests (TDD required)
pnpm run test              # All tests
pnpm run test:unit         # Vitest unit tests
pnpm run test:integration  # Playwright E2E tests

# Code quality
pnpm run biome:check       # Lint and format check
pnpm run biome:fix         # Auto-fix issues
pnpm run type-check        # TypeScript validation

# Build for production
pnpm run build
```

## 📋 Implementation Roadmap

### **Current Status: Planning Complete ✅**
All specifications, architecture, and task breakdown are complete and ready for implementation.

### **Next Steps: Implementation**
The project is organized into **85 detailed tasks** with clear dependencies:

#### **Phase 1: Foundation** (T001-T016)
- [x] Project setup and configuration
- [x] TypeScript interfaces for all entities
- [ ] **Ready to implement**: Start with T001-T007 setup tasks

#### **Phase 2: Backend** (T017-T049) 
- [ ] Contract tests (TDD required)
- [ ] Authentication and API endpoints
- [ ] Database services and validation

#### **Phase 3: Frontend** (T050-T072)
- [ ] UI components and dashboards
- [ ] Real-time features and notifications
- [ ] Mercedes-Benz OEM compliance features

#### **Phase 4: Polish** (T073-T085)
- [ ] State management optimization  
- [ ] Performance and accessibility
- [ ] Production deployment

### **Multi-Agent Development Ready** 🤖
Tasks are designed for parallel execution across different AI agents:
- **40+ parallel tasks** marked with `[P]`
- **Independent file-based work** prevents conflicts
- **Detailed acceptance criteria** for each task

## 👥 User Roles & Access

### **🔧 Service Advisor**
- Create and manage customer bookings
- Generate estimates and invoices
- Monitor technician progress
- Customer communication

### **👨‍🔧 Technician** 
- View assigned jobs and checklists
- Log work progress and time tracking
- Request customer approvals
- Complete digital service records

### **👤 Customer**
- View service status in real-time
- Approve additional work online
- Receive progress notifications
- Access service history

### **👑 Administrator**
- User management and permissions
- Service center configuration
- Compliance reporting
- System monitoring

## 🛡️ Mercedes-Benz Compliance

### **OEM Requirements**
- ✅ VIN validation against Mercedes-Benz database
- ✅ Model-specific service checklists
- ✅ Digital technician signatures
- ✅ Automated PDF service reports
- ✅ 7-year service record retention
- ✅ Audit trail for all modifications

### **Data Protection**
- ✅ GDPR compliance for customer data
- ✅ Role-based access control
- ✅ Encrypted data at rest and in transit
- ✅ Customer consent management

## 🔧 Configuration

### **Environment Variables**
```bash
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_URL=https://your-appwrite-instance.com
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
APPWRITE_API_KEY=your-api-key

# Mercedes-Benz Integration
MB_VIN_API_KEY=your-vin-validation-key
MB_COMPLIANCE_VERSION=2025.1

# Notifications
EMAIL_PROVIDER_KEY=your-email-key
SMS_PROVIDER_KEY=your-sms-key
```

## 📈 Performance Targets

- **Page Load**: <200ms initial load time
- **Real-time Updates**: <1s latency for live notifications  
- **Concurrent Users**: 50-100 per service center
- **Core Web Vitals**: Google Lighthouse score >90
- **Mobile Performance**: Tablet-optimized for workshop use

## 🤝 Contributing

### **Development Process**
1. **Read the specs**: Start with [`specs/001-build-a-merc/`](specs/001-build-a-merc/)
2. **Pick a task**: Choose from [`tasks.md`](specs/001-build-a-merc/tasks.md)
3. **TDD required**: Write tests first (they must fail initially)
4. **Follow constitution**: See [`memory/constitution.md`](memory/constitution.md)
5. **Code quality**: All code must pass Biome checks

### **Git Workflow**
```bash
# Feature development
git checkout -b feature/T001-project-setup
# Implement task T001
git commit -m "T001: Create Next.js project structure"
git push origin feature/T001-project-setup
# Create PR
```

### **Multi-Agent Collaboration**
Different AI agents can work on parallel tasks:
```bash
# Claude Code: Architecture and complex integrations
# GitHub Copilot: API endpoints and forms  
# Jules2: UI components and styling
# Any agent: Independent parallel tasks marked [P]
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Spec Kit](https://github.com/github/spec-kit)** - Specification-driven development workflow
- **[Appwrite](https://appwrite.io)** - Backend-as-a-Service platform
- **[Shadcn/ui](https://ui.shadcn.com)** - Beautiful component library
- **Mercedes-Benz** - OEM compliance standards and requirements

---

**Built with Spec Kit for specification-driven development** 📋  
**Ready for multi-agent implementation** 🤖  
**Mercedes-Benz OEM compliant** ⭐