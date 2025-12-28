import 'server-only'

import { NextResponse } from 'next/server'
import { requireAdmin } from '@/src/actions/auth'
import { createClient } from '@/src/lib/supabase-server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ studentId: string }> },
) {
  try {
    await requireAdmin()

    const { studentId } = await params
    const parsedId = Number(studentId)

    if (!Number.isInteger(parsedId)) {
      return NextResponse.json({ ok: false, error: 'Invalid studentId' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('v_student_rapot_sheets')
      .select('*')
      .eq('student_id', parsedId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('[GET /api/rapot/:studentId/history] error:', error)
      return NextResponse.json({ ok: false, error: 'Failed to fetch history' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data: data ?? [] })
  } catch (error) {
    console.error('[GET /api/rapot/:studentId/history] unexpected:', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
