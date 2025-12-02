import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Mail } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        padding: isScrolled ? '1rem 0' : '1.5rem 0',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" className="logo" style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', letterSpacing: '2px', textShadow: '2px 2px 0 var(--color-accent)' }}>
          GRANOTA<span style={{ color: 'var(--color-accent)' }}>TATTOO</span>
        </a>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'none', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'var(--font-display)',
                opacity: 0.9
              }}
              className="hover:text-accent glitch-text"
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              {link.name}
            </a>
          ))}
          <div style={{ width: '2px', height: '30px', backgroundColor: 'var(--color-accent)', margin: '0 1rem', transform: 'skew(-20deg)' }}></div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ opacity: 0.9 }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
            <Instagram size={24} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ color: 'white' }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              backgroundColor: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontSize: '1.2rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textAlign: 'center'
                }}
              >
                {link.name}
              </a>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
              <Instagram size={24} />
              <Mail size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
