const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Créez votre profil",
      description: "Inscrivez-vous et ajoutez les compétences que vous maîtrisez et celles que vous souhaitez apprendre."
    },
    {
      number: "2", 
      title: "Trouvez un partenaire",
      description: "Recherchez des compétences qui vous intéressent et proposez un échange à d'autres utilisateurs."
    },
    {
      number: "3",
      title: "Échangez et apprenez", 
      description: "Organisez vos sessions d'échange, gagnez des crédits et développez vos compétences !"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Titre de la section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 font-['Inter'] mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 font-['Inter']">
            Trois étapes simples pour commencer à échanger
          </p>
        </div>

        {/* Grille des étapes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Cercle avec numéro */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white font-['Inter']">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Titre de l'étape */}
              <h3 className="text-2xl font-bold text-gray-900 font-['Inter'] mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-lg text-gray-600 font-['Inter'] leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;