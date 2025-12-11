import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/src/lib/supabase-server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const pathname = request.nextUrl.pathname

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    try {
      const supabase = await createClient()

      // Query users table directly instead of Supabase auth
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('unique_id', token)
        .single()

      if (userError || !userData) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }

      // Check admin role
      if (userData.role !== 'admin') {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }

    } catch (err) {
      console.error('Middleware error:', err)
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Protect auth routes if already logged in
  if (pathname.startsWith('/auth/login')) {
    const token = request.cookies.get('auth-token')?.value
    if (token) {
      try {
        const supabase = await createClient()

        // Query users table directly instead of Supabase auth
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('unique_id', token)
          .single()

        if (userData?.role === 'admin') {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }

      } catch (err) {
        console.error('Auth check error:', err)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/auth/login'],
}
