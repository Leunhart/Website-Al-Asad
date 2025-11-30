// /app/components/About.tsx
export default function About() {
  return (
    <section
      id="about-section"
      style={{ 
        padding: '5rem 1rem',
        backgroundColor: '#121213',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div 
        style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center'
        }}
      >
        {/* Card untuk Teks - DI KIRI */}
        <div 
          style={{ 
            backgroundColor: '#1a1a1b',
            padding: '3rem',
            borderRadius: '12px',
            border: '1px solid #2a2a2b',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          <h2 
            style={{ 
              fontSize: '2.25rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#ffffff',
              textAlign: 'left'
            }}
          >
            Profile Club
          </h2>
          
          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              color: '#d1d5db',
              lineHeight: '1.7',
              textAlign: 'left'
            }}
          >
            <p style={{ margin: 0 }}>
              Club Panahan Al-Asad didirikan pada tahun 2015 dengan visi menjadi wadah bagi 
              para pecinta olahraga panahan di Indonesia. Kami berkomitmen untuk mengembangkan 
              bakat dan minat masyarakat dalam olahraga panahan dengan pendekatan yang 
              professional namun tetap menyenangkan.
            </p>
            
            <p style={{ margin: 0 }}>
              Dengan pengalaman lebih dari 8 tahun, kami telah melatih ratusan anggota dari 
              berbagai kalangan usia, mulai dari anak-anak hingga dewasa. Banyak atlet kami 
              yang telah meraih prestasi di tingkat regional maupun nasional.
            </p>
            
            <p style={{ margin: 0 }}>
              Berlokasi di area yang asri dan alami, kami menyediakan fasilitas latihan 
              outdoor yang nyaman dan mendukung proses pembelajaran yang optimal.
            </p>
          </div>
        </div>

        {/* Gambar - DI KANAN */}
        <div 
          style={{ 
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
            height: '500px'
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1622052416859-d274b64c31f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoZXJ5JTIwY29tcGV0aXRpb24lMjBzcG9ydHxlbnwxfHx8fDE3NjA1MTY0NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Archery Competition Sport"
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          {/* Overlay gradient untuk efek dramatis */}
          <div 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(18, 18, 19, 0.1) 0%, rgba(18, 18, 19, 0.4) 100%)'
            }}
          />
        </div>
      </div>
    </section>
  );
}