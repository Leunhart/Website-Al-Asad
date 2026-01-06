'use server'

import { randomUUID } from 'crypto'
import { supabase } from '../lib/supabase'
import { getSupabaseAdmin } from '../lib/supabase-admin'
import { Coach } from '../types/database'

const COACH_PHOTO_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_COACH_BUCKET || 'coach-photos'
const ALLOWED_COACH_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const MAX_COACH_IMAGE_SIZE = 5 * 1024 * 1024
const extractPathFromPublicUrl = (url: string): string | null => {
  try {
    const u = new URL(url)
    const marker = `/public/${COACH_PHOTO_BUCKET}/`
    const idx = u.pathname.indexOf(marker)
    if (idx === -1) return null
    return u.pathname.slice(idx + marker.length)
  } catch {
    return null
  }
}

export type NewCoachInput = {
  full_name: string
  phone?: string | null
  photo?: string | null
  id_academies?: number | null
}

export type UpdateCoachInput = {
  full_name?: string
  phone?: string | null
  photo?: string | null
  id_academies?: number | null
}

export async function uploadCoachPhoto(
  file: File,
  opts?: { existingPath?: string }
): Promise<{ url: string; path: string } | { error: string }> {
  if (!(file instanceof File)) {
    return { error: 'File is required' }
  }

  if (!ALLOWED_COACH_IMAGE_TYPES.includes(file.type)) {
    return { error: 'Tipe file tidak didukung. Gunakan PNG, JPG, atau WEBP.' }
  }

  if (file.size > MAX_COACH_IMAGE_SIZE) {
    return { error: 'Ukuran file melebihi 5MB setelah kompresi. Kecilkan file dan coba lagi.' }
  }

  const supabaseAdmin = getSupabaseAdmin()
  const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'
  const objectPath = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${randomUUID()}.${extension}`

  const { data, error } = await supabaseAdmin.storage
    .from(COACH_PHOTO_BUCKET)
    .upload(objectPath, file, {
      contentType: file.type,
      upsert: true,
    })

  if (error) {
    console.error('[uploadCoachPhoto] error:', error)
    return { error: 'Gagal mengunggah foto' }
  }

  if (opts?.existingPath) {
    await supabaseAdmin.storage.from(COACH_PHOTO_BUCKET).remove([opts.existingPath]).catch((removeErr) => {
      console.warn('[uploadCoachPhoto] gagal menghapus foto lama:', removeErr)
    })
  }

  const { data: publicData } = supabaseAdmin.storage
    .from(COACH_PHOTO_BUCKET)
    .getPublicUrl(data.path)

  return { url: publicData.publicUrl, path: data.path }
}

export async function getCoaches(): Promise<Coach[]> {
  try {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching coaches:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Unexpected error fetching coaches:', error)
    return []
  }
}

export async function getCoachById(id: number): Promise<Coach | null> {
  try {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .eq('id_coaches', id)
      .single()

    if (error) {
      console.error('[getCoachById] error:', error)
      return null
    }

    return data as Coach
  } catch (error) {
    console.error('[getCoachById] unexpected error:', error)
    return null
  }
}

export async function createCoach(input: NewCoachInput): Promise<Coach | null> {
  try {
    const payload = {
      full_name: input.full_name,
      phone: input.phone ?? null,
      photo: input.photo ?? null,
      id_academies: input.id_academies ?? null,
    }

    const { data, error } = await supabase
      .from('coaches')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[createCoach] error:', error)
      return null
    }

    return data as Coach
  } catch (error) {
    console.error('[createCoach] unexpected error:', error)
    return null
  }
}

export async function updateCoach(
  id: number,
  input: UpdateCoachInput,
): Promise<Coach | null> {
  try {
    const updatePayload: Partial<Coach> = {}

    if (typeof input.full_name !== 'undefined') updatePayload.full_name = input.full_name
    if (typeof input.phone !== 'undefined') updatePayload.phone = input.phone ?? null
    if (typeof input.photo !== 'undefined') updatePayload.photo = input.photo ?? null
    if (typeof input.id_academies !== 'undefined') updatePayload.id_academies = input.id_academies ?? null

    const { data, error } = await supabase
      .from('coaches')
      .update(updatePayload)
      .eq('id_coaches', id)
      .select('*')
      .single()

    if (error) {
      console.error('[updateCoach] error:', error)
      return null
    }

    return data as Coach
  } catch (error) {
    console.error('[updateCoach] unexpected error:', error)
    return null
  }
}

export async function deleteCoach(id: number): Promise<boolean> {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    // Grab existing photo path before deletion
    const { data: existing, error: fetchError } = await supabase
      .from('coaches')
      .select('photo')
      .eq('id_coaches', id)
      .single()

    if (fetchError) {
      console.warn('[deleteCoach] fetch photo warning:', fetchError)
    }

    const { error } = await supabase
      .from('coaches')
      .delete()
      .eq('id_coaches', id)

    if (error) {
      console.error('[deleteCoach] error:', error)
      return false
    }

    if (existing?.photo) {
      const path = extractPathFromPublicUrl(existing.photo)
      if (path) {
        supabaseAdmin.storage.from(COACH_PHOTO_BUCKET).remove([path]).catch((removeErr) => {
          console.warn('[deleteCoach] gagal menghapus foto:', removeErr)
        })
      }
    }

    return true
  } catch (error) {
    console.error('[deleteCoach] unexpected error:', error)
    return false
  }
}
