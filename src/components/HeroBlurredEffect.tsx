import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';

const HeroBlurredEffect = () => {
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          {/* Blurred Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px) brightness(0.5)',
            transform: 'scale(1.1)' // Prevent blur edges
          }} />

          {/* Main Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1
          }}>
             <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))'
              }}
            />
          </div>

          {/* Overlay Gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))',
            zIndex: 2
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
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

      {/* Controls */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          color: 'white',
          opacity: 0.5,
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
      >
        <ChevronLeft size={48} />
      </button>

      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          color: 'white',
          opacity: 0.5,
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
      >
        <ChevronRight size={48} />
      </button>

      {/* Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 20
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentSlide ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              transform: index === currentSlide ? 'scale(1.5) rotate(45deg)' : 'scale(1) rotate(0deg)'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBlurredEffect;
