import authService from './authService';

const chatService = {
  getConversations: async () => {
    return await authService.request('/chat/conversations', 'GET');
  },

  getMessages: async (userId) => {
    return await authService.request(`/chat/messages/${userId}`, 'GET');
  },

  sendMessage: async (destinataireId, contenu) => {
    return await authService.request('/chat/send', 'POST', {
      destinataire_id: destinataireId,
      contenu: contenu
    });
  },

  createEchange: async (competenceId, enseignantId) => {
    return await authService.request('/chat/echange', 'POST', {
      competence_id: competenceId,
      user_enseignant_id: enseignantId
    });
  },

  acceptEchange: async (echangeId) => {
    return await authService.request(`/chat/echange/${echangeId}/accept`, 'POST');
  },

  refuseEchange: async (echangeId) => {
    return await authService.request(`/chat/echange/${echangeId}/refuse`, 'POST');
  },

  getEchangeStatus: async (userId) => {
    return await authService.request(`/chat/echange-status/${userId}`, 'GET');
  },

  getMesAchats: async () => {
    return await authService.request('/chat/mes-achats', 'GET');
  },

  getUnreadMessagesCount: async () => {
    return await authService.request('/chat/unread-count', 'GET');
  }
};

export default chatService;