import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';
import styles from '../styles/Header.module.css';
import VariableProximity from './VariableProximity';
import logoImg from '../assets/logo-ronda.png';

const HERO_ANIM_END = 650;

const navItems = [
  { label: 'Inicio', to: 'hero' },
  { label: 'Proyectos', to: 'projects' },
  { label: 'Equipo', to: 'team' },
  { label: 'Comunidad', to: 'community' }
];

const Header = () => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setLogoVisible(window.scrollY >= HERO_ANIM_END);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={styles.islandHeader}>
      <motion.div
        className={`${styles.islandContainer} ${mobileOpen ? styles.islandExpanded : ''}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className={styles.islandMainBar}>
          {/* Logo con animación y VariableProximity */}
          <div
            className={styles.headerLogo}
            style={{
              opacity: logoVisible ? 1 : 0.65,
              transition: 'opacity 0.4s ease'
            }}
          >
            <img src={logoImg} alt="Ronda" className={styles.logo} />
            <VariableProximity
              label="Ronda"
              className={styles.logoName}
              fromWeight={500}
              toWeight={900}
              radius={70}
              falloff="gaussian"
            />
          </div>

          {/* Navegación desktop en forma de cápsula */}
          <nav className={styles.desktopNav}>
            {navItems.map((item, index) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                smooth={true}
                duration={350}
                offset={-90}
                className={styles.navLink}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.label}
                {hoveredIndex === index && (
                  <motion.div
                    className={styles.activePill}
                    layoutId="islandPill"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </ScrollLink>
            ))}
          </nav>

          {/* Botón CTA desktop */}
          <div className={styles.ctaWrapper}>
            <ScrollLink to="contact" smooth={true} duration={500} offset={-90}>
              <button className={styles.islandContactBtn}>
                <span>Contacto</span>
                <ChevronRight size={15} />
              </button>
            </ScrollLink>
          </div>

          {/* Botón toggle móvil para desplegar la isla */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menú expandible animado dentro de la isla móvil */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileDropdown}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className={styles.mobileNavLinks}>
                {navItems.map((item) => (
                  <ScrollLink
                    key={`mobile-${item.to}`}
                    to={item.to}
                    smooth={true}
                    duration={350}
                    offset={-80}
                    className={styles.mobileNavLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </ScrollLink>
                ))}
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setMobileOpen(false)}
                >
                  <button className={styles.mobileContactBtn}>
                    Contacto <ChevronRight size={16} />
                  </button>
                </ScrollLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;