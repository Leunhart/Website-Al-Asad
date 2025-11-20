import { Target, Trophy, Users, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";

export function About() {
  return (
    <>
      {/* Profile Club */}
      <section id="profile" className="py-20 bg-background">
        <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-6 text-primary">Profile Club</h2>
              <p className="mb-4">
                Club Panahan Al-Asad didirikan pada tahun 2015 dengan visi menjadi wadah bagi para pecinta olahraga panahan di Indonesia. Kami berkomitmen untuk mengembangkan bakat dan minat masyarakat dalam olahraga panahan dengan pendekatan yang profesional namun tetap menyenangkan.
              </p>
              <p className="mb-4">
                Dengan pengalaman lebih dari 8 tahun, kami telah melatih ratusan anggota dari berbagai kalangan usia, mulai dari anak-anak hingga dewasa. Banyak atlet kami yang telah meraih prestasi di tingkat regional maupun nasional.
              </p>
              <p>
                Berlokasi di area yang asri dan alami, kami menyediakan fasilitas latihan outdoor yang nyaman dan mendukung proses pembelajaran yang optimal.
              </p>
            </div>
            <div className="relative h-96">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1622052416859-d274b64c31f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoZXJ5JTIwY29tcGV0aXRpb24lMjBzcG9ydHxlbnwxfHx8fDE3NjA1MTY0NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Archery competition"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <section id="fasilitas" className="py-20 bg-muted/30">
        <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
          <h2 className="text-4xl mb-12 text-center text-primary">Fasilitas Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">Target Standar Internasional</h3>
              <p className="text-muted-foreground">
                Target berkualitas tinggi sesuai standar kompetisi internasional
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏹</span>
              </div>
              <h3 className="mb-2">Peralatan Lengkap</h3>
              <p className="text-muted-foreground">
                Busur dan arrow berkualitas tersedia untuk peminjaman
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">Ruang Istirahat</h3>
              <p className="text-muted-foreground">
                Area istirahat yang nyaman dengan fasilitas lengkap
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">Lapangan Outdoor</h3>
              <p className="text-muted-foreground">
                Lapangan luas dengan pemandangan alam yang asri
              </p>
            </Card>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1572726243931-884b05e4a198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoZXJ5JTIwZXF1aXBtZW50JTIwYm93fGVufDF8fHx8MTc2MDUxNjQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Archery equipment"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1672702251238-c5a34065e7c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBvdXRkb29yJTIwbmF0dXJlfGVufDF8fHx8MTc2MDUxNjQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Outdoor nature"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1721885876144-25863108be60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmYWNpbGl0eSUyMGluZG9vcnxlbnwxfHx8fDE3NjA0NTY4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Sports facility"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section id="visi-misi" className="py-20 bg-background">
        <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 bg-gradient-to-br from-secondary/30 via-white/80 to-primary/20 border-0 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-md">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-secondary drop-shadow">Visi</h2>
              </div>
              <p className="text-lg md:text-xl text-primary font-medium italic leading-relaxed">
                Menjadi klub panahan terdepan di Indonesia yang mencetak atlet-atlet berprestasi dan memasyarakatkan olahraga panahan sebagai gaya hidup sehat dan sportif.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary/30 via-white/80 to-secondary/20 border-0 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-md">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-primary drop-shadow">Misi</h2>
              </div>
              <ul className="space-y-3 text-lg md:text-xl text-secondary font-medium italic leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Memberikan pelatihan berkualitas dengan standar internasional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Mengembangkan karakter dan disiplin melalui olahraga</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Menciptakan komunitas panahan yang solid dan suportif</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Memfasilitasi atlet untuk berkompetisi di berbagai event</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-muted/30">
        <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
          <h2 className="text-4xl mb-12 text-center text-primary">Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-72 overflow-hidden rounded-lg shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1654281700092-13c56ee48fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoZXJ5JTIwb3V0ZG9vciUyMHRhcmdldHxlbnwxfHx8fDE3NjA1MTU4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gallery 1"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-72 overflow-hidden rounded-lg shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1622052416859-d274b64c31f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoZXJ5JTIwY29tcGV0aXRpb24lMjBzcG9ydHxlbnwxfHx8fDE3NjA1MTY0NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gallery 2"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-72 overflow-hidden rounded-lg shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1572726243931-884b05e4a198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoZXJ5JTIwZXF1aXBtZW50JTIwYm93fGVufDF8fHx8MTc2MDUxNjQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gallery 3"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-72 overflow-hidden rounded-lg shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1672702251238-c5a34065e7c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBvdXRkb29yJTIwbmF0dXJlfGVufDF8fHx8MTc2MDUxNjQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gallery 4"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-72 overflow-hidden rounded-lg shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1700914299961-d8f91559d85d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc3BvcnRzJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzYwNTE2NDc3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gallery 5"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-72 overflow-hidden rounded-lg shadow-lg group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1721885876144-25863108be60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmYWNpbGl0eSUyMGluZG9vcnxlbnwxfHx8fDE3NjA0NTY4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gallery 6"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
