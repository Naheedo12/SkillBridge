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

      // Connexion
      login: async (credentials) => {
        set({ error: null });

        try {
          const response = await authService.login(credentials);

          if (response.success) {
            set({ user: response.data.user, error: null });
            return { success: true };
          } else {
            const message = response.message || 'Erreur de connexion';
            set({ error: message });
            return { success: false, message };
          }
        } catch (err) {
          const message = 'Une erreur est survenue lors de la connexion';
          set({ error: message });
          return { success: false, message };
        }
      },

      // Inscription
      register: async (userData) => {
        set({ error: null });

        try {
          const response = await authService.register(userData);

          if (response.success) {
            set({ user: response.data.user, error: null });
            return { success: true };
          } else {
            const message = response.message || "Erreur d'inscription";
            set({ error: message });
            return { success: false, message };
          }
        } catch (err) {
          const message = "Une erreur est survenue lors de l'inscription";
          set({ error: message });
          return { success: false, message };
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
