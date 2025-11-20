import { Calendar, Clock, MapPin, Trophy } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner";

export function Events() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    event: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pendaftaran berhasil! Kami akan menghubungi Anda segera.");
    setFormData({ nama: "", email: "", phone: "", event: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Jadwal Latihan */}
      <section id="jadwal" className="py-20 bg-background">
        <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
          <h2 className="text-4xl mb-12 text-center text-primary">
            Jadwal Latihan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-primary">Senin & Rabu</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>16:00 - 18:00 WIB</span>
                </div>
                <Badge variant="secondary">Pemula & Menengah</Badge>
                <p className="text-sm">
                  Latihan dasar dan pengembangan teknik untuk level pemula hingga menengah
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-primary">Selasa & Kamis</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>15:00 - 17:00 WIB</span>
                </div>
                <Badge variant="secondary">Anak-anak</Badge>
                <p className="text-sm">
                  Program khusus untuk anak-anak usia 8-15 tahun dengan pendekatan yang menyenangkan
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-primary">Sabtu & Minggu</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>07:00 - 12:00 WIB</span>
                </div>
                <Badge variant="secondary">Semua Level</Badge>
                <p className="text-sm">
                  Latihan intensif untuk semua level dengan sesi terpisah per kategori
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-8 bg-muted/30 p-6 rounded-lg">
            <p className="text-center">
              <strong>Catatan:</strong> Pendaftaran latihan dibuka 2 hari sebelum jadwal. Hubungi admin untuk informasi lebih lanjut.
            </p>
          </div>
        </div>
      </section>

      {/* Lomba */}
      <section id="lomba" className="py-20 bg-muted/30">
        <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
          <h2 className="text-4xl mb-12 text-center text-primary">
            Lomba & Kompetisi
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="bg-primary text-primary-foreground p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-6 h-6" />
                  <h3>Turnamen Regional</h3>
                </div>
                <p className="text-sm text-primary-foreground/90">15-17 November 2025</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p>Lapangan Panahan Regional, Jakarta</p>
                  </div>
                </div>
                <p>
                  Kompetisi panahan tingkat regional dengan berbagai kategori: Recurve, Compound, dan Traditional. Terbuka untuk semua usia.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Recurve</Badge>
                  <Badge>Compound</Badge>
                  <Badge>Traditional</Badge>
                </div>
                <Button className="w-full">Daftar Sekarang</Button>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-secondary text-secondary-foreground p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-6 h-6" />
                  <h3>Championship Nasional</h3>
                </div>
                <p className="text-sm text-secondary-foreground/90">20-25 Desember 2025</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-secondary mt-1" />
                  <div>
                    <p>Senayan, Jakarta Pusat</p>
                  </div>
                </div>
                <p>
                  Kejuaraan nasional dengan hadiah total puluhan juta rupiah. Kesempatan untuk bertanding dengan atlet terbaik se-Indonesia.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">National Level</Badge>
                  <Badge variant="secondary">Prize Pool</Badge>
                </div>
                <Button variant="secondary" className="w-full">Daftar Sekarang</Button>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-accent text-accent-foreground p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-6 h-6" />
                  <h3>Fun Competition Kids</h3>
                </div>
                <p className="text-sm text-accent-foreground/90">5 Januari 2026</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p>Lapangan Club Panahan</p>
                  </div>
                </div>
                <p>
                  Kompetisi khusus anak-anak dengan suasana fun dan edukatif. Semua peserta mendapat medali dan doorprize menarik.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Usia 8-15 tahun</Badge>
                  <Badge>Doorprize</Badge>
                </div>
                <Button variant="outline" className="w-full">Daftar Sekarang</Button>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-primary/10 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  <h3 className="text-primary">Internal Club Tournament</h3>
                </div>
                <p className="text-sm text-muted-foreground">Setiap bulan</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p>Lapangan Club Panahan</p>
                  </div>
                </div>
                <p>
                  Turnamen internal untuk mengasah kemampuan dan mempersiapkan anggota menghadapi kompetisi eksternal.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Member Only</Badge>
                  <Badge>Monthly</Badge>
                </div>
                <Button variant="outline" className="w-full">Info Lebih Lanjut</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pendaftaran Event */}
      <section id="pendaftaran" className="py-20 bg-background">
        <div className="w-full px-6 lg:px-12 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Pendaftaran Event</h2>
            <p className="text-muted-foreground">
              Daftar untuk mengikuti event atau latihan di Club Panahan Al-Asad dengan mengisi formulir di bawah ini.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="event">Pilih Event/Program</Label>
                <Input
                  id="event"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  placeholder="Contoh: Program Pemula, Turnamen Regional, dll"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Pesan/Catatan (Opsional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tambahkan catatan atau pertanyaan"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Kirim Pendaftaran
              </Button>
            </form>
          </Card>

          <div className="mt-8 text-center text-muted-foreground">
            <p>
              Setelah mendaftar, tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi dan informasi lebih lanjut.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
