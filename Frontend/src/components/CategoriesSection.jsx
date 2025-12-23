import { Link } from "react-router-dom";

const CategoriesSection = () => {
  const skills = [
    { category: "Informatique" },
    { category: "Musique" },
    { category: "Design" },
    { category: "Cuisine" },
    { category: "Langues" },
    { category: "Art" },
    { category: "Sport" },
    { category: "Business" },
    { category: "Sciences" },
  ];

  const categories = [
    { icon: "💻", title: "Informatique", bg: "bg-gray-100" },
    { icon: "🌍", title: "Langues", bg: "bg-blue-100" },
    { icon: "🎵", title: "Musique", bg: "bg-green-100" },
    { icon: "🎨", title: "Art", bg: "bg-orange-100" },
    { icon: "🍳", title: "Cuisine", bg: "bg-yellow-100" },
    { icon: "⚽", title: "Sport", bg: "bg-green-100" },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-['Inter'] mb-4">
            Explorez par catégorie
          </h2>
          <p className="text-xl text-gray-600 font-['Inter']">
            Trouvez la compétence parfaite dans nos catégories populaires
          </p>
        </div>

        {/* Catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => {
            const count = skills.filter(
              (s) => s.category === cat.title
            ).length;

            return (
              <Link
                key={index}
                to={`/competences?category=${cat.title}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group block"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${cat.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition`}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 font-['Inter'] group-hover:text-purple-600">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-gray-600 font-['Inter']">
                        {count} compétence{count > 1 && "s"}
                      </p>
                    </div>
                  </div>

                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;