import { create } from 'zustand';
import competenceService from '../services/competenceService';

const useCompetenceStore = create((set, get) => ({
  competences: [],
  currentCompetence: null,
  loading: false,
  error: null,
  searchTimeout: null,
  
  // Pagination
  currentPage: 1,
  totalPages: 1,
  totalCompetences: 0,
  competencesPerPage: 9,
  
  // Filtres
  searchQuery: '',
  selectedCategory: 'Toutes catégories',
  selectedLevel: 'Tous niveaux',
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  
  // Filtres
  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
    // Déclencher la recherche après un délai pour éviter trop d'appels
    const timeoutId = setTimeout(() => {
      get().fetchCompetences();
    }, 300);
    // Annuler le timeout précédent s'il existe
    if (get().searchTimeout) {
      clearTimeout(get().searchTimeout);
    }
    set({ searchTimeout: timeoutId });
  },
  
  setSelectedCategory: (category) => {
    set({ selectedCategory: category, currentPage: 1 });
    get().fetchCompetences();
  },
  
  setSelectedLevel: (level) => {
    set({ selectedLevel: level, currentPage: 1 });
    get().fetchCompetences();
  },
  
  // Pagination
  setCurrentPage: (page) => {
    set({ currentPage: page });
    get().fetchCompetences();
  },
  
  // Réinitialiser les filtres
  resetFilters: () => {
    set({
      searchQuery: '',
      selectedCategory: 'Toutes catégories',
      selectedLevel: 'Tous niveaux',
      currentPage: 1
    });
    get().fetchCompetences();
  },
  
  // Récupérer toutes les compétences avec filtres et pagination
  fetchCompetences: async () => {
    const { searchQuery, selectedCategory, selectedLevel, currentPage, competencesPerPage } = get();
    
    set({ loading: true, error: null });
    
    try {
      const params = {
        page: currentPage,
        per_page: competencesPerPage,
      };
      
      if (searchQuery && searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      if (selectedCategory && selectedCategory !== 'Toutes catégories') {
        params.category = selectedCategory;
      }
      if (selectedLevel && selectedLevel !== 'Tous niveaux') {
        params.level = selectedLevel;
      }
      
      const response = await competenceService.getAllCompetences(params);
      
      if (response.success) {
        const paginationData = response.data;
        
        set({
          competences: paginationData.data || [],
          currentPage: paginationData.current_page || currentPage,
          totalPages: paginationData.last_page || 1,
          totalCompetences: paginationData.total || 0,
          loading: false
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences:', error);
      set({ 
        error: error.message || 'Erreur lors de la récupération des compétences',
        loading: false,
        competences: []
      });
    }
  },
  
  // Récupérer une compétence spécifique
  fetchCompetenceById: async (id) => {
    set({ loading: true, error: null });
    
    try {
      const response = await competenceService.getCompetenceById(id);
      
      if (response.success) {
        set({
          currentCompetence: response.data,
          loading: false
        });
        return response.data;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la compétence:', error);
      set({ 
        error: error.message || 'Erreur lors de la récupération de la compétence',
        loading: false,
        currentCompetence: null
      });
      throw error;
    }
  },
  
  // Créer une nouvelle compétence
  createCompetence: async (competenceData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await competenceService.createCompetence(competenceData);
      
      if (response.success) {
        // Recharger les compétences après création
        await get().fetchCompetences();
        set({ loading: false });
        return response.data;
      }
    } catch (error) {
      console.error('Erreur lors de la création de la compétence:', error);
      set({ 
        error: error.message || 'Erreur lors de la création de la compétence',
        loading: false
      });
      throw error;
    }
  },
  
  // Modifier une compétence
  updateCompetence: async (id, competenceData) => {
    set({ loading: true, error: null });
    
    try {
      const response = await competenceService.updateCompetence(id, competenceData);
      
      if (response.success) {
        // Recharger les compétences après modification
        await get().fetchCompetences();
        set({ loading: false });
        return response.data;
      }
    } catch (error) {
      console.error('Erreur lors de la modification de la compétence:', error);
      set({ 
        error: error.message || 'Erreur lors de la modification de la compétence',
        loading: false
      });
      throw error;
    }
  },
  
  // Supprimer une compétence
  deleteCompetence: async (id) => {
    set({ loading: true, error: null });
    
    try {
      const response = await competenceService.deleteCompetence(id);
      
      if (response.success) {
        // Recharger les compétences après suppression
        await get().fetchCompetences();
        set({ loading: false });
        return response;
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la compétence:', error);
      set({ 
        error: error.message || 'Erreur lors de la suppression de la compétence',
        loading: false
      });
      throw error;
    }
  },
}));

export default useCompetenceStore;