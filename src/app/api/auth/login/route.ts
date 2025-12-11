import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase-server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const supabase = await createClient()

    // Query users table directly instead of Supabase auth
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (userError) {
      console.error('User query error:', userError.message)
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    if (!userData) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Simple password check (in production, use proper hashing)
    if (userData.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (userData.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - admin access required' },
        { status: 403 }
      )
    }

    // Set auth cookie with user ID
    const response = NextResponse.json({
      success: true,
      user: {
        id: userData.unique_id,
        email: userData.email,
        role: userData.role
      }
    })

    response.cookies.set('auth-token', userData.unique_id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    return response

  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}
