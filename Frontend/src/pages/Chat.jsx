import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, Check, X, Clock } from 'lucide-react';
import chatService from '../services/chatService';
import useAuthStore from '../stores/authStore';
import Header from '../components/Header';

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const { isAuthenticated, user } = useAuthStore();
  
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [echangeStatus, setEchangeStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [lastMessageId, setLastMessageId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Vérifier l'authentification au chargement
  useEffect(() => {
    if (!isAuthenticated()) {
      showNotification('Vous devez être connecté pour accéder au chat', 'error');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadConversations();
    
    if (location.state?.user) {
      setSelectedUser(location.state.user);
      loadMessages(location.state.user.id);
      loadEchangeStatus(location.state.user.id);
    }
  }, [location.state]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (echangeStatus?.statut === 'accepte') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            finishEchange();
            return 100;
          }
          return prev + 1;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [echangeStatus]);

  // Auto-refresh des messages toutes les 2 secondes
  useEffect(() => {
    let interval;
    if (selectedUser) {
      interval = setInterval(() => {
        loadMessages(selectedUser.id);
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedUser]);

  // Auto-refresh des conversations toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      loadConversations();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 3000);
  };

  const loadConversations = async () => {
    try {
      const response = await chatService.getConversations();
      if (response.success) {
        setConversations(response.data);
      }
    } catch (error) {
      if (error.message === 'Session expirée') {
        showNotification('Session expirée, redirection vers la connexion...', 'error');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        showNotification('Erreur lors du chargement des conversations', 'error');
      }
    }
  };

  const loadMessages = async (userId) => {
    try {
      const response = await chatService.getMessages(userId);
      if (response.success) {
        const newMessages = response.data;
        
        if (newMessages.length > 0) {
          const newLastMessageId = newMessages[newMessages.length - 1].id;
          
          if (newLastMessageId !== lastMessageId) {
            setMessages(newMessages);
            setLastMessageId(newLastMessageId);
          }
        } else {
          setMessages([]);
          setLastMessageId(null);
        }
      }
    } catch (error) {
      if (error.message === 'Session expirée') {
        showNotification('Session expirée, redirection vers la connexion...', 'error');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        showNotification('Erreur lors du chargement des messages', 'error');
      }
    }
  };

  const loadEchangeStatus = async (userId) => {
    try {
      const response = await chatService.getEchangeStatus(userId);
      if (response.success) {
        setEchangeStatus(response.data);
      }
    } catch (error) {
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      setLoading(true);
      const response = await chatService.sendMessage(selectedUser.id, newMessage);
      if (response.success) {
        setMessages([...messages, response.data]);
        setNewMessage('');
      }
    } catch (error) {
      showNotification('Erreur lors de l\'envoi du message', 'error');
    } finally {
      setLoading(false);
    }
  };

  const createEchange = async () => {
    if (!location.state?.competence) {
      showNotification('Aucune compétence sélectionnée', 'error');
      return;
    }

    try {
      const response = await chatService.createEchange(
        location.state.competence.id,
        selectedUser.id
      );
      if (response.success) {
        showNotification('Demande d\'échange envoyée', 'success');
        setEchangeStatus(response.data);
      }
    } catch (error) {
      // Afficher le message d'erreur spécifique du serveur
      let errorMessage = 'Erreur lors de la création de l\'échange';
      
      if (error.message.includes('Crédits insuffisants')) {
        errorMessage = error.message;
      } else if (error.message.includes('échange en attente')) {
        errorMessage = 'Vous avez déjà un échange en attente pour cette compétence';
      } else if (error.message.includes('vous-même')) {
        errorMessage = 'Vous ne pouvez pas créer un échange avec vous-même';
      }
      
      showNotification(errorMessage, 'error');
    }
  };

  const acceptEchange = async () => {
    try {
      await chatService.acceptEchange(echangeStatus.id);
      showNotification('Échange accepté', 'success');
      setEchangeStatus({ ...echangeStatus, statut: 'accepte' });
    } catch (error) {
      showNotification('Erreur lors de l\'acceptation', 'error');
    }
  };

  const refuseEchange = async () => {
    try {
      await chatService.refuseEchange(echangeStatus.id);
      showNotification('Échange refusé', 'success');
      setEchangeStatus({ ...echangeStatus, statut: 'refuse' });
    } catch (error) {
      showNotification('Erreur lors du refus', 'error');
    }
  };

  const finishEchange = () => {
    showNotification('Échange terminé avec succès !', 'success');
    setEchangeStatus({ ...echangeStatus, statut: 'termine' });
    setProgress(0);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
    setLastMessageId(null);
    loadMessages(user.id);
    loadEchangeStatus(user.id);
  };

  const canSendMessage = () => {
    return !echangeStatus || 
           echangeStatus.statut === 'accepte' || 
           echangeStatus.statut === 'en_attente';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  // Filtrer les conversations selon le terme de recherche
  const filteredConversations = conversations.filter(conv => {
    const fullName = `${conv.user.prenom} ${conv.user.nom}`.toLowerCase();
    const lastMessage = conv.lastMessage.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return fullName.includes(search) || lastMessage.includes(search);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Hero Section */}
      <section 
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #5943EC 0%, #692278 100%)' }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-['Inter'] mb-6 whitespace-nowrap">
            Votre espace de chat avec la communauté
          </h1>
        </div>
      </section>

      {/* Interface de chat */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Liste des conversations */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Barre de recherche */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher une conversation..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 font-['Inter'] text-sm"
                  />
                </div>
              </div>

              {/* Liste des conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conv) => (
                    <div
                      key={conv.user.id}
                      onClick={() => selectUser(conv.user)}
                      className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedUser?.id === conv.user.id ? 'bg-purple-50 border-r-2 border-purple-500' : ''
                      }`}
                    >
                      <img
                        src={conv.user.photo || `https://ui-avatars.com/api/?name=${conv.user.prenom}+${conv.user.nom}&background=9810fa&color=fff`}
                        alt={conv.user.nom}
                        className="w-12 h-12 rounded-full mr-3"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 font-['Inter'] text-sm truncate">
                            {conv.user.prenom} {conv.user.nom}
                          </h3>
                          <span className="text-xs text-gray-500 font-['Inter']">
                            {new Date(conv.lastMessageDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 font-['Inter'] truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <div className="ml-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conv.unreadCount}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-sm font-['Inter']">
                      {searchTerm ? 'Aucune conversation trouvée' : 'Aucune conversation'}
                    </p>
                    {searchTerm && (
                      <p className="text-xs text-gray-400 mt-1">
                        Essayez un autre terme de recherche
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Zone de chat */}
            <div className="flex-1 flex flex-col">
              {selectedUser ? (
                <>
                  {/* En-tête du chat */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={selectedUser.photo || `https://ui-avatars.com/api/?name=${selectedUser.prenom}+${selectedUser.nom}&background=9810fa&color=fff`}
                          alt={selectedUser.nom}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h2 className="font-semibold text-gray-900 font-['Inter']">
                            {selectedUser.prenom} {selectedUser.nom}
                          </h2>
                          {echangeStatus && (
                            <p className="text-sm text-gray-500">
                              Échange: {echangeStatus.statut}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Boutons d'échange - seulement pour l'apprenant */}
                      {location.state?.competence && !echangeStatus && (
                        <button
                          onClick={createEchange}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Faire un échange
                        </button>
                      )}

                      {/* Boutons accepter/refuser - seulement pour le formateur */}
                      {echangeStatus?.statut === 'en_attente' && echangeStatus.user_enseignant_id === user?.id && (
                        <div className="flex gap-2">
                          <button
                            onClick={acceptEchange}
                            className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 text-sm"
                          >
                            <Check className="w-4 h-4 inline mr-1" />
                            Accepter
                          </button>
                          <button
                            onClick={refuseEchange}
                            className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 text-sm"
                          >
                            <X className="w-4 h-4 inline mr-1" />
                            Refuser
                          </button>
                        </div>
                      )}

                      {/* Statut de l'échange pour l'apprenant */}
                      {echangeStatus?.statut === 'en_attente' && echangeStatus.user_apprenant_id === user?.id && (
                        <div className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg">
                          En attente de réponse...
                        </div>
                      )}

                      {echangeStatus?.statut === 'accepte' && (
                        <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                          Échange accepté !
                        </div>
                      )}

                      {echangeStatus?.statut === 'refuse' && (
                        <div className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                          Échange refusé
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Barre de progression */}
                  {echangeStatus?.statut === 'accepte' && (
                    <div className="p-4 bg-purple-50 border-b border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-purple-700">Échange en cours...</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.expediteur_id === selectedUser.id ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                          message.expediteur_id === selectedUser.id ? '' : 'flex-row-reverse space-x-reverse'
                        }`}>
                          {message.expediteur_id === selectedUser.id && (
                            <img
                              src={selectedUser.photo || `https://ui-avatars.com/api/?name=${selectedUser.prenom}+${selectedUser.nom}&background=9810fa&color=fff`}
                              alt="Avatar"
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div>
                            <div
                              className={`px-4 py-3 rounded-2xl ${
                                message.expediteur_id === selectedUser.id
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'bg-purple-600 text-white'
                              }`}
                            >
                              <p className="text-sm font-['Inter']">{message.contenu}</p>
                            </div>
                            <p className={`text-xs text-gray-500 font-['Inter'] mt-1 ${
                              message.expediteur_id === selectedUser.id ? 'text-left' : 'text-right'
                            }`}>
                              {new Date(message.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Zone de saisie */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={canSendMessage() ? "Écrivez votre message..." : "Échange refusé - Messages bloqués"}
                        disabled={!canSendMessage() || loading}
                        className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 font-['Inter'] disabled:bg-gray-100"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!canSendMessage() || loading || !newMessage.trim()}
                        className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une conversation</h3>
                    <p className="text-gray-600">Choisissez une conversation pour commencer à discuter</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;