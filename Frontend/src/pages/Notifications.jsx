import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useNotificationStore from '../stores/notificationStore';
import useAuthStore from '../stores/authStore';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('Toutes');
  const { 
    notifications, 
    unreadCount, 
    loading, 
    error,
    loadNotifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotificationStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated()) {
      loadNotifications();
    }
  }, [isAuthenticated, loadNotifications]);

  const handleMarkAllAsRead = async () => {
    const result = await markAllAsRead();
    if (result.success) {
      toast.success('Toutes les notifications ont été marquées comme lues');
    } else {
      toast.error('Erreur lors du marquage des notifications');
    }
  };

  const handleDeleteNotification = async (id) => {
    const result = await deleteNotification(id);
    if (result.success) {
      toast.success('Notification supprimée');
    } else {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleMarkAsRead = async (id) => {
    const result = await markAsRead(id);
    if (result.success) {
      toast.success('Notification marquée comme lue');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return { icon: '💬', bg: 'bg-blue-500' };
      case 'exchange':
        return { icon: '🔄', bg: 'bg-orange-500' };
      case 'rating':
        return { icon: '⭐', bg: 'bg-yellow-500' };
      case 'credits':
        return { icon: '💰', bg: 'bg-yellow-400' };
      case 'system':
        return { icon: '🔔', bg: 'bg-gray-500' };
      default:
        return { icon: '📢', bg: 'bg-purple-500' };
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    
    return date.toLocaleDateString('fr-FR');
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'Toutes') return true;
    if (activeTab === 'Non lues') return !notification.lu;
    if (activeTab === 'Lues') return notification.lu;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section 
        className="py-16 px-4"
        style={{ 
          background: 'linear-gradient(135deg, #5943EC 0%, #692278 100%)' 
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white font-['Inter'] mb-2">
                Notifications
              </h1>
              <p className="text-white/90 font-['Inter']">
                Vous avez {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''} notification{unreadCount > 1 ? 's' : ''}
              </p>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllAsRead}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-['Inter'] transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Tout marquer comme lu
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Onglets de filtrage */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('Toutes')}
              className={`px-4 py-2 rounded-full font-['Inter'] font-medium transition-colors duration-200 ${
                activeTab === 'Toutes'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Toutes {notifications.length > 0 && (
                <span className="ml-1 bg-white/20 text-xs px-2 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('Non lues')}
              className={`px-4 py-2 rounded-full font-['Inter'] font-medium transition-colors duration-200 ${
                activeTab === 'Non lues'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Non lues {unreadCount > 0 && (
                <span className="ml-1 bg-white/20 text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('Lues')}
              className={`px-4 py-2 rounded-full font-['Inter'] font-medium transition-colors duration-200 ${
                activeTab === 'Lues'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Lues
            </button>
          </div>

          {/* Liste des notifications */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const { icon, bg } = getNotificationIcon(notification.type);
              return (
                <div 
                  key={notification.id}
                  className={`bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 ${
                    !notification.lu ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icône */}
                    <div className="shrink-0">
                      <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center`}>
                        <span className="text-white text-lg">{icon}</span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 font-['Inter'] mb-1">
                            {notification.type === 'message' ? 'Nouveau message' : notification.type}
                          </h3>
                          <p className="text-gray-600 font-['Inter'] mb-2">
                            {notification.contenu}
                          </p>
                          <p className="text-sm text-gray-500 font-['Inter']">
                            {formatDate(notification.created_at)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          {!notification.lu && (
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-['Inter']">
                                Nouveau
                              </span>
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-blue-500 hover:text-blue-700 text-sm font-['Inter'] flex items-center gap-1"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Marquer comme lu
                              </button>
                            </div>
                          )}
                          <button
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message si aucune notification */}
          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5zm6 10V7a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h9a1 1 0 001-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune notification</h3>
              <p className="text-gray-600">
                {activeTab === 'Non lues' ? 'Toutes vos notifications ont été lues' : 'Vous n\'avez aucune notification dans cette catégorie'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Notifications;