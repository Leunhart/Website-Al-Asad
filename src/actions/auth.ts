'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/admin/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// nambahin required admin + requireaut
//import { cookies } from 'next/headers'

// 1. Get current auth session user (from Supabase Auth)
export async function getCurrentUser() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return null
  return user
}

// 2. Get profile from your "users" table
export async function getCurrentProfile() {
  const user = await getCurrentUser()
  if (!user) return null

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('users')      
    .select('*')
    .eq('email', user.email)
    .single()

  if (error) {
    console.error('[getCurrentProfile] error:', error)
    return null
  }

  return data
}

// 3. Require login
export async function requireAuth() {
  const profile = await getCurrentProfile()

  if (!profile) {
    const err = new Error('UNAUTHORIZED')
    err.name = 'UNAUTHORIZED'
    throw err
  }

  return profile
}

// 4. Require admin role
export async function requireAdmin() {
  const profile = await requireAuth()

  if (profile.role !== 'admin') {
    const err = new Error('FORBIDDEN')
    err.name = 'FORBIDDEN'
    throw err
  }

  return profile
}
