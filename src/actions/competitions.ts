'use server'

import { supabase } from '@/lib/supabase'
import { Competition } from '@/types/database'

export async function getCompetitions() {
  try {
    const { data, error } = await supabase
      .from('competitions')
      .select('*')
      .order('start_date', { ascending: false })

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
