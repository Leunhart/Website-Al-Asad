'use server'

import { supabase } from '@/src/lib/supabase'
import { Student } from '@/src/types/database'

export type NewStudentInput = {
  full_name: string
  id_academies: number
  gender?: string | null
  date_of_birth?: string | null
  level?: string | null
  achivements?: string | null
  address?: string | null
  status?: string | null 
}

export type UpdateStudentInput = {
  full_name?: string
  id_academies?: number
  gender?: string | null
  date_of_birth?: string | null
  level?: string | null
  achivements?: string | null
  address?: string | null
  status?: string | null
}

export async function getStudents(
  page?: number,
  pageSize?: number,
  searchTerm?: string,
  academyId?: number | null
): Promise<{ data: Student[], count: number }> {
  try {
    let query = supabase
      .from('students')
      .select('id_students, full_name, status, level, gender, date_of_birth, address', { count: 'exact' })
      .order('full_name', { ascending: true })

    // Apply search filter if provided
    if (searchTerm) {
      query = query.ilike('full_name', `%${searchTerm}%`)
    }

    // Apply academy filter if provided
    if (academyId) {
      query = query.eq('id_academies', academyId)
    }

    // Apply pagination only if page and pageSize are provided
    if (page !== undefined && pageSize !== undefined) {
      const { data, count, error } = await query
        .range((page - 1) * pageSize, page * pageSize - 1)

      if (error) {
        console.error('Error fetching students:', error)
        return { data: [], count: 0 }
      }

      return { data: data as Student[], count: count || 0 }
    } else {
      // If no pagination parameters, fetch all students
      const { data, count, error } = await query

      if (error) {
        console.error('Error fetching students:', error)
        return { data: [], count: 0 }
      }

      return { data: data as Student[], count: count || 0 }
    }
  } catch (error) {
    console.error('Unexpected error fetching students:', error)
    return { data: [], count: 0 }
  }
}

export async function getStudentById(id: number): Promise<Student | null> {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id_students', id)
      .single()

    if (error) {
      console.error('[getStudentById] error:', error)
      return null
    }

    return data as Student
  } catch (error) {
    console.error('[getStudentById] unexpected error:', error)
    return null
  }
}

export async function createStudent(input: NewStudentInput): Promise<Student | null> {
  try {
    // Validate input
    if (!input.full_name || input.full_name.trim() === '') {
      console.error('[createStudent] Validation error: full_name is required')
      return null
    }

    if (!input.id_academies) {
      console.error('[createStudent] Validation error: id_academies is required')
      return null
    }

    // Validate level against database enum
    const validLevels = ['pemula', 'menengah', 'lanjut']
    if (input.level && !validLevels.includes(input.level)) {
      console.error(`[createStudent] Validation error: Invalid level '${input.level}'. Valid levels are: ${validLevels.join(', ')}`)
      return null
    }

    const payload = {
      full_name: input.full_name,
      id_academies: input.id_academies,
      gender: input.gender ?? null,
      date_of_birth: input.date_of_birth ?? null,
      level: input.level ?? null,
      achivements: input.achivements ?? null,
      address: input.address ?? null,
      status: input.status ?? null,
    }

    console.log('[createStudent] Payload:', payload)

    const { data, error } = await supabase
      .from('students')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createStudent] Supabase error:', error)
      console.error('[createStudent] Error message:', error.message)
      console.error('[createStudent] Error code:', error.code)
      console.error('[createStudent] Error details:', error.details)
      console.error('[createStudent] Error hint:', error.hint)
      return null
    }

    if (!data) {
      console.error('[createStudent] No data returned from Supabase')
      return null
    }

    return data as Student
  } catch (error) {
    console.error('[createStudent] Unexpected error:', error)
    if (error instanceof Error) {
      console.error('[createStudent] Error stack:', error.stack)
    }
    return null
  }
}

export async function updateStudent(
  id: number,
  input: UpdateStudentInput,
): Promise<Student | null> {
  try {
    const updatePayload: Partial<Student> = {}

    if (typeof input.full_name !== 'undefined') updatePayload.full_name = input.full_name
    if (typeof input.id_academies !== 'undefined') updatePayload.id_academies = input.id_academies
    if (typeof input.gender !== 'undefined') updatePayload.gender = input.gender ?? null
    if (typeof input.date_of_birth !== 'undefined') updatePayload.date_of_birth = input.date_of_birth ?? null
    if (typeof input.level !== 'undefined') updatePayload.level = input.level ?? null
    if (typeof input.achivements !== 'undefined') updatePayload.achivements = input.achivements ?? null
    if (typeof input.address !== 'undefined') updatePayload.address = input.address ?? null
    if (typeof input.status !== 'undefined') updatePayload.status = input.status ?? null

    const { data, error } = await supabase
      .from('students')
      .update(updatePayload)
      .eq('id_students', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateStudent] error:', error)
      return null
    }

    return data as Student
  } catch (error) {
    console.error('[updateStudent] unexpected error:', error)
    return null
  }
}

export async function deleteStudent(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id_students', id)

    if (error) {
      console.error('[deleteStudent] error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteStudent] unexpected error:', error)
    return false
  }
}
