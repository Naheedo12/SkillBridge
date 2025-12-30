import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import competenceService from '../services/competenceService';

const PopularSkillsSection = () => {
  const [recentCompetences, setRecentCompetences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les compétences récentes
  useEffect(() => {
    const fetchRecentCompetences = async () => {
      try {
        setLoading(true);
        const response = await competenceService.getRecentCompetences(6);
        if (response?.success) {
          setRecentCompetences(response.data || []);
        }
      } catch (error) {
        console.error(
          'Erreur lors du chargement des compétences récentes:',
          error
        );
        setRecentCompetences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentCompetences();
  }, []);

  // Avatar par défaut
  const getDefaultAvatar = (nom, prenom) => {
    const name = `${prenom || ''} ${nom || ''}`.trim() || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=9810fa&color=fff`;
  };

  // Images par défaut selon la catégorie
  const getDefaultImage = (categorie) => {
    const imagesByCategory = {
      'Programmation': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      'Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      'Musique': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
      'Cuisine': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      'Art': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      'Sport': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'Sciences': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
      'Bricolage': 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop',
      'Jardinage': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      'Informatique': 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop'
    };
    
    return imagesByCategory[categorie] || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop';
  };

  // Format du niveau
  const formatLevel = (niveau) => {
    const levelMap = {
      debutant: 'Débutant',
      intermediaire: 'Intermédiaire',
      avance: 'Avancé',
    };
    return levelMap[niveau] || niveau || '—';
  };

  // Skeleton loader
  if (loading) {
    return (
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Compétences populaires
              </h2>
              <p className="text-lg text-gray-600">
                Les compétences les plus récemment ajoutées
              </p>
            </div>
            <Link
              to="/competences"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Voir tout
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Si pas de données après chargement
  if (!loading && recentCompetences.length === 0) {
    return (
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Compétences populaires
              </h2>
              <p className="text-lg text-gray-600">
                Aucune compétence disponible pour le moment
              </p>
            </div>
            <Link
              to="/competences"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Voir tout
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Compétences populaires
            </h2>
            <p className="text-lg text-gray-600">
              Les compétences les plus récemment ajoutées
            </p>
          </div>
          <Link
            to="/competences"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            Voir tout
          </Link>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCompetences.map((competence) => (
            <Link
              key={competence.id}
              to={`/competences/${competence.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 block group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={competence.image || getDefaultImage(competence.categorie)}
                  alt={competence.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = getDefaultImage(competence.categorie);
                  }}
                />
                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  2 crédits
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                    {competence.categorie || 'Non catégorisé'}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {formatLevel(competence.niveau)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {competence.titre}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        competence.user?.photo ||
                        getDefaultAvatar(
                          competence.user?.nom,
                          competence.user?.prenom
                        )
                      }
                      alt="Instructeur"
                      className="w-8 h-8 rounded-full"
                      onError={(e) => {
                        e.target.src = getDefaultAvatar(
                          competence.user?.nom,
                          competence.user?.prenom
                        );
                      }}
                    />
                    <span className="text-sm text-gray-600">
                      {`${competence.user?.prenom || ''} ${
                        competence.user?.nom || ''
                      }`.trim() || 'Instructeur'}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-gray-900">
                    ⭐ 4.8
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSkillsSection;
