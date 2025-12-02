import { NextResponse } from 'next/server'
import { getTestimonials } from '@/actions/testimonials'

export async function GET() {
  const achievements = await getTestimonials()
  return NextResponse.json(achievements)
}
