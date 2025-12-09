const features = [
  {
    title: 'Pembinaan Profesional',
    desc: 'Metode latihan terstruktur untuk semua tingkat kemampuan.',
  },
  {
    title: 'Fokus Prestasi',
    desc: 'Mendukung atlet meraih prestasi daerah hingga nasional.',
  },
  {
    title: 'Lingkungan Positif',
    desc: 'Menumbuhkan disiplin, sportivitas, dan percaya diri.',
  },
]

export default function Features() {
  return (
    <section className="px-6 max-w-6xl mx-auto w-full grid gap-10 md:grid-cols-3">
      {features.map((f) => (
        <div
          key={f.title}
          className="p-6 rounded-lg border border-foreground/15 bg-foreground/5 backdrop-blur-sm"
        >
          <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
          <p className="text-sm leading-relaxed opacity-80">{f.desc}</p>
        </div>
      ))}
    </section>
  )
}
