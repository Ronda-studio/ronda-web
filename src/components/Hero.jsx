import { useRef, useState, useEffect } from 'react';
import {Link as ScrollLink} from 'react-scroll';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from '../styles/Hero.module.css';
import ColorBends from './ColorBends';
import { CornerDownRight, Users} from 'lucide-react'
import logoronda from '../assets/logo-ronda.webp';
import team from '../assets/1014.mp4';
import ScrollExpand from './ScrollExpand';

const Hero = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for the glowing spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Framer Motion Scroll hooks
  const { scrollY } = useScroll();
  
  // Detección de dispositivo móvil para animaciones responsive
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaChange = (e) => setIsMobile(e.matches);
    
    // Compatibilidad para navegadores más antiguos que no soportan addEventListener en matchMedia
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
      return () => mediaQuery.removeListener(handleMediaChange);
    }
  }, []);
  
  // Smooth spring physics for scroll
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });

  // Transform values based on scroll y resolución (Mobile-First approach)
  const logoScale = useTransform(smoothScrollY, [0, 800], [1, isMobile ? 0.75 : 0.5]);
  const logoY = useTransform(smoothScrollY, [0, 800], [0, isMobile ? -80 : -150]);
  
  const leftX = useTransform(smoothScrollY, [0, 800], [0, isMobile ? -100 : -400]);
  const rightX = useTransform(smoothScrollY, [0, 800], [0, isMobile ? 100 : 400]);
  const textOpacity = useTransform(smoothScrollY, [0, 500], [1, 0]);

  // Smooth exit transition for the entire hero into the next section
  const heroExitOpacity = useTransform(smoothScrollY, [400, 750], [1, 0.2]);
  const heroExitScale = useTransform(smoothScrollY, [400, 780], [1, 0.95]);
  const heroExitY = useTransform(smoothScrollY, [400, 780], [0, -40]);

  // Entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
  };

  return (
    <section id="hero" ref={containerRef} className={styles.stickyHero}>
    
     <div 
     //   className={styles.mouseSpotlight} 
     //   style={{ 
      //    background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(110, 238, 242), transparent 70%)`
       // }} 
     />
      <div className="gridOverlay" />


<ScrollExpand
  src={team}
  alt="Product hero"
  title="Ronda"
  scrollHint="Scroll inside the frame"
  useWindowScroll
>
  <h2 style={{ color: 'var(--bg-hero)' }}>Toda solucion comienza en una </h2>
  <h2 style={{ color: 'var(--green-primary)' }}>Ronda.</h2>
  
  <motion.div 
          className={styles.badgeContainer}
          variants={itemVariants}
        >
          <ScrollLink to="contact" smooth={true} duration={300} className="btn-primary btn-blur">
            <CornerDownRight size={15} /> Hablemos
          </ScrollLink>
          <ScrollLink to="community" smooth={true} duration={300} className="btn-primary btn-blur">
            <Users size={15} /> Conocé Ronda
          </ScrollLink>
        </motion.div>
</ScrollExpand>

    </section>
  );
};

export default Hero;