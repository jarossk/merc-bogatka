# T050-T057: UI Components Instructions

**Tasks**: T050, T051, T052, T053, T054, T055, T056, T057  
**Phase**: 3.6 User Interface Components  
**Dependencies**: T008-T016 (Types ✅), T032-T035 (Auth ✅), T001-T007 (Setup ✅)  
**All tasks can run in PARALLEL** - different files, no dependencies between them

## Overview
Create 8 reusable UI components using Shadcn/ui primitives for the Mercedes-Benz workshop management system. These components will be used across advisor, technician, and customer interfaces.

---

## T050: Booking Form Component
**File**: `src/components/booking/booking-form.tsx`

### Requirements:
- **Form for creating/editing bookings**
- Use React Hook Form + Zod validation
- Integration with customer and vehicle selectors (T051, T052)
- Service type selection with Mercedes-Benz services
- Date/time scheduling with validation
- Cost estimation display
- Customer notes input

### Component Structure:
```typescript
interface BookingFormProps {
  initialData?: Partial<Booking>;
  onSubmit: (data: BookingFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

interface BookingFormData {
  customerId: string;
  vehicleId: string;
  serviceAdvisorId: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number;
  priority: BookingPriority;
  serviceType: string[];
  customerNotes?: string;
  internalNotes?: string;
}
```

### Key Features:
- Multi-step form: Customer → Vehicle → Service → Schedule → Confirm
- Real-time cost calculation
- Validation for past dates, business hours
- Auto-save draft functionality
- Mercedes-Benz service type presets (A-Service, B-Service, etc.)

---

## T051: Customer Selector Component  
**File**: `src/components/customer/customer-select.tsx`

### Requirements:
- **Searchable customer selection dropdown**
- Create new customer inline option
- Customer details preview
- Recent customers quick access
- Validation and error handling

### Component Structure:
```typescript
interface CustomerSelectProps {
  value?: string;
  onChange: (customerId: string) => void;
  onCreateNew?: () => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}
```

### Key Features:
- Search by name, email, phone
- Display customer info: name, phone, last service
- "Create New Customer" quick action
- Loading states and error handling
- Accessibility compliance

---

## T052: Vehicle Selector Component
**File**: `src/components/vehicle/vehicle-select.tsx`

### Requirements:  
- **Vehicle selection for specific customer**
- VIN display and validation
- Vehicle details preview
- Add new vehicle option
- Mercedes-Benz model information

### Component Structure:
```typescript
interface VehicleSelectProps {
  customerId?: string;
  value?: string;
  onChange: (vehicleId: string) => void;
  onAddNew?: () => void;
  disabled?: boolean;
  required?: boolean;
}
```

### Key Features:
- Filter vehicles by customer
- Display: Model, Year, VIN, Mileage
- Mercedes-Benz model badges
- "Add Vehicle" inline action
- VIN validation status indicator

---

## T053: Job Card Component
**File**: `src/components/job/job-card.tsx`

### Requirements:
- **Display job information as card**
- Status indicators and progress
- Technician assignment
- Time tracking display
- Action buttons based on role

### Component Structure:
```typescript
interface JobCardProps {
  job: Job;
  onStatusChange?: (status: JobStatus) => void;
  onAssignTechnician?: (technicianId: string) => void;
  showActions?: boolean;
  compact?: boolean;
  userRole?: UserRole;
}
```

### Key Features:
- Status badges with color coding
- Progress bar for checklist completion
- Estimated vs actual time display
- Priority indicators
- Customer and vehicle info
- Action menu (Start, Pause, Complete)

---

## T054: Checklist Component  
**File**: `src/components/checklist/checklist.tsx`

### Requirements:
- **Interactive service checklist**
- Progress tracking
- Item completion with notes
- Photo attachment support
- Mercedes-Benz OEM compliance

### Component Structure:
```typescript
interface ChecklistProps {
  checklist: Checklist;
  jobId: string;
  onItemComplete: (itemId: string, notes?: string, photos?: File[]) => void;
  onItemUpdate: (itemId: string, data: Partial<ChecklistItem>) => void;
  readOnly?: boolean;
  showProgress?: boolean;
}
```

### Key Features:
- Categorized checklist items
- Completion status indicators
- Notes and photos for each item
- Required vs optional items
- Progress percentage
- Digital signature capture

---

## T055: Estimate Form Component
**File**: `src/components/estimate/estimate-form.tsx`

### Requirements:
- **Cost estimation form**
- Parts and labor breakdown
- Customer approval workflow
- PDF preview generation
- Multi-currency support (EUR)

### Component Structure:
```typescript
interface EstimateFormProps {
  jobId: string;
  initialData?: Partial<Estimate>;
  onSubmit: (estimate: EstimateData) => Promise<void>;
  onSendToCustomer: (estimateId: string) => Promise<void>;
  readOnly?: boolean;
}
```

### Key Features:
- Dynamic parts addition/removal
- Labor hour calculator
- Tax calculations (VAT)
- Customer approval status
- PDF export button
- Version history

---

## T056: Status Badge Component
**File**: `src/components/ui/status-badge.tsx`

### Requirements:
- **Reusable status indicator**
- Multiple status types support
- Color coding system
- Icon integration
- Accessibility features

### Component Structure:
```typescript
interface StatusBadgeProps {
  status: BookingStatus | JobStatus | 'approved' | 'pending' | 'rejected';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}
```

### Key Features:
- Predefined color schemes
- Status-appropriate icons
- Different sizes
- Hover tooltips with details
- Screen reader support

---

## T057: Real-time Notification Component
**File**: `src/components/notifications/notification-toast.tsx`

### Requirements:
- **Toast notification system**
- Multiple notification types
- Auto-dismiss functionality
- Action buttons support
- Sound/vibration options

### Component Structure:
```typescript
interface NotificationToastProps {
  notification: {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    actions?: NotificationAction[];
    duration?: number;
  };
  onDismiss: (id: string) => void;
  onAction: (actionId: string) => void;
}
```

### Key Features:
- Sliding animations
- Progress bar for auto-dismiss
- Action buttons (Approve, View, Dismiss)
- Priority levels
- Notification grouping

---

## Common Requirements (All Components)

### Styling & Design:
- **Mercedes-Benz Design System**: Use existing Tailwind config with brand colors
- **Shadcn/ui Components**: Build on Button, Input, Card, Dialog primitives
- **Responsive Design**: Mobile-first approach, works on tablets in workshop
- **Dark Mode Support**: Respect system theme preferences
- **Loading States**: Skeleton components and spinners

### TypeScript:
- **Strict Mode**: No `any` types, proper type definitions
- **Props Interface**: Export all prop interfaces for reusability
- **Generic Support**: Where applicable (StatusBadge, etc.)

### Accessibility:
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Tab order and keyboard shortcuts  
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliance

### Performance:
- **Lazy Loading**: Use React.lazy for heavy components
- **Memoization**: React.memo for components that re-render frequently
- **Bundle Size**: Tree-shakeable exports

## File Structure Template:

```typescript
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
// ... other shadcn imports

interface ComponentNameProps {
  // Props here
}

/**
 * Component description for Mercedes-Benz workshop system
 * @param props - Component props
 * @returns JSX Element
 */
export function ComponentName(props: ComponentNameProps) {
  // Component implementation
  
  return (
    <Card className="p-4">
      {/* Component JSX */}
    </Card>
  );
}

// Export props interface for reusability
export type { ComponentNameProps };
```

## Testing Requirements:
- **Unit Tests**: Create basic render tests for each component
- **Props Testing**: Test all prop variations
- **User Interactions**: Test form submissions, clicks, etc.
- **Accessibility Testing**: Screen reader compatibility

## Success Criteria:
1. All 8 component files created and properly structured
2. TypeScript interfaces exported and documented
3. Shadcn/ui integration working correctly
4. Responsive design implemented
5. Basic functionality working (forms submit, selections work, etc.)
6. Components follow Mercedes-Benz design patterns
7. Accessibility standards met
8. No TypeScript errors or warnings

## Notes:
- Focus on **functionality over aesthetics** - we can polish styling later
- Use **placeholder data** where needed - services will be implemented separately
- **Mock API calls** with console.log for now
- Components should be **self-contained** and reusable
- Follow existing **code patterns** from login page and auth components