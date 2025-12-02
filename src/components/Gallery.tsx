import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Import images
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';
import img5 from '../images/5.jpg';
import img6 from '../images/6.jpg';
import img7 from '../images/7.jpg';
import img8 from '../images/8.jpg';
import img9 from '../images/9.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Local images
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="section" style={{ backgroundColor: 'var(--color-black)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '2px 2px 0 var(--color-accent)' }}>Últimos Trabajos</h2>
          <div style={{ width: '100px', height: '5px', backgroundColor: 'var(--color-accent)', margin: '0 auto', transform: 'skew(-20deg)' }}></div>
        </motion.div>

        {isMobile ? (
          // Mobile Slider
          <div style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <AnimatePresence initial={false} mode="popLayout">
                {images.map((img, index) => {
                  // Calculate position relative to active index
                  let position = (index - activeIndex);
                  // Handle wrap-around logic for infinite feel
                  if (position < -Math.floor(images.length / 2)) position += images.length;
                  if (position > Math.floor(images.length / 2)) position -= images.length;

                  // Only render visible slides (active + 1 neighbor on each side)
                  if (Math.abs(position) > 1) return null;

                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0, x: position * 100 }}
                      animate={{
                        scale: position === 0 ? 1 : 0.8,
                        opacity: position === 0 ? 1 : 0.5,
                        x: `${position * 60}%`, // Overlap effect
                        zIndex: position === 0 ? 10 : 5,
                        rotateY: position * -15 // 3D effect
                      }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_e, { offset }) => {
                        const swipe = offset.x;

                        if (swipe < -50) {
                          nextSlide();
                        } else if (swipe > 50) {
                          prevSlide();
                        }
                      }}
                      style={{
                        position: 'absolute',
                        width: '70%',
                        aspectRatio: '3/4',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: position === 0 ? '0 0 30px var(--color-accent)' : 'none',
                        border: position === 0 ? '3px solid var(--color-accent)' : 'none',
                        backgroundColor: '#000',
                        cursor: 'grab',
                        touchAction: 'none' // Important for drag on mobile
                      }}
                      onClick={() => {
                        if (position === 0) setSelectedImage(img);
                        else setActiveIndex(index);
                      }}
                    >
                      <img
                        src={img}
                        alt={`Tattoo work ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          pointerEvents: 'none' // Prevent image drag interfering with motion drag
                        }}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          // Desktop Grid
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(img)}
                style={{
                  position: 'relative',
                  aspectRatio: '1/1',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                <img
                  src={img}
                  alt={`Tattoo work ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.95)',
              zIndex: 2000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                color: 'white',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={32} />
            </button>
            <motion.img
              src={selectedImage}
              alt="Selected tattoo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
