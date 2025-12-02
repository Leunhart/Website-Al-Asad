'use server'

import { supabase } from '@/lib/supabase'
import { Coach } from '@/types/database'

export async function getAcademies() {
  try {
    const { data, error } = await supabase
      .from('academies')
      .select('*')
      .order('name', { ascending: false })

    if (error) {
      console.error('Error fetching academies:', error)
      return []
    }

    return data as Coach[]
  } catch (error) {
    console.error('Unexpected error fetching academies:', error)
    return []
  }
}
