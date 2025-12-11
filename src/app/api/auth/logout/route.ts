import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase-server'

export async function POST() {
  try {
    const supabase = await createClient()

    // Clear auth cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful'
    })
    response.cookies.delete('auth-token')

    return response

  } catch (err) {
    console.error('Logout error:', err)
    const response = NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    )
    response.cookies.delete('auth-token')
    return response
  }
}
