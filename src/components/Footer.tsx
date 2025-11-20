import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                <span className="text-primary">🏹</span>
              </div>
              <span className="font-semibold text-xl">Al-Asad</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Klub panahan terpercaya untuk mengembangkan kemampuan Anda dalam olahraga panahan dengan pelatih profesional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#hero" className="hover:text-primary-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#profile" className="hover:text-primary-foreground transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-primary-foreground transition-colors">
                  Program
                </a>
              </li>
              <li>
                <a href="#jadwal" className="hover:text-primary-foreground transition-colors">
                  Jadwal & Acara
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-primary-foreground transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="mb-4">Program</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Program Pemula</li>
              <li>Program Menengah</li>
              <li>Program Lanjutan</li>
              <li>Program Anak-Anak</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Jl. Panahan Raya No. 123, Jakarta Selatan</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+62 821 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@clubpanahan.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 Club Panahan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
