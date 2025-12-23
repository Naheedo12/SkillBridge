import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/competences?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/competences');
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-linear-to-br from-slate-900 via-indigo-950 to-fuchsia-900 overflow-hidden flex items-center justify-center">
      
      {/* Background image */}
      <div className="w-full h-full left-0 top-0 absolute opacity-10">
        <img
          className="w-full h-full object-cover"
          src="/hero.png"
          alt="Hero Background"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-8">
        <div className="text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-2 mb-16">
            <span className="text-white text-sm font-normal font-['Inter']">🎉</span>
            <span className="text-white text-sm font-normal font-['Inter']">
              Nouveau : Chat en temps réel disponible !
            </span>
          </div>

          {/* Title */}
          <h1 className="text-white text-6xl font-bold font-['Inter'] leading-20 mb-16 max-w-6xl mx-auto whitespace-nowrap">
            Échangez vos compétences,<br />pas votre argent
          </h1>

          {/* Description */}
          <p className="text-white/90 text-xl font-normal font-['Inter'] leading-9 mb-16 max-w-3xl mx-auto">
            Rejoignez une communauté passionnée où chacun peut apprendre et enseigner.
            Partagez votre expertise et découvrez de nouvelles compétences sans dépenser un centime.
          </p>

          {/* Search bar */}
          <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSearch}>
              <div className="flex bg-white rounded-xl shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] overflow-hidden">
                
                <div className="flex-1 flex items-center px-4">
                  <svg
                    className="w-4 h-4 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Quelle compétence recherchez-vous ?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 py-4 text-gray-700 text-base font-normal font-['Inter'] border-none outline-none bg-transparent placeholder-gray-400"
                  />
                </div>

                <button 
                  type="submit"
                  className="px-8 py-4 bg-violet-700 hover:bg-violet-800 transition-colors duration-200 text-white text-base font-medium font-['Inter']"
                >
                  Rechercher
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;