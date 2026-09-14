import styles from '../styles/TeamSection.module.css';
import { FaGithub, FaLinkedin} from 'react-icons/fa';
import { motion } from 'framer-motion';
import  agustinpintor from '../assets/agustin-pintor.png';
import lisandrosiri from '../assets/lisandrosiri2.png';

const team = [
  {
    id: 1,
    name: "Lisandro Siri",
    role: "Co-Founder",
    github: "https://github.com/lisandrosiri",
    linkedin: "https://www.linkedin.com/in/lisandro-rene-siri-b5099b306/",
    image: lisandrosiri
  },
  {
    id: 2,
    name: "Agustín Pintor",
    role: "Co-Founder",
    github: "https://github.com/PintorAgustin",
    linkedin: "https://www.linkedin.com/in/agustin-pintor/",
    image: agustinpintor
  },
];

const TeamSection = () => {
  return (
    <section as="section" id="team" className={styles.team}>
      <div className="gridOverlay" />
      <div className="container">
      <div className={styles.teamLayout}>  
       <div className={styles.teamText}>
       
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          El equipo detrás de <span className={styles.highlight}>Ronda</span>
        </motion.h2>
        <motion.h3
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Dos estudiantes de ingeniería, un objetivo:
        </motion.h3>
        <p>
          Desarrollar soluciones reales, creemos que las buenas ideas no dependen de donde nacen. Dependen de las personas que deciden construirlas. Ronda es nuestra forma de demostrarlo.
        </p>
       </div>  
        <div className={styles.teamGrid}>
          {team.map((member, index) => (
            <motion.div 
              key={member.id} 
              className={styles.teamCard}
              style={{ backgroundImage: `url(${member.image})` }}
              initial={{ opacity: 0, y: 60, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.2, type: "spring", stiffness: 100 }}
            >
              <div className={styles.overlay}>
                <h3>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
             </div>
             
              <div className={styles.socialLinks}>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={20} />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default TeamSection;