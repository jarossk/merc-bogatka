# Data Model: Merc Auto Garage

**Phase**: 1 (Design & Contracts)  
**Date**: 2025-09-06  
**Database**: Appwrite Database (MariaDB) via Coolify deployment

## Entity Definitions

### Customer
**Purpose**: Represents vehicle owners who bring their Mercedes-Benz vehicles for service

**Fields**:
- `id`: string (Appwrite document ID)
- `email`: string (required, unique)
- `firstName`: string (required)
- `lastName`: string (required)
- `phone`: string (required)
- `address`: object
  - `street`: string
  - `city`: string
  - `postalCode`: string
  - `country`: string (default: "Germany")
- `communicationPreferences`: object
  - `email`: boolean (default: true)
  - `sms`: boolean (default: false)
  - `push`: boolean (default: true)
- `createdAt`: datetime (auto)
- `updatedAt`: datetime (auto)

**Relationships**:
- One-to-many with Vehicle
- One-to-many with Booking

**Validation Rules**:
- Email must be valid format
- Phone must be valid German/international format
- GDPR consent required for data storage

**State Transitions**:
- Active → Inactive (after 2 years no service)
- Inactive → Active (new booking created)

---

### Vehicle
**Purpose**: Mercedes-Benz vehicles registered in the system with service history

**Fields**:
- `id`: string (Appwrite document ID)
- `vin`: string (required, unique, 17 characters)
- `customerId`: string (required, foreign key to Customer)
- `make`: string (default: "Mercedes-Benz")
- `model`: string (required, e.g., "C-Class", "E-Class")
- `modelYear`: number (required)
- `engine`: string (e.g., "2.0L Turbo", "3.5L V6")
- `transmission`: string (e.g., "Automatic", "Manual")
- `fuelType`: string (e.g., "Gasoline", "Diesel", "Hybrid", "Electric")
- `mileage`: number (current odometer reading)
- `color`: string
- `licensePlate`: string
- `lastServiceDate`: datetime (nullable)
- `nextServiceDue`: datetime (nullable)
- `warrantyExpiration`: datetime (nullable)
- `createdAt`: datetime (auto)
- `updatedAt`: datetime (auto)

**Relationships**:
- Many-to-one with Customer
- One-to-many with Booking
- One-to-many with ServiceRecord

**Validation Rules**:
- VIN must be valid 17-character format
- VIN must validate against Mercedes-Benz VIN database
- Model year must be reasonable (1990-current+1)
- Mileage must be positive number

---

### Booking
**Purpose**: Service appointments linking customers, vehicles, and requested services

**Fields**:
- `id`: string (Appwrite document ID)
- `bookingNumber`: string (auto-generated, e.g., "MB-2025-001234")
- `customerId`: string (required, foreign key to Customer)
- `vehicleId`: string (required, foreign key to Vehicle)
- `serviceAdvisorId`: string (required, foreign key to User)
- `scheduledDate`: datetime (required)
- `scheduledTime`: time (required)
- `estimatedDuration`: number (minutes)
- `status`: string (enum: "scheduled", "confirmed", "in-progress", "completed", "cancelled")
- `priority`: string (enum: "normal", "high", "emergency")
- `serviceType`: string[] (e.g., ["maintenance", "repair", "inspection"])
- `customerNotes`: string (nullable)
- `internalNotes`: string (nullable)
- `estimatedCost`: number (nullable)
- `actualCost`: number (nullable)
- `createdAt`: datetime (auto)
- `updatedAt`: datetime (auto)

**Relationships**:
- Many-to-one with Customer
- Many-to-one with Vehicle
- Many-to-one with User (service advisor)
- One-to-many with Job
- One-to-many with Estimate

**Validation Rules**:
- Scheduled date/time must be in future
- Service advisor must have "advisor" role
- Status transitions must follow workflow

**State Transitions**:
- scheduled → confirmed (customer confirmation)
- confirmed → in-progress (work started)
- in-progress → completed (all jobs finished)
- Any → cancelled (customer/business decision)

---

### User
**Purpose**: Service center staff (advisors, technicians, admin) with role-based access

**Fields**:
- `id`: string (Appwrite user ID)
- `email`: string (required, unique)
- `firstName`: string (required)
- `lastName`: string (required)
- `role`: string (enum: "admin", "advisor", "technician", "customer")
- `employeeId`: string (nullable, for staff)
- `specializations`: string[] (for technicians, e.g., ["engine", "electrical", "transmission"])
- `isActive`: boolean (default: true)
- `lastLogin`: datetime (nullable)
- `createdAt`: datetime (auto)
- `updatedAt`: datetime (auto)

**Relationships**:
- One-to-many with Booking (as service advisor)
- One-to-many with Job (as assigned technician)

**Validation Rules**:
- Email must be valid format
- Role must be one of allowed values
- Employee ID required for non-customer roles

---

### Job
**Purpose**: Individual work assignments for technicians with status tracking

**Fields**:
- `id`: string (Appwrite document ID)
- `jobNumber`: string (auto-generated, e.g., "JOB-2025-001234")
- `bookingId`: string (required, foreign key to Booking)
- `assignedTechnicianId`: string (required, foreign key to User)
- `checklistId`: string (required, foreign key to Checklist)
- `title`: string (required, e.g., "Engine Oil Change")
- `description`: string (detailed work description)
- `status`: string (enum: "pending", "in-progress", "completed", "on-hold", "cancelled")
- `priority`: string (enum: "low", "normal", "high", "critical")
- `estimatedHours`: number
- `actualHours`: number (nullable)
- `laborRate`: number (per hour)
- `parts`: object[] (parts used)
  - `partNumber`: string
  - `description`: string
  - `quantity`: number
  - `unitCost`: number
- `startTime`: datetime (nullable)
- `endTime`: datetime (nullable)
- `technicianNotes`: string (nullable)
- `customerApprovalRequired`: boolean (for additional work)
- `customerApproved`: boolean (nullable)
- `approvalTimestamp`: datetime (nullable)
- `createdAt`: datetime (auto)
- `updatedAt`: datetime (auto)

**Relationships**:
- Many-to-one with Booking
- Many-to-one with User (technician)
- Many-to-one with Checklist
- One-to-one with ServiceRecord (when completed)

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
**Purpose**: Model-specific service procedures mandated by Mercedes-Benz OEM standards

**Fields**:
- `id`: string (Appwrite document ID)
- `name`: string (required, e.g., "C-Class A-Service Checklist")
- `vehicleModel`: string (required, e.g., "C-Class")
- `serviceType`: string (required, e.g., "A-Service", "B-Service", "Repair")
- `version`: string (required, e.g., "2025.1")
- `isActive`: boolean (default: true)
- `items`: object[] (checklist items)
  - `id`: string (item ID)
  - `title`: string
  - `description`: string
  - `category`: string (e.g., "engine", "brakes", "electrical")
  - `required`: boolean
  - `estimatedMinutes`: number
  - `tools`: string[] (required tools)
  - `parts`: string[] (commonly needed parts)
- `createdAt`: datetime (auto)
- `updatedAt`: datetime (auto)

**Relationships**:
- One-to-many with Job

**Validation Rules**:
- Vehicle model must be valid Mercedes-Benz model
- Version must follow semantic versioning
- At least one checklist item required

---

### Estimate
**Purpose**: Cost calculations for services including labor, parts, and additional work

**Fields**:
- `id`: string (Appwrite document ID)
- `estimateNumber`: string (auto-generated)
- `bookingId`: string (required, foreign key to Booking)
- `createdBy`: string (required, foreign key to User)
- `status`: string (enum: "draft", "pending", "approved", "rejected", "expired")
- `validUntil`: datetime (required)
- `lineItems`: object[]
  - `type`: string (enum: "labor", "parts", "other")
  - `description`: string
  - `quantity`: number
  - `unitCost`: number
  - `totalCost`: number
- `subtotal`: number
- `tax`: number
- `total`: number
- `customerMessage`: string (nullable)
- `approvalDeadline`: datetime (nullable)
- `approvedAt`: datetime (nullable)
- `rejectedAt`: datetime (nullable)
- `rejectionReason`: string (nullable)
- `createdAt`: datetime (auto)
- `updatedAt`: datetime (auto)

**Relationships**:
- Many-to-one with Booking
- Many-to-one with User (creator)

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
**Purpose**: Complete OEM-compliant documentation of performed services

**Fields**:
- `id`: string (Appwrite document ID)
- `recordNumber`: string (auto-generated, e.g., "SR-2025-001234")
- `vehicleId`: string (required, foreign key to Vehicle)
- `bookingId`: string (required, foreign key to Booking)
- `jobId`: string (required, foreign key to Job)
- `serviceDate`: datetime (required)
- `mileageAtService`: number (required)
- `serviceType`: string (required)
- `workPerformed`: string (detailed description)
- `partsUsed`: object[] (parts replacement record)
  - `partNumber`: string
  - `partName`: string
  - `manufacturer`: string
  - `quantity`: number
  - `warrantyPeriod`: string
- `technicianSignature`: string (digital signature)
- `qualityControlCheck`: object
  - `performedBy`: string (technician ID)
  - `checkDate`: datetime
  - `passed`: boolean
  - `notes`: string
- `customerNotified`: boolean
- `warrantyUpdated`: boolean
- `nextServiceRecommendation`: object
  - `type`: string
  - `recommendedDate`: datetime
  - `mileageInterval`: number
- `complianceCertification`: object
  - `oemCompliant`: boolean
  - `standardsVersion`: string
  - `certifiedBy`: string
- `pdfGenerated`: boolean (service report PDF)
- `pdfUrl`: string (nullable, Appwrite Storage URL)
- `createdAt`: datetime (auto)
- `updatedAt`: datetime (auto)

**Relationships**:
- Many-to-one with Vehicle
- Many-to-one with Booking
- One-to-one with Job

**Validation Rules**:
- Service date cannot be in future
- Mileage must be greater than vehicle's last recorded mileage
- Technician signature required for completion
- OEM compliance certification required

---

## Database Schema Summary

**Collections** (Appwrite Database):
1. customers (Customer entities)
2. vehicles (Vehicle entities) 
3. bookings (Booking entities)
4. users (User entities, synced with Appwrite Auth)
5. jobs (Job entities)
6. checklists (Checklist entities)
7. estimates (Estimate entities)
8. service_records (ServiceRecord entities)

**Indexes Required**:
- customers: email (unique)
- vehicles: vin (unique), customerId
- bookings: customerId, vehicleId, status, scheduledDate
- jobs: bookingId, assignedTechnicianId, status
- service_records: vehicleId, serviceDate

**Storage Buckets**:
- service-documents (PDFs, photos, signatures)
- vehicle-photos (customer vehicle images)
- checklist-templates (OEM procedure documents)

This data model supports all functional requirements while maintaining Mercedes-Benz OEM compliance and GDPR data protection standards.