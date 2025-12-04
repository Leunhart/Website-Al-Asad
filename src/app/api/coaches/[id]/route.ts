import { NextResponse } from 'next/server'
import { requireAdmin } from '@/src/actions/auth'
import {
  getCoachById,
  updateCoach,
  deleteCoach,
  UpdateCoachInput,
} from '@/src/actions/coaches'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

// GET single coach by id_coaches (PUBLIC)
export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { id: rawId } = await params
    const id = Number.parseInt(rawId, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const coach = await getCoachById(id)

    if (!coach) {
      return NextResponse.json(
        { ok: false, error: 'Coach not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ ok: true, data: coach })
  } catch (error) {
    console.error('[GET /api/coaches/:id]', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// UPDATE by id_coaches (ADMIN ONLY)
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    await requireAdmin()

    const { id: rawId } = await params
    const id = Number.parseInt(rawId, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const body = (await req.json()) as UpdateCoachInput
    const updated = await updateCoach(id, body)

    if (!updated) {
      return NextResponse.json(
        { ok: false, error: 'Failed to update coach' },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true, data: updated })
  } catch (error) {
    console.error('[PATCH /api/coaches/:id]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE by id_coaches (ADMIN ONLY)
export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    await requireAdmin()

    const { id: rawId } = await params
    const id = Number.parseInt(rawId, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const success = await deleteCoach(id)

    if (!success) {
      return NextResponse.json(
        { ok: false, error: 'Failed to delete coach' },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[DELETE /api/coaches/:id]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
