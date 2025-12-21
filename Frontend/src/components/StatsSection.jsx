const StatsSection = () => {
  const stats = [
    {
      icon: "👥",
      number: "1000",
      label: "Utilisateurs actifs",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: "⚙️",
      number: "1000", 
      label: "Compétences disponibles",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: "📈",
      number: "1000",
      label: "Échanges réalisés", 
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: "⭐",
      number: "1000",
      label: "Crédits en circulation",
      bgColor: "bg-purple-100", 
      iconColor: "text-purple-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <span className={`text-2xl ${stat.iconColor}`}>{stat.icon}</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 font-['Inter']">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-['Inter'] mt-1">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;