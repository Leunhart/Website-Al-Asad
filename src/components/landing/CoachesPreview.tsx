import type { Coach } from '@/types/database'

interface Props {
  coaches: Coach[]
}

export default function CoachesPreview({ coaches }: Props) {
  if (!coaches.length) {
    return <div className="text-sm text-gray-500 text-center">Belum ada data pelatih.</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {coaches.map((c) => (
        <div
          key={c.id_coaches}
          className="p-6 rounded-2xl bg-[#2B2527] shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition-all duration-300 flex flex-col items-center gap-4 transform hover:-translate-y-1"
        >
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#4B1E24] to-[#7A2F36] overflow-hidden flex items-center justify-center border-4 border-[#C7A04F] shadow-lg">
            {c.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.photo}
                alt={c.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-[#EEEAE4]">👤</span>
            )}
          </div>
          <h3 className="font-bold text-base text-center leading-tight text-[#EEEAE4]">
            {c.full_name}
          </h3>
        </div>
      ))}
    </div>
  )
}
