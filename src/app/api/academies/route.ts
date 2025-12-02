// import { NextResponse } from 'next/server'
// import { getAcademies } from '@/actions/academies' 

// export async function GET() {
//   try {
//     const academies = await getAcademies()
//     return NextResponse.json(academies)
//   } catch (error) {
//     console.error('[GET /api/academies]', error)
//     return NextResponse.json(
//       { ok: false, error: 'Failed to fetch academies' },
//       { status: 500 },
//     )
//   }
// }

import { NextResponse } from 'next/server'
import { getAcademies } from '@/actions/academies'

export async function GET() {
  const achievements = await getAcademies()
  return NextResponse.json(achievements)
}
