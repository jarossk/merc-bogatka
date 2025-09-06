# Booking API Contract

**Service**: Booking Management  
**Base URL**: `/api/bookings`  
**Authentication**: Required (Appwrite Session)  
**Roles**: admin, advisor, customer (limited)

## Endpoints

### GET /api/bookings
**Purpose**: List bookings with filtering and pagination
**Roles**: admin, advisor, customer (own bookings only)

**Query Parameters**:
```typescript
interface BookingListQuery {
  customerId?: string;      // Filter by customer
  vehicleId?: string;       // Filter by vehicle  
  status?: BookingStatus;   // Filter by status
  dateFrom?: string;        // ISO date string
  dateTo?: string;          // ISO date string
  limit?: number;           // Default: 20, Max: 100
  offset?: number;          // Default: 0
}
```

**Response**:
```typescript
interface BookingListResponse {
  bookings: BookingWithRelations[];
  total: number;
  hasMore: boolean;
}

interface BookingWithRelations {
  id: string;
  bookingNumber: string;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  vehicle: {
    id: string;
    vin: string;
    model: string;
    modelYear: number;
    licensePlate: string;
  };
  serviceAdvisor: {
    id: string;
    firstName: string;
    lastName: string;
  };
  scheduledDate: string;     // ISO datetime
  scheduledTime: string;     // HH:MM format
  estimatedDuration: number; // minutes
  status: BookingStatus;
  priority: BookingPriority;
  serviceType: string[];
  estimatedCost: number | null;
  actualCost: number | null;
  createdAt: string;
  updatedAt: string;
}

type BookingStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
type BookingPriority = 'normal' | 'high' | 'emergency';
```

---

### POST /api/bookings
**Purpose**: Create new booking
**Roles**: admin, advisor

**Request Body**:
```typescript
interface CreateBookingRequest {
  customerId: string;
  vehicleId: string;
  serviceAdvisorId: string;
  scheduledDate: string;        // ISO date
  scheduledTime: string;        // HH:MM
  estimatedDuration: number;    // minutes
  priority?: BookingPriority;   // default: 'normal'
  serviceType: string[];
  customerNotes?: string;
  internalNotes?: string;
  estimatedCost?: number;
}
```

**Response**:
```typescript
interface CreateBookingResponse {
  booking: BookingWithRelations;
  message: string;
}
```

**Validation**:
- customerId must exist
- vehicleId must exist and belong to customer
- serviceAdvisorId must exist with 'advisor' role
- scheduledDate/time must be in future
- estimatedDuration must be > 0
- serviceType must not be empty

---

### GET /api/bookings/:id
**Purpose**: Get booking details with jobs and estimates
**Roles**: admin, advisor, customer (own booking only)

**Response**:
```typescript
interface BookingDetailResponse {
  booking: BookingWithRelations;
  jobs: JobSummary[];
  estimates: EstimateSummary[];
  serviceRecords: ServiceRecordSummary[];
}

interface JobSummary {
  id: string;
  jobNumber: string;
  title: string;
  status: JobStatus;
  assignedTechnician: {
    id: string;
    firstName: string;
    lastName: string;
  };
  estimatedHours: number;
  actualHours: number | null;
  customerApprovalRequired: boolean;
  customerApproved: boolean | null;
}

interface EstimateSummary {
  id: string;
  estimateNumber: string;
  status: EstimateStatus;
  total: number;
  validUntil: string;
  createdAt: string;
}
```

---

### PUT /api/bookings/:id
**Purpose**: Update booking details
**Roles**: admin, advisor

**Request Body**: Partial<CreateBookingRequest> with optional fields

**Response**: BookingDetailResponse

---

### PUT /api/bookings/:id/status
**Purpose**: Update booking status (with workflow validation)
**Roles**: admin, advisor, technician (limited transitions)

**Request Body**:
```typescript
interface UpdateBookingStatusRequest {
  status: BookingStatus;
  reason?: string;  // Required for cancellation
  notifyCustomer?: boolean; // default: true
}
```

**Response**:
```typescript
interface UpdateStatusResponse {
  booking: BookingWithRelations;
  message: string;
  notificationSent: boolean;
}
```

**Workflow Validation**:
- scheduled → confirmed: Any advisor/admin
- confirmed → in-progress: Assigned technician/advisor/admin
- in-progress → completed: All jobs must be completed
- Any → cancelled: Reason required

---

### DELETE /api/bookings/:id
**Purpose**: Cancel booking (soft delete, status change)
**Roles**: admin, advisor

**Request Body**:
```typescript
interface CancelBookingRequest {
  reason: string;
  notifyCustomer?: boolean;
  refundAmount?: number;
}
```

**Response**: UpdateStatusResponse

---

## Error Responses

All endpoints return errors in standard format:

```typescript
interface ApiError {
  error: string;
  message: string;
  code: number;
  timestamp: string;
  path: string;
  details?: Record<string, any>;
}
```

**Common Error Codes**:
- 400: Validation error
- 401: Authentication required
- 403: Insufficient permissions
- 404: Booking not found
- 409: Booking conflict (scheduling)
- 500: Internal server error

## Real-time Events

Bookings emit real-time events via Appwrite Realtime:

```typescript
// Subscribe to booking updates
client.subscribe('databases.main.collections.bookings.documents', (response) => {
  const eventType = response.events[0]; // 'databases.main.collections.bookings.documents.*.create'
  const booking = response.payload;
});

// Event types:
// - databases.main.collections.bookings.documents.*.create
// - databases.main.collections.bookings.documents.*.update
// - databases.main.collections.bookings.documents.*.delete
```

**Event Triggers**:
- Booking created → Notify assigned service advisor
- Status changed → Notify customer and relevant staff
- Estimate approved → Start work notification to technician
- Job completed → Update booking progress notification