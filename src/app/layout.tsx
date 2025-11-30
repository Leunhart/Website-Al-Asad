import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'Al-Asad Panahan Academy',
  description: 'Akademi Panahan berfokus pada pembinaan dan prestasi.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
        {children}
      </body>
    </html>
  )
}
