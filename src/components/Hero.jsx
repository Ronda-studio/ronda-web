import { useRef, useState, useEffect } from 'react';
import {Link as ScrollLink} from 'react-scroll';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from '../styles/Hero.module.css';
import ColorBends from './ColorBends';
import { CornerDownRight, Users} from 'lucide-react'
import logoronda from '../assets/logo-ronda.webp';

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
  
  // Smooth spring physics for scroll
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });

  // Transform values based on scroll
  const logoScale = useTransform(smoothScrollY, [0, 800], [1, 0.5]);
  const logoY = useTransform(smoothScrollY, [0, 800], [0, -150]);
  
  const leftX = useTransform(smoothScrollY, [0, 800], [0, -400]);
  const rightX = useTransform(smoothScrollY, [0, 800], [0, 400]);
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

      <motion.div 
        className={styles.stickyContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          opacity: heroExitOpacity,
          scale: heroExitScale,
          y: heroExitY
        }}
      >
              {/* ColorBends animated background */}
        <div className={styles.colorBendsWrapper}>
          <ColorBends
            colors={["#a7e3c1", "#6eeef2", "#97d779", "#1a2e1a"]}
            rotation={97}
            speed={0.2}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={0.6}
            noise={0.1}
            parallax={0.4}
            iterations={2}
            intensity={0.6}
            bandWidth={6}
            transparent
          />
        </div>
        <motion.div 
          className={styles.logoWrapper}
          style={{ scale: logoScale, y: logoY }}
        >
          <img src={logoronda} alt="Ronda" className={styles.logoImage} />
        </motion.div>
        
        <div className={styles.splitTextContainer}>
          <motion.div 
            className={styles.leftText}
            style={{ x: leftX, opacity: textOpacity }}
            variants={itemVariants}
          >
            <h1>Toda solución comienza</h1>
          </motion.div>
          <motion.div 
            className={styles.rightText}
            style={{ x: rightX, opacity: textOpacity }}
            variants={itemVariants}
          >
            <h1 className={styles.gradientText}>en una Ronda.</h1>
          </motion.div>
        </div>

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
        
        <motion.div 
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          
         
          <span>Descubre cómo</span>
        </motion.div>
      </motion.div>
      
      {/* Spacer to allow scrolling through the sticky effect */}
      <div className={styles.spacer}></div>

      {/* Organic luminous transition veil into ProjectsSection */}
      <div className={styles.transitionVeil}>
        <div className={styles.transitionGlow} />
        <svg className={styles.transitionCurve} viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
          <path
            d="M0,40 C360,110 1080,110 1440,40 L1440,120 L0,120 Z"
            fill="var(--bg-primary)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;