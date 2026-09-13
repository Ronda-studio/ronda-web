import { useState } from 'react';
import styles from '../styles/ContanctForm.module.css';
import { motion } from 'framer-motion';
import TextType from './TextType';


const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('enviando');
    // Simulate API call
    setTimeout(() => {
      setStatus('enviado');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="gridOverlay" />
      <div className={`container ${styles.contactContainer}`}>
        <motion.div 
          className={styles.contactInfo}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>
            <TextType text="¿Listo para empezar?" speed={40} delay={200} cursorChar="_" />
          </h2>
          <p>
            <TextType
              text="Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad. Nuestro equipo te responderá en menos de 24 horas."
              speed={18}
              delay={1100}
              cursor={false}
            />
          </p>
          <div className={styles.contactDetails}>
            <div className={styles.detailItem}>
              <strong>Email:</strong>
              <a href="mailto:contact@rondastudios.com">contact@rondastudios.com</a>
            </div>
            <div className={styles.detailItem}>
              <strong>Ubicación:</strong>
              <span>Tucumán, Argentina.</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.formWrapper}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nombre</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="tu@email.com"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="message">Mensaje</label>
              <textarea 
                id="message" 
                name="message" 
                rows="4" 
                value={formData.message}
                onChange={handleChange}
                required 
                placeholder="Háblanos de tu idea..."
              ></textarea>
            </div>
            
            <motion.button 
              type="submit" 
              className={styles.submitBtn}
              disabled={status === 'enviando'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === 'enviando' ? 'Enviando...' : status === 'enviado' ? '¡Mensaje Enviado!' : 'Enviar Mensaje'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
