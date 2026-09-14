import { useCountAnimation } from '../hooks/useCountAnimation';
import styles from '../styles/StatsSection.module.css';
import { Code2, Users, Coffee, Award } from 'lucide-react';
import { motion } from 'framer-motion';


const StatsSection = () => {
  const { count: proyectos, ref: ref1 } = useCountAnimation(12, 2000);
  const { count: clientes, ref: ref2 } = useCountAnimation(8, 2000);
  const { count: tecnologias, ref: ref3 } = useCountAnimation(9, 2000);
  const { count: cafes, ref: ref4 } = useCountAnimation(342, 2000);

  const stats = [
    {
      id: 1,
      value: proyectos,
      suffix: "+",
      label: "Proyectos construidos",
      description: "Entre demos, académicos y primeros clientes",
      icon: <Code2 size={32} />,
      ref: ref1
    },
    {
      id: 2,
      value: clientes,
      suffix: "",
      label: "Clientes que confían",
      description: "Pequeños negocios y emprendedores",
      icon: <Users size={32} />,
      ref: ref2
    },
    {
      id: 3,
      value: tecnologias,
      suffix: "",
      label: "Tecnologías dominadas",
      description: "React, Node, Python, SQL, Java, etc.",
      icon: <Award size={32} />,
      ref: ref3
    }
  ];

  return (
    <section as="section" className={styles.stats}>
      <div className="gridOverlay" />
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Impacto de nuestras Soluciones Digitales
        </motion.h2>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15, type: "spring" }}
            >
              <div
                ref={stat.ref}
                className={styles.statCard}
              >
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statValue}>
                  {stat.value}{stat.suffix}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statDescription}>{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;