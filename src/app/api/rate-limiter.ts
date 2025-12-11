import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simpan rate limit data (untuk production, gunakan Redis)
const rateLimitStore = new Map<string, { count: number, resetTime: number }>()
const WINDOW_MS = 60 * 60 * 1000 // 1 jam
const MAX_REQUESTS = 100 // 100 requests per jam

export async function rateLimitMiddleware(request: NextRequest) {
  // Dapatkan IP User
  const ip = request.headers.get('x-forwarded-for') ||
             request.headers.get('x-real-ip') ||
             'unknown'

  const currentTime = Date.now()
  const windowStart = currentTime - WINDOW_MS

  // Clean up old entries
  for (const [key, data] of rateLimitStore.entries()) {
    if (data.resetTime < windowStart) {
      rateLimitStore.delete(key)
    }
  }

  const clientData = rateLimitStore.get(ip)

  if (clientData) {
    if (currentTime - clientData.resetTime > WINDOW_MS) {
      // Reset counter jika sudah lewat window
      clientData.count = 1
      clientData.resetTime = currentTime
      rateLimitStore.set(ip, clientData)
    } else if (clientData.count >= MAX_REQUESTS) {
      // Rate limit exceeded
      const resetTime = new Date(clientData.resetTime + WINDOW_MS).toISOString()
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'Rate limit exceeded',
          retryAfter: resetTime
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((clientData.resetTime + WINDOW_MS - currentTime) / 1000)),
            'X-RateLimit-Limit': String(MAX_REQUESTS),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(clientData.resetTime + WINDOW_MS)
          }
        }
      )
    } else {
      // Increment counter
      clientData.count++
      rateLimitStore.set(ip, clientData)
    }
  } else {
    // New client
    rateLimitStore.set(ip, { count: 1, resetTime: currentTime })
  }

  // Set rate limit headers
  const remaining = clientData ? MAX_REQUESTS - clientData.count : MAX_REQUESTS - 1
  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', String(MAX_REQUESTS))
  response.headers.set('X-RateLimit-Remaining', String(remaining))
  response.headers.set('X-RateLimit-Reset', String(
    (rateLimitStore.get(ip)?.resetTime || currentTime) + WINDOW_MS
  ))

  return response
}