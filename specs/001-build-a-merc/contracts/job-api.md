# Job API Contract

**Service**: Job Management for Technicians  
**Base URL**: `/api/jobs`  
**Authentication**: Required (Appwrite Session)  
**Roles**: admin, advisor, technician

## Endpoints

### GET /api/jobs
**Purpose**: List jobs with filtering for technician workload
**Roles**: admin, advisor, technician (own assignments only)

**Query Parameters**:
```typescript
interface JobListQuery {
  technicianId?: string;      // Filter by assigned technician
  bookingId?: string;         // Filter by booking
  status?: JobStatus;         // Filter by status
  priority?: JobPriority;     // Filter by priority
  dateFrom?: string;          // ISO date string
  dateTo?: string;            // ISO date string
  checklistId?: string;       // Filter by checklist type
  limit?: number;             // Default: 20, Max: 50
  offset?: number;            // Default: 0
}

type JobStatus = 'pending' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
type JobPriority = 'low' | 'normal' | 'high' | 'critical';
```

**Response**:
```typescript
interface JobListResponse {
  jobs: JobWithDetails[];
  total: number;
  hasMore: boolean;
  workloadSummary?: {
    pending: number;
    inProgress: number;
    estimatedHoursRemaining: number;
  };
}

interface JobWithDetails {
  id: string;
  jobNumber: string;
  title: string;
  description: string;
  status: JobStatus;
  priority: JobPriority;
  booking: {
    id: string;
    bookingNumber: string;
    customer: {
      firstName: string;
      lastName: string;
    };
    vehicle: {
      model: string;
      modelYear: number;
      licensePlate: string;
    };
  };
  assignedTechnician: {
    id: string;
    firstName: string;
    lastName: string;
    specializations: string[];
  };
  checklist: {
    id: string;
    name: string;
    itemCount: number;
    completedItems: number;
  };
  estimatedHours: number;
  actualHours: number | null;
  laborRate: number;
  customerApprovalRequired: boolean;
  customerApproved: boolean | null;
  startTime: string | null;
  endTime: string | null;
  createdAt: string;
  updatedAt: string;
}
```

---

### POST /api/jobs
**Purpose**: Create new job assignment
**Roles**: admin, advisor

**Request Body**:
```typescript
interface CreateJobRequest {
  bookingId: string;
  assignedTechnicianId: string;
  checklistId: string;
  title: string;
  description: string;
  priority?: JobPriority;        // default: 'normal'
  estimatedHours: number;
  laborRate: number;
  parts?: JobPart[];
  customerApprovalRequired?: boolean; // default: false
}

interface JobPart {
  partNumber: string;
  description: string;
  quantity: number;
  unitCost: number;
}
```

**Response**:
```typescript
interface CreateJobResponse {
  job: JobWithDetails;
  message: string;
}
```

---

### GET /api/jobs/:id
**Purpose**: Get detailed job information with checklist progress
**Roles**: admin, advisor, technician (own job only)

**Response**:
```typescript
interface JobDetailResponse {
  job: JobWithDetails;
  checklistProgress: ChecklistProgress;
  timeEntries: TimeEntry[];
  approvalHistory: ApprovalHistory[];
}

interface ChecklistProgress {
  id: string;
  name: string;
  version: string;
  items: ChecklistItem[];
  completionPercentage: number;
  estimatedTimeRemaining: number;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  required: boolean;
  completed: boolean;
  completedAt: string | null;
  completedBy: string | null;
  notes: string | null;
  estimatedMinutes: number;
  actualMinutes: number | null;
  tools: string[];
  parts: string[];
}

interface TimeEntry {
  id: string;
  startTime: string;
  endTime: string | null;
  duration: number | null; // minutes
  description: string;
  technicianId: string;
}

interface ApprovalHistory {
  id: string;
  requestedAt: string;
  respondedAt: string | null;
  approved: boolean | null;
  customerNotes: string | null;
  estimateAmount: number;
}
```

---

### PUT /api/jobs/:id/start
**Purpose**: Start job work (technician clock-in)
**Roles**: technician (assigned only), admin, advisor

**Request Body**:
```typescript
interface StartJobRequest {
  notes?: string; // Initial work notes
}
```

**Response**:
```typescript
interface StartJobResponse {
  job: JobWithDetails;
  timeEntry: TimeEntry;
  message: string;
}
```

**Validation**:
- Job status must be 'pending' or 'on-hold'
- Technician must be assigned to job
- Updates job status to 'in-progress'
- Creates time entry with start time

---

### PUT /api/jobs/:id/pause
**Purpose**: Pause job work (waiting for parts, approval, etc.)
**Roles**: technician (assigned only), admin, advisor

**Request Body**:
```typescript
interface PauseJobRequest {
  reason: 'parts' | 'approval' | 'shift_end' | 'other';
  notes: string;
  estimatedResumeTime?: string; // ISO datetime
}
```

**Response**: JobWithDetails

---

### PUT /api/jobs/:id/resume
**Purpose**: Resume paused job work
**Roles**: technician (assigned only), admin, advisor

**Request Body**:
```typescript
interface ResumeJobRequest {
  notes?: string;
}
```

**Response**: StartJobResponse

---

### PUT /api/jobs/:id/complete
**Purpose**: Complete job work (technician clock-out)
**Roles**: technician (assigned only), admin, advisor

**Request Body**:
```typescript
interface CompleteJobRequest {
  technicianNotes: string;
  actualPartsUsed: JobPart[];
  qualityCheckPassed: boolean;
  customerNotificationRequired?: boolean; // default: true
  nextServiceRecommendation?: {
    type: string;
    description: string;
    recommendedDate: string;
    mileageInterval: number;
  };
}
```

**Response**:
```typescript
interface CompleteJobResponse {
  job: JobWithDetails;
  serviceRecord: ServiceRecordSummary;
  message: string;
  notificationSent: boolean;
}

interface ServiceRecordSummary {
  id: string;
  recordNumber: string;
  serviceDate: string;
  workPerformed: string;
  oemCompliant: boolean;
  pdfGenerated: boolean;
}
```

**Validation**:
- All required checklist items must be completed
- Technician signature (digital) required
- Quality control check must pass
- Automatically generates service record

---

### PUT /api/jobs/:id/checklist/:itemId
**Purpose**: Update checklist item completion
**Roles**: technician (assigned only), admin, advisor

**Request Body**:
```typescript
interface UpdateChecklistItemRequest {
  completed: boolean;
  notes?: string;
  actualMinutes?: number;
  partsUsed?: string[]; // Part numbers used for this item
}
```

**Response**:
```typescript
interface UpdateChecklistResponse {
  checklistItem: ChecklistItem;
  jobProgress: {
    completedItems: number;
    totalItems: number;
    completionPercentage: number;
    estimatedTimeRemaining: number;
  };
}
```

---

### POST /api/jobs/:id/request-approval
**Purpose**: Request customer approval for additional work
**Roles**: technician (assigned only), admin, advisor

**Request Body**:
```typescript
interface RequestApprovalRequest {
  description: string;
  additionalWork: {
    title: string;
    description: string;
    estimatedHours: number;
    parts: JobPart[];
    totalCost: number;
    urgency: 'low' | 'medium' | 'high';
    reasoning: string; // Why additional work is needed
  };
  photos?: string[]; // Appwrite Storage file IDs
  deadline?: string; // ISO datetime for response
}
```

**Response**:
```typescript
interface RequestApprovalResponse {
  approvalRequest: {
    id: string;
    jobId: string;
    description: string;
    totalCost: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    deadline: string | null;
  };
  notificationSent: boolean;
  message: string;
}
```

**Business Logic**:
- Automatically puts job on-hold if approval required
- Sends real-time notification to customer
- Creates estimate record linked to job
- Sets approval deadline (default: 24 hours)

---

## Error Responses

Standard API error format:

```typescript
interface ApiError {
  error: string;
  message: string;
  code: number;
  timestamp: string;
  path: string;
  details?: {
    jobId?: string;
    checklistItemId?: string;
    validationErrors?: string[];
  };
}
```

**Job-Specific Error Codes**:
- 400: Invalid job state transition
- 403: Not assigned to this job
- 404: Job or checklist item not found
- 409: Job already in progress by another technician
- 422: Checklist validation failed

## Real-time Events

Jobs emit real-time events for workflow coordination:

```typescript
// Subscribe to job updates for technician dashboard
client.subscribe('databases.main.collections.jobs.documents', (response) => {
  const eventType = response.events[0];
  const job = response.payload;
  
  // Update technician workload display
  updateTechnicianDashboard(job);
});

// Subscribe to specific job for detailed view
client.subscribe(`databases.main.collections.jobs.documents.${jobId}`, (response) => {
  const job = response.payload;
  updateJobDetails(job);
});
```

**Event Triggers**:
- Job started → Update booking progress, notify service advisor
- Checklist item completed → Update job progress indicator
- Approval requested → Real-time notification to customer
- Job completed → Generate service record, notify customer
- Job paused → Update technician availability, reassignment alerts