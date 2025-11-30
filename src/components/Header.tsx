"use client";

import Link from "next/link";

function Header() {
  // Fungsi untuk smooth scroll ke section about
  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header style={headerStyles}>
      <nav style={navStyles}>
        {/* Logo Section */}
        <div style={logoContainerStyles}>
          <div style={logoStyles}>(apanih)</div>
          <Link href="/" style={logoTextStyles}>Al-Asad</Link>
        </div>
        
        {/* Navigation Menu Section */}
        <div style={rightSectionStyles}>
          <div style={menuStyles}>
            <Link href="/" style={menuLinkStyles}>Home</Link>
            <a 
              href="#about-section" 
              style={menuLinkStyles}
              onClick={handleScrollToAbout}
            >
              Tentang Kami
            </a>
            <Link href="/gallery" style={menuLinkStyles}>Galeri</Link>
            <Link href="/program" style={menuLinkStyles}>Program</Link>
            <Link href="/contact" style={menuLinkStyles}>Kontak</Link>
          </div>
          <button style={buttonStyles}>Daftar Sekarang</button>
        </div>
      </nav>
    </header>
  );
}

// Header Container Styles
const headerStyles: React.CSSProperties = {
  backgroundColor: '#722F37',
  color: 'white',
  padding: '1rem 0',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

// Navigation Container
const navStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem'
};

// Logo Container
const logoContainerStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

// Logo Icon
const logoStyles: React.CSSProperties = {
  fontSize: '2rem'
};

// Logo Text
const logoTextStyles: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '2rem',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif'
};

// Right Section Container (Menu + Button)
const rightSectionStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '2.0rem'
};

// Menu Items Container
const menuStyles: React.CSSProperties = {
  display: 'flex',
  gap: '2rem'
};

// Menu Link Styles
const menuLinkStyles: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '1.0rem',
  fontFamily: 'Arial, sans-serif',
  padding: '0.5rem 0',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: 'color 0.3s ease'
};

// CTA Button Styles
const buttonStyles: React.CSSProperties = {
  backgroundColor: '#e8b923',
  color: '#722F37',
  border: 'none',
  padding: '0.7rem 1.5rem',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
  whiteSpace: 'nowrap',
  fontFamily: 'Arial, sans-serif',
  transition: 'background-color 0.3s ease'
};

export default Header;