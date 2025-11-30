"use client"

import { useState, FormEvent } from 'react'

interface RegistrationData {
  full_name: string
  email: string
  phone: string
  date_of_birth: string
  address: string
  parent_name: string
  parent_phone: string
  experience: string
  medical_notes: string
}

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [preview, setPreview] = useState('')

  function buildMessage(d: RegistrationData) {
    return [
      'PENDAFTARAN ANGGOTA BARU',
      '',
      'Data Calon Anggota:',
      'Nama: ' + d.full_name,
      'Email: ' + d.email,
      'Telepon: ' + d.phone,
      'Tanggal Lahir: ' + d.date_of_birth,
      'Alamat: ' + d.address,
      '',
      'Data Orang Tua / Wali:',
      'Nama: ' + d.parent_name,
      'Telepon: ' + d.parent_phone,
      '',
      'Informasi Tambahan:',
      'Pengalaman: ' + (d.experience || 'Tidak ada'),
      'Catatan Kesehatan: ' + (d.medical_notes || 'Tidak ada')
    ].join('\n')
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setAlert(null)
    setPreview('')
    const form = new FormData(e.currentTarget)
    const data: RegistrationData = {
      full_name: (form.get('full_name') as string || '').trim(),
      email: (form.get('email') as string || '').trim(),
      phone: (form.get('phone') as string || '').trim(),
      date_of_birth: (form.get('date_of_birth') as string || '').trim(),
      address: (form.get('address') as string || '').trim(),
      parent_name: (form.get('parent_name') as string || '').trim(),
      parent_phone: (form.get('parent_phone') as string || '').trim(),
      experience: (form.get('experience') as string || '').trim(),
      medical_notes: (form.get('medical_notes') as string || '').trim(),
    }
    try {
      const message = buildMessage(data)
      setPreview(message)
      const number = '6281261634719'
      const waUrl = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`
      // Buka di tab baru agar message terisi otomatis
      const opened = window.open(waUrl, '_blank', 'noopener,noreferrer')
      if (opened) {
        setAlert({ type: 'success', text: 'WhatsApp dibuka di tab baru dengan pesan sudah terisi. Cek dan klik kirim!' })
      } else {
        setAlert({ type: 'success', text: 'Popup diblokir browser. Klik tombol Buka WhatsApp di bawah atau aktifkan popup.' })
      }
    } catch (err) {
      setAlert({ type: 'error', text: 'Terjadi kesalahan. Coba lagi.' })
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!preview) return
    navigator.clipboard.writeText(preview)
    setAlert({ type: 'success', text: 'Pesan berhasil disalin! Sekarang buka WhatsApp dan tempel (paste) pesannya.' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {alert && (
        <div className={`p-4 rounded-lg ${alert.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-100' : 'bg-red-500/20 border border-red-500/30 text-red-100'}`}>{alert.text}</div>
      )}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold border-b border-[#e7efe9]/20 pb-2">Data Calon Anggota</h2>
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium mb-2">Nama Lengkap <span className="text-red-400">*</span></label>
          <input type="text" id="full_name" name="full_name" required className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20" placeholder="Masukkan nama lengkap" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email <span className="text-red-400">*</span></label>
            <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20" placeholder="email@contoh.com" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">Nomor Telepon <span className="text-red-400">*</span></label>
            <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20" placeholder="08123456789" />
          </div>
        </div>
        <div>
          <label htmlFor="date_of_birth" className="block text-sm font-medium mb-2">Tanggal Lahir <span className="text-red-400">*</span></label>
          <input type="date" id="date_of_birth" name="date_of_birth" required className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20" />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">Alamat Lengkap <span className="text-red-400">*</span></label>
          <textarea id="address" name="address" required rows={3} className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20 resize-none" placeholder="Masukkan alamat lengkap" />
        </div>
      </div>
      <div className="space-y-5">
        <h2 className="text-xl font-semibold border-b border-[#e7efe9]/20 pb-2">Data Orang Tua / Wali</h2>
        <div>
          <label htmlFor="parent_name" className="block text-sm font-medium mb-2">Nama Orang Tua / Wali <span className="text-red-400">*</span></label>
          <input type="text" id="parent_name" name="parent_name" required className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20" placeholder="Nama orang tua / wali" />
        </div>
        <div>
          <label htmlFor="parent_phone" className="block text-sm font-medium mb-2">Nomor Telepon Orang Tua / Wali <span className="text-red-400">*</span></label>
          <input type="tel" id="parent_phone" name="parent_phone" required className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20" placeholder="08123456789" />
        </div>
      </div>
      <div className="space-y-5">
        <h2 className="text-xl font-semibold border-b border-[#e7efe9]/20 pb-2">Informasi Tambahan</h2>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium mb-2">Pengalaman Panahan (Opsional)</label>
          <textarea id="experience" name="experience" rows={3} className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20 resize-none" placeholder="Ceritakan pengalaman Anda (jika ada)" />
        </div>
        <div>
          <label htmlFor="medical_notes" className="block text-sm font-medium mb-2">Catatan Kesehatan (Opsional)</label>
          <textarea id="medical_notes" name="medical_notes" rows={3} className="w-full px-4 py-3 rounded-lg bg-[#0f1f14] border border-[#e7efe9]/20 focus:border-[#e7efe9]/50 focus:outline-none focus:ring-2 focus:ring-[#e7efe9]/20 resize-none" placeholder="Alergi, kondisi khusus, dll." />
        </div>
      </div>
      <div className="pt-4 space-y-4">
        <button type="submit" disabled={loading} className="w-full py-4 px-6 rounded-lg bg-[#e7efe9] text-[#0f1f14] font-semibold hover:bg-[#d4e4d6] disabled:opacity-50 disabled:cursor-not-allowed transition-all">{loading ? 'Membuka WhatsApp...' : 'Kirim ke WhatsApp'}</button>
        {preview && (
          <div className="space-y-3 mt-4">
            <div className="bg-[#0f1f14]/50 p-4 rounded-lg border border-[#e7efe9]/20">
              <label className="text-sm font-medium mb-2 block">Preview Pesan (untuk cadangan):</label>
              <textarea
                readOnly
                value={preview}
                rows={Math.min(12, preview.split('\n').length + 1)}
                className="w-full text-xs leading-relaxed px-3 py-2 rounded bg-[#0f1f14] border border-[#e7efe9]/30 focus:outline-none resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-3 px-4 rounded-lg border-2 border-[#e7efe9]/40 hover:border-[#e7efe9]/70 font-medium transition-all text-sm"
              >
                📋 Salin Pesan
              </button>
              <a
                href={`https://api.whatsapp.com/send?phone=6281261634719&text=${encodeURIComponent(preview)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-center transition-all text-sm"
              >
                💬 Buka Ulang WhatsApp
              </a>
            </div>
            <p className="text-xs text-center opacity-60">Jika pesan tidak terisi otomatis di WhatsApp, salin dan paste manual.</p>
          </div>
        )}
      </div>
      <p className="text-sm text-center opacity-70">Pesan akan otomatis terisi di kolom chat WhatsApp. Tinggal klik kirim!</p>
    </form>
  )
}
