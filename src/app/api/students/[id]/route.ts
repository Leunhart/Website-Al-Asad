import { NextResponse } from 'next/server'
import { requireAdmin } from '@/src/actions/auth'
import {
  getStudentById,
  updateStudent,
  deleteStudent,
  UpdateStudentInput,
} from '@/src/actions/students'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

// GET single student by id_students (int) (PUBLIC)
export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { id } = await params

    const idNum = Number(id)

    if (!id || Number.isNaN(idNum)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const student = await getStudentById(idNum)

    if (!student) {
      return NextResponse.json(
        { ok: false, error: 'Student not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ ok: true, data: student })
  } catch (error) {
    console.error('[GET /api/students/:id]', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// UPDATE by id_students (ADMIN ONLY)
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    await requireAdmin()

    const { id } = await params
    const idNum = Number(id)
    if (!id || Number.isNaN(idNum)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const body = (await req.json()) as UpdateStudentInput
    const updated = await updateStudent(idNum, body)

    if (!updated) {
      return NextResponse.json(
        { ok: false, error: 'Failed to update student' },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true, data: updated })
  } catch (error) {
    console.error('[PATCH /api/students/:id]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE by id_students (ADMIN ONLY)
export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    await requireAdmin()

    const { id } = await params
    const idNum = Number(id)
    if (!id || Number.isNaN(idNum)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const success = await deleteStudent(idNum)

    if (!success) {
      return NextResponse.json(
        { ok: false, error: 'Failed to delete student' },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[DELETE /api/students/:id]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
