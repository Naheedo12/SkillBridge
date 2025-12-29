import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import competenceService from '../services/competenceService';
import useAuthStore from '../stores/authStore';

const AddCompetence = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    categorie: '',
    niveau: '',
    disponibilite: true
  });

  // Vérifier si c'est un admin qui vient de la page admin
  const isAdminRedirect = searchParams.get('redirect') === 'admin';
  const isAdmin = user?.role === 'Administrateur' || user?.role === 'admin';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await competenceService.createCompetence(formData);
    if (response.success) {
      console.log('✅ Compétence créée avec succès:', response);
      
      // Rediriger selon le type d'utilisateur
      if (isAdmin) {
        // Admin : reste dans son dashboard admin, section gestion des compétences
        navigate('/admin?tab=competences', { 
          state: { message: 'Compétence créée avec succès!' }
        });
      } else {
        // Utilisateur normal : vers son dashboard avec l'onglet "Mes Compétences" actif
        console.log('🎉 Déclenchement de l\'événement competenceCreated');
        window.dispatchEvent(new CustomEvent('competenceCreated', { 
          detail: response.data 
        }));
        
        navigate('/dashboard', { 
          state: { 
            message: 'Compétence créée avec succès!',
            showNotification: true,
            activeTab: 'mes-competences'
          }
        });
      }
    } else {
      setError(response.message || 'Erreur lors de la création de la compétence');
    }
  } catch (error) {
    console.error('Erreur lors de la création:', error);
    setError(error.message || 'Erreur lors de la création de la compétence');
  } finally {
    setLoading(false);
  }
};

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="py-16 px-4 text-center"
        style={{ 
          background: 'linear-gradient(135deg, #5943EC 0%, #692278 100%)' 
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-['Inter'] mb-4">
            Proposer une nouvelle compétence
          </h1>
          <p className="text-xl text-white/90 font-['Inter']">
            Partagez votre expertise et gagnez des crédits
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <p className="text-red-800 font-['Inter']">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section d'information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">?</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 font-['Inter'] mb-2">
                  Comment ça fonctionne ?
                </h3>
                <p className="text-blue-800 font-['Inter'] text-sm leading-relaxed">
                  Créez une compétence que vous maîtrisez et que vous souhaitez enseigner. Les autres utilisateurs pourront 
                  la découvrir et vous contacter pour échanger des compétences contre la vôtre.
                </p>
              </div>
            </div>
          </div>

          {/* Informations de base */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              Informations de base
            </h2>
            
            <div className="space-y-6">
              {/* Titre de la compétence */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Titre de la compétence *
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  placeholder="Ex: Introduction aux bases React"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
                />
              </div>

              {/* Prix en crédits - Supprimé car fixe à 2 crédits */}

              {/* Catégorie et Niveau */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                    Catégorie *
                  </label>
                  <select
                    name="categorie"
                    value={formData.categorie}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter'] bg-white"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="Programmation">Programmation</option>
                    <option value="Design">Design</option>
                    <option value="Musique">Musique</option>
                    <option value="Cuisine">Cuisine</option>
                    <option value="Art">Art</option>
                    <option value="Sport">Sport</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Bricolage">Bricolage</option>
                    <option value="Jardinage">Jardinage</option>
                    <option value="Informatique">Informatique</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                    Niveau *
                  </label>
                  <select
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter'] bg-white"
                  >
                    <option value="">Sélectionnez un niveau</option>
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avance">Avancé</option>
                  </select>
                </div>
              </div>


            </div>
          </div>

          {/* Description détaillée */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              Description détaillée
            </h2>
            
            <div className="space-y-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez ce que vous enseignerez et comment se déroulera la formation..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter'] resize-vertical"
                />
              </div>

              {/* Disponibilité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Disponibilité
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="disponibilite"
                    checked={formData.disponibilite}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700 font-['Inter']">
                    Je suis disponible pour enseigner cette compétence
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-['Inter'] disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-['Inter'] disabled:opacity-50 flex items-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? 'Publication...' : 'Publier la compétence'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddCompetence;