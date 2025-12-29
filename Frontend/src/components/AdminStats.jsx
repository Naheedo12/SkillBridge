import { BarChart3, TrendingUp, Users, BookOpen, CreditCard, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import competenceService from '../services/competenceService';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCompetences: 0,
    publishedCompetences: 0,
    totalCredits: 0,
    newUsersThisMonth: 0,
    completedExchanges: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [topCompetences, setTopCompetences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Charger toutes les données au montage du composant
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Charger les statistiques principales
        const statsResponse = await competenceService.getAdminStats();
        if (statsResponse?.success) {
          setStats(statsResponse.data);
        }

        // Charger l'activité récente
        const activityResponse = await competenceService.getRecentActivity();
        if (activityResponse?.success) {
          setRecentActivity(activityResponse.data);
        }

        // Charger les top compétences
        const topCompetencesResponse = await competenceService.getTopCompetences();
        if (topCompetencesResponse?.success) {
          setTopCompetences(topCompetencesResponse.data);
        }

      } catch (error) {
        console.error('Erreur lors du chargement des données admin:', error);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Messages d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs Totaux"
          value={loading ? '...' : stats.totalUsers}
          icon={<Users className="h-6 w-6" />}
          color="blue"
          loading={loading}
        />
        <StatCard
          title="Compétences Publiées"
          value={loading ? '...' : stats.publishedCompetences}
          icon={<BookOpen className="h-6 w-6" />}
          color="green"
          loading={loading}
        />
        <StatCard
          title="Crédits en Circulation"
          value={loading ? '...' : stats.totalCredits}
          icon={<CreditCard className="h-6 w-6" />}
          color="purple"
          loading={loading}
        />
        <StatCard
          title="Échanges Terminés"
          value={loading ? '...' : stats.completedExchanges}
          icon={<TrendingUp className="h-6 w-6" />}
          color="orange"
          loading={loading}
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
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-3 animate-pulse">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'competence' ? 'bg-green-500' :
                    'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Aucune activité récente</p>
            )}
          </div>
        </div>

        {/* Top compétences */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Compétences</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between animate-pulse">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : topCompetences.length > 0 ? (
              topCompetences.map((competence, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{competence.titre}</p>
                    <p className="text-xs text-gray-500">{competence.participants} participants</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">{competence.revenus} crédits</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">Aucune compétence trouvée</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, loading }) => {
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
          <p className={`text-2xl font-bold text-gray-900 ${loading ? 'animate-pulse' : ''}`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]} text-white ${loading ? 'animate-pulse' : ''}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;