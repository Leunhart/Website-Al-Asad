import { NextResponse } from 'next/server'
import { requireAdmin } from '@/actions/auth'
import { getAcademies, createAcademy, NewAcademyInput } from '@/actions/academies'

export async function GET() {
  try {
    // PUBLIC: no auth required for list
    const academies = await getAcademies()
    return NextResponse.json({ ok: true, data: academies })
  } catch (error) {
    console.error('[GET /api/academies]', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // ADMIN ONLY
    await requireAdmin()

    const body = (await request.json()) as NewAcademyInput

    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Name is required' },
        { status: 400 },
      )
    }

    const created = await createAcademy(body)

    if (!created) {
      return NextResponse.json(
        { ok: false, error: 'Failed to create academy' },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/academies]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
