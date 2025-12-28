import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import competenceService from '../services/competenceService';

const CompetenceDetail = () => {
  const { id } = useParams();
  const [competence, setCompetence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données de la compétence
  useEffect(() => {
    const fetchCompetence = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await competenceService.getCompetenceById(id);
        if (response?.success) {
          setCompetence(response.data);
        } else {
          setError('Compétence non trouvée');
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la compétence:', error);
        setError('Erreur lors du chargement de la compétence');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompetence();
    }
  }, [id]);

  // Avatar par défaut
  const getDefaultAvatar = (nom, prenom) => {
    const name = `${prenom || ''} ${nom || ''}`.trim() || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=9810fa&color=fff`;
  };

  // Image par défaut selon la catégorie
  const getDefaultImage = (categorie) => {
    const imagesByCategory = {
      'Programmation': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
      'Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      'Musique': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop',
      'Cuisine': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      'Art': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
      'Sport': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      'Sciences': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
      'Bricolage': 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&h=600&fit=crop',
      'Jardinage': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
      'Informatique': 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop'
    };
    
    return imagesByCategory[categorie] || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop';
  };

  // Format du niveau
  const formatLevel = (niveau) => {
    const levelMap = {
      debutant: 'Débutant',
      intermediaire: 'Intermédiaire',
      avance: 'Avancé',
      expert: 'Expert',
    };
    return levelMap[niveau] || niveau || 'Non spécifié';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de la compétence...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !competence) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Compétence non trouvée</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link 
              to="/competences" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Retour aux compétences
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section avec gradient violet */}
      <section 
        className="py-16 px-4"
        style={{ 
          background: 'linear-gradient(135deg, #5943EC 0%, #692278 100%)' 
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              {/* Badges */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium font-['Inter']">
                  {competence.categorie || 'Non catégorisé'}
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium font-['Inter']">
                  {formatLevel(competence.niveau)}
                </span>
              </div>

              {/* Titre */}
              <h1 className="text-4xl font-bold text-white font-['Inter'] mb-4">
                {competence.titre}
              </h1>

              {/* Rating et stats */}
              <div className="flex items-center gap-6 mb-6 text-white">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="font-semibold">4.8</span>
                  <span className="text-white/80">(24 avis)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <span className="text-white/80">Disponible pour échange</span>
                </div>
              </div>

              {/* Instructeur */}
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={
                    competence.user?.photo ||
                    getDefaultAvatar(competence.user?.nom, competence.user?.prenom)
                  }
                  alt={`${competence.user?.prenom || ''} ${competence.user?.nom || ''}`.trim()}
                  className="w-12 h-12 rounded-full"
                  onError={(e) => {
                    e.target.src = getDefaultAvatar(competence.user?.nom, competence.user?.prenom);
                  }}
                />
                <div>
                  <p className="font-semibold text-white font-['Inter']">
                    {`${competence.user?.prenom || ''} ${competence.user?.nom || ''}`.trim() || 'Instructeur'}
                  </p>
                </div>
              </div>

              {/* Bouton profil */}
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold font-['Inter'] hover:bg-gray-100 transition-colors">
                Voir le profil du formateur
              </button>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 font-['Inter'] mb-2">
                    2 crédits
                  </div>
                  <p className="text-gray-600 font-['Inter'] text-sm">Coût de l'échange</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700 font-['Inter'] mb-2">
                    <strong>Comment ça marche :</strong> En validant cet échange, vous dépenserez 2 crédits et le formateur recevra 2 crédits.
                  </p>
                </div>

                <button className="w-full py-4 bg-blue-600 text-white font-semibold font-['Inter'] rounded-lg hover:bg-blue-700 transition-colors duration-200 mb-4">
                  Envoyer un message
                </button>

                <p className="text-xs text-gray-500 font-['Inter'] text-center mb-6">
                  Votre solde après l'échange : 22 crédits
                </p>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 2m8-2l2 2m-2-2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V9" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 font-['Inter']">Disponibilité</p>
                      <p className="text-gray-600 font-['Inter']">
                        {competence.disponibilite ? 'Disponible' : 'Non disponible'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          
          {/* Description */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              Description
            </h2>
            <p className="text-gray-700 font-['Inter'] leading-relaxed mb-8">
              {competence.description || 'Aucune description disponible pour cette compétence.'}
            </p>
            
            {/* Image de la compétence */}
            {(competence.image || competence.categorie) && (
              <div className="mb-8">
                <img
                  src={competence.image || getDefaultImage(competence.categorie)}
                  alt={competence.titre}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = getDefaultImage(competence.categorie);
                  }}
                />
              </div>
            )}
            
            {/* Informations supplémentaires */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div>
                <p className="font-semibold text-gray-900 font-['Inter'] mb-2">Catégorie :</p>
                <p className="text-gray-600 font-['Inter']">{competence.categorie || 'Non spécifiée'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 font-['Inter'] mb-2">Niveau :</p>
                <p className="text-gray-600 font-['Inter']">{formatLevel(competence.niveau)}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 font-['Inter'] mb-2">Disponibilité :</p>
                <p className="text-gray-600 font-['Inter']">
                  {competence.disponibilite ? 'Disponible' : 'Non disponible'}
                </p>
              </div>
            </div>
          </div>

          {/* Informations sur le formateur */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              À propos du formateur
            </h2>
            <div className="flex items-start gap-6">
              <img 
                src={
                  competence.user?.photo ||
                  getDefaultAvatar(competence.user?.nom, competence.user?.prenom)
                }
                alt={`${competence.user?.prenom || ''} ${competence.user?.nom || ''}`.trim()}
                className="w-20 h-20 rounded-full"
                onError={(e) => {
                  e.target.src = getDefaultAvatar(competence.user?.nom, competence.user?.prenom);
                }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 font-['Inter'] mb-2">
                  {`${competence.user?.prenom || ''} ${competence.user?.nom || ''}`.trim() || 'Instructeur'}
                </h3>
                <p className="text-gray-600 font-['Inter'] mb-4">
                  {competence.user?.bio || 'Formateur expérimenté dans le domaine.'}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span>4.8 (24 avis)</span>
                  </div>
                  <span>•</span>
                  <span>Membre depuis {new Date(competence.user?.created_at || competence.created_at).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompetenceDetail;