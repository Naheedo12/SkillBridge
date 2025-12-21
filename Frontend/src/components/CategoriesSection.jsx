const CategoriesSection = () => {
  const categories = [
    {
      icon: "💻",
      title: "Informatique",
      count: "487 compétences",
      bgColor: "bg-gray-100"
    },
    {
      icon: "🌍",
      title: "Langues", 
      count: "324 compétences",
      bgColor: "bg-blue-100"
    },
    {
      icon: "🎵",
      title: "Musique",
      count: "256 compétences", 
      bgColor: "bg-green-100"
    },
    {
      icon: "🎨",
      title: "Art & Design",
      count: "198 compétences",
      bgColor: "bg-orange-100"
    },
    {
      icon: "🍳",
      title: "Cuisine",
      count: "165 compétences",
      bgColor: "bg-yellow-100"
    },
    {
      icon: "⚽",
      title: "Sport", 
      count: "143 compétences",
      bgColor: "bg-green-100"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-['Inter'] mb-4">
            Explorez par catégorie
          </h2>
          <p className="text-xl text-gray-600 font-['Inter']">
            Trouvez la compétence parfaite dans nos catégories populaires
          </p>
        </div>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-['Inter']">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-['Inter'] mt-1">
                      {category.count}
                    </p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;