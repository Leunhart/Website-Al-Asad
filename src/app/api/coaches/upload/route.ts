import { NextResponse } from 'next/server'
import { requireAdmin } from '@/src/actions/auth'
import { getSupabaseAdmin } from '@/src/lib/supabase-admin'

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_COACH_BUCKET || 'coach-photos'
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024

const extractPathFromPublicUrl = (url: string): string | null => {
  try {
    const u = new URL(url)
    const marker = `/public/${BUCKET}/`
    const idx = u.pathname.indexOf(marker)
    if (idx === -1) return null
    return u.pathname.slice(idx + marker.length)
  } catch {
    return null
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin()

    const formData = await req.formData()
    const file = formData.get('file')
    const existingUrlRaw = formData.get('existingUrl')
    const existingUrl = typeof existingUrlRaw === 'string' ? existingUrlRaw : null

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'File tidak ditemukan' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ ok: false, error: 'Tipe file harus PNG, JPG, atau WEBP' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ ok: false, error: 'Ukuran file harus <= 5MB' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'
    const objectPath = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${crypto.randomUUID()}.${ext}`

    const { data, error } = await supabase.storage.from(BUCKET).upload(objectPath, file, {
      contentType: file.type,
      upsert: true,
    })

    if (error || !data?.path) {
      console.error('[POST /api/coaches/upload] upload error', error)
      return NextResponse.json({ ok: false, error: 'Gagal upload foto' }, { status: 500 })
    }

    if (existingUrl) {
      const oldPath = extractPathFromPublicUrl(existingUrl)
      if (oldPath) {
        supabase.storage.from(BUCKET).remove([oldPath]).catch((err) => {
          console.warn('[POST /api/coaches/upload] gagal hapus foto lama:', err)
        })
      }
    }

    const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)

    return NextResponse.json({ ok: true, url: publicData.publicUrl, path: data.path })
  } catch (error) {
    console.error('[POST /api/coaches/upload]', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
