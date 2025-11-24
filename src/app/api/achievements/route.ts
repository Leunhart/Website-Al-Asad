import { NextResponse } from 'next/server'
import { getAchievements } from '@/actions/achievements'

export async function GET() {
  const achievements = await getAchievements()
  return NextResponse.json(achievements)
}
