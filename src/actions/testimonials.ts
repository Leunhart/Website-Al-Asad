'use server'

import { supabase } from '@/lib/supabase'
import { Testimonial } from '@/types/database'

export type NewTestimonialInput = {
  reviewer_name: string
  content: string
  rating?: number | null
  id_academies?: number | null
}

export type UpdateTestimonialInput = {
  reviewer_name?: string
  content?: string
  rating?: number | null
  id_academies?: number | null
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('reviewer_name', { ascending: false })

    if (error) {
      console.error('Error fetching testimonials:', error)
      return []
    }

    return data as Testimonial[]
  } catch (error) {
    console.error('Unexpected error fetching testimonials:', error)
    return []
  }
}

export async function getTestimonialById(id: number): Promise<Testimonial | null> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('unique_id', id)
      .single()

    if (error) {
      console.error('[getTestimonialById] error:', error)
      return null
    }

    return data as Testimonial
  } catch (error) {
    console.error('[getTestimonialById] unexpected error:', error)
    return null
  }
}

export async function createTestimonial(
  input: NewTestimonialInput,
): Promise<Testimonial | null> {
  try {
    const payload = {
      reviewer_name: input.reviewer_name,
      content: input.content,
      rating: typeof input.rating === 'number' ? input.rating : input.rating ?? null,
      id_academies: input.id_academies ?? null,
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createTestimonial] error:', error)
      return null
    }

    return data as Testimonial
  } catch (error) {
    console.error('[createTestimonial] unexpected error:', error)
    return null
  }
}

export async function updateTestimonial(
  id: number,
  input: UpdateTestimonialInput,
): Promise<Testimonial | null> {
  try {
    const updatePayload: Partial<Testimonial> = {}

    if (typeof input.reviewer_name !== 'undefined') updatePayload.reviewer_name = input.reviewer_name
    if (typeof input.content !== 'undefined') updatePayload.content = input.content
    if (typeof input.rating !== 'undefined') updatePayload.rating = input.rating ?? null
    if (typeof input.id_academies !== 'undefined') updatePayload.id_academies = input.id_academies ?? null

    const { data, error } = await supabase
      .from('testimonials')
      .update(updatePayload)
      .eq('unique_id', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateTestimonial] error:', error)
      return null
    }

    return data as Testimonial
  } catch (error) {
    console.error('[updateTestimonial] unexpected error:', error)
    return null
  }
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('unique_id', id)

    if (error) {
      console.error('[deleteTestimonial] error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteTestimonial] unexpected error:', error)
    return false
  }
}
