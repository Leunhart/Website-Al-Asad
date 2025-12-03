import { NextResponse } from 'next/server'
import { requireAdmin } from '@/actions/auth'
import {
  getAcademyById,
  updateAcademy,
  deleteAcademy,
  UpdateAcademyInput,
} from '@/actions/academies'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

// GET single academy by id_academies (PUBLIC)
export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { id: rawId } = await params
    const id = Number.parseInt(rawId, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const academy = await getAcademyById(id)
    if (!academy) {
      return NextResponse.json({ ok: false, error: 'Academy not found' }, { status: 404 })
    }
    return NextResponse.json({ ok: true, data: academy })
  } catch (error) {
    console.error('[GET /api/academies/:id]', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// UPDATE by id_academies (ADMIN ONLY)
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    await requireAdmin()

    const { id: rawId } = await params
    const body = (await req.json()) as UpdateAcademyInput
    const id = Number.parseInt(rawId, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const updated = await updateAcademy(id, body)

    if (!updated) {
      return NextResponse.json(
        { ok: false, error: 'Failed to update academy' },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true, data: updated })
  } catch (error) {
    console.error('[PATCH /api/academies/:id]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE by id_academies (ADMIN ONLY)
export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    await requireAdmin()

    const { id: rawId } = await params
    const id = Number.parseInt(rawId, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const success = await deleteAcademy(id)

    if (!success) {
      return NextResponse.json(
        { ok: false, error: 'Failed to delete academy' },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[DELETE /api/academies/:id]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
