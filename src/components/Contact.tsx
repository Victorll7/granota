import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--color-dark-gray)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '2px 2px 0 var(--color-accent)' }}>Contacto</h2>
          <div style={{ width: '100px', height: '5px', backgroundColor: 'var(--color-accent)', margin: '0 auto', transform: 'skew(-20deg)' }}></div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem'
        }}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-accent)', fontFamily: 'var(--font-display)' }}>Información del Estudio</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <MapPin size={24} color="var(--color-accent)" />
                <div>
                  <p style={{ fontWeight: 'bold' }}>Ubicación</p>
                  <p style={{ color: 'var(--color-text-muted)' }}>Carlos Soler 35</p>
                  <p style={{ color: 'var(--color-text-muted)' }}>Mutxamel, Alicante</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Phone size={24} color="var(--color-accent)" />
                <div>
                  <p style={{ fontWeight: 'bold' }}>Teléfono</p>
                  <p style={{ color: 'var(--color-text-muted)' }}>+34 666 288 992</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Mail size={24} color="var(--color-accent)" />
                <div>
                  <p style={{ fontWeight: 'bold' }}>Email</p>
                  <p style={{ color: 'var(--color-text-muted)' }}>citas@granotatattoo.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Instagram size={24} color="var(--color-accent)" />
                <div>
                  <p style={{ fontWeight: 'bold' }}>Redes Sociales</p>
                  <a href="#" style={{ color: 'var(--color-text-muted)', textDecoration: 'underline' }}>@granotatattoo</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <input
                  type="text"
                  placeholder="Tu Nombre"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Tu Email"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <div>
                <textarea
                  rows={5}
                  placeholder="Cuéntame tu idea..."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    outline: 'none',
                    resize: 'vertical',
                    borderLeft: '4px solid var(--color-accent)'
                  }}
                  onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,0,85,0.1)'}
                  onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                />
              </div>
              <button type="submit" className="btn" style={{ width: '100%' }}>
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
