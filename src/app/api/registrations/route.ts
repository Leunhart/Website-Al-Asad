// app/api/registrations/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/src/lib/supabase-server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      full_name,
      gender,
      date_of_birth,
      phone,
      address,
      level_requested,
    } = body;

    if (!full_name || !gender || !date_of_birth) {
      return NextResponse.json(
        { ok: false, error: 'full_name, gender, and date_of_birth are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('registrations')
      .insert({
        full_name,
        gender,
        date_of_birth,
        phone: phone ?? null,
        address: address ?? null,
        level_requested: level_requested ?? null,
        id_academies: 1, // default to Al Asad Academy
        status: 'pending',
      })
      .select('*')
      .single();

    if (error) {
      console.error('Insert registration error:', error);
      return NextResponse.json(
        { ok: false, error: 'Failed to create registration' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error in POST /api/registrations:', err);
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
