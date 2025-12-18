import { Link } from 'react-router-dom';
import logoImage from './logo.png';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="w-full px-16">
        <div className="flex items-center h-16">
          {/* Logo - Avec beaucoup d'espace à gauche */}
          <div className="flex items-center ml-10">
            <Link to="/">
              <img 
                src={logoImage} 
                alt="SkillBridge Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navigation - Centrée */}
          <nav className="flex-1 flex justify-center">
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Accueil
              </Link>
              <Link to="/competences" className="text-gray-600 hover:text-gray-900 transition-colors">
                Compétences
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </div>
          </nav>

          {/* Auth Buttons - Avec beaucoup d'espace à droite */}
          <div className="flex space-x-3 mr-10">
            <Link 
              to="/login" 
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Connexion
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Inscription
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;