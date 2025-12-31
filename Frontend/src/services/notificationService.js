import authService from './authService';

const notificationService = {
  // Récupérer toutes les notifications
  getNotifications: async (unreadOnly = false) => {
    const params = unreadOnly ? '?unread_only=true' : '';
    return await authService.request(`/notifications${params}`, 'GET');
  },

  // Récupérer le nombre de notifications non lues
  getUnreadCount: async () => {
    return await authService.request('/notifications/unread-count', 'GET');
  },

  // Marquer une notification comme lue
  markAsRead: async (notificationId) => {
    return await authService.request(`/notifications/${notificationId}/read`, 'PUT');
  },

  // Marquer toutes les notifications comme lues
  markAllAsRead: async () => {
    return await authService.request('/notifications/mark-all-read', 'PUT');
  },

  // Supprimer une notification
  deleteNotification: async (notificationId) => {
    return await authService.request(`/notifications/${notificationId}`, 'DELETE');
  }
};

export default notificationService;