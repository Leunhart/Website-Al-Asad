export default function CallToAction() {
  return (
    <section className="px-6 max-w-4xl mx-auto w-full text-center flex flex-col items-center gap-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Siap Mulai Latihan?
      </h2>
      <p className="max-w-prose text-lg leading-relaxed opacity-85">
        Bergabung dengan Al Asad dan temukan potensi terbaik Anda dalam
        Panahan. Latihan terarah, komunitas suportif, dan peluang meraih
        prestasi.
      </p>
      <a
        href="/pendaftaran"
        className="px-8 py-4 rounded-md bg-foreground text-background font-semibold hover:opacity-90 transition"
      >
        Daftar Sekarang
      </a>
    </section>
  )
}
