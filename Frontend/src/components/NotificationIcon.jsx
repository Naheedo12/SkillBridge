import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import useNotificationStore from '../stores/notificationStore';
import useAuthStore from '../stores/authStore';

const NotificationIcon = () => {
  const { unreadCount, loadUnreadCount } = useNotificationStore();
  const { isAuthenticated } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      // Charger le compteur initial
      loadUnreadCount();
      
      // Actualiser le compteur toutes les 30 secondes
      const interval = setInterval(() => {
        loadUnreadCount();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, loadUnreadCount]);

  // Animation du badge quand le compteur change
  useEffect(() => {
    if (unreadCount > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [unreadCount]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <Link 
      to="/notifications" 
      className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
      title={`${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`}
    >
      <Bell size={24} />
      
      {/* Badge de compteur */}
      {isVisible && unreadCount > 0 && (
        <span className={`
          absolute -top-1 -right-1 
          min-w-5 h-5 
          bg-red-500 text-white text-xs 
          rounded-full flex items-center justify-center
          font-medium
          animate-pulse
          ${unreadCount > 99 ? 'px-1' : ''}
        `}>
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
      
      {/* Indicateur de nouvelle notification (point rouge) */}
      {isVisible && unreadCount > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
      )}
    </Link>
  );
};

export default NotificationIcon;