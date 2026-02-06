/**
 * Mock Database for MSW
 *
 * Uses in-memory storage since MSW service workers don't have localStorage access.
 * This simulates a database for development/testing purposes.
 */

import type { UserRole } from '@/lib/abilities'

export interface MockUser {
  id: string
  email: string
  password: string // In real app, this would be hashed
  name: string
  role: UserRole
  phone?: string
  companyName?: string
  type?: 'BUSINESS' | 'CUSTOMER'
  createdAt: string
}

/**
 * Default test users for each role
 */
const defaultUsers: MockUser[] = [
  {
    id: 'user_admin_001',
    email: 'admin@test.com',
    password: 'password123',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user_manager_001',
    email: 'manager@test.com',
    password: 'password123',
    name: 'Manager User',
    role: 'manager',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user_agent_001',
    email: 'agent@test.com',
    password: 'password123',
    name: 'Agent User',
    role: 'agent',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user_viewer_001',
    email: 'viewer@test.com',
    password: 'password123',
    name: 'Viewer User',
    role: 'viewer',
    createdAt: new Date().toISOString()
  }
]

// In-memory database (works in service worker context)
let usersDb: MockUser[] = [...defaultUsers]

/**
 * Get all users from mock database
 */
export function getUsers(): MockUser[] {
  return usersDb
}

/**
 * Find user by email
 */
export function findUserByEmail(email: string): MockUser | undefined {
  return usersDb.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

/**
 * Find user by ID
 */
export function findUserById(id: string): MockUser | undefined {
  return usersDb.find((u) => u.id === id)
}

/**
 * Create a new user
 */
export function createUser(userData: Omit<MockUser, 'id' | 'createdAt'>): MockUser {
  const newUser: MockUser = {
    ...userData,
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString()
  }

  usersDb.push(newUser)
  return newUser
}

/**
 * Update user
 */
export function updateUser(id: string, updates: Partial<MockUser>): MockUser | null {
  const index = usersDb.findIndex((u) => u.id === id)

  if (index === -1) return null

  usersDb[index] = { ...usersDb[index], ...updates }
  return usersDb[index]
}

/**
 * Delete user
 */
export function deleteUser(id: string): boolean {
  const initialLength = usersDb.length
  usersDb = usersDb.filter((u) => u.id !== id)
  return usersDb.length !== initialLength
}

/**
 * Reset database to default users
 */
export function resetDatabase(): void {
  usersDb = [...defaultUsers]
}
