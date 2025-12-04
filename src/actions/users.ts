'use server'

import { supabase } from '../lib/supabase'
import { User } from '../types/database'

export type NewUserInput = {
  full_name: string
  email: string
  phone?: string | null
  role: string
  id_coaches?: number | null
}

export type UpdateUserInput = {
  full_name?: string
  email?: string
  phone?: string | null
  role?: string
  id_coaches?: number | null
}

export async function getUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching users:', error)
      return []
    }

    return data as User[]
  } catch (error) {
    console.error('Unexpected error fetching users:', error)
    return []
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('unique_id', id)
      .single()

    if (error) {
      console.error('[getUserById] error:', error)
      return null
    }

    return data as User
  } catch (error) {
    console.error('[getUserById] unexpected error:', error)
    return null
  }
}

export async function createUser(input: NewUserInput): Promise<{ success: boolean; error?: string; data?: User }> {
  try {
    const payload = {
      full_name: input.full_name,
      email: input.email,
      phone: input.phone ?? null,
      role: input.role,
      id_coaches: input.id_coaches ?? null,
    }

    const { data, error } = await supabase
      .from('users')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createUser] error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data as User }
  } catch (error) {
    console.error('[createUser] unexpected error:', error)
    return { success: false, error: 'Unexpected error occurred' }
  }
}

export async function updateUser(id: number, input: UpdateUserInput): Promise<{ success: boolean; error?: string; data?: User }> {
  try {
    const updatePayload: Partial<User> = {}

    if (typeof input.full_name !== 'undefined') updatePayload.full_name = input.full_name
    if (typeof input.email !== 'undefined') updatePayload.email = input.email
    if (typeof input.phone !== 'undefined') updatePayload.phone = input.phone ?? null
    if (typeof input.role !== 'undefined') updatePayload.role = input.role
    if (typeof input.id_coaches !== 'undefined') updatePayload.id_coaches = input.id_coaches ?? null

    const { data, error } = await supabase
      .from('users')
      .update(updatePayload)
      .eq('unique_id', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateUser] error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data as User }
  } catch (error) {
    console.error('[updateUser] unexpected error:', error)
    return { success: false, error: 'Unexpected error occurred' }
  }
}

export async function deleteUser(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('unique_id', id)

    if (error) {
      console.error('[deleteUser] error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteUser] unexpected error:', error)
    return false
  }
}

export async function getMonthlyMemberGrowth(): Promise<{month: string, count: number}[]> {
  try {
    // Get data for the last 6 months
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1) // Start from 6 months ago

    const { data, error } = await supabase
      .from('users')
      .select('created_at')
      .gte('created_at', sixMonthsAgo.toISOString())
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[getMonthlyMemberGrowth] error:', error)
      return []
    }

    // Group by month and count
    const monthlyData: { [key: string]: number } = {}

    // Initialize all months with 0
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      monthlyData[monthKey] = 0
    }

    // Count registrations per month
    data?.forEach(user => {
      if (user.created_at) {
        const date = new Date(user.created_at)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (monthlyData[monthKey] !== undefined) {
          monthlyData[monthKey]++
        }
      }
    })

    // Convert to array format
    const result = Object.entries(monthlyData).map(([month, count]) => ({
      month,
      count
    }))

    return result
  } catch (error) {
    console.error('[getMonthlyMemberGrowth] unexpected error:', error)
    return []
  }
}

export async function getMonthlyCoachGrowth(): Promise<{month: string, count: number}[]> {
  try {
    // Get data for the last 6 months
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

    const { data, error } = await supabase
      .from('coaches')
      .select('created_at')
      .gte('created_at', sixMonthsAgo.toISOString())
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[getMonthlyCoachGrowth] error:', error)
      return []
    }

    // Group by month and count
    const monthlyData: { [key: string]: number } = {}

    // Initialize all months with 0
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      monthlyData[monthKey] = 0
    }

    // Count registrations per month
    data?.forEach(coach => {
      if (coach.created_at) {
        const date = new Date(coach.created_at)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (monthlyData[monthKey] !== undefined) {
          monthlyData[monthKey]++
        }
      }
    })

    // Convert to array format
    const result = Object.entries(monthlyData).map(([month, count]) => ({
      month,
      count
    }))

    return result
  } catch (error) {
    console.error('[getMonthlyCoachGrowth] unexpected error:', error)
    return []
  }
}

export async function getMonthlyStudentGrowth(): Promise<{month: string, count: number}[]> {
  try {
    // Get data for the last 6 months - students table doesn't have created_at
    // We'll use a different approach or return empty data for now
    const now = new Date()

    // Initialize all months with 0
    const monthlyData: { [key: string]: number } = {}
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      monthlyData[monthKey] = 0
    }

    // For now, return mock data or we could query registrations table
    // Since students table doesn't have created_at, we'll use registrations as proxy
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

    const { data, error } = await supabase
      .from('registrations')
      .select('created_at')
      .gte('created_at', sixMonthsAgo.toISOString())
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[getMonthlyStudentGrowth] error:', error)
      return []
    }

    // Count registrations per month
    data?.forEach(registration => {
      if (registration.created_at) {
        const date = new Date(registration.created_at)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        if (monthlyData[monthKey] !== undefined) {
          monthlyData[monthKey]++
        }
      }
    })

    // Convert to array format
    const result = Object.entries(monthlyData).map(([month, count]) => ({
      month,
      count
    }))

    return result
  } catch (error) {
    console.error('[getMonthlyStudentGrowth] unexpected error:', error)
    return []
  }
}
