import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import competenceService from "../services/competenceService";

const CategoriesSection = () => {
  const [categoriesStats, setCategoriesStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoriesConfig = {
    Programmation: { icon: "💻", bg: "bg-blue-100" },
    Design: { icon: "🎨", bg: "bg-orange-100" },
    Musique: { icon: "🎵", bg: "bg-purple-100" },
    Cuisine: { icon: "🍳", bg: "bg-yellow-100" },
    Langues: { icon: "🌍", bg: "bg-green-100" },
    Art: { icon: "🖌️", bg: "bg-pink-100" },
    Sport: { icon: "⚽", bg: "bg-emerald-100" },
    Business: { icon: "💼", bg: "bg-gray-100" },
    Sciences: { icon: "🔬", bg: "bg-indigo-100" },
    Bricolage: { icon: "🔨", bg: "bg-red-100" },
    Jardinage: { icon: "🌱", bg: "bg-lime-100" },
    Informatique: { icon: "💻", bg: "bg-blue-100" },
  };

  // Charger les statistiques des catégories
  useEffect(() => {
    const fetchCategoriesStats = async () => {
      try {
        setLoading(true);
        const response = await competenceService.getCategoriesStats();
        if (response?.success) {
          setCategoriesStats(response.data || []);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
        setCategoriesStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesStats();
  }, []);

  // Top 9 catégories
  const topCategories = categoriesStats.slice(0, 9);

  // Aucun résultat
  if (!loading && categoriesStats.length === 0) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explorez par catégorie
          </h2>
          <p className="text-xl text-gray-600">
            Aucune catégorie disponible pour le moment
          </p>
        </div>
      </section>
    );
  }

  // Loader
  if (loading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explorez par catégorie
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez la compétence parfaite dans nos catégories populaires
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explorez par catégorie
          </h2>
          <p className="text-xl text-gray-600">
            Trouvez la compétence parfaite dans nos catégories populaires
          </p>
        </div>

        {/* Catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCategories.map((category) => {
            const config =
              categoriesConfig[category.categorie] || {
                icon: "📚",
                bg: "bg-gray-100",
              };

            return (
              <Link
                key={category.categorie}
                to={`/competences?category=${encodeURIComponent(
                  category.categorie
                )}`}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group block"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${config.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition`}
                    >
                      <span className="text-2xl">{config.icon}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                        {category.categorie}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.count} compétence
                        {category.count > 1 ? "s" : ""}
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
