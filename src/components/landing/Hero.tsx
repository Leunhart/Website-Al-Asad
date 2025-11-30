export default function Hero() {
  return (
    <section id="home" className="relative min-h-[560px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* External background image (ensure usage complies with copyright) */}
        <div className="absolute inset-0 bg-[url('https://static.wikia.nocookie.net/webarebears/images/2/25/CARE1012051700029599_003_640x360.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 py-24 text-[var(--green-text-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Temukan Passion Anda dalam Club Panahan Al-Asad
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-xl text-secondary">
              Bergabunglah dengan klub panahan terbaik dan kembangkan kemampuan Anda bersama pelatih profesional di lingkungan alam yang asri.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/landing/pendaftaran"
                className="btn-primary px-7 py-3.5 font-bold"
              >
                Daftar Sekarang
              </a>
              <a
                href="#about"
                className="px-7 py-3.5 rounded-xl border border-[var(--green-border)] text-[var(--green-text-primary)] hover:bg-[#2e3b34] hover:border-[#2e3b34] transition-all duration-300"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
