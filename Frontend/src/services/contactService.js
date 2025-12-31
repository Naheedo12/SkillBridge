import authService from './authService';

const contactService = {
  // Envoyer un message de contact
  sendMessage: async (formData) => {
    return await authService.request('/contact', 'POST', formData);
  }
};

export default contactService;