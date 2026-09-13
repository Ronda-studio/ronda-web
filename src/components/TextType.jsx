import { useState, useEffect, useRef } from 'react';
import styles from '../styles/TextType.module.css';

/**
 * TextType - Inspirado en Reactbits.dev
 * Typewriter effect component with viewport observation and animated blinking cursor.
 */
const TextType = ({
  text = '',
  speed = 35,
  delay = 0,
  cursor = true,
  cursorChar = '|',
  className = '',
  as: Component = 'span',
  startOnView = true,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const [isFinished, setIsFinished] = useState(false);
  const elementRef = useRef(null);

  // Observer para iniciar solo cuando entra en el viewport
  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 50px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  // Manejo de la animación mecanográfica
  useEffect(() => {
    if (!hasStarted || !text) return;

    let timeoutId;
    let currentIndex = 0;

    const startTyping = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsFinished(true);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(intervalId);
    };

    timeoutId = setTimeout(() => {
      startTyping();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [hasStarted, text, speed, delay, onComplete]);

  return (
    <Component ref={elementRef} className={`${styles.textTypeWrapper} ${className}`}>
      <span>{displayedText}</span>
      {cursor && (
        <span
          className={`${styles.cursor} ${isFinished ? styles.cursorIdle : ''}`}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </Component>
  );
};

export default TextType;
