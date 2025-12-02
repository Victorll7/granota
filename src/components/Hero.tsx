import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import img1 from '../images/ANIME.jpg';
import img2 from '../images/CARTOON.jpg';
import img3 from '../images/COMIC.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Placeholder images - replace with actual tattoo work later
  const slides = [
    {
      image: img1,
      title: "Arte en la Piel",
      subtitle: "Diseños personalizados que cuentan tu historia"
    },
    {
      image: img2,
      title: "Precisión y Pasión",
      subtitle: "Estudio profesional y seguro"
    },
    {
      image: img3,
      title: "Diseños Atemporales",
      subtitle: "Creando obras maestras"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);



  return (
    <section id="home" style={{ position: 'relative', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
      
      {/* Anime Speed Lines Background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '200%',
        height: '200%',
        background: 'repeating-conic-gradient(from 0deg, transparent 0deg, transparent 10deg, rgba(20,20,20, 0.8) 10deg, rgba(20,20,20, 0.8) 20deg)',
        transform: 'translate(-50%, -50%)',
        animation: 'spin 20s linear infinite',
        opacity: 0.3,
        zIndex: 1
      }} />
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
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "circOut" }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* Main Image with Glitch-ready container */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
             <motion.img 
              src={slides[currentSlide].image}
              alt="Hero"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 30px rgba(255, 0, 85, 0.3))'
              }}
              animate={{
                x: [0, -5, 5, -5, 0],
                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(-90deg)", "hue-rotate(0deg)"]
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.2, 0.4, 0.6, 1],
                repeat: 0,
                delay: 0.1
              }}
             />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="container" style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        zIndex: 10
      }}>
        <motion.h1
          key={`title-${currentSlide}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            marginBottom: '1rem',
            textShadow: '4px 4px 0 var(--color-accent)',
            fontStyle: 'italic',
            transform: 'skew(-5deg)'
          }}
        >
          {slides[currentSlide].title}
        </motion.h1>
        
        <motion.p
          key={`sub-${currentSlide}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '2rem',
            maxWidth: '600px'
          }}
        >
          {slides[currentSlide].subtitle}
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="btn"
        >
          Reserva tu Cita
        </motion.a>
      </div>



      {/* Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '15px',
        zIndex: 20
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '40px',
              height: '6px',
              backgroundColor: index === currentSlide ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              transform: 'skew(-20deg)',
              boxShadow: index === currentSlide ? '0 0 10px var(--color-accent)' : 'none'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
