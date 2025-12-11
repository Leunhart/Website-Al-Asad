'use client'

import { useState } from 'react'
import type { Achievement } from '@/src/types/database'

function formatDate(date: string | null) {
  if (!date) return 'Tanggal tidak tersedia'
  try {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  } catch {
    return date
  }
}

export default function AchievementsPagination({ achievements }: { achievements: Achievement[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3 // Show 3 achievements per page

  // Calculate pagination
  const totalPages = Math.ceil(achievements.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = achievements.slice(startIndex, startIndex + itemsPerPage)

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section id="prestasi" className="px-6 py-16 max-w-7xl mx-auto w-full">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Prestasi Terbaru</h2>

      {achievements.length === 0 ? (
        <div className="text-sm text-gray-500 text-center">Belum ada data prestasi.</div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            {currentItems.map((a) => (
              <article
                key={a.id_achievements}
                className="p-6 rounded-2xl bg-[#2B2527] shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition-all duration-300 border-l-4 border-[#C7A04F] transform hover:-translate-y-1 h-full"
              >
                <div className="text-3xl mb-3 text-[#C7A04F]">🏆</div>
                <h3 className="font-bold text-lg leading-tight mb-3 text-[#EEEAE4]">
                  {a.event_name}
                </h3>
                <p className="text-sm mb-2 text-[#EEEAE4]/85">
                  <span className="font-semibold">Atlet:</span>{' '}
                  {a.athlete_name || 'Tidak diketahui'}
                </p>
                <p className="text-xs text-[#EEEAE4]/70">
                  {formatDate(a.date)}
                </p>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={goToPrev}
                disabled={currentPage === 1}
                className={`px-6 py-2 rounded-md border border-foreground/20 hover:bg-foreground hover:text-background text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Sebelumnya
              </button>

              <span className="text-sm">
                Halaman {currentPage} dari {totalPages}
              </span>

              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className={`px-6 py-2 rounded-md border border-foreground/20 hover:bg-foreground hover:text-background text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Selanjutnya
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}