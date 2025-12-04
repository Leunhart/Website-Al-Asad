'use server'

import { supabase } from '../lib/supabase'
import { Schedule } from '../types/database'

export type NewScheduleInput = {
  title: string
  day: string
  start_time: string
  end_time: string
  location: string
  coach_name: string
  max_participants: number
  description?: string | null
  id_academies?: number | null
}

export type UpdateScheduleInput = {
  title?: string
  day?: string
  start_time?: string
  end_time?: string
  location?: string
  coach_name?: string
  max_participants?: number
  description?: string | null
  id_academies?: number | null
}

export async function getSchedules(): Promise<Schedule[]> {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .order('day', { ascending: true })

    if (error) {
      console.error('Error fetching schedules:', error)
      return []
    }

    return data as Schedule[]
  } catch (error) {
    console.error('Unexpected error fetching schedules:', error)
    return []
  }
}

export async function getScheduleById(id: number): Promise<Schedule | null> {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('id_schedules', id)
      .single()

    if (error) {
      console.error('[getScheduleById] error:', error)
      return null
    }

    return data as Schedule
  } catch (error) {
    console.error('[getScheduleById] unexpected error:', error)
    return null
  }
}

export async function createSchedule(
  input: NewScheduleInput,
): Promise<Schedule | null> {
  try {
    const payload = {
      title: input.title,
      day: input.day,
      start_time: input.start_time,
      end_time: input.end_time,
      location: input.location,
      coach_name: input.coach_name,
      max_participants: input.max_participants,
      description: input.description ?? null,
      id_academies: input.id_academies ?? null,
    }

    const { data, error } = await supabase
      .from('schedules')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createSchedule] error:', error)
      return null
    }

    return data as Schedule
  } catch (error) {
    console.error('[createSchedule] unexpected error:', error)
    return null
  }
}

export async function updateSchedule(
  id: number,
  input: UpdateScheduleInput,
): Promise<Schedule | null> {
  try {
    const updatePayload: Partial<Schedule> = {}

    if (typeof input.title !== 'undefined') updatePayload.title = input.title
    if (typeof input.day !== 'undefined') updatePayload.day = input.day
    if (typeof input.start_time !== 'undefined') updatePayload.start_time = input.start_time
    if (typeof input.end_time !== 'undefined') updatePayload.end_time = input.end_time
    if (typeof input.location !== 'undefined') updatePayload.location = input.location
    if (typeof input.coach_name !== 'undefined') updatePayload.coach_name = input.coach_name
    if (typeof input.max_participants !== 'undefined') updatePayload.max_participants = input.max_participants
    if (typeof input.description !== 'undefined') updatePayload.description = input.description ?? null
    if (typeof input.id_academies !== 'undefined') updatePayload.id_academies = input.id_academies ?? null

    const { data, error } = await supabase
      .from('schedules')
      .update(updatePayload)
      .eq('id_schedules', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateSchedule] error:', error)
      return null
    }

    return data as Schedule
  } catch (error) {
    console.error('[updateSchedule] unexpected error:', error)
    return null
  }
}

export async function deleteSchedule(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('schedules')
      .delete()
      .eq('id_schedules', id)

    if (error) {
      console.error('[deleteSchedule] error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteSchedule] unexpected error:', error)
    return false
  }
}