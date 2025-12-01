import { getCompetitions } from '@/actions/competitions'
import type { Competition } from '@/types/database'

function formatRange(start: string | null, end: string | null) {
  if (!start && !end) return 'Tanggal belum ditentukan'
  const fmt = (d: string | null) =>
    d
      ? new Intl.DateTimeFormat('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(new Date(d))
      : null
  const s = fmt(start)
  const e = fmt(end)
  if (s && e) return `${s} - ${e}`
  return s || e || ''
}

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs px-2 py-1 rounded-md bg-foreground/10">{children}</span>
  )
}

const accentColors = [
  'bg-[#345243]', // green
  'bg-[#b9876c]', // peach
  'bg-[#5a6b63]', // gray green
  'bg-[#2e3b34]', // dark card
]

function CompetitionCard({ c, i }: { c: Competition; i: number }) {
  const accent = accentColors[i % accentColors.length]
  return (
    <article className={`rounded-xl overflow-hidden border border-foreground/10 ${accent}`}>
      <div className="p-4 text-sm flex items-center justify-between">
        <div className="flex items-center gap-2 opacity-90">
          <span>🏆</span>
          <span>{formatRange(c.start_date, c.end_date)}</span>
        </div>
      </div>
      <div className="bg-background/10 px-5 pb-5 pt-3 flex flex-col gap-3">
        <h3 className="text-lg font-semibold">{c.event_name}</h3>
        <div className="text-sm opacity-85">{c.location || '-'}</div>
        <p className="text-sm opacity-85">
          {c.organizer || 'Informasi penyelenggara akan diumumkan.'}
        </p>
        <div className="flex flex-wrap gap-2">
          <Tag>Recurve</Tag>
          <Tag>Compound</Tag>
          <Tag>Tradisional</Tag>
        </div>
        <div>
          <a
            href={`https://wa.me/6285603382482?text=${encodeURIComponent(`Halo, saya mau bertanya soal lomba "${c.event_name}"`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 rounded-md border border-foreground/20 hover:bg-foreground hover:text-background text-sm font-medium transition-colors"
          >
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}

export default async function Competitions() {
  const list = await getCompetitions()
  const items = list.slice(0, 6)

  return (
    <section id="competitions" className="px-6 max-w-6xl mx-auto w-full">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">Lomba & Kompetisi</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {items.length === 0 ? (
          <div className="opacity-70 text-sm">Belum ada data kompetisi.</div>
        ) : (
          items.map((c, i) => <CompetitionCard key={c.id_competitions} c={c} i={i} />)
        )}
      </div>
    </section>
  )
}
