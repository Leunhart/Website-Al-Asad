import { NextResponse } from 'next/server'
import { requireAdmin } from '@/actions/auth'
import { createClient } from '@/lib/supabase-server'
import { Registration } from '@/types/database'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function POST(_: Request, { params }: RouteContext) {
  try {
    await requireAdmin()

    const { id } = await params
    const registrationId = id

    if (!registrationId || typeof registrationId !== 'string') {
      return NextResponse.json({ ok: false, error: 'Invalid registration id' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('registrations')
      .update({ status: 'ditolak' })
      .eq('id_registrations', registrationId)
      .eq('status', 'pending')
      .select('*')
      .single()

    if (error || !data) {
      console.error('[rejectRegistration] error:', error)
      return NextResponse.json(
        {
          ok: false,
          error: error?.message || 'Registration not found or already processed',
          code: error?.code ?? null,
        },
        { status: error?.code === 'PGRST116' ? 404 : 400 },
      )
    }

    return NextResponse.json({
      ok: true,
      data: data as Registration,
    })
  } catch (error) {
    console.error('[POST /api/admin/registrations/:id/reject] unexpected:', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
