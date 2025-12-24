import { BarChart3, TrendingUp, Users, BookOpen, CreditCard, Activity } from 'lucide-react';

const AdminStats = () => {
  // Données statiques pour les statistiques
  const stats = {
    totalUsers: 156,
    activeUsers: 142,
    totalCompetences: 89,
    publishedCompetences: 76,
    totalCredits: 2340,
    monthlyRevenue: 1250,
    newUsersThisMonth: 23,
    completedExchanges: 187
  };

  const recentActivity = [
    { id: 1, type: 'user', message: 'Nouvel utilisateur inscrit: Marie Dubois', time: '5 min' },
    { id: 2, type: 'competence', message: 'Nouvelle compétence publiée: Python Avancé', time: '12 min' },
    { id: 3, type: 'exchange', message: 'Échange terminé: Design UI/UX', time: '25 min' },
    { id: 4, type: 'user', message: 'Utilisateur suspendu: John Smith', time: '1h' },
    { id: 5, type: 'competence', message: 'Compétence approuvée: Marketing Digital', time: '2h' }
  ];

  const topCompetences = [
    { titre: 'Design UI/UX', participants: 45, revenus: 225 },
    { titre: 'React Avancé', participants: 38, revenus: 304 },
    { titre: 'Marketing Digital', participants: 32, revenus: 192 },
    { titre: 'Python Débutant', participants: 28, revenus: 140 },
    { titre: 'Photoshop Pro', participants: 25, revenus: 175 }
  ];

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs Totaux"
          value={stats.totalUsers}
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Compétences Publiées"
          value={stats.publishedCompetences}
          icon={<BookOpen className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="Crédits en Circulation"
          value={stats.totalCredits}
          icon={<CreditCard className="h-6 w-6" />}
          color="purple"
        />
        <StatCard
          title="Échanges Terminés"
          value={stats.completedExchanges}
          icon={<TrendingUp className="h-6 w-6" />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activité récente */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'competence' ? 'bg-green-500' :
                  'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top compétences */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Compétences</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topCompetences.map((competence, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{competence.titre}</p>
                  <p className="text-xs text-gray-500">{competence.participants} participants</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">{competence.revenus} crédits</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;