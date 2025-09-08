import { Client, Account, Databases, Storage, Functions } from 'appwrite'

const client = new Client()

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')

// Initialize Appwrite services
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const functions = new Functions(client)
// Realtime will be initialized per-component as needed
// import { Realtime } from 'appwrite'
// export const realtime = new Realtime(client)

// Database and collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'main'

export const COLLECTIONS = {
  CUSTOMERS: 'customers',
  VEHICLES: 'vehicles',
  BOOKINGS: 'bookings',
  USERS: 'users',
  JOBS: 'jobs',
  CHECKLISTS: 'checklists',
  ESTIMATES: 'estimates',
  SERVICE_RECORDS: 'service_records',
} as const

// Storage bucket IDs
export const BUCKETS = {
  SERVICE_DOCUMENTS: 'service-documents',
  VEHICLE_PHOTOS: 'vehicle-photos',
  CHECKLIST_TEMPLATES: 'checklist-templates',
} as const

export { client }
export default client