import type { ReactNode } from 'react'

export const metadata = {
  title: 'Pendaftaran - Al-Asad Panahan',
  description: 'Daftar menjadi anggota Al-Asad Panahan Academy',
}

export default function PendaftaranLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1f14] to-[#1a2e1f] text-[#e7efe9]">
      {children}
    </div>
  )
}
