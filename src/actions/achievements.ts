'use server'

import { supabase } from '../lib/supabase'
import { Achievement } from '../types/database'

export type NewAchievementInput = {
  event_name: string
  date?: string | null
  athlete_name?: string | null
  photos?: string | null
  id_academies?: number | null
}

export type UpdateAchievementInput = {
  event_name?: string
  date?: string | null
  athlete_name?: string | null
  photos?: string | null
  id_academies?: number | null
}

export async function getAchievements() {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching achievements:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error fetching achievements:', error)
    return []
  }
}

export async function getAchievementById(id: number): Promise<Achievement | null> {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('id_achievements', id)
      .single()

    if (error) {
      console.error('[getAchievementById] error:', error)
      return null
    }

    return data as Achievement
  } catch (error) {
    console.error('[getAchievementById] unexpected error:', error)
    return null
  }
}

export async function createAchievement(
  input: NewAchievementInput,
): Promise<Achievement | null> {
  try {
    const payload = {
      event_name: input.event_name,
      date: input.date ?? null,
      athlete_name: input.athlete_name ?? null,
      photos: input.photos ?? null,
      id_academies: input.id_academies ?? null,
    }

    const { data, error } = await supabase
      .from('achievements')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createAchievement] error:', error)
      return null
    }

    return data as Achievement
  } catch (error) {
    console.error('[createAchievement] unexpected error:', error)
    return null
  }
}

export async function updateAchievement(
  id: number,
  input: UpdateAchievementInput,
): Promise<Achievement | null> {
  try {
    const updatePayload: Partial<Achievement> = {}

    if (typeof input.event_name !== 'undefined') updatePayload.event_name = input.event_name
    if (typeof input.date !== 'undefined') updatePayload.date = input.date ?? null
    if (typeof input.athlete_name !== 'undefined') updatePayload.athlete_name = input.athlete_name ?? null
    if (typeof input.photos !== 'undefined') updatePayload.photos = input.photos ?? null
    if (typeof input.id_academies !== 'undefined') updatePayload.id_academies = input.id_academies ?? null

    const { data, error } = await supabase
      .from('achievements')
      .update(updatePayload)
      .eq('id_achievements', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateAchievement] error:', error)
      return null
    }

    return data as Achievement
  } catch (error) {
    console.error('[updateAchievement] unexpected error:', error)
    return null
  }
}

export async function deleteAchievement(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id_achievements', id)

    if (error) {
      console.error('[deleteAchievement] error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteAchievement] unexpected error:', error)
    return false
  }
}
