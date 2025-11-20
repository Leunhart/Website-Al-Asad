import { GraduationCap, Users, Award, Baby } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Programs() {
  const scrollToRegistration = () => {
    const element = document.getElementById("pendaftaran");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="program" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-primary">Program Latihan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pilih program yang sesuai dengan level dan kebutuhan Anda. Semua program didampingi oleh pelatih bersertifikat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pemula */}
          <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-center mb-3 text-primary">Program Pemula</h3>
            <div className="flex justify-center mb-4">
              <Badge>Beginner</Badge>
            </div>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Pengenalan dasar panahan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Teknik stance dan postur</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Peralatan disediakan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>12 sesi latihan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Sertifikat kelulusan</span>
              </li>
            </ul>
            <div className="text-center mb-4">
              <div className="text-3xl text-primary mb-1">Rp 750.000</div>
              <div className="text-sm text-muted-foreground">per bulan</div>
            </div>
            <Button onClick={scrollToRegistration} className="w-full">
              Daftar Program
            </Button>
          </Card>

          {/* Menengah */}
          <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-primary/40">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-center mb-3 text-secondary">Program Menengah</h3>
            <div className="flex justify-center mb-4">
              <Badge variant="secondary">Intermediate</Badge>
            </div>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">✓</span>
                <span>Pengembangan teknik lanjut</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">✓</span>
                <span>Latihan akurasi intensif</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">✓</span>
                <span>Kompetisi internal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">✓</span>
                <span>16 sesi latihan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">✓</span>
                <span>Analisis performa</span>
              </li>
            </ul>
            <div className="text-center mb-4">
              <div className="text-3xl text-secondary mb-1">Rp 900.000</div>
              <div className="text-sm text-muted-foreground">per bulan</div>
            </div>
            <Button onClick={scrollToRegistration} variant="secondary" className="w-full">
              Daftar Program
            </Button>
          </Card>

          {/* Lanjutan */}
          <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-accent/40">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-center mb-3 text-accent">Program Lanjutan</h3>
            <div className="flex justify-center mb-4">
              <Badge className="bg-accent text-accent-foreground">Advanced</Badge>
            </div>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Persiapan kompetisi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Strategi mental & fokus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Pelatih personal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>20 sesi latihan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                <span>Akses kompetisi regional</span>
              </li>
            </ul>
            <div className="text-center mb-4">
              <div className="text-3xl text-accent mb-1">Rp 1.200.000</div>
              <div className="text-sm text-muted-foreground">per bulan</div>
            </div>
            <Button 
              onClick={scrollToRegistration}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Daftar Program
            </Button>
          </Card>

          {/* Anak-anak */}
          <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Baby className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-center mb-3 text-primary">Program Anak-Anak</h3>
            <div className="flex justify-center mb-4">
              <Badge>Kids (8-15 tahun)</Badge>
            </div>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Pendekatan fun learning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Pembentukan karakter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Peralatan khusus anak</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>12 sesi latihan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Games & kompetisi mini</span>
              </li>
            </ul>
            <div className="text-center mb-4">
              <div className="text-3xl text-primary mb-1">Rp 650.000</div>
              <div className="text-sm text-muted-foreground">per bulan</div>
            </div>
            <Button onClick={scrollToRegistration} className="w-full">
              Daftar Program
            </Button>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-primary/5">
            <div className="text-4xl mb-2">👨‍🏫</div>
            <h4 className="mb-2 text-primary">Pelatih Bersertifikat</h4>
            <p className="text-sm text-muted-foreground">
              Semua pelatih memiliki sertifikasi nasional dan pengalaman kompetisi
            </p>
          </Card>
          <Card className="p-6 text-center bg-secondary/5">
            <div className="text-4xl mb-2">🎯</div>
            <h4 className="mb-2 text-secondary">Fasilitas Lengkap</h4>
            <p className="text-sm text-muted-foreground">
              Peralatan berkualitas dan lapangan standar kompetisi tersedia
            </p>
          </Card>
          <Card className="p-6 text-center bg-accent/10">
            <div className="text-4xl mb-2">🏆</div>
            <h4 className="mb-2 text-accent">Track Record Juara</h4>
            <p className="text-sm text-muted-foreground">
              Alumni kami telah meraih berbagai prestasi di tingkat regional dan nasional
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
