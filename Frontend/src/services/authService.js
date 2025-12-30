const API_BASE_URL = 'http://localhost:8000/api';

class AuthService {
  constructor() {
    this.token = null;
    this.maxRetries = 3; // Nombre maximum de tentatives
    this.retryDelay = 1000; // Délai entre les tentatives (ms)
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
   * Récupère le token depuis la mémoire ou localStorage 
   */
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  /** 
   * Fonction générique pour appeler l'API avec retry automatique
   */
  async request(url, method = 'GET', data = null, retryCount = 0) {
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
      console.log(`API Request: ${method} ${API_BASE_URL}${url}`, data);
      const response = await fetch(`${API_BASE_URL}${url}`, options);
      console.log(`API Response status: ${response.status}`);

      if (!response.ok) {
        if (response.status === 401) {
          // Token invalide ou expiré
          this.setToken(null);
          throw new Error('Session expirée');
        }
        
        // Pour les erreurs 400 et 422, récupérer le message du serveur
        if (response.status === 400 || response.status === 422) {
          const errorData = await response.json();
          console.log('Erreur du serveur:', errorData);
          const errorMessage = errorData.message || 
            (errorData.errors ? Object.values(errorData.errors).flat().join(', ') : 'Erreur de validation');
          throw new Error(errorMessage);
        }
        
        // Retry pour les erreurs serveur (5xx) ou réseau
        if (response.status >= 500 && retryCount < this.maxRetries) {
          console.warn(`Tentative ${retryCount + 1}/${this.maxRetries} échouée, retry dans ${this.retryDelay}ms`);
          await this.delay(this.retryDelay);
          return this.request(url, method, data, retryCount + 1);
        }
        
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response data:', result);
      return result;
    } catch (error) {
      // Retry pour les erreurs réseau
      if (error.name === 'TypeError' && retryCount < this.maxRetries) {
        console.warn(`Erreur réseau, tentative ${retryCount + 1}/${this.maxRetries}`);
        await this.delay(this.retryDelay);
        return this.request(url, method, data, retryCount + 1);
      }
      
      console.error('Erreur API:', error);
      throw error;
    }
  }

  /** Fonction utilitaire pour les délais */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  /** Récupérer tous les utilisateurs (Admin) */
  async getUsers() {
    return this.request('/users');
  }

  /** Récupérer un utilisateur spécifique */
  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  /** Créer un utilisateur (Admin) */
  async createUser(userData) {
    return this.request('/users', 'POST', userData);
  }

  /** Mettre à jour un utilisateur */
  async updateUser(id, userData) {
    return this.request(`/users/${id}`, 'PUT', userData);
  }

  /** Supprimer un utilisateur (Admin) */
  async deleteUser(id) {
    return this.request(`/users/${id}`, 'DELETE');
  }

  /** Mettre à jour le profil de l'utilisateur connecté */
  async updateProfile(profileData) {
    console.log('updateProfile called with:', profileData);
    const result = await this.request('/auth/profile', 'PUT', profileData);
    console.log('updateProfile result:', result);
    return result;
  }

  /** Vérifie si un utilisateur est connecté */
  isAuthenticated() {
    return this.getToken() !== null;
  }
}

export default new AuthService();
