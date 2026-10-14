import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from '../styles/FaqSection.module.css';

const faqs = [
  {
    id: 1,
    question: "¿Qué tipo de soluciones desarrollan en Ronda?",
    answer: "Creamos software a medida: aplicaciones web, plataformas de gestión interna, sistemas para comercios o industrias y páginas institucionales de alto impacto. Nos adaptamos a los procesos reales de cada cliente."
  },
  {
    id: 2,
    question: "¿Cómo se definen los costos y tiempos de entrega?",
    answer: "Tras una primera reunión de diagnóstico, analizamos el alcance y te entregamos una propuesta clara con etapas, plazos realistas y un presupuesto cerrado sin sorpresas ni letra chica."
  },
  {
    id: 3,
    question: "¿Puedo ver el avance del proyecto mientras se construye?",
    answer: "Totalmente. Trabajamos con entregas progresivas e iterativas. Vas a tener acceso a entornos de prueba para ver y probar las funciones en tiempo real a medida que las desarrollamos."
  },
  {
    id: 4,
    question: "¿Qué sucede una vez que el sistema está publicado?",
    answer: "No te dejamos solo. Realizamos el despliegue en servidores seguros, capacitamos a tu equipo en el uso de la herramienta y brindamos soporte técnico continuo y mantenimiento evolutivo."
  },
  {
    id: 5,
    question: "¿Necesito conocimientos técnicos previos para trabajar con ustedes?",
    answer: "Para nada. Nosotros nos ocupamos de toda la complejidad técnica, la infraestructura y el diseño. Vos solo necesitás contarnos sobre tu negocio y tus objetivos."
  }
];

const FaqSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section as="section" id="faq" className={styles.faqSection}>
      <div className="gridOverlay" />
      <div className="container">
        
        {/* Encabezado con marca de agua idéntica a la estética del sitio */}
        <div className={styles.headerContainer}>
          <span className={styles.marcadeagua}>Preguntas</span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Preguntas Frecuentes
          </motion.h2>
        </div>

        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Todo lo que necesitás saber antes de comenzar a construir tu próximo proyecto junto a nosotros.
        </motion.p>

        {/* Lista de preguntas desplegables */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className={styles.iconCircle}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.faqAnswerWrapper}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className={styles.faqAnswer}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
