import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/CircularText.module.css';

/**
 * CircularText - Inspirado en Reactbits.dev
 * Renders letters in a circular trajectory with continuous rotation and interactive hover states.
 */
const CircularText = ({
  text = 'RONDA ✦ SOFTWARE ✦ INNOVACIÓN ✦ ',
  spinDuration = 20,
  onHover = 'speedUp',
  radius = 65,
  className = '',
  children
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const letters = Array.from(text);
  const degStep = 360 / letters.length;

  // Modificador de velocidad según la prop onHover
  const getDuration = () => {
    if (!isHovered) return spinDuration;
    switch (onHover) {
      case 'speedUp':
        return spinDuration / 4;
      case 'slowDown':
        return spinDuration * 2.5;
      case 'pause':
        return 0;
      case 'goBonkers':
        return spinDuration / 10;
      default:
        return spinDuration;
    }
  };

  const activeDuration = getDuration();

  return (
    <div
      className={`${styles.container} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: radius * 2 + 40, height: radius * 2 + 40 }}
    >
      <motion.div
        className={styles.rotatingRing}
        animate={activeDuration > 0 ? { rotate: 360 } : {}}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: activeDuration > 0 ? activeDuration : undefined
        }}
      >
        {letters.map((letter, i) => {
          const rotation = i * degStep;
          return (
            <span
              key={`circ-${letter}-${i}`}
              className={styles.letter}
              style={{
                transform: `rotate(${rotation}deg) translate(0px, -${radius}px)`
              }}
            >
              {letter}
            </span>
          );
        })}
      </motion.div>

      {children && <div className={styles.centerSlot}>{children}</div>}
    </div>
  );
};

export default CircularText;
