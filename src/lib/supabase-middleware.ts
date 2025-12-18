import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // 1. Update the request cookies so Server Components get the new session
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          
          // 2. Create a new response with the updated request cookies
          supabaseResponse = NextResponse.next({
            request,
          })
          
          // 3. Set the cookies on the response for the browser
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: You must call getUser to refresh the auth token
  await supabase.auth.getUser()

  return supabaseResponse
}