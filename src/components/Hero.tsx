import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../images/logo.png';

const Hero = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-transition from intro to hero content
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3500); // 3.5 seconds total intro duration
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <section id="home" style={{ position: 'relative', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
      
      {/* Anime Speed Lines Background - Hidden during intro */}
      {!showIntro && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200%',
          height: '200%',
          background: 'repeating-conic-gradient(from 0deg, transparent 0deg, transparent 10deg, rgba(30,30,30, 0.8) 10deg, rgba(30,30,30, 0.8) 20deg)',
          transform: 'translate(-50%, -50%)',
          animation: 'spin 20s linear infinite',
          opacity: isMobile ? 0.4 : 0.3,
          zIndex: 1
        }} />
      )}
      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>

      {/* Scanline Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 51%)',
        backgroundSize: '100% 4px',
        zIndex: 5,
        pointerEvents: 'none',
        opacity: 0.2
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        animation: 'scanline 3s linear infinite',
        zIndex: 6,
        pointerEvents: 'none',
        boxShadow: '0 0 10px rgba(255,255,255,0.2)'
      }} />

      <AnimatePresence mode="wait">
        {showIntro ? (
          // Logo Intro Animation
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 20
            }}
          >
            <motion.img
              src={logo}
              alt="GRANOTATATTOO"
              initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
              animate={{ 
                scale: [0.5, 1.2, 1],
                opacity: [0, 1, 1, 1, 0],
                filter: ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']
              }}
              transition={{
                duration: 3.5,
                times: [0, 0.23, 0.71, 0.86, 1],
                ease: "easeInOut"
              }}
              style={{
                maxWidth: isMobile ? '90%' : '80%',
                maxHeight: isMobile ? '60%' : '70%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 40px rgba(255, 0, 85, 0.6))'
              }}
            />
          </motion.div>
        ) : (
          // Hero Content
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container"
            style={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              zIndex: 10
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 5rem)',
                marginBottom: '1rem',
                textShadow: '4px 4px 0 var(--color-accent)',
                fontStyle: 'italic',
                transform: 'skew(-5deg)',
                width: '100%'
              }}
            >
              Arte en la Piel
            </h1>
            
            <p
              style={{
                fontSize: isMobile ? '1rem' : 'clamp(1rem, 2vw, 1.5rem)',
                color: 'rgba(255,255,255,0.9)',
                marginBottom: '2rem',
                maxWidth: '600px'
              }}
            >
              Diseños personalizados que cuentan tu historia
            </p>

            <a
              href="#contact"
              className="btn"
              style={{
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem'
              }}
            >
              Reserva tu Cita
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
