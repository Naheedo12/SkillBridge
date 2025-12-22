import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      lastMessage: "D'accord, à mercredi alors !",
      time: "10:45",
      unread: 0
    },
    {
      id: 2,
      name: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      lastMessage: "Merci pour la session hier, c'était super !",
      time: "Hier",
      unread: 2
    },
    {
      id: 3,
      name: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      lastMessage: "Je peux te proposer vendredi ?",
      time: "2j",
      unread: 0
    },
    {
      id: 4,
      name: "Salma ELQADI",
      avatar: "https://ui-avatars.com/api/?name=Salma+ELQADI&background=9810fa&color=fff",
      lastMessage: "Let's practice together!",
      time: "3j",
      unread: 1
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "other",
      text: "Salut Salma ! J'ai vu ton annonce pour le cours de React. Je suis vraiment intéressé !",
      time: "10:30",
      avatar: "https://ui-avatars.com/api/?name=User&background=9810fa&color=fff"
    },
    {
      id: 2,
      sender: "me",
      text: "Bonjour Salma ! Avec plaisir. Tu as déjà des bases en JavaScript ?",
      time: "10:32"
    },
    {
      id: 3,
      sender: "other",
      text: "Oui, je maîtrise bien JavaScript. Je veux apprendre React pour mon projet.",
      time: "10:33",
      avatar: "https://ui-avatars.com/api/?name=User&background=9810fa&color=fff"
    },
    {
      id: 4,
      sender: "me",
      text: "Parfait ! Dans ce cas on peut démarrer directement avec les concepts de base React. Tu es disponible quand ?",
      time: "10:35"
    },
    {
      id: 5,
      sender: "other",
      text: "Je suis libre mercredi soir et vendredi après-midi. Qu'est-ce qui t'arrange ?",
      time: "10:40",
      avatar: "https://ui-avatars.com/api/?name=User&background=9810fa&color=fff"
    },
    {
      id: 6,
      sender: "me",
      text: "Mercredi soir me convient parfaitement. On dit 19h en visio ?",
      time: "10:42"
    },
    {
      id: 7,
      sender: "other",
      text: "D'accord, à mercredi alors !",
      time: "10:45",
      avatar: "https://ui-avatars.com/api/?name=User&background=9810fa&color=fff"
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logique d'envoi du message
      console.log('Message envoyé:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
                    placeholder="Rechercher une conversation..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 font-['Inter'] text-sm"
                  />
                </div>
              </div>

              {/* Liste des conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation, index) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedChat(index)}
                    className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === index ? 'bg-purple-50 border-r-2 border-purple-500' : ''
                    }`}
                  >
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 font-['Inter'] text-sm truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-gray-500 font-['Inter']">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-['Inter'] truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 && (
                      <div className="ml-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Zone de chat */}
            <div className="flex-1 flex flex-col">
              {/* En-tête du chat */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center">
                  <img
                    src={conversations[selectedChat]?.avatar}
                    alt={conversations[selectedChat]?.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <h2 className="font-semibold text-gray-900 font-['Inter']">
                    {conversations[selectedChat]?.name}
                  </h2>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {message.sender === 'other' && (
                        <img
                          src={message.avatar}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.sender === 'me'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm font-['Inter']">{message.text}</p>
                        </div>
                        <p className={`text-xs text-gray-500 font-['Inter'] mt-1 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Zone de saisie */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Écrivez votre message..."
                    className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 font-['Inter']"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Chat;