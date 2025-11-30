import type { Coach } from '@/types/database'

interface Props {
  coaches: Coach[]
}

export default function CoachesPreview({ coaches }: Props) {
  if (!coaches.length) {
    return <div className="text-sm opacity-70">Belum ada data pelatih.</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {coaches.map((c) => (
        <div
          key={c.id_coaches}
          className="p-4 rounded-lg border border-foreground/15 bg-foreground/5 flex flex-col items-center gap-3"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-foreground/10 to-foreground/30 overflow-hidden flex items-center justify-center">
            {c.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.photo}
                alt={c.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs opacity-60 text-center px-2">
                Foto belum tersedia
              </span>
            )}
          </div>
          <h3 className="font-medium text-sm text-center leading-tight">
            {c.full_name}
          </h3>
        </div>
      ))}
    </div>
  )
}
