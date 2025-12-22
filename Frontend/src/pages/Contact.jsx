import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message envoyé:', formData);
    // Logique d'envoi du message à implémenter
  };

  const faqs = [
    {
      question: "Comment fonctionne le système de crédits ?",
      answer: "Chaque échange vaut coûte 2 crédits : 1 soustrait dépensé 2 crédits et le receveur reçoit 2 crédits. Vous recevez 10 crédits gratuits à l'inscription."
    },
    {
      question: "Combien de temps faut-il pour recevoir une réponse ?",
      answer: "Notre équipe s'engage à répondre à toutes les demandes dans un délai de 24 heures ouvrées maximum."
    },
    {
      question: "Puis-je proposer plusieurs compétences ?",
      answer: "Oui, vous pouvez proposer autant de compétences que vous le souhaitez et les gérer depuis votre profil."
    }
  ];

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
            Contactez-nous
          </h1>
          <p className="text-xl text-white/90 font-['Inter'] max-w-3xl mx-auto">
            Une question ? Une suggestion ? on est là pour vous aider. N'hésitez pas à nous contacter.
          </p>
        </div>
      </section>

      {/* Formulaire de contact */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-2">
              Envoyez-nous un message
            </h2>
            <p className="text-gray-600 font-['Inter'] mb-8">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prénom et Nom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Salma"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="ELQADI"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Adresse email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="salma@gmail.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
                />
              </div>

              {/* Sujet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Sujet *
                </label>
                <select
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter'] bg-white"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="question-generale">Question générale</option>
                  <option value="probleme-technique">Problème technique</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande en détail..."
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter'] resize-vertical"
                />
              </div>

              {/* Note */}
              <p className="text-sm text-gray-500 font-['Inter']">
                Champs obligatoires
              </p>

              {/* Bouton d'envoi */}
              <button
                type="submit"
                className="w-full py-4 text-white font-semibold font-['Inter'] rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#692278' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a1d63'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#692278'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-['Inter'] mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-gray-600 font-['Inter']">
              Trouvez rapidement des réponses aux questions les plus courantes
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 font-['Inter'] mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 font-['Inter'] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;