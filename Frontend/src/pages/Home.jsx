import useAuthStore from "../stores/authStore";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import CategoriesSection from "../components/CategoriesSection";
import PopularSkillsSection from "../components/PopularSkillsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import CallToActionSection from "../components/CallToActionSection";

const Home = () => {
  // On récupère l'utilisateur depuis le store
  const user = useAuthStore((state) => state.user);

  // Si user existe → connecté
  const isLoggedIn = Boolean(user);

  return (
    <div className="home-page system-font">
      
      {/* Header fixé au-dessus de la Hero */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <PopularSkillsSection />
      <HowItWorksSection />

      {/* CTA affiché uniquement si l'utilisateur n'est pas connecté */}
      {!isLoggedIn && <CallToActionSection />}

      <Footer />
    </div>
  );
};

export default Home;
