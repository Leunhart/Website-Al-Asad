export default function CallToAction() {
  return (
    <section className="px-6 py-16 max-w-7xl mx-auto w-full">
      <div className="rounded-2xl bg-[#2B2527] p-10 text-center shadow-[0_18px_60px_rgba(0,0,0,0.26)]">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Siap Mulai Latihan?
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-[#EEEAE4] mb-4">Siap Bergabung?</h3>
        <p className="text-[#EEEAE4]/85 mb-6">Daftar sekarang dan mulai perjalanan panahanmu bersama Al-Asad.</p>
        <a
          href="/landing/pendaftaran"
          className="inline-block px-8 py-4 rounded-lg bg-[#4E0000] text-[#F5F5F3] font-bold hover:bg-[#6A1A1A] hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
          className="inline-block px-8 py-3 rounded-xl bg-[#7A2F36] text-[#EEEAE4] font-bold hover:bg-[#4B1E24] border border-[#C7A04F] transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
        >
          Daftar Sekarang
        </a>
      </div>
    </section>
  )
}
