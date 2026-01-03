const features = [
  { title: 'Target Standar Internasional', desc: 'Target berkualitas tinggi sesuai standar kompetisi internasional.', icon: '🎯' },
  { title: 'Peralatan Lengkap', desc: 'Busur dan arrow berkualitas tersedia untuk peminjaman.', icon: '🏹' },
  { title: 'Ruang Istirahat', desc: 'Area istirahat nyaman dengan fasilitas lengkap.', icon: '🛋️' },
  { title: 'Lapangan Outdoor', desc: 'Lapangan luas dengan pemandangan alam yang asri.', icon: '🌲' },
]

const gallery = [
  '/kebersmaan.webp',
  '/IMG_2429.webp',
  '/peralatan.webp',
  '/IMG_3491.webp',
]

export default function Facilities() {
  return (
    <section id="facilities" className="px-6 max-w-6xl mx-auto w-full">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">Fasilitas Kami</h2>
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        {features.map((f) => (
          <div key={f.title} className="p-6 rounded-xl border border-foreground/10 bg-foreground/5 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full grid place-items-center text-xl bg-foreground/10">{f.icon}</div>
            <div className="font-semibold">{f.title}</div>
            <div className="text-sm opacity-80">{f.desc}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {gallery.map((src, i) => (
          <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-foreground/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Fasilitas ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}
