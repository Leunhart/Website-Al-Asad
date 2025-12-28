'use server'

import { supabase } from '../lib/supabase'
import { LiveScore } from '../types/database'

export type NewLiveScoreInput = {
  competition_id: number
  athlete_name: string
  score: number
  round: string
  notes?: string | null
}

export type UpdateLiveScoreInput = {
  athlete_name?: string
  score?: number
  round?: string
  notes?: string | null
}

export async function getLiveScores(competitionId: number): Promise<LiveScore[]> {
  try {
    const { data, error } = await supabase
      .from('live_scores')
      .select('*')
      .eq('competition_id', competitionId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching live scores:', error)
      return []
    }

    return data as LiveScore[]
  } catch (error) {
    console.error('Unexpected error fetching live scores:', error)
    return []
  }
}

export async function getLiveScoreById(id: number): Promise<LiveScore | null> {
  try {
    const { data, error } = await supabase
      .from('live_scores')
      .select('*')
      .eq('id_live_scores', id)
      .single()

    if (error) {
      console.error('[getLiveScoreById] error:', error)
      return null
    }

    return data as LiveScore
  } catch (error) {
    console.error('[getLiveScoreById] unexpected error:', error)
    return null
  }
}

export async function createLiveScore(
  input: NewLiveScoreInput,
): Promise<LiveScore | null> {
  try {
    const payload = {
      competition_id: input.competition_id,
      athlete_name: input.athlete_name,
      score: input.score,
      round: input.round,
      notes: input.notes ?? null,
    }

    const { data, error } = await supabase
      .from('live_scores')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createLiveScore] error:', error)
      return null
    }

    return data as LiveScore
  } catch (error) {
    console.error('[createLiveScore] unexpected error:', error)
    return null
  }
}

export async function updateLiveScore(
  id: number,
  input: UpdateLiveScoreInput,
): Promise<LiveScore | null> {
  try {
    const updatePayload: Partial<LiveScore> = {}

    if (typeof input.athlete_name !== 'undefined') updatePayload.athlete_name = input.athlete_name
    if (typeof input.score !== 'undefined') updatePayload.score = input.score
    if (typeof input.round !== 'undefined') updatePayload.round = input.round
    if (typeof input.notes !== 'undefined') updatePayload.notes = input.notes ?? null

    const { data, error } = await supabase
      .from('live_scores')
      .update(updatePayload)
      .eq('id_live_scores', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateLiveScore] error:', error)
      return null
    }

    return data as LiveScore
  } catch (error) {
    console.error('[updateLiveScore] unexpected error:', error)
    return null
  }
}

export async function deleteLiveScore(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('live_scores')
      .delete()
      .eq('id_live_scores', id)

    if (error) {
      console.error('[deleteLiveScore] error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteLiveScore] unexpected error:', error)
    return false
  }
}