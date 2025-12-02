import { motion } from 'framer-motion';
import imgProfile from '../images/5.jpg';

const About = () => {
  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--color-black)' }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>The Artist</h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--color-gold)', margin: '0 auto' }}></div>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={imgProfile}
                alt="Tattoo Artist"
                style={{
                  width: '100%',
                  borderRadius: '4px',
                  boxShadow: '20px 20px 0 var(--color-dark-gray)'
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-accent)', textShadow: '2px 2px 0 #000' }}>Mario Llinares "Granota"</h3>
              <p style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
                Con más de 10 años de experiencia en el arte del tatuaje, me especializo en blackwork, realismo y diseños personalizados. Mi filosofía es simple: cada tatuaje debe ser una obra maestra única que refleje la historia de la persona.
              </p>
              <p style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
                Mantengo los más altos estándares de higiene y profesionalidad, asegurando una experiencia segura y cómoda para cada cliente. Ya sea tu primer tatuaje o uno más para tu colección, estoy aquí para dar vida a tu visión.
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '2.5rem', color: 'var(--color-accent)' }}>10+</h4>
                  <p style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-display)' }}>Años Exp.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '2.5rem', color: 'var(--color-accent)' }}>1k+</h4>
                  <p style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-display)' }}>Clientes</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '2.5rem', color: 'var(--color-accent)' }}>15</h4>
                  <p style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-display)' }}>Premios</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
