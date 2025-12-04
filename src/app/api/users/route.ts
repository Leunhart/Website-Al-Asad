import { NextResponse } from 'next/server'
import { getUsers } from '@/src/actions/users'

export async function GET() {
  const achievements = await getUsers()
  return NextResponse.json(achievements)
}
