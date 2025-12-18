const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {

  // Fonction générale pour appeler l’API
  async request(url, method = 'GET', data = null) {
    const token = localStorage.getItem('auth_token');

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    // Si on envoie des données (POST)
    if (data) {
      options.body = JSON.stringify(data);
    }

    // Si l'utilisateur est connecté, on ajoute le token
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(API_BASE_URL + url, options);
    const result = await response.json();

    // On retourne toujours la réponse du backend
    return result;
  }

  // 🔐 Connexion
  async login(data) {
    const response = await this.request('/auth/login', 'POST', data);

    if (response.success) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  // 📝 Inscription
  async register(data) {
    const response = await this.request('/auth/register', 'POST', data);

    if (response.success) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  // 🚪 Déconnexion
  async logout() {
    await this.request('/auth/logout', 'POST');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  // 👤 Profil
  async getProfile() {
    return await this.request('/auth/me');
  }

  // ✅ Est-ce que l'utilisateur est connecté ?
  isAuthenticated() {
    return localStorage.getItem('auth_token') !== null;
  }

  // 👤 Utilisateur actuel
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new ApiService();
