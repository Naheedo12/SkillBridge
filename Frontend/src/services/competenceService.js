import authService from './authService';

const competenceService = {
  // Récupérer toutes les compétences avec pagination et filtres
  getAllCompetences: async (params = {}) => {
    try {
      console.log('🚀 Service: Appel API getAllCompetences avec params:', params);
      // Convertir params en query string
      const queryString = new URLSearchParams(params).toString();
      const url = `/competences${queryString ? `?${queryString}` : ''}`;
      
      const response = await authService.request(url, 'GET');
      console.log('✅ Service: Réponse API reçue:', response);
      return response;
    } catch (error) {
      console.error('❌ Service: Erreur API getAllCompetences:', error);
      throw error;
    }
  },

  // Récupérer une compétence spécifique
  getCompetenceById: async (id) => {
    try {
      const response = await authService.request(`/competences/${id}`, 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Créer une nouvelle compétence
  createCompetence: async (competenceData) => {
    try {
      const response = await authService.request('/competences', 'POST', competenceData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Modifier une compétence
  updateCompetence: async (id, competenceData) => {
    try {
      const response = await authService.request(`/competences/${id}`, 'PUT', competenceData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Supprimer une compétence
  deleteCompetence: async (id) => {
    try {
      const response = await authService.request(`/competences/${id}`, 'DELETE');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les compétences de l'utilisateur connecté
  getMyCompetences: async () => {
    try {
      const response = await authService.request('/competences/mes-competences', 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les statistiques par catégorie
  getCategoriesStats: async () => {
    try {
      const response = await authService.request('/competences-stats/categories', 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les compétences récentes
  getRecentCompetences: async (limit = 3) => {
    try {
      const response = await authService.request(`/competences-recent/${limit}`, 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default competenceService;
