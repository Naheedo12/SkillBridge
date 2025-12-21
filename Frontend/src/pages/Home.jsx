import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import CategoriesSection from '../components/CategoriesSection';
import PopularSkillsSection from '../components/PopularSkillsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CallToActionSection from '../components/CallToActionSection';

const Home = () => {
  const { user } = useAuth();

  const isLoggedIn = !!user;

  return (
    <div className="home-page" style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }}>
      {/* Header fixe par-dessus la hero section */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Section Statistiques */}
      <StatsSection />

      {/* Section Catégories */}
      <CategoriesSection />

      {/* Section Compétences Populaires */}
      <PopularSkillsSection />

      {/* Section Comment ça marche */}
      <HowItWorksSection />

      {/* Section Call to Action for users not connected*/}
      {!isLoggedIn && <CallToActionSection />}

      <Footer />
    </div>
  );
};

export default Home;
