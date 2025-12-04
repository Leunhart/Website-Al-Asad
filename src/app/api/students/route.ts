import { NextResponse } from 'next/server'
import { requireAdmin } from '@/actions/auth'
import {
  getStudents,
  createStudent,
  NewStudentInput,
} from '@/actions/students'

// PUBLIC: list students
export async function GET() {
  try {
    const students = await getStudents()
    return NextResponse.json({ ok: true, data: students })
  } catch (error) {
    console.error('[GET /api/students]', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// ADMIN ONLY: create student
export async function POST(request: Request) {
  try {
    await requireAdmin()

    const body = (await request.json()) as NewStudentInput

    if (!body.full_name || body.full_name.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Full name is required' },
        { status: 400 },
      )
    }

    if (typeof body.id_academies !== 'number') {
      return NextResponse.json(
        { ok: false, error: 'id_academies is required' },
        { status: 400 },
      )
    }

    const created = await createStudent(body)

    if (!created) {
      return NextResponse.json(
        { ok: false, error: 'Failed to create student' },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/students]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
