import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useAuth();

  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8f1f6' }}>
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              {isLoggedIn ? (
                <>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Bienvenue, {user.prenom} !
                  </h1>

                  <p className="text-xl text-gray-600 mb-6">
                    Découvrez et échangez vos compétences avec la communauté SkillBridge
                  </p>

                  <div className="flex justify-center">
                    <div className="bg-purple-100 px-6 py-3 rounded-lg">
                      <span className="text-lg font-semibold" style={{ color: '#9810fa' }}>
                        {user.solde_credits} crédits disponibles
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Bienvenue sur SkillBridge !
                  </h1>

                  <p className="text-xl text-gray-600 mb-6">
                    Découvrez et échangez vos compétences avec la communauté SkillBridge
                  </p>

                  <p className="text-lg text-gray-500">
                    Connectez-vous pour commencer à échanger vos compétences
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
