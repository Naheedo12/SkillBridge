import { create } from 'zustand';
import notificationService from '../services/notificationService';

const useNotificationStore = create((set, get) => ({
  // État
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  // Actions
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Charger toutes les notifications
  loadNotifications: async (unreadOnly = false) => {
    set({ loading: true, error: null });
    try {
      const response = await notificationService.getNotifications(unreadOnly);
      if (response.success) {
        set({ 
          notifications: response.data,
          loading: false 
        });
        return { success: true };
      } else {
        set({ error: response.message, loading: false });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.message || 'Erreur lors du chargement des notifications';
      set({ error: message, loading: false });
      return { success: false, message };
    }
  },

  // Charger le nombre de notifications non lues
  loadUnreadCount: async () => {
    try {
      const response = await notificationService.getUnreadCount();
      if (response.success) {
        set({ unreadCount: response.data.count });
        return { success: true, count: response.data.count };
      }
    } catch (error) {
      console.error('Erreur lors du chargement du compteur:', error);
    }
  },

  // Marquer une notification comme lue
  markAsRead: async (notificationId) => {
    try {
      const response = await notificationService.markAsRead(notificationId);
      if (response.success) {
        // Mettre à jour l'état local
        const notifications = get().notifications.map(n => 
          n.id === notificationId ? { ...n, lu: true } : n
        );
        const unreadCount = Math.max(0, get().unreadCount - 1);
        
        set({ notifications, unreadCount });
        return { success: true };
      }
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
      return { success: false, message: error.message };
    }
  },

  // Marquer toutes les notifications comme lues
  markAllAsRead: async () => {
    try {
      const response = await notificationService.markAllAsRead();
      if (response.success) {
        // Mettre à jour l'état local
        const notifications = get().notifications.map(n => ({ ...n, lu: true }));
        set({ notifications, unreadCount: 0 });
        return { success: true };
      }
    } catch (error) {
      console.error('Erreur lors du marquage global:', error);
      return { success: false, message: error.message };
    }
  },

  // Supprimer une notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await notificationService.deleteNotification(notificationId);
      if (response.success) {
        // Mettre à jour l'état local
        const notifications = get().notifications.filter(n => n.id !== notificationId);
        const deletedNotification = get().notifications.find(n => n.id === notificationId);
        const unreadCount = deletedNotification && !deletedNotification.lu 
          ? Math.max(0, get().unreadCount - 1) 
          : get().unreadCount;
        
        set({ notifications, unreadCount });
        return { success: true };
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return { success: false, message: error.message };
    }
  },

  // Ajouter une nouvelle notification (pour les mises à jour en temps réel)
  addNotification: (notification) => {
    const notifications = [notification, ...get().notifications];
    const unreadCount = get().unreadCount + 1;
    set({ notifications, unreadCount });
  },

  // Réinitialiser le store
  reset: () => set({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
  })
}));

export default useNotificationStore;