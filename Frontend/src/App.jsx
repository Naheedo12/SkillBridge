import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Competences from './pages/Competences';
import CompetenceDetail from './pages/CompetenceDetail';
import EditCompetence from './pages/EditCompetence';
import Chat from './pages/Chat';
import AddCompetence from './pages/AddCompetence';
import Notifications from './pages/Notifications';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import useAuthStore from './stores/authStore';

// Composant pour protéger les routes nécessitant une authentification
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly) {
    const isAdmin = user?.role === 'Administrateur' || user?.role === 'admin';
    if (!isAdmin) {
      return <Navigate to="/" />;
    }
  }
  
  return children;
};

function App() {
  return (
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
          
          {/* Routes protégées */}
          <Route path="/competences/:id/edit" element={
            <PrivateRoute>
              <EditCompetence />
            </PrivateRoute>
          } />
          
          <Route path="/chat" element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } />
          
          <Route path="/add-competence" element={
            <PrivateRoute>
              <AddCompetence />
            </PrivateRoute>
          } />
          
          <Route path="/notifications" element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          } />
          
          <Route path="/admin" element={
            <PrivateRoute adminOnly={true}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          {/* Route pour le profil de l'utilisateur courant */}
          <Route path="/profile" element={
            <PrivateRoute>
              <Navigate to="/dashboard" />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
