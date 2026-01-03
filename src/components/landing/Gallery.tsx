import Image from "next/image"; // 1. Import ini

const galleryImages = [
  { url: '/IMG_2467.webp', title: 'Lapangan Panahan' },
  { url: '/IMG_7410.webp', title: 'Target Practice' },
  { url: '/IMG_2451.webp', title: 'Latihan Outdoor' },
  { url: '/IMG_2452.webp', title: 'Fasilitas Club' },
  { url: '/IMG_7401.webp', title: 'Suasana Latihan' },
  { url: '/IMG_3517.webp', title: 'Lingkungan Alam' }
];

export default function Gallery() {
  return (
    <section id="gallery" className="px-6 py-[60px] max-w-7xl mx-auto w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EEE9]">Galeri</h2>
        <p className="max-w-2xl mx-auto text-[#E8E5DF]">
          Lihat suasana latihan dan fasilitas kami
        </p>
      </div>
      
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
        {galleryImages.map((img, i) => (
          <div 
            key={i} 
            // Tambahkan class 'relative' agar Image fill bekerja dgn benar
            className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition-all duration-300 group border-2 border-transparent hover:border-[#C29A13] bg-[#3C2D21]"
          >
            <Image
              src={img.url}
              alt={img.title}
              fill // Mengisi parent container (aspect-4/3)
              // Prop sizes ini SANGAT PENTING untuk performa
              // Browser akan download gambar kecil di HP, dan gambar besar di Desktop
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}