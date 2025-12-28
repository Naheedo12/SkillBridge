import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useCompetenceStore from '../stores/competenceStore';

const Competences = () => {
  const [searchParams] = useSearchParams();
  
  const {
    competences,
    loading,
    error,
    currentPage,
    totalPages,
    totalCompetences,
    searchQuery,
    selectedCategory,
    selectedLevel,
    setSearchQuery,
    setSelectedCategory,
    setSelectedLevel,
    setCurrentPage,
    resetFilters,
    fetchCompetences,
    clearError
  } = useCompetenceStore();

  // Récupérer les paramètres depuis l'URL au chargement
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    const categoryFromUrl = searchParams.get('category');
    
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams, setSearchQuery, setSelectedCategory]);

  // Charger les compétences au montage
  useEffect(() => {
    fetchCompetences();
  }, [fetchCompetences]);

  // Nettoyer les erreurs au montage
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Fonction pour gérer le changement de page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fonction pour réinitialiser les filtres
  const handleResetFilters = () => {
    resetFilters();
  };

  // Fonction pour générer l'avatar par défaut
  const getDefaultAvatar = (nom, prenom) => {
    const name = `${prenom || ''} ${nom || ''}`.trim() || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=9810fa&color=fff`;
  };

  // Fonction pour obtenir l'image par défaut
  const getDefaultImage = () => {
    return "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop";
  };

  // Fonction pour formater le niveau pour l'affichage
  const formatLevel = (niveau) => {
    const levelMap = {
      'debutant': 'Débutant',
      'intermediaire': 'Intermédiaire', 
      'avance': 'Avancé',
    };
    return levelMap[niveau] || niveau;
  };

  // Gestionnaires d'événements pour les filtres
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-20 px-4 text-center"
        style={{ 
          background: 'linear-gradient(135deg, #5943EC 0%, #692278 100%)' 
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-['Inter'] mb-6">
            Toutes les compétences
          </h1>
          <p className="text-xl text-white/90 font-['Inter'] max-w-3xl mx-auto">
            Explorez notre catalogue complet et trouvez la compétence qui vous correspond
          </p>
        </div>
      </section>

      {/* Barre de recherche et filtres */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher une compétence"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
              />
            </div>

            {/* Filtres */}
            <div className="flex gap-4">
              <select 
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white min-w-45 font-['Inter'] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option>Toutes catégories</option>
                <option>Programmation</option>
                <option>Design</option>
                <option>Musique</option>
                <option>Cuisine</option>
                <option>Art</option>
                <option>Sport</option>
                <option>Sciences</option>
                <option>Bricolage</option>
                <option>Jardinage</option>
              </select>
              
              <select 
                value={selectedLevel}
                onChange={handleLevelChange}
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white min-w-37.5 font-['Inter'] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option>Tous niveaux</option>
                <option>debutant</option>
                <option>intermediaire</option>
                <option>avance</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Affichage du nombre de résultats */}
          <p className="text-gray-600 font-['Inter'] mb-8">
            {loading ? 'Chargement...' : (
              <>
                {totalCompetences} compétence{totalCompetences !== 1 ? 's' : ''} trouvée{totalCompetences !== 1 ? 's' : ''}
                {searchQuery && (
                  <span className="ml-2 text-purple-600">
                    pour "{searchQuery}"
                  </span>
                )}
              </>
            )}
          </p>

          {/* Affichage des erreurs */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 font-['Inter']">{error}</p>
              </div>
            </div>
          )}

          {/* Indicateur de chargement */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          )}

          {/* Message si aucun résultat */}
          {!loading && competences.length === 0 && !error && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune compétence trouvée</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos critères de recherche ou vos filtres
              </p>
              <button 
                onClick={handleResetFilters}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Grille des compétences */}
          {!loading && competences.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {competences.map((competence) => (
                <Link
                  key={competence.id}
                  to={`/competences/${competence.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group block"
                >
                  {/* Image de la compétence */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={competence.image || getDefaultImage()} 
                      alt={competence.titre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = getDefaultImage();
                      }}
                    />
                    {/* Badge crédits */}
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium font-['Inter']">
                      {competence.credits || 2} crédits
                    </div>
                  </div>

                  {/* Contenu de la carte */}
                  <div className="p-6">
                    {/* Catégorie et niveau */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium font-['Inter']">
                        {competence.categorie || 'Non catégorisé'}
                      </span>
                      <span className="text-gray-600 text-sm font-['Inter']">
                        {formatLevel(competence.niveau)}
                      </span>
                    </div>

                    {/* Titre */}
                    <h3 className="text-xl font-bold text-gray-900 font-['Inter'] mb-4 group-hover:text-purple-600 transition-colors duration-200">
                      {competence.titre}
                    </h3>

                    {/* Instructeur et note */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={competence.user?.photo || getDefaultAvatar(competence.user?.nom, competence.user?.prenom)} 
                          alt={`${competence.user?.prenom || ''} ${competence.user?.nom || ''}`.trim() || 'Instructeur'}
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            e.target.src = getDefaultAvatar(competence.user?.nom, competence.user?.prenom);
                          }}
                        />
                        <span className="text-sm text-gray-600 font-['Inter']">
                          {`${competence.user?.prenom || ''} ${competence.user?.nom || ''}`.trim() || 'Instructeur'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-900 font-['Inter']">
                          {competence.rating || '4.8'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination - Afficher seulement s'il y a des résultats et plusieurs pages */}
          {!loading && competences.length > 0 && totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 font-['Inter'] ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Précédent
                </button>
                
                {/* Pages */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 font-['Inter'] ${
                        currentPage === pageNum
                          ? 'bg-purple-600 text-white rounded-lg'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 font-['Inter'] ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Suivant
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Competences;