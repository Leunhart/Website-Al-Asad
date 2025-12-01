'use server'

import { supabase } from '@/lib/supabase'

export async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('unique_id', { ascending: false })

    if (error) {
      console.error('Error fetching testimonials:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error fetching testimonials:', error)
    return []
  }
}
