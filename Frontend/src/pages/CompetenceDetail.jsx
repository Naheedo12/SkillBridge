import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CompetenceDetail = () => {
  const { id } = useParams();

  // Données simulées
  const competence = {
    id: 1,
    category: "Informatique",
    level: "Intermédiaire",
    title: "Développement Web avec React",
    instructor: "Salma ELQADI",
    avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
    rating: 4.8,
    reviewCount: 24,
    exchangeCount: 28,
    credits: 2,
    description: "Je propose des cours complets de développement web avec React. Vous apprendrez les bases de React, les hooks, la gestion d'état avec Redux, et comment créer des applications web modernes et performantes. Mes cours sont adaptés aux personnes ayant déjà des bases en JavaScript.",
    duration: "8 sessions de 2h",
    availability: "Lundi, Mercredi, Vendredi - 19h à 21h",
    whatYouLearn: [
      "Introduction à React et JSX",
      "Composants et Props",
      "Routing avec React Router",
      "Intégration d'APIs"
    ],
    syllabus: [
      {
        title: "Introduction à React",
        duration: "2h",
        topics: ["JSX", "Composants", "Props"]
      },
      {
        title: "Hooks et gestion d'état",
        duration: "2h",
        topics: ["useState", "useEffect", "Context API"]
      },
      {
        title: "Intégration API",
        duration: "2h",
        topics: ["Fetch", "Axios", "Gestion des erreurs"]
      },
      {
        title: "Projet final",
        duration: "2h",
        topics: ["Application complète", "Déploiement"]
      }
    ],
    reviews: [
      {
        name: "Khadija ELQADI",
        time: "Il y a 2 semaines",
        rating: 5,
        comment: "Excellente formatrice ! Marie explique très bien et prend le temps de répondre à toutes les questions. J'ai beaucoup progressé en React grâce à elle."
      },
      {
        name: "Bouchra Fettah",
        time: "Il y a 1 mois",
        rating: 5,
        comment: "Cours très structurés et pratiques. Les exemples concrets m'ont vraiment aidé à comprendre."
      },
      {
        name: "Amina ELQADI",
        time: "Il y a 1 mois",
        rating: 4,
        comment: "Très bon cours, peut-être un peu rapide pour les débutants complets en JavaScript."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section avec gradient violet */}
      <section 
        className="py-16 px-4"
        style={{ 
          background: 'linear-gradient(135deg, #5943EC 0%, #692278 100%)' 
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              {/* Badges */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium font-['Inter']">
                  {competence.category}
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium font-['Inter']">
                  {competence.level}
                </span>
              </div>

              {/* Titre */}
              <h1 className="text-4xl font-bold text-white font-['Inter'] mb-4">
                {competence.title}
              </h1>

              {/* Rating et stats */}
              <div className="flex items-center gap-6 mb-6 text-white">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="font-semibold">{competence.rating}</span>
                  <span className="text-white/80">({competence.reviewCount} avis)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <span className="text-white/80">{competence.exchangeCount} échanges réalisés</span>
                </div>
              </div>

              {/* Instructeur */}
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={competence.avatar} 
                  alt={competence.instructor}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-white font-['Inter']">{competence.instructor}</p>
                </div>
              </div>

              {/* Bouton profil */}
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold font-['Inter'] hover:bg-gray-100 transition-colors">
                Voir le profil du formateur
              </button>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 font-['Inter'] mb-2">
                    {competence.credits} crédits
                  </div>
                  <p className="text-gray-600 font-['Inter'] text-sm">Coût de l'échange</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700 font-['Inter'] mb-2">
                    <strong>Comment ça marche :</strong> En validant cet échange, vous dépenserez 2 crédits et le formateur recevra 2 crédits.
                  </p>
                </div>

                <button className="w-full py-4 bg-blue-600 text-white font-semibold font-['Inter'] rounded-lg hover:bg-blue-700 transition-colors duration-200 mb-4">
                  Envoyer un message
                </button>

                <p className="text-xs text-gray-500 font-['Inter'] text-center mb-6">
                  Votre solde après l'échange : 22 crédits
                </p>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 2m8-2l2 2m-2-2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V9" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 font-['Inter']">Disponibilité</p>
                      <p className="text-gray-600 font-['Inter']">{competence.availability}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          
          {/* Description */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              Description
            </h2>
            <p className="text-gray-700 font-['Inter'] leading-relaxed mb-8">
              {competence.description}
            </p>
            
            {/* Durée, Sessions, Prérequis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div>
                <p className="font-semibold text-gray-900 font-['Inter'] mb-2">Durée :</p>
                <p className="text-gray-600 font-['Inter']">8 heures</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 font-['Inter'] mb-2">Sessions :</p>
                <p className="text-gray-600 font-['Inter']">4 sessions</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 font-['Inter'] mb-2">Prérequis :</p>
                <p className="text-gray-600 font-['Inter']">Connaissances de base en JavaScript et HTML/CSS</p>
              </div>
            </div>
          </div>

          {/* Ce que vous allez apprendre */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              Ce que vous allez apprendre
            </h2>
            <ul className="space-y-3">
              {competence.whatYouLearn.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-['Inter']">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Programme du cours */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              Programme du cours
            </h2>
            <div className="space-y-4">
              {competence.syllabus.map((module, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 font-['Inter']">
                      {index + 1}. {module.title}
                    </h3>
                    <span className="text-sm text-gray-600 font-['Inter']">{module.duration}</span>
                  </div>
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="text-gray-600 font-['Inter'] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Évaluations */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 font-['Inter']">
                Évaluations
              </h2>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-xl font-bold text-gray-900 font-['Inter']">{competence.rating}</span>
                <span className="text-gray-600 font-['Inter']">({competence.reviewCount} avis)</span>
              </div>
            </div>

            <div className="space-y-6">
              {competence.reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${review.name}&background=9810fa&color=fff`}
                      alt={review.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900 font-['Inter']">{review.name}</h4>
                        <span className="text-sm text-gray-500 font-['Inter']">{review.time}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 font-['Inter'] leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 font-['Inter'] hover:text-gray-800 hover:border-gray-400 transition-colors">
                Voir tous les avis
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompetenceDetail;