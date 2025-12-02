'use server'

import { supabase } from '@/lib/supabase'
import { Coach } from '@/types/database'

export async function getCompetitions() {
  try {
    const { data, error } = await supabase
      .from('competitions')
      .select('*')
      .order('event_name', { ascending: false })

    if (error) {
      console.error('Error fetching competitions:', error)
      return []
    }

    return data as Coach[]
  } catch (error) {
    console.error('Unexpected error fetching competitions:', error)
    return []
  }
}
