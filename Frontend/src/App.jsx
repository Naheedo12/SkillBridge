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
import AddCompetence from './pages/AddCompetence';
import Notifications from './pages/Notifications';

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
            <Route path="/add-competence" element={<AddCompetence />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;