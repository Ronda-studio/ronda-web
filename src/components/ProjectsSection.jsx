import { useState } from 'react';
import styles from '../styles/ProjectsSection.module.css';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const projects = [
  {  
    id: 1,
    title: "HCD Alberdi",
    description: "Portal legislativo para acceso a la información pública y sistema de gestión de archivos para proyectos e iniciativas.",
    demo: "https://hcdalberdi.com.ar/",
    image: "./src/assets/hcdalberdi-ronda.webp"
  },
  {
    id: 2,
    title: "Tallerio",
    description: "Sistema nacido después de escuchar los desafíos diarios de talleres y fabricantes. Menos planillas. Más control. Más tiempo para producir.",
    demo: "#",
    image: "./src/assets/tallerio-ronda.webp"
  }
];

const ProjectCard = ({ project, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking para el efecto interactivo de Spotlight inspirado en Reactbits
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div 
      className={styles.projectCard}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      style={{ '--card-image': `url(${project.image})` }}
    >
      {/* Spotlight cursor glow */}
      <div 
        className={styles.cardSpotlight} 
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(119, 238, 209, 0.18), transparent 60%)`
        }}
      />

      <div className={styles.cardContent}>
        <div>
          <div className={styles.projectHeader}>
            <h3>{project.title}</h3>
            <div className={styles.projectLinks}>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" title="Ver">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
          <p className={styles.projectDescription}>{project.description}</p>
        </div>


      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section as="section" id="projects" className={styles.projectsSection}>
      <div className="gridOverlay" />
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Proyectos que construimos
        </motion.h2>
        <motion.p 
          className={styles.sectionSubtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Soluciones que se adaptan a tu realidad.
        </motion.p>
        
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;