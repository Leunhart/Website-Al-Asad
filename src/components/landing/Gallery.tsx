const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1518834107812-67b50fbc1ae1?auto=format&fit=crop&w=800&q=80',
    title: 'Lapangan Panahan'
  },
  {
    url: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=800&q=80',
    title: 'Target Practice'
  },
  {
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    title: 'Latihan Outdoor'
  },
  {
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    title: 'Fasilitas Club'
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    title: 'Suasana Latihan'
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    title: 'Lingkungan Alam'
  }
]

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
          <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.22)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition-all duration-300 group border-2 border-transparent hover:border-[#C29A13] bg-[#3C2D21]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
            />
          </div>
        ))}
      </div>
    </section>
  )
}
