import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Competences from './pages/Competences';
import CompetenceDetail from './pages/CompetenceDetail';
import Chat from './pages/Chat';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/competences" element={<Competences />} />
            <Route path="/competences/:id" element={<CompetenceDetail />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;