'use server'

import { supabase } from '@/src/lib/supabase'
import type { Academy } from '@/src/types/database'

export type NewAcademyInput = {
  name: string
  phone?: string | null
  email?: string | null
  address?: string | null
  logo?: string | null
}

export type UpdateAcademyInput = {
  name?: string
  phone?: string | null
  email?: string | null
  address?: string | null
  logo?: string | null
}

// READ: all academies (public)
export async function getAcademies(): Promise<Academy[]> {
  try {
    const { data, error } = await supabase
      .from('academies')
      .select('*')
      .order('name', { ascending: false })

    if (error) {
      console.error('[getAcademies] error:', error)
      return []
    }

    return data as Academy[]
  } catch (error) {
    console.error('[getAcademies] unexpected error:', error)
    return []
  }
}

// READ: one academy by id_academies
export async function getAcademyById(id: number): Promise<Academy | null> {
  try {
    const { data, error } = await supabase
      .from('academies')
      .select('*')
      .eq('id_academies', id)
      .single()

    if (error) {
      console.error('[getAcademyById] error:', error)
      return null
    }

    return data as Academy
  } catch (error) {
    console.error('[getAcademyById] unexpected error:', error)
    return null
  }
}

// CREATE
export async function createAcademy(input: NewAcademyInput): Promise<Academy | null> {
  try {
    const payload = {
      name: input.name,
      phone: input.phone ?? null,
      email: input.email ?? null,
      address: input.address ?? null,
      logo: input.logo ?? null,
    }

    const { data, error } = await supabase
      .from('academies')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createAcademy] error:', error)
      return null
    }

    return data as Academy
  } catch (error) {
    console.error('[createAcademy] unexpected error:', error)
    return null
  }
}

// UPDATE
export async function updateAcademy(
  id: number,
  input: UpdateAcademyInput,
): Promise<Academy | null> {
  try {
    const updatePayload: Partial<Academy> = {}

    if (typeof input.name !== 'undefined') updatePayload.name = input.name
    if (typeof input.phone !== 'undefined') updatePayload.phone = input.phone ?? null
    if (typeof input.email !== 'undefined') updatePayload.email = input.email ?? null
    if (typeof input.address !== 'undefined') updatePayload.address = input.address ?? null
    if (typeof input.logo !== 'undefined') updatePayload.logo = input.logo ?? null

    const { data, error } = await supabase
      .from('academies')
      .update(updatePayload)
      .eq('id_academies', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateAcademy] error:', error)
      return null
    }

    return data as Academy
  } catch (error) {
    console.error('[updateAcademy] unexpected error:', error)
    return null
  }
}

// DELETE
export async function deleteAcademy(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('academies')
      .delete()
      .eq('id_academies', id)

    if (error) {
      console.error('[deleteAcademy] error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteAcademy] unexpected error:', error)
    return false
  }
}
