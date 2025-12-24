import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import useAuthStore from "../stores/authStore";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    const result = await login({ email, motDePasse: password });
    setLoading(false);

    if (result.success) navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f8f1f6" }}>
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full">
          {/* Titre et description */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Bienvenue sur SkillBridge à nouveau
            </h1>
            <p className="text-gray-600">Connectez-vous pour continuer à échanger vos compétences</p>
          </div>

          {/* Formulaire de connexion */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connexion</h2>
              <p className="text-gray-600">Accédez à votre compte existant</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Email */}
              <InputField
                label="Adresse email"
                type="email"
                placeholder="salma@gmail.com"
                value={email}
                onChange={setEmail}
                icon={Mail}
              />

              {/* Password */}
              <InputField
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                icon={Lock}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 border-gray-300 rounded"
                    style={{ color: "#9810fa", "--tw-ring-color": "#9810fa" }}
                  />
                  <span className="ml-2 text-sm text-gray-700">Se souvenir de moi</span>
                </label>
                <Link to="/mot-de-passe-oublie" className="text-sm" style={{ color: "#9810fa" }}>
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#9810fa" }}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>

              {/* Register link */}
              <div className="text-center">
                <span className="text-gray-600">Vous n'avez pas un compte ? </span>
                <Link to="/register" className="font-medium" style={{ color: "#9810fa" }}>
                  S'inscrire
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Composant réutilisable pour simplifier les champs du formulaire
const InputField = ({ label, type, placeholder, value, onChange, icon: Icon }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
        style={{ "--tw-ring-color": "#9810fa" }}
        required
      />
    </div>
  </div>
);

export default Login;
