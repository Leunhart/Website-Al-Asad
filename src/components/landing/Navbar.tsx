'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isProgramOpen, setIsProgramOpen] = useState(false)

  const navLinks = [
    { href: '/landing', label: 'Home' },
    { href: '#about', label: 'Tentang Kami' },
    { href: '#gallery', label: 'Galeri' },
    { href: '#contact', label: 'Kontak' },
  ]

  const programLinks = [
    { href: '#programs', label: 'Program Latihan' },
    { href: '#competitions', label: 'Lomba' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#192F0E] shadow-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 font-bold text-[var(--green-text-primary)] text-xl">
          <div className="w-10 h-10 rounded-full bg-[#345243] grid place-items-center text-lg shadow-md">
            🎯
          </div>
          <span>Al-Asad</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--green-text-primary)]">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[#b9876c] transition-colors duration-300">
              {link.label}
            </a>
          ))}
          <div className="relative">
            <button
              onClick={() => setIsProgramOpen(!isProgramOpen)}
              className="hover:text-[#b9876c] transition-colors duration-300 flex items-center gap-1"
            >
              Program
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isProgramOpen && (
              <div className="absolute top-full mt-2 bg-[#192F0E] border border-white/10 rounded-lg shadow-lg py-2 min-w-[180px]">
                {programLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsProgramOpen(false)}
                    className="block px-4 py-2 hover:bg-[#345243] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/landing/pendaftaran"
            className="btn-primary px-5 py-2.5 text-sm font-bold hover:scale-[1.03]"
          >
            Daftar Sekarang
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--green-text-primary)]"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden border-t border-white/10 bg-[#192F0E]">
          <div className="flex flex-col py-4 px-6 gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-[var(--green-text-primary)] hover:text-[#b9876c] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <div>
              <button
                onClick={() => setIsProgramOpen(!isProgramOpen)}
                className="py-2 text-[var(--green-text-primary)] hover:text-[#b9876c] transition-colors duration-300 flex items-center gap-1 w-full"
              >
                Program
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProgramOpen && (
                <div className="pl-4 flex flex-col gap-2 mt-2">
                  {programLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => { setIsOpen(false); setIsProgramOpen(false); }}
                      className="py-2 text-[var(--green-text-primary)] hover:text-[#b9876c] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
