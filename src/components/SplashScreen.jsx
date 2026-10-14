import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/SplashScreen.module.css';
import logoImg from '../assets/logo-ronda.webp';
import videologo from '../assets/1014 (1).mp4';

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
        transition: { duration: 2.35, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className={styles.logoWrapper}>
        <video
          src={videologo}
          className={styles.logo}
          autoPlay
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
        />
      </div>
          
      </motion.div>
  );
};

export default SplashScreen;
