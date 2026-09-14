import React, { useState } from 'react';
import styles from '../styles/ContanctForm.module.css';
import { motion } from 'framer-motion';
import TextType from './TextType';


const ContactForm = () => {
  const [formData, setFormData] = useState({ 
    name: '',
    email: '',
    description: '' 
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validación (igual que antes)
  if (!formData.name || !formData.email || !formData.description) {
    alert("Por favor complete todos los campos obligatorios.");
    return;
  }



  setIsSubmitting(true);

  try {
    // ✅ Reemplazá esta URL con la que copiaste en el Paso 3
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyV59fwCcnn_LOkie7qWRVxERJ4D6cfzBXegOmBe90Onv1J8yh7c4qIWOZbIKnXd7Fy/exec";
    
    const response = await fetch(SCRIPT_URL, {
      method: 'POST', 
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if(result.success) {
      setIsSubmitting(false);
      setIsSuccess(true);
    }else {
      alert(result.error || "Hubo un error al enviar el formulario. Por favor intentá de nuevo.");
      setIsSubmitting(false);
    }
  } catch (error)  { console.error("Error al enviar:", error);
  alert("Hubo un error al enviar el formulario. Por favor intentá de nuevo.");
  setIsSubmitting(false);
  }
};

 const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      description: ''
    });
    ;
    setIsSuccess(false);
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
              <label className="form-label">Nombre</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label className="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="tu@email.com"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label className="form-label">Mensaje</label>
              <textarea 
                id="description" 
                name="description" 
                className="form-input"
                rows="4" 
                value={formData.description}
                onChange={handleChange}
                required 
                placeholder="Háblanos de tu idea..."
              ></textarea>
            </div>
            
            <motion.button 
              type="submit" 
              className={styles.submitBtn}
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
               <>
               <p>Procesando envio...</p>
               </> 
                ) :(
                 <>
                     Contactar
                    </> 
                )

              }
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
