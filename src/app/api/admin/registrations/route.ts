import { NextResponse } from 'next/server'
import { requireAdmin } from '@/actions/auth'
import { createClient } from '@/lib/supabase-server'
import { Registration } from '@/types/database'

// ADMIN ONLY: list pending registrations
export async function GET() {
  try {
    await requireAdmin()

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[GET /api/admin/registrations] error:', error)
      return NextResponse.json({ ok: false, error: 'Failed to fetch registrations' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data: (data as Registration[]) ?? [] })
  } catch (error) {
    console.error('[GET /api/admin/registrations] unexpected:', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
