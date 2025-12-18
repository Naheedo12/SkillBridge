import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [accepteConditions, setAccepteConditions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== passwordConfirm) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (!accepteConditions) {
      setError("Vous devez accepter les conditions d'utilisation");
      setLoading(false);
      return;
    }

    try {
      const result = await register({
        nom,
        prenom,
        email,
        motDePasse: password,
        motDePasse_confirmation: passwordConfirm
      });

      if (result.success) {
        navigate('/home');
      } else {
        setError(result.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      setError('Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8f1f6' }}>
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 whitespace-nowrap">
              Bienvenue sur SkillBridge
            </h1>
            <p className="text-gray-600 whitespace-nowrap">
              Créez un compte pour commencer à échanger vos compétences
            </p>
          </div>

          {/* Register Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inscription</h2>
              <p className="text-gray-600">Créez votre compte gratuitement</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Prénom */}
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Salma"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': '#9810fa' }}
                    required
                  />
                </div>
              </div>

              {/* Nom */}
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="ELQADI"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': '#9810fa' }}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="salma@gmail.com"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': '#9810fa' }}
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': '#9810fa' }}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 8 caractères avec majuscules et chiffres</p>
              </div>

              {/* Confirmer mot de passe */}
              <div>
                <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password-confirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': '#9810fa' }}
                    required
                  />
                </div>
              </div>

              {/* Bonus de bienvenue */}
              <div className="rounded-lg p-4" style={{ backgroundColor: '#f0f4ff' }}>
                <p className="text-sm font-medium text-gray-900 mb-2">Bonus de bienvenue :</p>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: '#9810fa' }} />
                  <p className="text-sm text-gray-600">
                    <strong style={{ color: '#9810fa' }}>10 crédits gratuits</strong> à l'inscription pour commencer à
                    échanger immédiatement
                  </p>
                </div>
              </div>

              {/* Conditions */}
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 rounded border-gray-300"
                  style={{ color: '#9810fa', '--tw-ring-color': '#9810fa' }}
                  required
                  checked={accepteConditions}
                  onChange={(e) => setAccepteConditions(e.target.checked)}
                />
                <span className="text-gray-600">
                  J'accepte les{' '}
                  <Link to="/conditions" className="hover:underline" style={{ color: '#9810fa' }}>
                    conditions d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link to="/confidentialite" className="hover:underline" style={{ color: '#9810fa' }}>
                    politique de confidentialité
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#9810fa' }}
              >
                {loading ? 'Création du compte...' : 'Créer mon compte'}
              </button>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-gray-600">Vous avez déjà un compte ? </span>
                <Link 
                  to="/login" 
                  className="font-medium hover:underline"
                  style={{ color: '#9810fa' }}
                >
                  Se connecter
                </Link>
              </div>
            </form>
          </div>


        </div>
      </main>

      {/* Avantages Section */}
      <section className="py-16" style={{ backgroundColor: '#f8f1f6' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-24 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">10 crédits offerts</h3>
              <p className="text-sm text-gray-600">Pour débuter vos premiers échanges</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Chat en temps réel</h3>
              <p className="text-sm text-gray-600">Communiquez instantanément avec les membres</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Badges et récompenses</h3>
              <p className="text-sm text-gray-600">Progressez et débloquez des badges</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Register;