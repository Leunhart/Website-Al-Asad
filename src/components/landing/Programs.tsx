const programs = [
  {
    title: 'Program Pemula',
    icon: '🎯',
    desc: 'Untuk yang baru memulai panahan. Belajar teknik dasar, postur, dan keselamatan.',
    features: ['Teknik dasar', 'Equipment pengenalan', 'Safety training']
  },
  {
    title: 'Program Menengah',
    icon: '🏹',
    desc: 'Meningkatkan kemampuan dengan latihan intensif dan teknik lanjutan.',
    features: ['Teknik lanjutan', 'Target training', 'Kompetisi lokal']
  },
  {
    title: 'Program Atlet',
    icon: '🏆',
    desc: 'Pembinaan intensif untuk atlet berprestasi yang ingin berkompetisi nasional.',
    features: ['Pelatihan intensif', 'Mental coaching', 'Kompetisi nasional']
  },
  {
    title: 'Program Anak',
    icon: '👶',
    desc: 'Program khusus untuk anak-anak dengan pendekatan yang fun dan edukatif.',
    features: ['Fun learning', 'Karakter building', 'Age-appropriate']
  }
]

export default function Programs() {
  return (
    <section id="programs" className="px-6 py-16 max-w-7xl mx-auto w-full bg-transparent">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EEE9]">Program Latihan</h2>
        <p className="max-w-2xl mx-auto text-[#E8E5DF]">
          Kami menyediakan berbagai program latihan yang disesuaikan dengan tingkat kemampuan dan tujuan Anda
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((p) => (
          <div key={p.title} className="p-6 rounded-xl bg-[#3C2D21] shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition-all duration-300 border-t-4 border-[#C29A13] transform hover:-translate-y-1">
            <div className="text-5xl mb-4">{p.icon}</div>
            <h3 className="text-xl font-bold mb-3 text-[#F0EEE9]">{p.title}</h3>
            <p className="text-sm text-[#E8E5DF] mb-4 leading-relaxed">{p.desc}</p>
            <ul className="space-y-2">
              {p.features.map((f) => (
                <li key={f} className="text-sm text-[#E8E5DF] flex items-center gap-2">
                  <span className="text-[#3D4A2B] font-bold">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
