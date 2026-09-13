import styles from '../styles/WhySection.module.css';
import { motion } from 'framer-motion';
import TiltedCard from './TiltedCard';
import communityCardImg from '../assets/licha.png';

const WhySection = () => {
  return (
    <section id="community" className={styles.whySection}>
      <div className={`container ${styles.communityContainer}`}>
        
        <motion.div 
          className={styles.communityBox}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Únete a nuestra comunidad</h2>
          <a
            href="https://instagram.com/ronda.it"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            <TiltedCard
              imageSrc={communityCardImg}
              altText="Comunidad Ronda"
              captionText="La Ronda"
              containerHeight="320px"
              containerWidth="440px"
              imageHeight="320px"
              imageWidth="440px"
              rotateAmplitude={14}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent
              overlayContent={
                <p className="tilted-card-demo-text">
                  La Ronda
                </p>
              }
            />
          </a>
          

        </motion.div>
        
      </div>
      
    </section>
  );
};

export default WhySection;
