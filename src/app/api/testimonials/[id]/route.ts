import { NextResponse } from 'next/server'
import { requireAdmin } from '@/src/actions/auth'
import {
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  UpdateTestimonialInput,
} from '@/src/actions/testimonials'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

// GET single testimonial by unique_id (PUBLIC)
export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { id: rawId } = await params
    const id = Number.parseInt(rawId, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const testimonial = await getTestimonialById(id)

    if (!testimonial) {
      return NextResponse.json(
        { ok: false, error: 'Testimonial not found' },
        { status: 404 },
      )
    }

    return NextResponse.json({ ok: true, data: testimonial })
  } catch (error) {
    console.error('[GET /api/testimonials/:id]', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// UPDATE by unique_id (ADMIN ONLY)
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    await requireAdmin()

    const { id: rawId } = await params
    const id = Number.parseInt(rawId, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const body = (await req.json()) as UpdateTestimonialInput
    const updated = await updateTestimonial(id, body)

    if (!updated) {
      return NextResponse.json(
        { ok: false, error: 'Failed to update testimonial' },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true, data: updated })
  } catch (error) {
    console.error('[PATCH /api/testimonials/:id]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE by unique_id (ADMIN ONLY)
export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    await requireAdmin()

    const { id: rawId } = await params
    const id = Number.parseInt(rawId, 10)
    if (Number.isNaN(id)) {
      return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
    }

    const success = await deleteTestimonial(id)

    if (!success) {
      return NextResponse.json(
        { ok: false, error: 'Failed to delete testimonial' },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[DELETE /api/testimonials/:id]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
