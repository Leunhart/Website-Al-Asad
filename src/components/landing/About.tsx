export default function About() {
  return (
    <section id="about" className="px-6 py-16 max-w-7xl mx-auto w-full bg-transparent">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F0EEE9]">Tentang Al Asad</h2>
          <p className="text-base md:text-lg leading-relaxed mb-5 text-[#E8E5DF]">
            Al Asad Panahan Academy adalah akademi panahan yang berfokus pada 
            pembinaan atlet dari berbagai tingkat kemampuan. Kami berkomitmen 
            untuk mengembangkan potensi setiap anggota melalui program latihan 
            yang terstruktur dan profesional.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-[#E8E5DF]">
            Dengan pelatih berpengalaman dan fasilitas yang memadai, kami telah 
            menghasilkan banyak atlet berprestasi di tingkat daerah maupun nasional. 
            Bergabunglah dengan kami dan wujudkan impian Anda di dunia panahan.
          </p>
        </div>
        <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-[#3C2D21]">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xl font-semibold text-[#C29A13] text-center px-6">
              Foto Akademi
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
