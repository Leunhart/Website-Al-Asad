import type { Achievement } from '@/types/database'

interface Props {
  achievements: Achievement[]
}

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

export default function AchievementsPreview({ achievements }: Props) {
  if (!achievements.length) {
    return (
      <div className="text-sm text-gray-500 text-center">Belum ada data prestasi.</div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {achievements.map((a) => (
        <article
          key={a.id_achievements}
          className="p-6 rounded-2xl bg-[#2B2527] shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition-all duration-300 border-l-4 border-[#C7A04F] transform hover:-translate-y-1"
        >
          <div className="text-3xl mb-3 text-[#C7A04F]">🏆</div>
          <h3 className="font-bold text-lg leading-tight mb-3 text-[#EEEAE4]">
            {a.event_name}
          </h3>
          <p className="text-sm mb-2 text-[#EEEAE4]/85">
            <span className="font-semibold">Atlet:</span>{' '}
            {a.athlete_name || 'Tidak diketahui'}
          </p>
          <p className="text-xs text-[#EEEAE4]/70">{formatDate(a.date)}</p>
        </article>
      ))}
    </div>
  )
}
