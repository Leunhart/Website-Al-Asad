'use server'

import { supabase } from '@/lib/supabase'
import { Student } from '@/types/database'

export type NewStudentInput = {
  full_name: string
  id_academies: number
  gender?: string | null
  date_of_birth?: string | null
  level?: string | null
  achivements?: string | null
  address?: string | null
  status?: string | null // expected: active | inactive
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

export async function getStudents(): Promise<Student[]> {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('full_name', { ascending: true })

    if (error) {
      console.error('Error fetching students:', error)
      return []
    }

    return data as Student[]
  } catch (error) {
    console.error('Unexpected error fetching students:', error)
    return []
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

    const { data, error } = await supabase
      .from('students')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createStudent] error:', error)
      return null
    }

    return data as Student
  } catch (error) {
    console.error('[createStudent] unexpected error:', error)
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
