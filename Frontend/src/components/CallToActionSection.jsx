import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
    <section 
      className="py-20 px-4"
      style={{ 
        background: 'linear-gradient(135deg, #5943EC 0%, #692278 100%)' 
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Titre principal */}
        <h2 className="text-4xl md:text-5xl font-bold text-white font-['Inter'] mb-6">
          Prêt à commencer votre parcours ?
        </h2>

        {/* Description */}
        <p className="text-xl text-white/90 font-['Inter'] mb-12 max-w-5xl mx-auto whitespace-nowrap">
          Rejoignez des milliers d'apprenants et partagez vos compétences dès aujourd'hui.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-purple-700 font-semibold font-['Inter'] rounded-lg hover:bg-gray-100 transition-colors duration-200 text-lg"
          >
            Créer un compte gratuit
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 border-2 border-white text-white font-semibold font-['Inter'] rounded-lg hover:bg-white hover:text-purple-700 transition-colors duration-200 text-lg"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;