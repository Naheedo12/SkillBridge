import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('Toutes');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      icon: '💬',
      iconBg: 'bg-blue-500',
      title: 'Nouveau message de Salma ELQADI',
      description: "D'accord, à mercredi alors !",
      time: 'Il y a 5 min',
      isNew: true,
      avatar: 'https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff'
    },
    {
      id: 2,
      type: 'exchange',
      icon: '✅',
      iconBg: 'bg-green-500',
      title: "Proposition d'échange acceptée",
      description: 'Khadija ELQADI a accepté votre proposition pour le cours de Design UI/UX',
      time: 'Il y a 2h',
      isNew: true,
      avatar: 'https://ui-avatars.com/api/?name=Khadija+ELQADI&background=9810fa&color=fff'
    },
    {
      id: 3,
      type: 'rating',
      icon: '⭐',
      iconBg: 'bg-yellow-500',
      title: 'Nouvelle évaluation 5★',
      description: 'Bouchra FETTAH vous a laissé un avis positif',
      time: 'Il y a 1 jour',
      isNew: false,
      avatar: 'https://ui-avatars.com/api/?name=Bouchra+FETTAH&background=9810fa&color=fff'
    },
    {
      id: 4,
      type: 'credits',
      icon: '💰',
      iconBg: 'bg-yellow-400',
      title: 'Crédits reçus',
      description: "Vous avez reçu 4 crédits pour l'échange terminé avec Khadija ELQADI",
      time: 'Il y a 2 jours',
      isNew: false,
      avatar: null
    },
    {
      id: 5,
      type: 'exchange',
      icon: '🔄',
      iconBg: 'bg-orange-500',
      title: "Nouvelle proposition d'échange",
      description: "Bouchra Fettah souhaite échanger avec vous pour le cours d'anglais",
      time: 'Il y a 3 jours',
      isNew: false,
      avatar: 'https://ui-avatars.com/api/?name=Bouchra+Fettah&background=9810fa&color=fff'
    },
    {
      id: 6,
      type: 'exchange',
      icon: '🔄',
      iconBg: 'bg-orange-500',
      title: "Nouvelle proposition d'échange",
      description: "Bouchra FETTAH souhaite échanger avec vous pour le cours d'anglais",
      time: 'Il y a 3 jours',
      isNew: false,
      avatar: 'https://ui-avatars.com/api/?name=Bouchra+FETTAH&background=9810fa&color=fff'
    }
  ]);

  const newNotificationsCount = notifications.filter(n => n.isNew).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isNew: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isNew: false } : n
    ));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'Toutes') return true;
    if (activeTab === 'Non lues') return notification.isNew;
    if (activeTab === 'Lues') return !notification.isNew;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section avec gradient violet */}
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
                Vous avez {newNotificationsCount} nouvelles notifications
              </p>
            </div>
            <button 
              onClick={markAllAsRead}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-['Inter'] transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Tout marquer comme lu
            </button>
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
              Non lues {newNotificationsCount > 0 && (
                <span className="ml-1 bg-white/20 text-xs px-2 py-0.5 rounded-full">
                  {newNotificationsCount}
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
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 ${
                  notification.isNew ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icône ou Avatar */}
                  <div className="shrink-0">
                    {notification.avatar ? (
                      <img 
                        src={notification.avatar} 
                        alt="Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className={`w-12 h-12 ${notification.iconBg} rounded-full flex items-center justify-center`}>
                        <span className="text-white text-lg">{notification.icon}</span>
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 font-['Inter'] mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 font-['Inter'] mb-2">
                          {notification.description}
                        </p>
                        <p className="text-sm text-gray-500 font-['Inter']">
                          {notification.time}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        {notification.isNew && (
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-['Inter']">
                              Nouveau
                            </span>
                            <button
                              onClick={() => markAsRead(notification.id)}
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
                          onClick={() => deleteNotification(notification.id)}
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
            ))}
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