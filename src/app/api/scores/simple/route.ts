import 'server-only'

import { NextResponse } from 'next/server'
import { requireAdmin } from '@/src/actions/auth'
import { createClient } from '@/src/lib/supabase-server'

type SimpleScoresPayload = {
  student_id: number
  title: string
  location?: string | null
  notes?: string | null
  scores: number[][]
}

function isValidScores(scores: unknown): scores is number[][] {
  if (!Array.isArray(scores) || scores.length !== 5) return false
  return scores.every((round) => {
    if (!Array.isArray(round) || round.length !== 6) return false
    return round.every(
      (score) => Number.isInteger(score) && score >= 0,
    )
  })
}

export async function POST(request: Request) {
  try {
    await requireAdmin()

    const body = (await request.json()) as SimpleScoresPayload

    if (!body || typeof body.student_id !== 'number') {
      return NextResponse.json(
        { ok: false, error: 'student_id must be a number' },
        { status: 400 },
      )
    }

    if (!body.title || body.title.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: 'title is required' },
        { status: 400 },
      )
    }

    if (!isValidScores(body.scores)) {
      return NextResponse.json(
        { ok: false, error: 'scores must be 5 rounds of 6 non-negative integers' },
        { status: 400 },
      )
    }

    const supabase = await createClient()

    const { data: sheet, error: sheetError } = await supabase
      .from('score_sheets')
      .insert({
        student_id: body.student_id,
        title: body.title.trim(),
        location: body.location ?? null,
        notes: body.notes ?? null,
      })
      .select('id')
      .single()

    if (sheetError || !sheet) {
      console.error('[POST /api/scores/simple] sheet insert error:', sheetError)
      return NextResponse.json({ ok: false, error: 'Failed to create score sheet' }, { status: 500 })
    }

    const roundTotals = body.scores.map((round) =>
      round.reduce((sum, score) => sum + score, 0),
    )

    const { data: rounds, error: roundsError } = await supabase
      .from('score_rounds')
      .insert(
        roundTotals.map((total, index) => ({
          sheet_id: sheet.id,
          round_number: index + 1,
          total_score: total,
        })),
      )
      .select('id, round_number')

    if (roundsError || !rounds) {
      console.error('[POST /api/scores/simple] rounds insert error:', roundsError)
      return NextResponse.json({ ok: false, error: 'Failed to create rounds' }, { status: 500 })
    }

    const roundIdByNumber = new Map<number, string>()
    rounds.forEach((round) => {
      roundIdByNumber.set(round.round_number, round.id)
    })

    const arrowsPayload: Array<{
      round_id: string
      arrow_number: number
      score: number
    }> = []

    body.scores.forEach((round, roundIndex) => {
      const roundId = roundIdByNumber.get(roundIndex + 1)
      if (!roundId) return
      round.forEach((score, arrowIndex) => {
        arrowsPayload.push({
          round_id: roundId,
          arrow_number: arrowIndex + 1,
          score,
        })
      })
    })

    const { error: arrowsError } = await supabase
      .from('score_arrows')
      .insert(arrowsPayload)

    if (arrowsError) {
      console.error('[POST /api/scores/simple] arrows insert error:', arrowsError)
      return NextResponse.json({ ok: false, error: 'Failed to create arrows' }, { status: 500 })
    }

    const totalScore = roundTotals.reduce((sum, total) => sum + total, 0)
    const { error: totalError } = await supabase
      .from('score_sheets')
      .update({ total_score: totalScore })
      .eq('id', sheet.id)

    if (totalError) {
      console.error('[POST /api/scores/simple] total update error:', totalError)
      return NextResponse.json({ ok: false, error: 'Failed to update total score' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, sheet_id: sheet.id, total_score: totalScore })
  } catch (error) {
    console.error('[POST /api/scores/simple] unexpected:', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
