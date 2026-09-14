import styles from '../styles/Footer.module.css';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CircularText from './CircularText';
import VariableProximity from './VariableProximity';
import logoImg from '../assets/logo-ronda.png';

const Footer = () => {
  return (
    <section as="footer" className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <motion.div 
          className={styles.footerBrand}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.brandHeader}>
            <CircularText
              text="RONDA ✦ SOFTWARE ✦ INNOVACIÓN ✦ "
              spinDuration={16}
              onHover="speedUp"
              radius={62}
              className={styles.circularBadge}
            >
              <img src={logoImg} alt="Ronda" className={styles.centerLogo} />
            </CircularText>
            <div className={styles.brandText}>

            <VariableProximity
            label="Ronda"
            className={styles.logoName}
            fromWeight={500}
            toWeight={1110}
            radius={90}
            falloff="gaussian"
             />
              
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.footerLinks}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.linkGroup}>
            <h4>Navegación</h4>
            <a href="#hero">Inicio</a>
            <a href="#projects">Proyectos</a>
            <a href="#team">Equipo</a>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Legal</h4>
            <a href="#">Términos y Condiciones</a>
            <a href="#">Política de Privacidad</a>
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.footerSocial}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4>Síguenos</h4>
          <div className={styles.socialIcons}>
            <a href="https://github.com/Ronda-studio" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/ronda.it" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className={styles.footerBottom}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p>&copy; {new Date().getFullYear()} Ronda. Todos los derechos reservados.</p>
      </motion.div>
    </section>
  );
};

export default Footer;
