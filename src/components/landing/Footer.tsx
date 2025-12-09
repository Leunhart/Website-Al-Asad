export default function Footer() {
  return (
    <footer id="contact" className="bg-[#2B2527] text-[#EEEAE4] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#C7A04F] grid place-items-center text-lg shadow-md">
                🎯
              </div>
              <h3 className="font-bold text-xl">Al Asad</h3>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Akademi panahan profesional untuk pengembangan atlet berprestasi.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <div className="text-sm space-y-3 opacity-90 text-[#EEEAE4]/80">
              <p>📧 Email: info@alasad.com</p>
              <p>📱 WhatsApp: +62 812-3456-7890</p>
              <p>📍 Lokasi: Ciamis, Jawa Barat, Indonesia</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Menu</h3>
            <nav className="text-sm space-y-3 opacity-90">
              <a href="#home" className="block hover:text-[#C7A04F] transition-colors duration-300">Home</a>
              <a href="#about" className="block hover:text-[#C7A04F] transition-colors duration-300">Tentang Kami</a>
              <a href="#programs" className="block hover:text-[#C7A04F] transition-colors duration-300">Program</a>
              <a href="/landing/pendaftaran" className="block hover:text-[#C7A04F] transition-colors duration-300">Pendaftaran</a>
            </nav>
          </div>
        </div>
        <div className="text-sm text-center pt-8 border-t border-[#8C8F8E]/30 opacity-80">
          <p>
            &copy; {new Date().getFullYear()} Al Asad Panahan Academy. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
