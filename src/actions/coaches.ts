'use server'

import { supabase } from '../lib/supabase'
import { Coach } from '../types/database'

export type NewCoachInput = {
  full_name: string
  phone?: string | null
  photo?: string | null
  id_academies?: number | null
}

export type UpdateCoachInput = {
  full_name?: string
  phone?: string | null
  photo?: string | null
  id_academies?: number | null
}

export async function getCoaches(): Promise<Coach[]> {
  try {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching coaches:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error fetching coaches:', error)
    return []
  }
}

export async function getCoachById(id: number): Promise<Coach | null> {
  try {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .eq('id_coaches', id)
      .single()

    if (error) {
      console.error('[getCoachById] error:', error)
      return null
    }

    return data as Coach
  } catch (error) {
    console.error('[getCoachById] unexpected error:', error)
    return null
  }
}

export async function createCoach(input: NewCoachInput): Promise<Coach | null> {
  try {
    const payload = {
      full_name: input.full_name,
      phone: input.phone ?? null,
      photo: input.photo ?? null,
      id_academies: input.id_academies ?? null,
    }

    const { data, error } = await supabase
      .from('coaches')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createCoach] error:', error)
      return null
    }

    return data as Coach
  } catch (error) {
    console.error('[createCoach] unexpected error:', error)
    return null
  }
}

export async function updateCoach(
  id: number,
  input: UpdateCoachInput,
): Promise<Coach | null> {
  try {
    const updatePayload: Partial<Coach> = {}

    if (typeof input.full_name !== 'undefined') updatePayload.full_name = input.full_name
    if (typeof input.phone !== 'undefined') updatePayload.phone = input.phone ?? null
    if (typeof input.photo !== 'undefined') updatePayload.photo = input.photo ?? null
    if (typeof input.id_academies !== 'undefined') updatePayload.id_academies = input.id_academies ?? null

    const { data, error } = await supabase
      .from('coaches')
      .update(updatePayload)
      .eq('id_coaches', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateCoach] error:', error)
      return null
    }

    return data as Coach
  } catch (error) {
    console.error('[updateCoach] unexpected error:', error)
    return null
  }
}

export async function deleteCoach(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('coaches')
      .delete()
      .eq('id_coaches', id)

    if (error) {
      console.error('[deleteCoach] error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteCoach] unexpected error:', error)
    return false
  }
}
