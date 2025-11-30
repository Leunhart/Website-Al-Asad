function Hero() {
  return (
    <div style={heroStyles}>
      {/* Overlay gelap untuk kontras */}
      <div style={overlayStyles}></div>
      
      <div style={containerStyles}>
        <div style={contentStyles}>
          {/* Judul utama - SESUAI GAMBAR */}
          <h1 style={titleStyles}>
            Temukan Passion Anda dalam<br />
            <span style={subtitleStyles}>Club Panahan Al-Asad</span>
          </h1>
          
          {/* Deskripsi - SESUAI GAMBAR */}
          <p style={descriptionStyles}>
            Bergabunglah dengan klub panahan terbaik dan kembangkan kemampuan Anda 
            bersama pelatih profesional di lingkungan alam yang asri.
          </p>
          
          {/* Tombol - SESUAI GAMBAR */}
          <div style={buttonContainerStyles}>
            <button style={primaryButtonStyles}>
              Daftar Sekarang
            </button>
            <button style={secondaryButtonStyles}>
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline Styles untuk Hero dengan BACKGROUND GAMBAR
const heroStyles: React.CSSProperties = {
  backgroundImage: 'url("https://images.unsplash.com/photo-1654281700092-13c56ee48fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoZXJ5JTIwb3V0ZG9vciUyMHRhcmdldHxlbnwxfHx8fDE3NjA1MTU4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: 'white',
  minHeight: '100vh', // Full screen termasuk header
  display: 'flex',
  alignItems: 'center',
  padding: '0',
  margin: '0',
  fontFamily: 'Arial, sans-serif',
  position: 'relative'
};

// Overlay gelap untuk kontras
const overlayStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay transparan
  zIndex: 1
};

// Container
const containerStyles: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px',
  padding: '0 2rem',
  position: 'relative',
  zIndex: 2,
  margin: '0 auto'
};

// Konten di kiri - lebih ke kiri seperti gambar
const contentStyles: React.CSSProperties = {
  maxWidth: '500px',
  textAlign: 'left',
  marginLeft: '0' // Pastikan di kiri
};

// Judul utama - lebih kecil dan rapat seperti gambar
const titleStyles: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  lineHeight: '1.3',
  color: 'white'
};

// Subtitle - lebih kecil dan rapat
const subtitleStyles: React.CSSProperties = {
  fontSize: '2.2rem',
  fontWeight: 'bold',
  color: 'white',
  display: 'block',
  marginTop: '0.25rem'
};

// Garis pemisah horizontal
const dividerStyles: React.CSSProperties = {
  height: '1px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  margin: '1.5rem 0',
  width: '100%'
};

// Deskripsi - lebih compact seperti gambar
const descriptionStyles: React.CSSProperties = {
  fontSize: '1rem',
  margin: '1rem 0',
  lineHeight: '1.5',
  opacity: 0.9
};

// Container tombol
const buttonContainerStyles: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  marginTop: '1rem'
};

// Tombol primary
const primaryButtonStyles: React.CSSProperties = {
  backgroundColor: '#e8b923',
  color: '#1a472a',
  border: 'none',
  padding: '0.8rem 1.5rem',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  borderRadius: '4px',
  cursor: 'pointer',
  minWidth: '160px'
};

// Tombol secondary
const secondaryButtonStyles: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid white',
  padding: '0.8rem 1.5rem',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  borderRadius: '4px',
  cursor: 'pointer',
  minWidth: '160px'
};

export default Hero;