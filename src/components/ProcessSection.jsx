import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText, FileText, Code2, Rocket } from 'lucide-react';
import styles from '../styles/ProcessSection.module.css';

const stages = [
  {
    id: 1,
    number: "01",
    title: "Charlamos",
    tag: "Descubrimiento",
    icon: MessageSquareText,
    description: "Nos juntamos a escuchar tus necesidades, entender tu negocio y definir los objetivos del proyecto sin vueltas."
  },
  {
    id: 2,
    number: "02",
    title: "Idea y Presupuesto",
    tag: "Estrategia",
    icon: FileText,
    description: "Diseñamos la propuesta técnica y de experiencia, trazamos la arquitectura y acordamos un plan claro y transparente."
  },
  {
    id: 3,
    number: "03",
    title: "Desarrollo",
    tag: "Construcción",
    icon: Code2,
    description: "Programamos con tecnologías modernas, testeos continuos y entregas progresivas para que veas el progreso en tiempo real."
  },
  {
    id: 4,
    number: "04",
    title: "Publicación y Soporte",
    tag: "Lanzamiento",
    icon: Rocket,
    description: "Desplegamos tu sistema en producción, capacitamos y nos quedamos a tu lado brindando mantenimiento y evolución constante."
  }
];

const ProcessSection = () => {
  const [activeStage, setActiveStage] = useState(null);

  return (
    <section as="section" id="process" className={styles.processSection}>
      <div className="gridOverlay" />
      <div className="container">
        {/* Encabezado con marca de agua idéntico al estilo del sitio */}
        <div className={styles.headerContainer}>
          <span className={styles.marcadeagua}>Proceso</span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Cómo trabajamos
          </motion.h2>
        </div>

        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Un camino claro desde la primera conversación hasta que tu solución esté en marcha.
        </motion.p>

        {/* Timeline interactiva */}
        <div className={styles.timelineContainer}>
          {/* Línea conectora */}
          <div className={styles.timelineTrack}>
            <div className={styles.timelineTrackGlow} />
          </div>

          <div className={styles.stepsGrid}>
            {stages.map((stage, index) => {
              const IconComponent = stage.icon;
              const isActive = activeStage === stage.id;

              return (
                <motion.div
                  key={stage.id}
                  className={`${styles.stepItem} ${isActive ? styles.activeStep : ''}`}
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: index * 0.15 }}
                  onMouseEnter={() => setActiveStage(stage.id)}
                  onMouseLeave={() => setActiveStage(null)}
                >
                  {/* Nodo central de la timeline con número e icono */}
                  <div className={styles.nodeWrapper}>
                    <div className={styles.nodeIconBox}>
                      <IconComponent size={28} />
                      <span className={styles.stepNumberBadge}>{stage.number}</span>
                    </div>
                  </div>

                  {/* Tarjeta con detalles y hover effect */}
                  <div className={styles.stepCard}>
                    <div className={styles.cardGlow} />
                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>
                    <span className={styles.stepTag}>{stage.tag}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
