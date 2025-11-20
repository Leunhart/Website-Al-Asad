import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Send } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pesan Anda telah terkirim! Kami akan segera merespons.");
    setFormData({ nama: "", email: "", pesan: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="kontak" className="py-20 bg-muted/30">
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-primary">Hubungi Kami</h2>
          <p className="text-muted-foreground">
            Ada pertanyaan? Jangan ragu untuk menghubungi kami
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-6 text-primary">Informasi Kontak</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Alamat</h4>
                    <p className="text-muted-foreground">
                      Jl. Panahan Raya No. 123<br />
                      Kebayoran Baru, Jakarta Selatan<br />
                      DKI Jakarta 12180
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Telepon</h4>
                    <p className="text-muted-foreground">
                      +62 821 1234 5678<br />
                      +62 812 9876 5432
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      info@clubpanahan.com<br />
                      admin@clubpanahan.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Jam Operasional</h4>
                    <p className="text-muted-foreground">
                      Senin - Jumat: 15:00 - 20:00 WIB<br />
                      Sabtu - Minggu: 07:00 - 15:00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 text-primary">Ikuti Kami</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary hover:text-white">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  @clubpanahan (Instagram)
                </p>
                <p className="text-sm text-muted-foreground">
                  Club Panahan Official (Facebook)
                </p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-6">
            <h3 className="mb-6 text-primary">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Nama lengkap Anda"
                  required
                />
              </div>

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
                <Label htmlFor="pesan">Pesan</Label>
                <Textarea
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  placeholder="Tulis pesan Anda di sini..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Kirim Pesan
              </Button>
            </form>
          </Card>
        </div>

        {/* Map */}
        <div className="mt-12">
          <Card className="overflow-hidden">
            <div className="bg-primary text-primary-foreground p-4">
              <h3>Lokasi Kami</h3>
            </div>
            <div className="relative h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0267583471907!2d106.79324731476898!3d-6.253317095461939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f160deb48db5%3A0x7728c2e95c09e47!2sKebayoran%20Baru%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1634567890123!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Club Panahan"
              />
            </div>
            <div className="p-4 bg-muted/30">
              <p className="text-sm text-muted-foreground">
                <MapPin className="inline w-4 h-4 mr-1" />
                Jl. Panahan Raya No. 123, Kebayoran Baru, Jakarta Selatan
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
