import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddCompetence = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    categorie: '',
    niveau: '',
    dureeEstimee: '',
    disponibilite: '',
    contenuCours: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Compétence ajoutée:', formData);
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="py-16 px-4 text-center"
        style={{ 
          background: 'linear-gradient(135deg, #5943EC 0%, #692278 100%)' 
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-['Inter'] mb-4">
            Proposer une nouvelle compétence
          </h1>
          <p className="text-xl text-white/90 font-['Inter']">
            Partagez votre expertise et gagnez des crédits
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section d'information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">?</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 font-['Inter'] mb-2">
                  Comment ça fonctionne ?
                </h3>
                <p className="text-blue-800 font-['Inter'] text-sm leading-relaxed">
                  Créez une compétence que vous maîtrisez et que vous souhaitez enseigner. Les autres utilisateurs pourront 
                  la découvrir et vous contacter pour échanger des compétences contre la vôtre.
                </p>
              </div>
            </div>
          </div>

          {/* Informations de base */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              Informations de base
            </h2>
            
            <div className="space-y-6">
              {/* Titre de la compétence */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Titre de la compétence *
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  placeholder="Ex: Introduction aux bases React"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
                />
              </div>

              {/* Prix en crédits */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Prix en crédits *
                </label>
                <input
                  type="number"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  placeholder="2"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
                />
              </div>

              {/* Catégorie et Niveau */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                    Catégorie *
                  </label>
                  <select
                    name="categorie"
                    value={formData.categorie}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter'] bg-white"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="informatique">Informatique</option>
                    <option value="design">Design</option>
                    <option value="musique">Musique</option>
                    <option value="cuisine">Cuisine</option>
                    <option value="langues">Langues</option>
                    <option value="art">Art</option>
                    <option value="sport">Sport</option>
                    <option value="business">Business</option>
                    <option value="sciences">Sciences</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                    Niveau *
                  </label>
                  <select
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter'] bg-white"
                  >
                    <option value="">Sélectionnez un niveau</option>
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avance">Avancé</option>
                    <option value="tous-niveaux">Tous niveaux</option>
                  </select>
                </div>
              </div>


            </div>
          </div>

          {/* Description détaillée */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              Description détaillée
            </h2>
            
            <div className="space-y-6">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez ce que vous enseignerez et comment se déroulera la formation..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter'] resize-vertical"
                />
              </div>

              {/* Objectifs d'apprentissage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Objectifs d'apprentissage
                </label>
                <textarea
                  name="objectifs"
                  placeholder="Listez les compétences que l'apprenant acquerra"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter'] resize-vertical"
                />
              </div>

              {/* Contenu du cours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Contenu du cours
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Chapitre 1 : Les composants"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
                  />
                  <button
                    type="button"
                    className="text-purple-600 font-['Inter'] text-sm hover:text-purple-700 flex items-center gap-1"
                  >
                    <span>+</span> Ajouter un point
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Informations pratiques */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              Informations pratiques
            </h2>
            
            <div className="space-y-6">
              {/* Durée estimée */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Durée estimée *
                </label>
                <input
                  type="text"
                  name="dureeEstimee"
                  value={formData.dureeEstimee}
                  onChange={handleChange}
                  placeholder="Ex: 4 sessions de 2h"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
                />
              </div>

              {/* Disponibilité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">
                  Disponibilité *
                </label>
                <input
                  type="text"
                  name="disponibilite"
                  value={formData.disponibilite}
                  onChange={handleChange}
                  placeholder="Ex: Lundi, Mercredi - 19h à 21h"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-['Inter']"
                />
              </div>


            </div>
          </div>

          {/* Image de présentation */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-6">
              Image de présentation
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600 font-['Inter'] mb-2">
                    Choisir pour télécharger une image
                  </p>
                  <p className="text-sm text-gray-500 font-['Inter']">
                    PNG, JPG jusqu'à 10MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer font-['Inter']"
                >
                  Choisir une image
                </label>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-['Inter']"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-['Inter']"
            >
              Publier la compétence
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddCompetence;