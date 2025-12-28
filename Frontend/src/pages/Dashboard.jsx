import { useState } from 'react';
import { BookOpen, CreditCard, TrendingUp, Award, Eye, Edit, Trash2, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const user = useAuthStore(state => state.user);
  const updateProfile = useAuthStore(state => state.updateProfile);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'view', 'add', 'edit', 'profile'
  const [selectedCompetence, setSelectedCompetence] = useState(null);

  // Données statiques pour la démonstration
  const userStats = {
    competencesPubliees: 3,
    competencesAchetees: 7,
    creditsGagnes: 45,
    creditsDepenses: 28,
    totalEchanges: 12
  };

  const [mesCompetences, setMesCompetences] = useState([
    {
      id: 1,
      titre: 'Design UI/UX Avancé',
      description: 'Apprenez les techniques avancées de design d\'interface',
      prix_credits: 8,
      participants: 15,
      revenus: 120,
      date_creation: '2024-12-10'
    },
    {
      id: 2,
      titre: 'Photoshop pour Débutants',
      description: 'Maîtrisez les bases de Photoshop',
      prix_credits: 5,
      participants: 8,
      revenus: 40,
      date_creation: '2024-12-05'
    },
    {
      id: 3,
      titre: 'Marketing Digital',
      description: 'Stratégies de marketing en ligne',
      prix_credits: 6,
      participants: 0,
      revenus: 0,
      date_creation: '2024-12-20'
    }
  ]);

  // Fonction pour supprimer une compétence
  const handleDeleteCompetence = (competenceId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compétence ? Cette action est irréversible.')) {
      setMesCompetences(mesCompetences.filter(comp => comp.id !== competenceId));
    }
  };

  // Fonctions pour gérer les modals
  const handleOpenModal = (type, competence = null) => {
    if (type === 'add') {
      // Rediriger vers la page d'ajout de compétence
      navigate('/add-competence');
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

  const handleSaveCompetence = (competenceData) => {
    if (modalType === 'add') {
      const newCompetence = {
        ...competenceData,
        id: Math.max(...mesCompetences.map(c => c.id)) + 1,
        participants: 0,
        revenus: 0,
        date_creation: new Date().toISOString().split('T')[0]
      };
      setMesCompetences([...mesCompetences, newCompetence]);
    } else if (modalType === 'edit') {
      setMesCompetences(mesCompetences.map(c => 
        c.id === selectedCompetence.id ? { ...c, ...competenceData } : c
      ));
    }
    handleCloseModal();
  };

  const handleSaveProfile = async (profileData) => {
    const result = await updateProfile(profileData);
    if (result.success) {
      handleCloseModal();
    }
    return result;
  };

  const competencesAchetees = [
    {
      id: 1,
      titre: 'React Avancé',
      auteur: 'Bouchra FETTAH',
      prix_credits: 8,
      date_achat: '2024-12-15',
      progression: 75,
      statut: 'en_cours'
    },
    {
      id: 2,
      titre: 'Python pour Data Science',
      auteur: 'Ahmed BENALI',
      prix_credits: 10,
      date_achat: '2024-12-10',
      progression: 100,
      statut: 'terminé'
    },
    {
      id: 3,
      titre: 'SEO et Référencement',
      auteur: 'Fatima ZAHRA',
      prix_credits: 6,
      date_achat: '2024-12-18',
      progression: 30,
      statut: 'en_cours'
    }
  ];

  const activitesRecentes = [
    { id: 1, type: 'achat', message: 'Vous avez acheté "React Avancé"', date: '2024-12-15', credits: -8 },
    { id: 2, type: 'vente', message: 'Quelqu\'un a acheté votre "Design UI/UX"', date: '2024-12-14', credits: +8 },
    { id: 3, type: 'completion', message: 'Vous avez terminé "Python Data Science"', date: '2024-12-10', credits: 0 },
    { id: 4, type: 'publication', message: 'Votre compétence "Marketing Digital" a été ajoutée', date: '2024-12-08', credits: 0 }
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

      {/* Modal pour les compétences et le profil */}
      {showModal && modalType === 'profile' && (
        <ProfileModal
          user={user}
          onClose={handleCloseModal}
          onSave={handleSaveProfile}
        />
      )}
      {showModal && modalType !== 'profile' && (
        <CompetenceModal
          type={modalType}
          competence={selectedCompetence}
          onClose={handleCloseModal}
          onSave={handleSaveCompetence}
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
              <p className="text-sm text-purple-600">Membre depuis {new Date().getFullYear()}</p>
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

// Composant Mes Compétences - SANS STATUTS
const MesCompetencesTab = ({ competences, onDeleteCompetence, onViewCompetence, onEditCompetence, onAddCompetence }) => (
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

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {competences.map((competence) => (
        <div key={competence.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-gray-900">{competence.titre}</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{competence.description}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Prix:</span>
              <span className="font-medium">{competence.prix_credits} crédits</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Participants:</span>
              <span className="font-medium">{competence.participants}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Revenus:</span>
              <span className="font-medium text-green-600">{competence.revenus} crédits</span>
            </div>
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
  </div>
);

// Composant Mes Achats
const AchatsTab = ({ competences }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900">Mes Compétences Achetées</h2>

    <div className="space-y-4">
      {competences.map((competence) => (
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
      ))}
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

// Composant Modal pour les compétences - SANS STATUTS
const CompetenceModal = ({ type, competence, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    competence || {
      titre: '',
      description: '',
      categorie: '',
      prix_credits: 5,
      duree: '',
      niveau: 'Débutant'
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isViewMode = type === 'view';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {type === 'add' ? 'Ajouter une compétence' : 
             type === 'edit' ? 'Modifier la compétence' : 
             'Détails de la compétence'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre de la compétence
            </label>
            <input
              type="text"
              value={formData.titre}
              onChange={(e) => setFormData({...formData, titre: e.target.value})}
              disabled={isViewMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
              required
              placeholder="Ex: Design UI/UX Avancé"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              disabled={isViewMode}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
              required
              placeholder="Décrivez votre compétence en détail..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={formData.categorie}
                onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Design">Design</option>
                <option value="Développement">Développement</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
                <option value="Langues">Langues</option>
                <option value="Photographie">Photographie</option>
                <option value="Musique">Musique</option>
                <option value="Cuisine">Cuisine</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (crédits)
              </label>
              <input
                type="number"
                value={formData.prix_credits}
                onChange={(e) => setFormData({...formData, prix_credits: parseInt(e.target.value)})}
                disabled={isViewMode}
                min="1"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée estimée
              </label>
              <input
                type="text"
                value={formData.duree}
                onChange={(e) => setFormData({...formData, duree: e.target.value})}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                required
                placeholder="Ex: 2 heures, 1 semaine..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau
              </label>
              <select
                value={formData.niveau}
                onChange={(e) => setFormData({...formData, niveau: e.target.value})}
                disabled={isViewMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
              </select>
            </div>
          </div>

          {/* Informations supplémentaires en mode view */}
          {isViewMode && competence && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h3 className="font-medium text-gray-900">Statistiques</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Participants:</span>
                  <span className="ml-2 font-medium">{competence.participants}</span>
                </div>
                <div>
                  <span className="text-gray-500">Revenus:</span>
                  <span className="ml-2 font-medium text-green-600">{competence.revenus} crédits</span>
                </div>
                <div>
                  <span className="text-gray-500">Date de création:</span>
                  <span className="ml-2 font-medium">
                    {new Date(competence.date_creation).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              {isViewMode ? 'Fermer' : 'Annuler'}
            </button>
            {!isViewMode && (
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                {type === 'add' ? 'Ajouter' : 'Modifier'}
              </button>
            )}
          </div>
        </form>
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
      // Nettoyer les données avant envoi
      const cleanData = { ...formData };
      if (cleanData.bio === '') cleanData.bio = null;
      
      const result = await onSave(cleanData);
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
              <p><span className="font-medium">Rôle:</span> {user?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}</p>
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