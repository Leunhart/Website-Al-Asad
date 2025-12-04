import { NextResponse } from 'next/server'
import { requireAdmin } from '@/src/actions/auth'
import {
  getCompetitions,
  createCompetition,
  NewCompetitionInput,
} from '@/src/actions/competitions'

// PUBLIC: list competitions
export async function GET() {
  try {
    const competitions = await getCompetitions()
    return NextResponse.json({ ok: true, data: competitions })
  } catch (error) {
    console.error('[GET /api/competitions]', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// ADMIN ONLY: create competition
export async function POST(request: Request) {
  try {
    await requireAdmin()

    const body = (await request.json()) as NewCompetitionInput

    if (!body.event_name || body.event_name.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Event name is required' },
        { status: 400 },
      )
    }

    const created = await createCompetition(body)

    if (!created) {
      return NextResponse.json(
        { ok: false, error: 'Failed to create competition' },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/competitions]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
