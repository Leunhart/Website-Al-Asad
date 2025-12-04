import { NextResponse } from 'next/server'
import { requireAdmin } from '@/src/actions/auth'
import {
  getCoaches,
  createCoach,
  NewCoachInput,
} from '@/src/actions/coaches'

// PUBLIC: list coaches
export async function GET() {
  try {
    const coaches = await getCoaches()
    return NextResponse.json({ ok: true, data: coaches })
  } catch (error) {
    console.error('[GET /api/coaches]', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// ADMIN ONLY: create coach
export async function POST(request: Request) {
  try {
    await requireAdmin()

    const body = (await request.json()) as NewCoachInput

    if (!body.full_name || body.full_name.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Full name is required' },
        { status: 400 },
      )
    }

    const created = await createCoach(body)

    if (!created) {
      return NextResponse.json(
        { ok: false, error: 'Failed to create coach' },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/coaches]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
