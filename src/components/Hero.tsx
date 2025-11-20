import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const scrollToRegistration = () => {
    const element = document.getElementById("pendaftaran");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1654281700092-13c56ee48fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoZXJ5JTIwb3V0ZG9vciUyMHRhcmdldHxlbnwxfHx8fDE3NjA1MTU4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Archery outdoor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Temukan Passion Anda dalam Club Panahan Al-Asad
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Bergabunglah dengan klub panahan terbaik dan kembangkan kemampuan Anda bersama pelatih profesional di lingkungan alam yang asri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={scrollToRegistration}>
                Daftar Sekarang
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
