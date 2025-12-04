import { NextResponse } from 'next/server'
import { requireAdmin } from '@/actions/auth'
import { createClient } from '@/lib/supabase-server'
import { Student, Registration } from '@/types/database'

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

    const { data: registration, error: registrationError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id_registrations', registrationId)
      .single()

    if (registrationError || !registration) {
      console.error('[approveRegistration] fetch error:', registrationError)
      return NextResponse.json(
        {
          ok: false,
          error: registrationError?.message || 'Registration not found',
          code: registrationError?.code ?? null,
        },
        { status: registrationError?.code === 'PGRST116' ? 404 : 400 },
      )
    }

    const regData = registration as Registration

    if (regData.status !== 'pending') {
      return NextResponse.json(
        { ok: false, error: `Registration already processed (status=${regData.status ?? 'unknown'})` },
        { status: 400 },
      )
    }

    const studentPayload = {
      full_name: regData.full_name,
      gender: regData.gender,
      date_of_birth: regData.date_of_birth,
      level: regData.level_requested,
      address: regData.address,
      status: 'active',
      id_academies: regData.id_academies ?? 1,
    }

    const { data: student, error: studentError } = await supabase
      .from('students')
      .insert(studentPayload)
      .select('*')
      .single()

    if (studentError || !student) {
      console.error('[approveRegistration] student insert error:', studentError)
      return NextResponse.json(
        { ok: false, error: studentError?.message ?? 'Failed to create student from registration' },
        { status: 500 },
      )
    }

    const newStudent = student as Student

    const { data: updatedRegistration, error: updateError } = await supabase
      .from('registrations')
      .update({ status: 'diterima', student_id: newStudent.id_students })
      .eq('id_registrations', registrationId)
      .select('*')
      .single()

    if (updateError || !updatedRegistration) {
      console.error('[approveRegistration] update registration error:', updateError)
      // best-effort rollback of student insert if registration update fails
      await supabase.from('students').delete().eq('id_students', newStudent.id_students)

      return NextResponse.json(
        { ok: false, error: updateError?.message ?? 'Failed to mark registration accepted' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      ok: true,
      data: {
        registration: updatedRegistration as Registration,
        student: newStudent,
      },
    })
  } catch (error) {
    console.error('[POST /api/admin/registrations/:id/approve] unexpected:', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
