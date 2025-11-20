import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Navigation({ onNavigate }: { onNavigate: (section: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary backdrop-blur-sm border-b border-secondary/30 shadow-sm">
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => scrollToSection("hero")} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground text-xl">🏹</span>
              </div>
              <span className="text-white font-semibold text-xl">Al-Asad</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-white hover:text-secondary transition-colors font-medium"
            >
              Home
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-secondary transition-colors font-medium">
                Tentang Kami
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => scrollToSection("profile")}>
                  Profile Club
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("fasilitas")}>
                  Fasilitas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("visi-misi")}>
                  Visi & Misi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("gallery")}>
                  Gallery
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-secondary transition-colors font-medium">
                Acara
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => scrollToSection("jadwal")}>
                  Jadwal Latihan
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("lomba")}>
                  Lomba
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("pendaftaran")}>
                  Pendaftaran Event
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => scrollToSection("program")}
              className="text-white hover:text-secondary transition-colors font-medium"
            >
              Program
            </button>

            <button
              onClick={() => scrollToSection("kontak")}
              className="text-white hover:text-secondary transition-colors font-medium"
            >
              Kontak
            </button>

            <Button onClick={() => scrollToSection("pendaftaran")} variant="secondary">
              Daftar Sekarang
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-secondary"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary/30">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left text-white hover:text-secondary transition-colors font-medium"
              >
                Home
              </button>
              
              <div className="flex flex-col gap-2 pl-4">
                <span className="text-secondary/80 text-sm font-medium">Tentang Kami</span>
                <button
                  onClick={() => scrollToSection("profile")}
                  className="text-left text-white hover:text-secondary transition-colors pl-2"
                >
                  Profile Club
                </button>
                <button
                  onClick={() => scrollToSection("fasilitas")}
                  className="text-left text-white hover:text-secondary transition-colors pl-2"
                >
                  Fasilitas
                </button>
                <button
                  onClick={() => scrollToSection("visi-misi")}
                  className="text-left text-white hover:text-secondary transition-colors pl-2"
                >
                  Visi & Misi
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-left text-white hover:text-secondary transition-colors pl-2"
                >
                  Gallery
                </button>
              </div>

              <div className="flex flex-col gap-2 pl-4">
                <span className="text-secondary/80 text-sm font-medium">Acara</span>
                <button
                  onClick={() => scrollToSection("jadwal")}
                  className="text-left text-white hover:text-secondary transition-colors pl-2"
                >
                  Jadwal Latihan
                </button>
                <button
                  onClick={() => scrollToSection("lomba")}
                  className="text-left text-white hover:text-secondary transition-colors pl-2"
                >
                  Lomba
                </button>
                <button
                  onClick={() => scrollToSection("pendaftaran")}
                  className="text-left text-white hover:text-secondary transition-colors pl-2"
                >
                  Pendaftaran Event
                </button>
              </div>

              <button
                onClick={() => scrollToSection("program")}
                className="text-left text-white hover:text-secondary transition-colors font-medium"
              >
                Program
              </button>

              <button
                onClick={() => scrollToSection("kontak")}
                className="text-left text-white hover:text-secondary transition-colors font-medium"
              >
                Kontak
              </button>

              <Button onClick={() => scrollToSection("pendaftaran")} variant="secondary" className="w-full">
                Daftar Sekarang
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
