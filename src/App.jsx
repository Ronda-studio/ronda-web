import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import TeamSection from './components/TeamSection';
import ContactForm from './components/ContanctForm';
import Footer from './components/Footer';
import WhySection from './components/WhySection';
import './styles/global.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Header />
      <Hero />
      <ProjectsSection />
      <TeamSection />
      <WhySection />
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;