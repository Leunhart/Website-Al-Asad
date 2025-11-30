export default function Hero() {
  return (
    <section className="px-6 pt-20 pb-12 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Al Asad Panahan Academy
        </h1>
        <p className="text-lg leading-relaxed mb-6 max-w-prose">
          Tempat berlatih Panahan yang berfokus pada pembinaan atlet, disiplin, dan
          pencapaian prestasi. Bergabunglah bersama kami untuk memulai perjalanan
          bela diri Anda.
        </p>
        <div className="flex gap-4">
          <a
            href="/pendaftaran"
            className="px-6 py-3 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition"
          >
            Daftar Sekarang
          </a>
          <a
            href="#prestasi"
            className="px-6 py-3 rounded-md border border-foreground font-medium hover:bg-foreground hover:text-background transition"
          >
            Lihat Prestasi
          </a>
        </div>
      </div>
      <div className="flex-1 w-full max-w-md aspect-square rounded-xl bg-gradient-to-br from-foreground/10 to-foreground/30 flex items-center justify-center text-center p-6">
        <span className="text-xl font-semibold opacity-80">
          Foto / Ilustrasi Akademi
        </span>
      </div>
    </section>
  )
}
