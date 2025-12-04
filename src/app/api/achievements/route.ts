import { NextResponse } from 'next/server'
import { requireAdmin } from '@/src/actions/auth'
import {
  getAchievements,
  createAchievement,
  NewAchievementInput,
} from '@/src/actions/achievements'

// PUBLIC: list achievements
export async function GET() {
  try {
    const achievements = await getAchievements()
    return NextResponse.json({ ok: true, data: achievements })
  } catch (error) {
    console.error('[GET /api/achievements]', error)
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

// ADMIN ONLY: create achievement
export async function POST(request: Request) {
  try {
    await requireAdmin()

    const body = (await request.json()) as NewAchievementInput

    if (!body.event_name || body.event_name.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Event name is required' },
        { status: 400 },
      )
    }

    const created = await createAchievement(body)

    if (!created) {
      return NextResponse.json(
        { ok: false, error: 'Failed to create achievement' },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true, data: created }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/achievements]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
