export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-foreground/10">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <div className="w-8 h-8 rounded-full bg-foreground/20 grid place-items-center text-sm">A</div>
          <span>Al-Asad</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
          <a href="#home" className="hover:opacity-100">Home</a>
          <a href="#about" className="hover:opacity-100">Tentang Kami</a>
          <a href="#competitions" className="hover:opacity-100">Acara</a>
          <a href="#programs" className="hover:opacity-100">Program</a>
          <a href="#contact" className="hover:opacity-100">Kontak</a>
        </nav>
        <a
          href="/pendaftaran"
          className="px-4 py-2 rounded-md bg-[color:var(--foreground)] text-[color:var(--background)] text-sm font-medium hover:opacity-90"
        >
          Daftar Sekarang
        </a>
      </div>
    </header>
  )
}
