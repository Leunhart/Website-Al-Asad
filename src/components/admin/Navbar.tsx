// src/components/admin/Navbar.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation' // Tambahkan import router
import { User, LogOut, Home } from 'lucide-react'

export default function Navbar() {
  const router = useRouter() // Tambahkan ini

  const handleLogout = async () => {
    try {
      // Panggil API logout
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      // Redirect ke halaman login
      router.push('/auth/login')
    } catch (err) {
      console.error('Logout failed:', err)
      // Fallback: hapus cookie manual jika API gagal
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      router.push('/auth/login')
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/landing"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home size={16} />
              Kembali ke Beranda
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
