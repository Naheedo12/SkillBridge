import authService from './authService';

const contactService = {
  sendMessage: async (formData) => {
    return await authService.request('/contact', 'POST', formData);
  }
};

export default contactService;