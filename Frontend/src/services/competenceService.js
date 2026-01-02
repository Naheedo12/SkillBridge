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
      console.log('🔍 Appel API getMyCompetences...');
      
      console.log('🔄 Utilisation du système de fallback...');
      const allCompetencesResponse = await authService.request('/competences?per_page=100', 'GET');
      console.log('📊 Toutes les compétences récupérées:', allCompetencesResponse);
      
      if (allCompetencesResponse?.success && allCompetencesResponse?.data?.data) {
        // Récupérer l'utilisateur actuel
        const userResponse = await authService.request('/auth/me', 'GET');
        console.log('👤 Utilisateur actuel:', userResponse);
        
        if (userResponse?.success && userResponse?.data) {
          console.log('🔍 Structure complète de userResponse.data:', userResponse.data);
          
          const currentUserId = userResponse.data.user?.id || userResponse.data.id;
          console.log('🔍 ID utilisateur actuel:', currentUserId, typeof currentUserId);
          
          if (!currentUserId) {
            console.error('❌ Impossible de trouver l\'ID utilisateur dans:', userResponse.data);
            throw new Error('ID utilisateur non trouvé');
          }
          
          const allCompetences = allCompetencesResponse.data.data;
          console.log('📋 Toutes les compétences avant filtrage:', allCompetences);
          
          const userCompetences = allCompetences.filter(comp => {
            console.log(`🔍 Compétence "${comp.titre}": user_id=${comp.user_id} (${typeof comp.user_id}), currentUserId=${currentUserId} (${typeof currentUserId}), match=${comp.user_id == currentUserId}`);
            return comp.user_id == currentUserId;
          });
          
          console.log('✅ Compétences filtrées pour l\'utilisateur:', userCompetences);
          return {
            success: true,
            data: userCompetences
          };
        }
      }
      
      throw new Error('Impossible de récupérer les compétences');
    } catch (error) {
      console.error('❌ Erreur getMyCompetences:', error);
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

  // Récupérer les statistiques admin
  getAdminStats: async () => {
    try {
      const response = await authService.request('/admin-stats', 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer l'activité récente pour l'admin
  getRecentActivity: async () => {
    try {
      const response = await authService.request('/admin-activity', 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Récupérer les top compétences pour l'admin
  getTopCompetences: async () => {
    try {
      const response = await authService.request('/admin-top-competences', 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default competenceService;
