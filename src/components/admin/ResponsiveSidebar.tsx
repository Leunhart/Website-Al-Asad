'use client'

import Link from 'next/link'
import { useState } from 'react'
import { User, Trophy, LayoutDashboard, Wrench, Calendar, Award, Building, GraduationCap, MessageSquare, CheckCircle, Menu, X } from 'lucide-react'

export default function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, text: "Dashboard" },
    { href: "/admin/anggota", icon: User, text: "Pelatih" },
    { href: "/admin/lomba", icon: Trophy, text: "Lomba" },
    { href: "/admin/prestasi", icon: Award, text: "Prestasi" },
    { href: "/admin/akademi", icon: Building, text: "Akademi" },
    { href: "/admin/siswa", icon: GraduationCap, text: "Archer" },
    { href: "/admin/testimoni", icon: MessageSquare, text: "Testimoni" },
    { href: "/admin/registrasi", icon: CheckCircle, text: "Registrasi" },
  ]

  return (
    <>
      {/* Burger Menu Button (Mobile) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-red-900 text-white rounded-md shadow-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-gray-800 p-6 shadow-sm border-r-2 border-red-900 overflow-y-auto z-50 transition-all duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64 w-64`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-red-900 border-b border-red-200 pb-2">Admin Panel</h2>
          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-1 text-gray-500 hover:text-red-900"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center py-3 px-4 rounded-lg hover:bg-red-50 hover:text-red-900 transition-all duration-200 border-l-4 border-transparent hover:border-red-600"
            >
              <span className="mr-3 text-gray-500"><item.icon size={18}/></span>
              <span className="font-medium text-gray-700">{item.text}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
