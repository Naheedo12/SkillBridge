import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/authService';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // État
      user: null,
      error: null,

      // Getter
      isAuthenticated: () => !!get().user,
      isAdmin: () => {
        const user = get().user;
        return user?.role === 'Administrateur' || user?.role === 'admin';
      },

      // Actions pour gérer les erreurs
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Fonction utilitaire pour gérer les erreurs de manière cohérente
      handleError: (error, defaultMessage = 'Une erreur est survenue') => {
        let message = defaultMessage;
        
        if (error?.response?.data?.message) {
          message = error.response.data.message;
        } else if (error?.message) {
          message = error.message;
        }
        
        set({ error: message });
        return { success: false, message };
      },

      // Connexion
      login: async (credentials) => {
        set({ error: null });

        try {
          console.log('Login attempt with:', credentials);
          const response = await authService.login(credentials);
          console.log('Login response:', response);

          if (response.success) {
            let user = response.data.user;
            console.log('User from response:', user);
            
            // Garder le rôle tel qu'il vient du backend
            // Ne pas normaliser pour garder la cohérence
            
            console.log('Setting user in store:', user);
            set({ user, error: null });
            return { success: true };
          } else {
            return get().handleError(response, 'Erreur de connexion');
          }
        } catch (err) {
          console.error('Login error:', err);
          return get().handleError(err, 'Une erreur est survenue lors de la connexion');
        }
      },

      // Inscription
      register: async (userData) => {
        set({ error: null });

        try {
          const response = await authService.register(userData);

          if (response.success) {
            let user = response.data.user;
            
            // Garder le rôle tel qu'il vient du backend
            set({ user, error: null });
            return { success: true };
          } else {
            return get().handleError(response, "Erreur d'inscription");
          }
        } catch (err) {
          return get().handleError(err, "Une erreur est survenue lors de l'inscription");
        }
      },

      // Déconnexion
      logout: async () => {
        try {
          await authService.logout();
        } catch (err) {
          console.warn('Erreur lors de la déconnexion:', err);
        } finally {
          set({ user: null, error: null });
        }
      },

      // Mettre à jour le profil utilisateur
      updateProfile: async (profileData) => {
        set({ error: null });

        try {
          const response = await authService.updateProfile(profileData);

          if (response.success) {
            let updatedUser = response.data.user;
            
            set({ user: updatedUser, error: null });
            return { success: true, data: updatedUser };
          } else {
            return get().handleError(response, 'Erreur lors de la mise à jour du profil');
          }
        } catch (err) {
          return get().handleError(err, 'Une erreur est survenue lors de la mise à jour du profil');
        }
      },

      // Réinitialiser tout
      reset: () => set({ user: null, error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;