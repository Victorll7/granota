import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (formData: FormData) => {
    const newErrors: { [key: string]: string } = {};
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    // Validación Nombre
    if (!name || name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
    }

    // Validación Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Por favor, introduce un email válido.';
    }

    // Validación Teléfono (Opcional pero con formato)
    if (phone.trim() && !/^\d{9}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'El teléfono debe tener 9 dígitos numéricos.';
    }

    // Validación Mensaje (Filtro de palabras ofensivas)
    const badWords = ['puta', 'puto', 'tonto', 'mierda', 'cabron', 'gilipollas', 'idiota', 'estupido', 'imbecil', 'joder', 'coño', 'maricon', 'zorra', 'capullo'];
    const containsBadWords = badWords.some(word => message.toLowerCase().includes(word));
    
    if (containsBadWords) {
      newErrors.message = 'Por favor, mantengamos un lenguaje respetuoso.';
    } else if (!message || message.trim().length === 0) {
      newErrors.message = 'El mensaje no puede estar vacío.';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validar antes de enviar
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xjknrjoz', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          const serverErrors: { [key: string]: string } = {};
          data.errors.forEach((err: any) => {
            // Mapear errores del servidor a campos si es posible
            if (err.field) serverErrors[err.field] = err.message;
            else serverErrors.general = err.message;
          });
          setErrors(serverErrors);
        } else {
          setErrors({ general: 'Hubo un error al enviar el mensaje.' });
        }
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: 'Error de conexión. Por favor, revisa tu internet.' });
      setStatus('error');
    }
  };

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
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Tu Nombre"
                  disabled={status === 'submitting'}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${errors.name ? '#ff4444' : 'rgba(255,255,255,0.1)'}`,
                    color: 'white',
                    outline: 'none',
                    opacity: status === 'submitting' ? 0.6 : 1
                  }}
                  onFocus={(e) => e.target.style.borderColor = errors.name ? '#ff4444' : 'var(--color-gold)'}
                  onBlur={(e) => e.target.style.borderColor = errors.name ? '#ff4444' : 'rgba(255,255,255,0.1)'}
                />
                {errors.name && <p style={{ color: '#ff4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.name}</p>}
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Tu Email"
                  disabled={status === 'submitting'}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${errors.email ? '#ff4444' : 'rgba(255,255,255,0.1)'}`,
                    color: 'white',
                    outline: 'none',
                    opacity: status === 'submitting' ? 0.6 : 1
                  }}
                  onFocus={(e) => e.target.style.borderColor = errors.email ? '#ff4444' : 'var(--color-gold)'}
                  onBlur={(e) => e.target.style.borderColor = errors.email ? '#ff4444' : 'rgba(255,255,255,0.1)'}
                />
                {errors.email && <p style={{ color: '#ff4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.email}</p>}
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Tu Teléfono (opcional)"
                  disabled={status === 'submitting'}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${errors.phone ? '#ff4444' : 'rgba(255,255,255,0.1)'}`,
                    color: 'white',
                    outline: 'none',
                    opacity: status === 'submitting' ? 0.6 : 1
                  }}
                  onFocus={(e) => e.target.style.borderColor = errors.phone ? '#ff4444' : 'var(--color-gold)'}
                  onBlur={(e) => e.target.style.borderColor = errors.phone ? '#ff4444' : 'rgba(255,255,255,0.1)'}
                />
                {errors.phone && <p style={{ color: '#ff4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.phone}</p>}
              </div>
              
              <div>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Cuéntame tu idea..."
                  disabled={status === 'submitting'}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${errors.message ? '#ff4444' : 'rgba(255,255,255,0.1)'}`,
                    color: 'white',
                    outline: 'none',
                    resize: 'vertical',
                    borderLeft: `4px solid ${errors.message ? '#ff4444' : 'var(--color-accent)'}`,
                    opacity: status === 'submitting' ? 0.6 : 1
                  }}
                  onFocus={(e) => e.target.style.backgroundColor = 'rgba(255,0,85,0.1)'}
                  onBlur={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                />
                {errors.message && <p style={{ color: '#ff4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{errors.message}</p>}
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    border: '1px solid rgba(0, 255, 0, 0.3)',
                    color: '#00ff00',
                    textAlign: 'center',
                    borderRadius: '4px'
                  }}
                >
                  ✓ ¡Mensaje enviado con éxito! Te responderé pronto.
                </motion.div>
              )}

              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 0, 0, 0.3)',
                    color: '#ff0000',
                    textAlign: 'center',
                    borderRadius: '4px'
                  }}
                >
                  ✗ {errors.general}
                </motion.div>
              )}

              <button 
                type="submit" 
                className="btn" 
                style={{ 
                  width: '100%',
                  opacity: status === 'submitting' ? 0.7 : 1,
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer'
                }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
