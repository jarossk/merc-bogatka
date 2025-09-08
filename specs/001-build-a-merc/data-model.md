# Data Model: Merc Auto Garage

**Phase**: 1 (Design & Contracts)  
**Date**: 2025-09-07 (Updated to match actual implementation)  
**Database**: Appwrite Database (MariaDB) via Coolify deployment
**Database ID**: `68bd62a8000016ba6f75`

## Entity Definitions

### Customer
**Collection ID**: `68bd9672003c26009089`
**Purpose**: Represents vehicle owners who bring their Mercedes-Benz vehicles for service

**Fields**:
- `$id`: string (Appwrite document ID, auto-generated)
- `email`: email (required, unique, max 200 chars)
- `firstName`: string (required, max 100 chars)
- `lastName`: string (required, max 100 chars)
- `phone`: string (required, max 20 chars)
- `address`: string (JSON object, max 2000 chars, default: `{}`)
  - Example: `{"street": "Königsallee 123", "city": "Düsseldorf", "postalCode": "40212", "country": "Germany"}`
- `communicationPreferences`: string (JSON object, max 1000 chars, default: `{"email":true,"sms":false,"push":true}`)
- `$createdAt`: datetime (auto-generated)
- `$updatedAt`: datetime (auto-generated)

**Relationships**:
- `owned_vehicles` → Vehicle collection (one-to-many)
- `bookings` → Booking collection (one-to-many)

**Indexes**:
- `email_unique` (unique index on email field)

**Validation Rules**:
- Email must be valid format
- Phone must be valid German/international format  
- GDPR consent required for data storage
- JSON fields must be valid JSON format

**State Transitions**:
- Active → Inactive (after 2 years no service)
- Inactive → Active (new booking created)

---

### Vehicle
**Collection ID**: `68bd969e002c66b609db`
**Purpose**: Mercedes-Benz vehicles registered in the system with service history

**Fields**:
- `$id`: string (Appwrite document ID, auto-generated)
- `vin`: string (required, unique, exactly 17 chars)
- `make`: string (optional, max 50 chars, default: "Mercedes-Benz")
- `model`: string (required, max 50 chars, e.g., "C-Class", "E-Class")
- `modelYear`: integer (required, range: 1990-2026)
- `engine`: string (optional, max 100 chars, e.g., "2.0L Turbo", "3.5L V6")
- `transmission`: string (optional, max 50 chars, e.g., "Automatic", "Manual")
- `fuelType`: string (optional, max 20 chars, e.g., "Gasoline", "Diesel", "Hybrid", "Electric")
- `mileage`: integer (optional, >= 0, current odometer reading)
- `color`: string (optional, max 30 chars)
- `licensePlate`: string (optional, max 20 chars)
- `lastServiceDate`: datetime (optional)
- `nextServiceDue`: datetime (optional)
- `warrantyExpiration`: datetime (optional)
- `$createdAt`: datetime (auto-generated)
- `$updatedAt`: datetime (auto-generated)

**Relationships**:
- `owner` → Customer collection (many-to-one)
- `bookings` → Booking collection (one-to-many)
- `service_records` → ServiceRecord collection (one-to-many)

**Indexes**:
- `vin_unique` (unique index on VIN field)

**Validation Rules**:
- VIN must be valid 17-character format
- VIN must validate against Mercedes-Benz VIN database
- Model year must be reasonable (1990-2026)
- Mileage must be positive number or null

---

### Booking
**Collection ID**: `bookings`
**Purpose**: Service appointments linking customers, vehicles, and requested services

**Fields**:
- `$id`: string (Appwrite document ID, auto-generated)
- `bookingNumber`: string (optional, max 32 chars, auto-generated)
- `scheduledDate`: datetime (required)
- `scheduledTime`: datetime (required)
- `estimatedDuration`: double (optional, in minutes)
- `status`: enum (optional, default: "scheduled")
  - Values: `["scheduled", "confirmed", "in-progress", "completed", "cancelled"]`
- `priority`: enum (optional, default: "normal")
  - Values: `["normal", "high", "emergency"]`
- `serviceType`: string[] (optional, max 32 chars each, e.g., ["maintenance", "repair", "inspection"])
- `customerNotes`: string (optional, max 1000 chars, default: "")
- `internalNotes`: string (optional, max 1000 chars, default: "")
- `estimatedCost`: integer (optional, currency amount)
- `actualCost`: double (optional, currency amount)
- `$createdAt`: datetime (auto-generated)
- `$updatedAt`: datetime (auto-generated)

**Relationships**:
- `customer` → Customer collection (many-to-one)
- `vehicle` → Vehicle collection (many-to-one)
- `service_advisor` → User collection (many-to-one)
- `jobs` → Job collection (one-to-many)
- `estimates` → Estimate collection (one-to-many)

**Indexes**:
- `status_index_new` (index on status field)
- `scheduled_date_index` (index on scheduledDate field)

**Validation Rules**:
- Scheduled date/time must be in future
- Service advisor must have "advisor" role
- Status transitions must follow workflow
- Enum values must match defined constraints

**State Transitions**:
- scheduled → confirmed (customer confirmation)
- confirmed → in-progress (work started)
- in-progress → completed (all jobs finished)
- Any → cancelled (customer/business decision)

---

### User
**Collection ID**: `users`
**Purpose**: Service center staff (advisors, technicians, admin) with role-based access

**Fields**:
- `$id`: string (Appwrite user ID, auto-generated)
- `email`: email (required, unique, email format)
- `firstName`: string (required, max 100 chars)
- `lastName`: string (required, max 100 chars)
- `role`: enum (required)
  - Values: `["admin", "advisor", "technician", "customer"]`
- `employeeId`: string (optional, max 32 chars, for staff)
- `isActive`: boolean (optional, default: true)
- `lastLogin`: datetime (optional)
- `specializations`: string[] (optional, max 32 chars each, for technicians)
- `$createdAt`: datetime (auto-generated)
- `$updatedAt`: datetime (auto-generated)

**Relationships**:
- `assigned_bookings` → Booking collection (one-to-many, as service advisor)
- `assigned_jobs` → Job collection (one-to-many, as technician)
- `created_estimates` → Estimate collection (one-to-many, as creator)

**Validation Rules**:
- Email must be valid format
- Role must be one of allowed values
- Employee ID required for non-customer roles
- Enum values must match defined constraints

---

### Job
**Collection ID**: `jobs`
**Purpose**: Individual work assignments for technicians with status tracking

**Fields**:
- `$id`: string (Appwrite document ID, auto-generated)
- `jobNumber`: string (required, max 32 chars, auto-generated)
- `title`: string (optional, max 200 chars, default: "")
- `description`: string (optional, max 2000 chars, default: "")
- `status`: enum (required)
  - Values: `["pending", "in-progress", "completed", "on-hold", "cancelled"]`
- `priority`: enum (optional)
  - Values: `["low", "normal", "high", "critical"]`
- `estimatedHours`: integer (optional, in hours)
- `actualHours`: integer (optional, in hours)
- `laborRate`: integer (optional, currency per hour)
- `parts`: string (optional, JSON array, max 3000 chars, default: `"[]"`)  
  - Example: `[{"partNumber":"A0001234567","description":"Engine Oil Filter","quantity":1,"unitCost":25.50}]`
- `startTime`: datetime (optional)
- `endTime`: datetime (optional)
- `technicianNotes`: string (optional, max 1000 chars, default: "")
- `customerApprovalRequired`: boolean (optional)
- `customerApproved`: boolean (optional)
- `approvalTimestamp`: datetime (optional)
- `$createdAt`: datetime (auto-generated)
- `$updatedAt`: datetime (auto-generated)

**Relationships**:
- `booking` → Booking collection (many-to-one)
- `assigned_technician` → User collection (many-to-one)
- `checklist` → Checklist collection (many-to-one)
- `service_record` → ServiceRecord collection (one-to-one)

**Validation Rules**:
- Assigned technician must have "technician" role
- Estimated hours must be positive
- Customer approval required for work >€200 beyond estimate

**State Transitions**:
- pending → in-progress (technician starts work)
- in-progress → on-hold (waiting for parts/approval)
- on-hold → in-progress (issue resolved)
- in-progress → completed (work finished)
- Any → cancelled (work not needed)

---

### Checklist
**Collection ID**: `checklists`
**Purpose**: Model-specific service procedures mandated by Mercedes-Benz OEM standards

**Fields**:
- `$id`: string (Appwrite document ID, auto-generated)
- `name`: string (optional, max 200 chars, default: "")
- `vehicleModel`: string (required, max 32 chars)
- `serviceType`: string (required, max 32 chars)
- `version`: string (required, max 32 chars)
- `isActive`: boolean (optional)
- `items`: string[] (optional, max 64 chars each, checklist items as JSON array)
- `$createdAt`: datetime (auto-generated)
- `$updatedAt`: datetime (auto-generated)

**Relationships**:
- `jobs` → Job collection (one-to-many)

**Validation Rules**:
- Vehicle model must be valid Mercedes-Benz model
- Version must follow semantic versioning
- At least one checklist item required

---

### Estimate
**Collection ID**: `estimates`
**Purpose**: Cost calculations for services including labor, parts, and additional work

**Fields**:
- `$id`: string (Appwrite document ID, auto-generated)
- `estimateNumber`: string (optional, max 64 chars, auto-generated)
- `status`: enum (optional, default: "draft")
  - Values: `["draft", "pending", "approved", "rejected", "expired"]`
- `validUntil`: datetime (required)
- `lineItems`: string (optional, JSON array, max 5000 chars, default: `"[]"`)  
  - Example: `[{"type":"labor","description":"Engine Oil Change","quantity":1,"unitCost":50.00,"totalCost":50.00}]`
- `subtotal`: integer (optional, currency)
- `tax`: integer (optional, currency)
- `total`: double (optional, currency)
- `customerMessage`: string (optional, max 254 chars)
- `approvalDeadline`: datetime (optional)
- `approvedAt`: datetime (optional)
- `rejectedAt`: datetime (optional)
- `rejectionReason`: string (optional, max 500 chars, default: "")
- `$createdAt`: datetime (auto-generated)
- `$updatedAt`: datetime (auto-generated)

**Relationships**:
- `booking` → Booking collection (many-to-one)
- `created_by_user` → User collection (many-to-one)

**Validation Rules**:
- Valid until date must be in future
- Line item quantities must be positive
- Total must equal sum of line items plus tax

**State Transitions**:
- draft → pending (sent to customer)
- pending → approved (customer accepts)
- pending → rejected (customer declines)
- pending → expired (deadline passed)

---

### ServiceRecord
**Collection ID**: `service_records`
**Purpose**: Complete OEM-compliant documentation of performed services

**Fields**:
- `$id`: string (Appwrite document ID, auto-generated)
- `recordNumber`: string (required, max 32 chars, auto-generated)
- `serviceDate`: datetime (required)
- `mileageAtService`: integer (required, >= 0)
- `serviceType`: string (required, max 32 chars)
- `workPerformed`: string (optional, max 2000 chars, default: "")
- `partsUsed`: string[] (optional, max 32 chars each, parts as JSON array)
- `technicianSignature`: string (optional, max 500 chars, default: "")
- `qualityControlCheck`: string[] (optional, max 32 chars each, QC data as JSON array)
- `customerNotified`: boolean (optional)
- `warrantyUpdated`: boolean (optional)
- `nextServiceRecommendation`: string[] (optional, max 32 chars each)
- `complianceCertification`: string[] (optional, max 32 chars each, compliance data)
- `pdfGenerated`: boolean (optional)
- `pdfUrl`: string (optional, max 254 chars)
- `$createdAt`: datetime (auto-generated)
- `$updatedAt`: datetime (auto-generated)

**Relationships**:
- `vehicle` → Vehicle collection (many-to-one)
- `booking` → Booking collection (many-to-one)  
- `job` → Job collection (one-to-one)

**Indexes**:
- `service_date_index` (index on serviceDate field)

**Validation Rules**:
- Service date cannot be in future
- Mileage must be greater than vehicle's last recorded mileage
- Technician signature required for completion
- OEM compliance certification required

---

## Database Schema Summary

**Collections** (Appwrite Database `68bd62a8000016ba6f75`):
1. Customer (ID: `68bd9672003c26009089`) - Vehicle owners and service customers
2. Vehicle (ID: `68bd969e002c66b609db`) - Mercedes-Benz vehicles in system  
3. bookings - Service appointments
4. users - Staff (advisors, technicians, admin)
5. jobs - Individual work assignments
6. checklists - OEM service procedures
7. estimates - Cost calculations for services
8. service_records - Complete service documentation

**Implemented Indexes**:
- Customer: `email_unique` (unique index on email)
- Vehicle: `vin_unique` (unique index on VIN)
- Booking: `status_index_new` (index on status), `scheduled_date_index` (index on scheduledDate)
- ServiceRecord: `service_date_index` (index on serviceDate)

**Relationships** (10 bidirectional relationships):
- Customer ↔ Vehicle (owner/owned_vehicles)
- Customer ↔ Booking (customer/bookings)
- Vehicle ↔ Booking (vehicle/bookings)
- Vehicle ↔ ServiceRecord (vehicle/service_records)
- User ↔ Booking (service_advisor/assigned_bookings)
- Booking ↔ Job (booking/jobs)
- Booking ↔ Estimate (booking/estimates)
- User ↔ Job (assigned_technician/assigned_jobs)
- Checklist ↔ Job (checklist/jobs)
- Job ↔ ServiceRecord (job/service_record)
- User ↔ Estimate (created_by_user/created_estimates)

**Storage Buckets**:
- service-documents (PDFs, photos, signatures)
- vehicle-photos (customer vehicle images)
- checklist-templates (OEM procedure documents)

This data model supports all functional requirements while maintaining Mercedes-Benz OEM compliance and GDPR data protection standards.