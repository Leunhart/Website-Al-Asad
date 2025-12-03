import { NextResponse } from 'next/server'
import { requireAdmin } from '@/actions/auth'
import {
  getTestimonials,
  createTestimonial,
  NewTestimonialInput,
} from '@/actions/testimonials'

// PUBLIC: list testimonials
export async function GET() {
  try {
    const testimonials = await getTestimonials()
    return NextResponse.json({ ok: true, data: testimonials })
  } catch (error) {
    console.error('[GET /api/testimonials]', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// ADMIN ONLY: create testimonial
export async function POST(request: Request) {
  try {
    await requireAdmin()

    const body = (await request.json()) as NewTestimonialInput

    if (!body.reviewer_name || body.reviewer_name.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Reviewer name is required' },
        { status: 400 },
      )
    }

    if (!body.content || body.content.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Content is required' },
        { status: 400 },
      )
    }

    const created = await createTestimonial(body)

    if (!created) {
      return NextResponse.json(
        { ok: false, error: 'Failed to create testimonial' },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/testimonials]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
