// 1. Import component Image dari Next.js
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="px-6 py-16 max-w-7xl mx-auto w-full bg-transparent">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Kolom Teks (Kiri) */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F0EEE9]">Tentang Al Asad</h2>
          <p className="text-base md:text-lg leading-relaxed mb-5 text-[#E8E5DF]">
            Al Asad Panahan Academy adalah akademi panahan yang berfokus pada 
            pembinaan atlet dari berbagai tingkat kemampuan. Kami berkomitmen 
            untuk mengembangkan potensi setiap anggota melalui program latihan 
            yang terstruktur dan profesional.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-[#E8E5DF]">
            Dengan pelatih berpengalaman dan fasilitas yang memadai, kami telah 
            menghasilkan banyak atlet berprestasi di tingkat daerah maupun nasional. 
            Bergabunglah dengan kami dan wujudkan impian Anda di dunia panahan.
          </p>
        </div>

        {/* Kolom Gambar (Kanan) */}
        {/* PENTING: Tambahkan class 'relative' di sini agar Image fill berfungsi */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-[#3C2D21]">
          <Image
            src="/foto.webp" // Pastikan file ada di folder 'public'
            alt="Suasana latihan di Al Asad Panahan Academy" // Alt text untuk aksesibilitas
            fill // Mengisi kontainer parent (aspect-[4/3])
            className="object-cover" // Agar gambar tidak gepeng (crop menyesuaikan area)
            // Sizes membantu browser memilih ukuran gambar yang tepat untuk di-download
            sizes="(max-width: 768px) 100vw, 50vw"
            priority // Opsional: Tambahkan jika gambar ini muncul di layar pertama kali (above the fold)
          />
        </div>
      </div>
    </section>
  );
}