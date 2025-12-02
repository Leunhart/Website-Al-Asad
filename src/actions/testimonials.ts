'use server'

import { supabase } from '@/lib/supabase'
import { Coach } from '@/types/database'

export async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('reviewer_name', { ascending: false })

    if (error) {
      console.error('Error fetching testimonials:', error)
      return []
    }

    return data as Coach[]
  } catch (error) {
    console.error('Unexpected error fetching testimonials:', error)
    return []
  }
}
