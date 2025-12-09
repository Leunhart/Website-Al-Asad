'use server'

import { supabase } from '@/lib/supabase'

interface RegistrationData {
  full_name: string
  email: string
  phone: string
  date_of_birth: string
  address: string
  parent_name: string
  parent_phone: string
  experience?: string
  medical_notes?: string
}

export async function registerStudent(data: RegistrationData) {
  try {
    // Validate required fields
    if (!data.full_name || !data.email || !data.phone || !data.date_of_birth || !data.address || !data.parent_name || !data.parent_phone) {
      return { success: false, error: 'Semua field wajib harus diisi' }
    }

    // Insert into registrations table (you may need to create this table)
    const { error } = await supabase
      .from('registrations')
      .insert([
        {
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          date_of_birth: data.date_of_birth,
          address: data.address,
          parent_name: data.parent_name,
          parent_phone: data.parent_phone,
          experience: data.experience || null,
          medical_notes: data.medical_notes || null,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])

    if (error) {
      console.error('Error registering student:', error)
      return { success: false, error: 'Gagal menyimpan data. Silakan coba lagi.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Unexpected error during registration:', error)
    return { success: false, error: 'Terjadi kesalahan sistem' }
  }
}
