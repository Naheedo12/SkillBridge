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
            
            // Normalisation du rôle pour assurer la compatibilité
            if (user.role === 'Administrateur') {
              user.role = 'admin';
            } else if (user.role === 'Utilisateur') {
              user.role = 'user';
            }
            
            // Normalisation des champs
            if (user.solde_credits) {
              user.soldeCredits = user.solde_credits;
            }
            
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
            
            // Normalisation du rôle pour assurer la compatibilité
            if (user.role === 'Administrateur') {
              user.role = 'admin';
            } else if (user.role === 'Utilisateur') {
              user.role = 'user';
            }
            
            // Normalisation des champs
            if (user.solde_credits) {
              user.soldeCredits = user.solde_credits;
            }
            
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
      updateUser: (userData) => set({ user: userData }),

      // Réinitialiser tout
      reset: () => set({ user: null, error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // ne conserve que l'utilisateur
    }
  )
);

export default useAuthStore;
