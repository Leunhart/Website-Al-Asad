import { NextResponse } from 'next/server'
import { getCoaches } from '@/actions/coaches'

export async function GET() {
  const coaches = await getCoaches()
  return NextResponse.json(coaches)
}
