'use server'

import { supabase } from '@/lib/supabase'
import { Coach } from '@/types/database'

export async function getUsers() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('event_name', { ascending: false })

    if (error) {
      console.error('Error fetching users:', error)
      return []
    }

    return data as Coach[]
  } catch (error) {
    console.error('Unexpected error fetching users:', error)
    return []
  }
}
