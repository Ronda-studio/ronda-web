import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/SplashScreen.module.css';
import logoImg from '../assets/logo-ronda.webp';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Incremento suave de progreso simulando carga de recursos
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 750);
          return 100;
        }
        // Incremento con aceleración progresiva
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className={styles.splashContainer}
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 1.85, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className={styles.splashContent}>
        {/* Logo con halo de luz pulsante */}
        <motion.div
          className={styles.logoWrapper}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.85, ease: 'easeOut' }}
        >
          <div className={styles.glowAura} />
          <img src={logoImg} alt="Ronda" className={styles.logoImage} />
        </motion.div>

        {/* Título y Tagline */}
        <motion.div
          className={styles.textWrapper}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        >
          <h1 className={styles.brandTitle}>Ronda</h1>
          
        </motion.div>

        {/* Barra de progreso y porcentaje */}
        <motion.div
          className={styles.progressContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.5 }}
        >
          <div className={styles.progressBarTrack}>
            <motion.div
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={styles.progressInfo}>
            <span className={styles.statusText}>
              {progress < 150 ? 'Inicializando...' : 'Listo'}
            </span>
            <span className={styles.percentage}>
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
