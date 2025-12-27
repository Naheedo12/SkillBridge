import { create } from 'zustand';
import authService from '../services/authService';

const useUserStore = create((set, get) => ({
  // État
  users: [],
  currentViewedUser: null,
  loading: false,
  error: null,

  // Actions pour gérer les erreurs
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setLoading: (loading) => set({ loading }),

  // Fonction utilitaire pour gérer les erreurs
  handleError: (error, defaultMessage = 'Une erreur est survenue') => {
    let message = defaultMessage;
    
    if (error?.message) {
      message = error.message;
    } else if (error?.response?.data?.message) {
      message = error.response.data.message;
    }
    
    console.error('Erreur dans userStore:', message);
    set({ error: message, loading: false });
    return { success: false, message };
  },

  // Récupérer tous les utilisateurs (Admin)
  fetchUsers: async () => {
    set({ loading: true, error: null });
    
    try {
      console.log('fetchUsers: Appel direct à authService.request');
      const response = await authService.request('/users');
      console.log('fetchUsers: Réponse reçue:', response);
      
      if (response.success) {
        set({ users: response.data, loading: false });
        return { success: true, data: response.data };
      } else {
        return get().handleError(response, 'Erreur lors de la récupération des utilisateurs');
      }
    } catch (error) {
      console.error('fetchUsers: Erreur attrapée:', error);
      return get().handleError(error, 'Erreur lors de la récupération des utilisateurs');
    }
  },

  // Récupérer un utilisateur spécifique
  fetchUser: async (id) => {
    set({ loading: true, error: null });
    
    try {
      const response = await authService.request(`/users/${id}`);
      
      if (response.success) {
        set({ currentViewedUser: response.data, loading: false });
        return { success: true, data: response.data };
      } else {
        return get().handleError(response, 'Erreur lors de la récupération de l\'utilisateur');
      }
    } catch (error) {
      return get().handleError(error, 'Erreur lors de la récupération de l\'utilisateur');
    }
  },

  // Créer un utilisateur (Admin)
  createUser: async (userData) => {
    set({ loading: true, error: null });
    
    try {
      console.log('createUser: Données envoyées:', userData);
      const response = await authService.request('/users', 'POST', userData);
      console.log('createUser: Réponse reçue:', response);
      
      if (response.success) {
        // Ajouter le nouvel utilisateur à la liste
        set(state => ({
          users: [response.data, ...state.users],
          loading: false
        }));
        return { success: true, data: response.data };
      } else {
        return get().handleError(response, 'Erreur lors de la création de l\'utilisateur');
      }
    } catch (error) {
      console.error('createUser: Erreur attrapée:', error);
      return get().handleError(error, 'Erreur lors de la création de l\'utilisateur');
    }
  },

  // Mettre à jour un utilisateur
  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await authService.request(`/users/${id}`, 'PUT', userData);
      
      if (response.success) {
        // Mettre à jour l'utilisateur dans la liste
        set(state => ({
          users: state.users.map(user => 
            user.id === id ? response.data : user
          ),
          currentViewedUser: state.currentViewedUser?.id === id ? response.data : state.currentViewedUser,
          loading: false
        }));
        return { success: true, data: response.data };
      } else {
        return get().handleError(response, 'Erreur lors de la mise à jour de l\'utilisateur');
      }
    } catch (error) {
      return get().handleError(error, 'Erreur lors de la mise à jour de l\'utilisateur');
    }
  },

  // Supprimer un utilisateur (Admin)
  deleteUser: async (id) => {
    set({ loading: true, error: null });
    
    try {
      const response = await authService.request(`/users/${id}`, 'DELETE');
      
      if (response.success) {
        // Retirer l'utilisateur de la liste
        set(state => ({
          users: state.users.filter(user => user.id !== id),
          currentViewedUser: state.currentViewedUser?.id === id ? null : state.currentViewedUser,
          loading: false
        }));
        return { success: true };
      } else {
        return get().handleError(response, 'Erreur lors de la suppression de l\'utilisateur');
      }
    } catch (error) {
      return get().handleError(error, 'Erreur lors de la suppression de l\'utilisateur');
    }
  },

  // Réinitialiser l'utilisateur actuellement visualisé
  clearCurrentUser: () => set({ currentViewedUser: null }),

  // Réinitialiser tout
  reset: () => set({ 
    users: [], 
    currentViewedUser: null, 
    loading: false, 
    error: null 
  }),
}));

export default useUserStore;