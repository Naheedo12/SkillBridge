import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

// Hook pour utiliser l'auth partout
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au chargement de l'app
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (data) => {
    const response = await apiService.login(data);

    if (response.success) {
      setUser(response.data.user);
      return { success: true };
    }

    return {
      success: false,
      message: response.message || 'Erreur de connexion',
    };
  };

  // Register
  const register = async (data) => {
    const response = await apiService.register(data);

    if (response.success) {
      setUser(response.data.user);
      return { success: true };
    }

    return {
      success: false,
      message: response.message || "Erreur d'inscription",
    };
  };

  // Logout
  const logout = async () => {
    await apiService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
