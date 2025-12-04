'use server'

import { supabase } from '../lib/supabase'
import { Competition } from '../types/database'

export type NewCompetitionInput = {
  event_name: string
  organizer?: string | null
  location?: string | null
  start_date?: string | null
  end_date?: string | null
  id_academies?: number | null
}

export type UpdateCompetitionInput = {
  event_name?: string
  organizer?: string | null
  location?: string | null
  start_date?: string | null
  end_date?: string | null
  id_academies?: number | null
}

export async function getCompetitions(): Promise<Competition[]> {
  try {
    const { data, error } = await supabase
      .from('competitions')
      .select('*')
      .order('event_name', { ascending: false })

    if (error) {
      console.error('Error fetching competitions:', error)
      return []
    }

    return data as Competition[]
  } catch (error) {
    console.error('Unexpected error fetching competitions:', error)
    return []
  }
}

export async function getCompetitionById(id: number): Promise<Competition | null> {
  try {
    const { data, error } = await supabase
      .from('competitions')
      .select('*')
      .eq('id_competitions', id)
      .single()

    if (error) {
      console.error('[getCompetitionById] error:', error)
      return null
    }

    return data as Competition
  } catch (error) {
    console.error('[getCompetitionById] unexpected error:', error)
    return null
  }
}

export async function createCompetition(
  input: NewCompetitionInput,
): Promise<Competition | null> {
  try {
    const payload = {
      event_name: input.event_name,
      organizer: input.organizer ?? null,
      location: input.location ?? null,
      start_date: input.start_date ?? null,
      end_date: input.end_date ?? null,
      id_academies: input.id_academies ?? null,
    }

    const { data, error } = await supabase
      .from('competitions')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createCompetition] error:', error)
      return null
    }

    return data as Competition
  } catch (error) {
    console.error('[createCompetition] unexpected error:', error)
    return null
  }
}

export async function updateCompetition(
  id: number,
  input: UpdateCompetitionInput,
): Promise<Competition | null> {
  try {
    const updatePayload: Partial<Competition> = {}

    if (typeof input.event_name !== 'undefined') updatePayload.event_name = input.event_name
    if (typeof input.organizer !== 'undefined') updatePayload.organizer = input.organizer ?? null
    if (typeof input.location !== 'undefined') updatePayload.location = input.location ?? null
    if (typeof input.start_date !== 'undefined') updatePayload.start_date = input.start_date ?? null
    if (typeof input.end_date !== 'undefined') updatePayload.end_date = input.end_date ?? null
    if (typeof input.id_academies !== 'undefined') updatePayload.id_academies = input.id_academies ?? null

    const { data, error } = await supabase
      .from('competitions')
      .update(updatePayload)
      .eq('id_competitions', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateCompetition] error:', error)
      return null
    }

    return data as Competition
  } catch (error) {
    console.error('[updateCompetition] unexpected error:', error)
    return null
  }
}

export async function deleteCompetition(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('competitions')
      .delete()
      .eq('id_competitions', id)

    if (error) {
      console.error('[deleteCompetition] error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteCompetition] unexpected error:', error)
    return false
  }
}
