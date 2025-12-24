import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, CheckCircle2 } from "lucide-react";
import useAuthStore from "../stores/authStore";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuthStore();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [accepteConditions, setAccepteConditions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    if (password !== passwordConfirm) {
      setLocalError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!accepteConditions) {
      setLocalError("Vous devez accepter les conditions d'utilisation");
      return;
    }

    setLoading(true);

    const result = await register({
      nom,
      prenom,
      email,
      motDePasse: password,
      motDePasse_confirmation: passwordConfirm,
    });

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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Bienvenue sur SkillBridge</h1>
            <p className="text-gray-600">
              Créez un compte pour commencer à échanger vos compétences
            </p>
          </div>

          {/* Formulaire d'inscription */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inscription</h2>
              <p className="text-gray-600">Créez votre compte gratuitement</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Erreur */}
              {(error || localError) && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error || localError}
                </div>
              )}

              {/* Champs */}
              <InputField label="Prénom" value={prenom} onChange={setPrenom} icon={User} placeholder="Salma" />
              <InputField label="Nom" value={nom} onChange={setNom} icon={User} placeholder="ELQADI" />
              <InputField label="Adresse email" type="email" value={email} onChange={setEmail} icon={Mail} placeholder="salma@gmail.com" />
              <InputField label="Mot de passe" type="password" value={password} onChange={setPassword} icon={Lock} placeholder="••••••••" helpText="Minimum 8 caractères avec majuscules et chiffres" />
              <InputField label="Confirmer le mot de passe" type="password" value={passwordConfirm} onChange={setPasswordConfirm} icon={Lock} placeholder="••••••••" />

              {/* Bonus de bienvenue */}
              <div className="rounded-lg p-4" style={{ backgroundColor: "#f0f4ff" }}>
                <p className="text-sm font-medium text-gray-900 mb-2">Bonus de bienvenue :</p>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#9810fa" }} />
                  <p className="text-sm text-gray-600">
                    <strong style={{ color: "#9810fa" }}>10 crédits gratuits</strong> à l'inscription
                  </p>
                </div>
              </div>

              {/* Conditions */}
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 rounded border-gray-300"
                  style={{ color: "#9810fa", "--tw-ring-color": "#9810fa" }}
                  checked={accepteConditions}
                  onChange={(e) => setAccepteConditions(e.target.checked)}
                />
                <span className="text-gray-600">
                  J'accepte les{" "}
                  <Link to="/conditions" className="hover:underline" style={{ color: "#9810fa" }}>
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link to="/confidentialite" className="hover:underline" style={{ color: "#9810fa" }}>
                    politique de confidentialité
                  </Link>
                </span>
              </label>

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#9810fa" }}
              >
                {loading ? "Création du compte..." : "Créer mon compte"}
              </button>

              {/* Login link */}
              <div className="text-center">
                <span className="text-gray-600">Vous avez déjà un compte ? </span>
                <Link to="/login" className="font-medium hover:underline" style={{ color: "#9810fa" }}>
                  Se connecter
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Avantages */}
      <SectionAvantages />

      <Footer />
    </div>
  );
};

// Composant réutilisable pour les champs du formulaire
const InputField = ({ label, type = "text", value, onChange, icon: Icon, placeholder, helpText }) => (
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
    {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
  </div>
);

// Section avantages
const SectionAvantages = () => (
  <section className="py-16" style={{ backgroundColor: "#f8f1f6" }}>
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid gap-24 sm:grid-cols-3">
        {[
          { icon: "🎁", title: "10 crédits offerts", desc: "Pour débuter vos premiers échanges", bg: "bg-orange-100" },
          { icon: "💬", title: "Chat en temps réel", desc: "Communiquez instantanément avec les membres", bg: "bg-blue-100" },
          { icon: "🏆", title: "Badges et récompenses", desc: "Progressez et débloquez des badges", bg: "bg-yellow-100" },
        ].map((item, idx) => (
          <div className="text-center" key={idx}>
            <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${item.bg}`}>
              <span className="text-3xl">{item.icon}</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Register;
