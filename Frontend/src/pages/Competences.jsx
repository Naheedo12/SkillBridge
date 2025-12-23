import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Competences = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes catégories');
  const [selectedLevel, setSelectedLevel] = useState('Tous niveaux');

  // Récupérer les paramètres depuis l'URL au chargement
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    const categoryFromUrl = searchParams.get('category');
    
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const skills = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      category: "Informatique",
      categoryColor: "text-purple-600",
      categoryBg: "bg-purple-100",
      level: "Intermédiaire",
      title: "Développement Web avec React",
      instructor: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      rating: 4.8,
      credits: 2
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop",
      category: "Musique",
      categoryColor: "text-purple-600",
      categoryBg: "bg-purple-100",
      level: "Débutant",
      title: "Cours de Guitare Acoustique",
      instructor: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      rating: 4.9,
      credits: 2
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      category: "Design",
      categoryColor: "text-purple-600",
      categoryBg: "bg-purple-100",
      level: "Intermédiaire",
      title: "Design UI/UX avec Figma",
      instructor: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      rating: 4.7,
      credits: 2
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
      category: "Cuisine",
      categoryColor: "text-purple-600",
      categoryBg: "bg-purple-100",
      level: "Tous niveaux",
      title: "Cuisine Italienne Authentique",
      instructor: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      rating: 5.0,
      credits: 2
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      category: "Langues",
      categoryColor: "text-purple-600",
      categoryBg: "bg-purple-100",
      level: "Intermédiaire",
      title: "Conversation Anglais Courant",
      instructor: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      rating: 4.8,
      credits: 2
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=300&fit=crop",
      category: "Art",
      categoryColor: "text-purple-600",
      categoryBg: "bg-purple-100",
      level: "Avancé",
      title: "Photographie Portrait",
      instructor: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      rating: 4.9,
      credits: 2
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      category: "Sport",
      categoryColor: "text-purple-600",
      categoryBg: "bg-purple-100",
      level: "Débutant",
      title: "Yoga pour Débutants",
      instructor: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      rating: 4.6,
      credits: 2
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      category: "Business",
      categoryColor: "text-purple-600",
      categoryBg: "bg-purple-100",
      level: "Avancé",
      title: "Marketing Digital Avancé",
      instructor: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      rating: 4.7,
      credits: 2
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
      category: "Sciences",
      categoryColor: "text-purple-600",
      categoryBg: "bg-purple-100",
      level: "Intermédiaire",
      title: "Mathématiques Appliquées",
      instructor: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      rating: 4.5,
      credits: 2
    }
  ];

  // Fonction de filtrage dynamique
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes catégories' || skill.category === selectedCategory;
    const matchesLevel = selectedLevel === 'Tous niveaux' || skill.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section 
        className="py-20 px-4 text-center"
        style={{ 
          background: 'linear-gradient(135deg, #5943EC 0%, #692278 100%)' 
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-['Inter'] mb-6">
            Toutes les compétences
          </h1>
          <p className="text-xl text-white/90 font-['Inter'] max-w-3xl mx-auto">
            Explorez notre catalogue complet et trouvez la compétence qui vous correspond
          </p>
        </div>
      </section>

      {/* Barre de recherche et filtres */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher une compétence"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
              />
            </div>

            {/* Filtres */}
            <div className="flex gap-4">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white min-w-45 font-['Inter'] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option>Toutes catégories</option>
                <option>Informatique</option>
                <option>Design</option>
                <option>Musique</option>
                <option>Cuisine</option>
                <option>Langues</option>
                <option>Art</option>
                <option>Sport</option>
                <option>Business</option>
                <option>Sciences</option>
              </select>
              
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg bg-white min-w-37.5 font-['Inter'] focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option>Tous niveaux</option>
                <option>Débutant</option>
                <option>Intermédiaire</option>
                <option>Avancé</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600 font-['Inter'] mb-8">
            {filteredSkills.length} compétence{filteredSkills.length !== 1 ? 's' : ''} trouvée{filteredSkills.length !== 1 ? 's' : ''}
            {searchQuery && (
              <span className="ml-2 text-purple-600">
                pour "{searchQuery}"
              </span>
            )}
          </p>

          {/* Message si aucun résultat */}
          {filteredSkills.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune compétence trouvée</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos critères de recherche ou vos filtres
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Toutes catégories');
                  setSelectedLevel('Tous niveaux');
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Grille des compétences */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkills.map((skill) => (
              <Link
                key={skill.id}
                to={`/competences/${skill.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group block"
              >
                {/* Image de la compétence */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={skill.image} 
                    alt={skill.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge crédits */}
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium font-['Inter']">
                    {skill.credits} crédits
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  {/* Catégorie et niveau */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`${skill.categoryBg} ${skill.categoryColor} px-3 py-1 rounded-full text-xs font-medium font-['Inter']`}>
                      {skill.category}
                    </span>
                    <span className="text-gray-600 text-sm font-['Inter']">
                      {skill.level}
                    </span>
                  </div>

                  {/* Titre */}
                  <h3 className="text-xl font-bold text-gray-900 font-['Inter'] mb-4 group-hover:text-purple-600 transition-colors duration-200">
                    {skill.title}
                  </h3>

                  {/* Instructeur et note */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={skill.avatar} 
                        alt={skill.instructor}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-600 font-['Inter']">
                        {skill.instructor}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-900 font-['Inter']">
                        {skill.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination - Afficher seulement s'il y a des résultats */}
          {filteredSkills.length > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700 font-['Inter']">
                  Précédent
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-['Inter']">
                  1
                </button>
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-['Inter']">
                  2
                </button>
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-['Inter']">
                  3
                </button>
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700 font-['Inter']">
                  Suivant
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Competences;