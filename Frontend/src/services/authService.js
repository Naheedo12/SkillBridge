const API_BASE_URL = 'http://localhost:8000/api';

class AuthService {
  constructor() {
    this.token = null;
  }

  /** 
   * Enregistre le token en mémoire et dans localStorage 
   */
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  /** 
   * Récupère le token depuis la mémoire || localStorage 
   */
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  /** 
   * Fonction générique pour appeler l'API 
   */
  async request(url, method = 'GET', data = null) {
    const token = this.getToken();

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    if (data) options.body = JSON.stringify(data);
    if (token) options.headers.Authorization = `Bearer ${token}`;

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, options);

      if (!response.ok) {
        if (response.status === 401) {
          // Token invalide ou expiré
          this.setToken(null);
          throw new Error('Session expirée');
        }
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  /** Connexion */
  async login(credentials) {
    const response = await this.request('/auth/login', 'POST', credentials);

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  /** Inscription */
  async register(userData) {
    const response = await this.request('/auth/register', 'POST', userData);

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  /** Déconnexion */
  async logout() {
    try {
      await this.request('/auth/logout', 'POST');
    } catch (error) {
      console.warn('Erreur lors de la déconnexion:', error);
    } finally {
      this.setToken(null);
      localStorage.removeItem('user');
    }
  }

  /** Récupérer le profil de l'utilisateur */
  async getProfile() {
    return this.request('/auth/me');
  }

  /** Vérifie si un utilisateur est connecté */
  isAuthenticated() {
    return this.getToken() !== null;
  }
}

export default new AuthService();
