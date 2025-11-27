'use server'

import { supabase } from '@/lib/supabase'
import { Achievement } from '@/types/database'

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

    return data as Achievement[]
  } catch (error) {
    console.error('Unexpected error fetching achievements:', error)
    return []
  }
}
