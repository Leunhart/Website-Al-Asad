import 'server-only'

import { NextResponse } from 'next/server'
import { requireAdmin } from '@/src/actions/auth'
import { createClient } from '@/src/lib/supabase-server'

type RouteContext = {
  params: Promise<{
    studentId: string
  }>
}

export async function GET(_request: Request, { params }: RouteContext) {
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
      .select('created_at,total_score_resolved')
      .eq('student_id', parsedId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[GET /api/rapot/:studentId/graph] error:', error)
      return NextResponse.json({ ok: false, error: 'Failed to fetch graph data' }, { status: 500 })
    }

    const series = (data ?? []).map((row) => ({
      d: row.created_at ? new Date(row.created_at).toISOString().slice(0, 10) : null,
      total_score: row.total_score_resolved ?? 0,
    }))

    return NextResponse.json({ ok: true, data: series })
  } catch (error) {
    console.error('[GET /api/rapot/:studentId/graph] unexpected:', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
