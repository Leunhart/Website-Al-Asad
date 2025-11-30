export default function ContactSection() {
  return (
    <section id="contact" className="px-6 py-16 max-w-7xl mx-auto w-full">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">Hubungi Kami</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Info Card */}
        <div className="card-soft card-soft-hover p-8 flex flex-col gap-6">
          <h3 className="text-xl font-semibold mb-2">Informasi Kontak</h3>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full bg-[#345243] grid place-items-center text-lg">📍</span>
              <div>
                <div className="font-medium">Alamat</div>
                <div className="opacity-80">Jl. Panahan Raya No. 123, Kebayoran Baru, Jakarta Selatan</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full bg-[#345243] grid place-items-center text-lg">📞</span>
              <div>
                <div className="font-medium">Telepon</div>
                <div className="opacity-80">+62 812 1234 5678</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full bg-[#345243] grid place-items-center text-lg">✉️</span>
              <div>
                <div className="font-medium">Email</div>
                <div className="opacity-80">info@alasadpanahan.com</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full bg-[#345243] grid place-items-center text-lg">⏰</span>
              <div>
                <div className="font-medium">Jam Operasional</div>
                <div className="opacity-80">Senin - Jumat 15:00 - 20:00 WIB<br/>Sabtu - Minggu 08:00 - 11:00 WIB</div>
              </div>
            </li>
          </ul>
        </div>
        {/* Form Card */}
        <div className="card-soft card-soft-hover p-8">
          <h3 className="text-xl font-semibold mb-2">Kirim Pesan</h3>
          <form className="flex flex-col gap-5 mt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">Nama Lengkap Anda</label>
              <input id="name" name="name" type="text" className="rounded-lg bg-[#2e3b34] border border-[var(--green-border)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#345243]" placeholder="Nama Anda" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input id="email" name="email" type="email" className="rounded-lg bg-[#2e3b34] border border-[var(--green-border)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#345243]" placeholder="email@domain.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">Pesan</label>
              <textarea id="message" name="message" rows={4} className="rounded-lg bg-[#2e3b34] border border-[var(--green-border)] px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#345243]" placeholder="Tulis pesan Anda di sini..."></textarea>
            </div>
            <button type="submit" className="btn-accent w-full mt-2">Kirim Pesan</button>
          </form>
        </div>
      </div>
    </section>
  )
}