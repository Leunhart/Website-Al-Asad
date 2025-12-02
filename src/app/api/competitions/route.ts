import { NextResponse } from 'next/server'
import { getCompetitions } from '@/actions/competitions'

export async function GET() {
  const achievements = await getCompetitions()
  return NextResponse.json(achievements)
}
