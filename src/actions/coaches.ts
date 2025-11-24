'use server'

import { supabase } from '@/lib/supabase'
import { Coach } from '@/types/database'

export async function getCoaches() {
  try {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching coaches:', error)
      return []
    }

    return data as Coach[]
  } catch (error) {
    console.error('Unexpected error fetching coaches:', error)
    return []
  }
}
