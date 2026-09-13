import ColorBends from './ColorBends';

/**
 * SectionWithBends - wraps any <section> or <footer> with a ColorBends animated background.
 * Usage: replace your root <section> tag with <SectionWithBends as="section" ...>
 */
export default function SectionWithBends({
  as: Tag = 'section',
  className = '',
  style,
  children,
  bendsProps = {},
  ...rest
}) {
  const defaultBends = {
    colors: ["#a7e3c1", "#6eeef2", "#97d779", "#1a2e1a"],
    rotation: 97,
    speed: 0.15,
    scale: 1,
    frequency: 1,
    warpStrength: 1,
    mouseInfluence: 0.5,
    noise: 0.08,
    parallax: 0.3,
    iterations: 2,
    intensity: 0.5,
    bandWidth: 6,
    transparent: true,
  };

  const merged = { ...defaultBends, ...bendsProps };

  return (
    <Tag
      className={className}
      style={{ position: 'relative', ...style }}
      {...rest}
    >
      {/* Animated ColorBends background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <ColorBends {...merged} />
      </div>

      {/* Section content rendered on top */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </Tag>
  );
}
