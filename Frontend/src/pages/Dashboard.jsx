import { useState, useEffect } from 'react';
import { BookOpen, CreditCard, TrendingUp, Award, Eye, Edit, Trash2, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import competenceService from '../services/competenceService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const user = useAuthStore(state => state.user);
  const updateProfile = useAuthStore(state => state.updateProfile);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [mesCompetences, setMesCompetences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Charger les compétences de l'utilisateur
  useEffect(() => {
    const fetchMesCompetences = async () => {
      if (activeTab === 'mes-competences') {
        try {
          setLoading(true);
          setError('');
          const response = await competenceService.getMyCompetences();
          if (response?.success) {
            setMesCompetences(response.data || []);
          }
        } catch (error) {
          console.error('Erreur lors du chargement des compétences:', error);
          setError('Erreur lors du chargement de vos compétences');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMesCompetences();
  }, [activeTab]);

  // Fonction pour supprimer une compétence
  const handleDeleteCompetence = async (competenceId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compétence ? Cette action est irréversible.')) {
      try {
        setLoading(true);
        const response = await competenceService.deleteCompetence(competenceId);
        if (response?.success) {
          // Recharger la liste des compétences
          setMesCompetences(mesCompetences.filter(comp => comp.id !== competenceId));
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        setError('Erreur lors de la suppression de la compétence');
      } finally {
        setLoading(false);
      }
    }
  };

  // Fonctions pour gérer les modals
  const handleOpenModal = (type, competence = null) => {
    if (type === 'add') {
      navigate('/add-competence');
      return;
    }
    
    if (type === 'edit' && competence) {
      navigate(`/competences/${competence.id}/edit`);
      return;
    }
    
    if (type === 'view' && competence) {
      navigate(`/competences/${competence.id}`);
      return;
    }
    
    setModalType(type);
    setSelectedCompetence(competence);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedCompetence(null);
  };

  const handleSaveProfile = async (profileData) => {
    const result = await updateProfile(profileData);
    if (result.success) {
      handleCloseModal();
    }
    return result;
  };

  // Données statiques pour les autres sections (à remplacer par de vraies données si disponibles)
  const userStats = {
    competencesPubliees: mesCompetences.length,
    competencesAchetees: 0, // À implémenter avec la logique d'échange
    creditsGagnes: user?.solde_credits || 0,
    creditsDepenses: 0, // À implémenter avec la logique d'échange
    totalEchanges: 0 // À implémenter avec la logique d'échange
  };

  const competencesAchetees = [
    // À remplacer par de vraies données
  ];

  const activitesRecentes = [
    // À remplacer par de vraies données
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-16 px-4"
        style={{ 
          background: 'linear-gradient(135deg, #5943EC 0%, #692278 100%)' 
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white font-['Inter'] mb-2">
                Bonjour {user?.prenom} ! 👋
              </h1>
              <p className="text-white/90 font-['Inter']">
                Voici un aperçu de votre activité sur SkillBridge
              </p>
            </div>
            <div className="bg-white/20 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white">{user?.solde_credits || 0}</div>
              <div className="text-white/80">Crédits disponibles</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-['Inter'] font-medium transition-colors duration-200 ${
                activeTab === 'overview'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="h-5 w-5" />
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('mes-competences')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-['Inter'] font-medium transition-colors duration-200 ${
                activeTab === 'mes-competences'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              Mes Compétences
            </button>
            <button
              onClick={() => setActiveTab('achats')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-['Inter'] font-medium transition-colors duration-200 ${
                activeTab === 'achats'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CreditCard className="h-5 w-5" />
              Mes Achats
            </button>
          </div>

          {/* Messages d'erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Contenu selon l'onglet actif */}
          {activeTab === 'overview' && (
            <OverviewTab 
              userStats={userStats} 
              activitesRecentes={activitesRecentes}
              user={user}
              onEditProfile={() => handleOpenModal('profile')}
            />
          )}
          {activeTab === 'mes-competences' && (
            <MesCompetencesTab 
              competences={mesCompetences} 
              loading={loading}
              onDeleteCompetence={handleDeleteCompetence}
              onViewCompetence={(comp) => handleOpenModal('view', comp)}
              onEditCompetence={(comp) => handleOpenModal('edit', comp)}
              onAddCompetence={() => handleOpenModal('add')}
            />
          )}
          {activeTab === 'achats' && (
            <AchatsTab competences={competencesAchetees} />
          )}
        </div>
      </section>

      {/* Modal pour le profil uniquement */}
      {showModal && modalType === 'profile' && (
        <ProfileModal
          user={user}
          onClose={handleCloseModal}
          onSave={handleSaveProfile}
        />
      )}

      <Footer />
    </div>
  );
};

// Composant Vue d'ensemble
const OverviewTab = ({ userStats, activitesRecentes, user, onEditProfile }) => (
  <div className="space-y-6">
    {/* Statistiques */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Compétences Créées"
        value={userStats.competencesPubliees}
        icon={<BookOpen className="h-6 w-6" />}
        color="blue"
      />
      <StatCard
        title="Compétences Achetées"
        value={userStats.competencesAchetees}
        icon={<CreditCard className="h-6 w-6" />}
        color="green"
      />
      <StatCard
        title="Crédits Gagnés"
        value={userStats.creditsGagnes}
        icon={<TrendingUp className="h-6 w-6" />}
        color="purple"
      />
      <StatCard
        title="Échanges Totaux"
        value={userStats.totalEchanges}
        icon={<Award className="h-6 w-6" />}
        color="orange"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Activité récente */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
        <div className="space-y-4">
          {activitesRecentes.map((activite) => (
            <div key={activite.id} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activite.type === 'achat' ? 'bg-red-500' :
                activite.type === 'vente' ? 'bg-green-500' :
                'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activite.message}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    {new Date(activite.date).toLocaleDateString('fr-FR')}
                  </p>
                  {activite.credits !== 0 && (
                    <span className={`text-xs font-medium ${
                      activite.credits > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {activite.credits > 0 ? '+' : ''}{activite.credits} crédits
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profil et progression */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Mon Profil</h3>
          <button
            onClick={onEditProfile}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <Edit className="h-4 w-4" />
            Modifier
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-bold text-xl">
                {user?.prenom?.[0]}{user?.nom?.[0]}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{user?.prenom} {user?.nom}</h4>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <p className="text-sm text-purple-600">Membre depuis {new Date(user?.created_at).getFullYear()}</p>
            </div>
          </div>
          
          {user?.bio && (
            <div className="border-t pt-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">À propos</h5>
              <p className="text-sm text-gray-600">{user.bio}</p>
            </div>
          )}
          
          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{userStats.totalEchanges}</div>
                <div className="text-sm text-gray-500">Échanges totaux</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{user?.solde_credits || 0}</div>
                <div className="text-sm text-gray-500">Crédits restants</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Composant Mes Compétences
const MesCompetencesTab = ({ competences, loading, onDeleteCompetence, onViewCompetence, onEditCompetence, onAddCompetence }) => {
  // Format du niveau
  const formatLevel = (niveau) => {
    const levelMap = {
      debutant: 'Débutant',
      intermediaire: 'Intermédiaire',
      avance: 'Avancé',
    };
    return levelMap[niveau] || niveau || 'Non spécifié';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Mes Compétences</h2>
        <button 
          onClick={onAddCompetence}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          Ajouter une compétence
        </button>
      </div>

      {competences.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune compétence</h3>
          <p className="text-gray-600 mb-6">Commencez par ajouter votre première compétence</p>
          <button 
            onClick={onAddCompetence}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Ajouter ma première compétence
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competences.map((competence) => (
            <div key={competence.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{competence.titre}</h3>
              </div>
              
              <div className="mb-4">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 mb-2">
                  {competence.categorie}
                </span>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 ml-2">
                  {formatLevel(competence.niveau)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 truncate">{competence.description}</p>
              
              <div className="flex items-center justify-between text-sm mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  competence.disponibilite 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {competence.disponibilite ? 'Disponible' : 'Non disponible'}
                </span>
                <span className="text-gray-500">
                  {new Date(competence.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>

              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => onViewCompetence(competence)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4" />
                  Voir
                </button>
                <button 
                  onClick={() => onEditCompetence(competence)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4" />
                  Modifier
                </button>
                <button 
                  onClick={() => onDeleteCompetence(competence.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Composant Mes Achats
const AchatsTab = ({ competences }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900">Mes Compétences Achetées</h2>

    <div className="space-y-4">
      {competences.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun achat</h3>
          <p className="text-gray-600">Vous n'avez pas encore acheté de compétences</p>
        </div>
      ) : (
        competences.map((competence) => (
          <div key={competence.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{competence.titre}</h3>
                <p className="text-sm text-gray-600 mb-2">Par {competence.auteur}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Acheté le {new Date(competence.date_achat).toLocaleDateString('fr-FR')}</span>
                  <span>{competence.prix_credits} crédits</span>
                </div>

                {/* Barre de progression */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Progression</span>
                    <span className="text-sm font-medium text-gray-900">{competence.progression}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${competence.progression}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  competence.statut === 'terminé' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {competence.statut === 'terminé' ? 'Terminé' : 'En cours'}
                </span>
                
                <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700">
                  {competence.statut === 'terminé' ? 'Revoir' : 'Continuer'}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

// Composant StatCard
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Composant Modal pour le profil utilisateur
const ProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    bio: user?.bio || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await onSave(formData);
      if (!result.success) {
        setError(result.message || 'Erreur lors de la mise à jour');
      }
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Modifier mon profil
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Messages d'erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <input
              type="text"
              value={formData.prenom}
              onChange={(e) => setFormData({...formData, prenom: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biographie (optionnel)
            </label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Parlez-nous de vous..."
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Informations non modifiables</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Email:</span> {user?.email}</p>
              <p><span className="font-medium">Rôle:</span> {user?.role}</p>
              <p><span className="font-medium">Crédits:</span> {user?.solde_credits || 0}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mise à jour...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
