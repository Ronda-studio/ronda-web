import { useRef, useEffect } from 'react';

/**
 * VariableProximity - Inspirado en Reactbits.dev
 * Dynamically modulates typography weight and subtle scale based on pointer distance.
 */
const VariableProximity = ({
  label = 'Ronda',
  fromWeight = 500,
  toWeight = 10000,
  radius = 50,
  falloff = 'gaussian', // Options: 'linear', 'gaussian', 'exponential'
  className = '',
  style = {}
}) => {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;

    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        letterRefs.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

          let factor = 0;
          if (distance < radius) {
            const normalized = 1 - distance / radius;
            if (falloff === 'gaussian') {
              factor = Math.exp(-Math.pow(distance / (radius * 0.45), 2));
            } else if (falloff === 'exponential') {
              factor = Math.pow(normalized, 2);
            } else {
              factor = normalized;
            }
          }

          const targetWeight = Math.round(fromWeight + factor * (toWeight - fromWeight));
          const targetScale = 1 + factor * 0.08;
          
          el.style.fontWeight = targetWeight;
          el.style.transform = `scale(${targetScale})`;
          el.style.color = factor > 0.3 ? 'var(--green-primary)' : '';
        });
      });
    };

    const handleMouseLeave = () => {
      letterRefs.current.forEach((el) => {
        if (!el) return;
        el.style.fontWeight = fromWeight;
        el.style.transform = 'scale(1)';
        el.style.color = '';
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [fromWeight, toWeight, radius, falloff]);

  const characters = Array.from(label);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        display: 'inline-flex',
        cursor: 'default',
        transition: 'color 0.2s ease',
        ...style
      }}
    >
      {characters.map((char, index) => (
        <span
          key={`vp-${char}-${index}`}
          ref={(el) => (letterRefs.current[index] = el)}
          style={{
            display: 'inline-block',
            fontWeight: fromWeight,
            transition: 'font-weight 0.15s cubic-bezier(0.2, 0, 0.2, 1), transform 0.15s cubic-bezier(0.2, 0, 0.2, 1), color 0.15s ease',
            willChange: 'font-weight, transform'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default VariableProximity;
