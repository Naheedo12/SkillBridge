import { useState } from 'react';
import { Users, BookOpen, BarChart3, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminStats from '../components/AdminStats';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'view'
  const [selectedItem, setSelectedItem] = useState(null);

  // Données statiques pour les utilisateurs
  const [users, setUsers] = useState([
    {
      id: 1,
      nom: 'ELQADI',
      prenom: 'Salma',
      email: 'salma@gmail.com',
      role: 'user',
      solde_credits: 15,
      date_inscription: '2024-01-15',
      statut: 'actif',
      derniere_connexion: '2024-12-20'
    },
    {
      id: 2,
      nom: 'FETTAH',
      prenom: 'Bouchra',
      email: 'bouchra@gmail.com',
      role: 'user',
      solde_credits: 8,
      date_inscription: '2024-02-10',
      statut: 'actif',
      derniere_connexion: '2024-12-19'
    },
    {
      id: 3,
      nom: 'ADMIN',
      prenom: 'Super',
      email: 'admin@skillbridge.com',
      role: 'admin',
      solde_credits: 100,
      date_inscription: '2024-01-01',
      statut: 'actif',
      derniere_connexion: '2024-12-24'
    }
  ]);

  // Données statiques pour les compétences
  const [competences, setCompetences] = useState([
    {
      id: 1,
      titre: 'Cours de Design UI/UX',
      description: 'Apprenez les bases du design d\'interface utilisateur',
      categorie: 'Design',
      prix_credits: 5,
      duree: '2 heures',
      niveau: 'Débutant',
      auteur: 'Salma ELQADI',
      date_creation: '2024-12-15',
      participants: 12
    },
    {
      id: 2,
      titre: 'Développement React Avancé',
      description: 'Maîtrisez React avec des concepts avancés',
      categorie: 'Développement',
      prix_credits: 8,
      duree: '4 heures',
      niveau: 'Avancé',
      auteur: 'Bouchra FETTAH',
      date_creation: '2024-12-10',
      participants: 8
    },
    {
      id: 3,
      titre: 'Marketing Digital',
      description: 'Stratégies de marketing en ligne',
      categorie: 'Marketing',
      prix_credits: 6,
      duree: '3 heures',
      niveau: 'Intermédiaire',
      auteur: 'Salma ELQADI',
      date_creation: '2024-12-05',
      participants: 0
    }
  ]);

  const handleOpenModal = (type, item = null) => {
    if (type === 'add' && activeTab === 'competences') {
      // Rediriger vers la page d'ajout de compétence
      navigate('/add-competence');
      return;
    }
    
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedItem(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleDeleteCompetence = (competenceId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      setCompetences(competences.filter(comp => comp.id !== competenceId));
    }
  };

  const filteredUsers = users.filter(user =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompetences = competences.filter(comp =>
    comp.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.categorie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.auteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white font-['Inter'] mb-2">
              Dashboard Administrateur
            </h1>
            <p className="text-white/90 font-['Inter']">
              Gérez les utilisateurs et les compétences de la plateforme
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-['Inter'] font-medium transition-colors duration-200 ${
                activeTab === 'stats'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              Statistiques
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-['Inter'] font-medium transition-colors duration-200 ${
                activeTab === 'users'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5" />
              Gestion des Utilisateurs
            </button>
            <button
              onClick={() => setActiveTab('competences')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-['Inter'] font-medium transition-colors duration-200 ${
                activeTab === 'competences'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              Gestion des Compétences
            </button>
          </div>

          {/* Barre de recherche et actions */}
          {activeTab !== 'stats' && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder={`Rechercher ${activeTab === 'users' ? 'un utilisateur' : 'une compétence'}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleOpenModal('add')}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter {activeTab === 'users' ? 'un utilisateur' : 'une compétence'}
                </button>
              </div>
            </div>
          )}

          {/* Contenu selon l'onglet actif */}
          {activeTab === 'stats' ? (
            <AdminStats />
          ) : activeTab === 'users' ? (
            <UsersTable 
              users={filteredUsers} 
              onEdit={(user) => handleOpenModal('edit', user)}
              onView={(user) => handleOpenModal('view', user)}
              onDelete={handleDeleteUser}
            />
          ) : (
            <CompetencesTable 
              competences={filteredCompetences}
              onEdit={(comp) => handleOpenModal('edit', comp)}
              onView={(comp) => handleOpenModal('view', comp)}
              onDelete={handleDeleteCompetence}
            />
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <Modal
          type={modalType}
          activeTab={activeTab}
          item={selectedItem}
          onClose={handleCloseModal}
          users={users}
          setUsers={setUsers}
          competences={competences}
          setCompetences={setCompetences}
        />
      )}

      <Footer />
    </div>
  );
};

// Composant Table des Utilisateurs
const UsersTable = ({ users, onEdit, onView, onDelete }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Utilisateur
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rôle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Crédits
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-medium">
                      {user.prenom[0]}{user.nom[0]}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.prenom} {user.nom}
                    </div>
                    <div className="text-sm text-gray-500">
                      Inscrit le {new Date(user.date_inscription).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.role === 'admin' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.solde_credits} crédits
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.statut === 'actif' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.statut === 'actif' ? 'Actif' : 'Inactif'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(user)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Composant Table des Compétences
const CompetencesTable = ({ competences, onEdit, onView, onDelete }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Compétence
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Catégorie
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Auteur
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prix
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {competences.map((competence) => (
            <tr key={competence.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {competence.titre}
                  </div>
                  <div className="text-sm text-gray-500">
                    {competence.duree} • {competence.niveau}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                  {competence.categorie}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {competence.auteur}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {competence.prix_credits} crédits
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(competence)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(competence)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(competence.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Composant Modal
const Modal = ({ type, activeTab, item, onClose, users, setUsers, competences, setCompetences }) => {
  const [formData, setFormData] = useState(
    item || (activeTab === 'users' 
      ? { nom: '', prenom: '', email: '', role: 'user', solde_credits: 10, statut: 'actif' }
      : { titre: '', description: '', categorie: '', prix_credits: 5, duree: '', niveau: 'Débutant' }
    )
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === 'users') {
      if (type === 'add') {
        const newUser = {
          ...formData,
          id: Math.max(...users.map(u => u.id)) + 1,
          date_inscription: new Date().toISOString().split('T')[0],
          derniere_connexion: new Date().toISOString().split('T')[0]
        };
        setUsers([...users, newUser]);
      } else if (type === 'edit') {
        setUsers(users.map(u => u.id === item.id ? { ...u, ...formData } : u));
      }
    } else {
      if (type === 'add') {
        const newCompetence = {
          ...formData,
          id: Math.max(...competences.map(c => c.id)) + 1,
          date_creation: new Date().toISOString().split('T')[0],
          auteur: 'Admin',
          participants: 0
        };
        setCompetences([...competences, newCompetence]);
      } else if (type === 'edit') {
        setCompetences(competences.map(c => c.id === item.id ? { ...c, ...formData } : c));
      }
    }
    
    onClose();
  };

  const isViewMode = type === 'view';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {type === 'add' ? 'Ajouter' : type === 'edit' ? 'Modifier' : 'Voir'} {' '}
            {activeTab === 'users' ? 'un utilisateur' : 'une compétence'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'users' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
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
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rôle
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Crédits
                  </label>
                  <input
                    type="number"
                    value={formData.solde_credits}
                    onChange={(e) => setFormData({...formData, solde_credits: parseInt(e.target.value)})}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  value={formData.statut}
                  onChange={(e) => setFormData({...formData, statut: e.target.value})}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.titre}
                  onChange={(e) => setFormData({...formData, titre: e.target.value})}
                  disabled={isViewMode}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  disabled={isViewMode}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix (crédits)
                  </label>
                  <input
                    type="number"
                    value={formData.prix_credits}
                    onChange={(e) => setFormData({...formData, prix_credits: parseInt(e.target.value)})}
                    disabled={isViewMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée
                  </label>
                  <input
                    type="text"
                    value={formData.duree}
                    onChange={(e) => setFormData({...formData, duree: e.target.value})}
                    disabled={isViewMode}
                    placeholder="ex: 2 heures"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
            </>
          )}

          {!isViewMode && (
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                {type === 'add' ? 'Ajouter' : 'Modifier'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;