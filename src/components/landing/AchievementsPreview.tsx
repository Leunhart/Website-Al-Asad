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
      <div className="text-sm opacity-70">Belum ada data prestasi.</div>
    )
  }

  return (
    <div
      id="prestasi"
      className="grid gap-6 md:grid-cols-3"
    >
      {achievements.map((a) => (
        <article
          key={a.id_achievements}
          className="p-5 rounded-lg border border-foreground/15 bg-foreground/5 flex flex-col gap-3"
        >
          <h3 className="font-semibold text-lg leading-tight">
            {a.event_name}
          </h3>
          <p className="text-sm">
            <span className="font-medium">Atlet:</span>{' '}
            {a.athlete_name || 'Tidak diketahui'}
          </p>
          <p className="text-xs opacity-70">{formatDate(a.date)}</p>
        </article>
      ))}
    </div>
  )
}
