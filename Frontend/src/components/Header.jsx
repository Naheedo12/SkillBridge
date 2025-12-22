import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logoImage from './logo.png';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      window.location.href = '/';
    }
  };

  // header avant connexion
  if (!isAuthenticated) {
    return (
      <header className="bg-white shadow-md transition-all duration-300">
        <div className="w-full px-16">
          <div className="flex items-center h-16">

            {/* Logo */}
            <div className="flex items-center ml-10">
              <Link to="/">
                <img src={logoImage} alt="SkillBridge Logo" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex justify-center">
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-600 hover:text-gray-900">Accueil</Link>
                <Link to="/competences" className="text-gray-600 hover:text-gray-900">Compétences</Link>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3 mr-10">
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Inscription
              </Link>
            </div>

          </div>
        </div>
      </header>
    );
  }

  // header après connexion
  return (
    <header className="bg-white shadow-md transition-all duration-300">
      <div className="w-full px-16">
        <div className="flex items-center h-16">

          {/* Logo */}
          <div className="flex items-center ml-10">
            <Link to="/">
              <img src={logoImage} alt="SkillBridge Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex justify-center">
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Accueil</Link>
              <Link to="/competences" className="text-gray-600 hover:text-gray-900">Compétences</Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Tableau de bord</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3 mr-10">

            {/* Crédits (statique pour l’instant) */}
            <div className="px-3 py-1 rounded-lg bg-purple-100">
              <span className="text-sm font-semibold text-purple-700">
                {user?.solde_credits || 0} crédits
              </span>
            </div>

            {/* Icons */}
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Search className="h-5 w-5" />
            </button>

            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-700">
              <MessageSquare className="h-5 w-5" />
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-700">
              <User className="h-5 w-5" />
            </button>

            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Publier une compétence
            </button>

            <button 
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Déconnexion
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
