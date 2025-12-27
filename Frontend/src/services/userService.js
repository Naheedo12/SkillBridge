import authService from './authService';

class UserService {
  /** Récupérer tous les utilisateurs (Admin seulement) */
  async getAllUsers() {
    try {
      const response = await authService.getUsers();
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  }

  /** Récupérer un utilisateur par ID */
  async getUserById(id) {
    try {
      const response = await authService.getUser(id);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
  }

  /** Créer un nouvel utilisateur (Admin seulement) */
  async createUser(userData) {
    try {
      const response = await authService.createUser(userData);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  }

  /** Mettre à jour un utilisateur */
  async updateUser(id, userData) {
    try {
      const response = await authService.updateUser(id, userData);
      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error;
    }
  }

  /** Supprimer un utilisateur (Admin seulement) */
  async deleteUser(id) {
    try {
      const response = await authService.deleteUser(id);
      return response;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }
}

export default new UserService();