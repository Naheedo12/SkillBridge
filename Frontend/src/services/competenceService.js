import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Configuration d'axios avec intercepteur pour le token
const api = axios.create({
  baseURL: API_URL,
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const competenceService = {
  // Récupérer toutes les compétences avec pagination et filtres
  getAllCompetences: async (params = {}) => {
    try {
      console.log('🚀 Service: Appel API getAllCompetences avec params:', params);
      const response = await api.get('/competences', { params });
      console.log('✅ Service: Réponse API reçue:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Service: Erreur API getAllCompetences:', error);
      console.error('❌ Service: Détails erreur:', error.response?.data);
      throw error.response?.data || error.message;
    }
  },

  // Récupérer une compétence spécifique
  getCompetenceById: async (id) => {
    try {
      const response = await api.get(`/competences/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Créer une nouvelle compétence
  createCompetence: async (competenceData) => {
    try {
      const formData = new FormData();
      
      // Ajouter tous les champs au FormData
      Object.keys(competenceData).forEach(key => {
        if (competenceData[key] !== null && competenceData[key] !== undefined) {
          formData.append(key, competenceData[key]);
        }
      });

      const response = await api.post('/competences', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Modifier une compétence
  updateCompetence: async (id, competenceData) => {
    try {
      const formData = new FormData();
      
      // Ajouter tous les champs au FormData
      Object.keys(competenceData).forEach(key => {
        if (competenceData[key] !== null && competenceData[key] !== undefined) {
          formData.append(key, competenceData[key]);
        }
      });

      const response = await api.post(`/competences/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Supprimer une compétence
  deleteCompetence: async (id) => {
    try {
      const response = await api.delete(`/competences/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer les compétences de l'utilisateur connecté
  getMyCompetences: async () => {
    try {
      const response = await api.get('/competences/mes-competences');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer les statistiques par catégorie
  getCategoriesStats: async () => {
    try {
      const response = await api.get('/competences-stats/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer les compétences récentes
  getRecentCompetences: async (limit = 3) => {
    try {
      const response = await api.get(`/competences-recent/${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default competenceService;