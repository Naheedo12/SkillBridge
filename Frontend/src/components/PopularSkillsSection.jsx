import { Link } from 'react-router-dom';

const PopularSkillsSection = () => {
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
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la section */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 font-['Inter'] mb-2">
              Compétences populaires
            </h2>
            <p className="text-lg text-gray-600 font-['Inter']">
              Les compétences les plus demandées cette semaine
            </p>
          </div>
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium font-['Inter'] transition-colors duration-200">
            Voir tout
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Grille des compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <Link 
              key={skill.id} 
              to={`/competences/${skill.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer group block"
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
      </div>
    </section>
  );
};

export default PopularSkillsSection;