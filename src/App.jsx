import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const Home = () => (
  <main>
    <Hero />
    <ProjectsSection />
    <TeamSection />
    <WhySection />
    <ContactForm />
  </main>
);


function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Header />
      
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;