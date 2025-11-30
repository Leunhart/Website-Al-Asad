const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Atlet Junior',
    text: 'Pelatihan di Al Asad sangat membantu saya berkembang. Sekarang saya sudah bisa ikut kompetisi tingkat provinsi!',
    rating: 5
  },
  {
    name: 'Siti Rahayu',
    role: 'Orang Tua Atlet',
    text: 'Anak saya sangat senang berlatih di sini. Pelatihnya sabar dan metode latihannya bagus untuk perkembangan karakter.',
    rating: 5
  },
  {
    name: 'Ahmad Fauzi',
    role: 'Atlet Senior',
    text: 'Fasilitas lengkap dan komunitas yang supportif. Tempat terbaik untuk mengembangkan kemampuan panahan.',
    rating: 5
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-16 max-w-7xl mx-auto w-full bg-transparent">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#EEEAE4]">Testimoni</h2>
        <p className="max-w-2xl mx-auto text-[#EEEAE4]/85">
          Apa kata mereka yang sudah bergabung dengan kami
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="p-6 rounded-2xl bg-[#2B2527] shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-[#C7A04F] text-xl">★</span>
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-6 text-[#EEEAE4]/85 italic">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="pt-4 border-t border-[#8C8F8E]/30">
              <div className="font-bold text-sm text-[#EEEAE4]">{t.name}</div>
              <div className="text-xs text-[#EEEAE4]/70">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
