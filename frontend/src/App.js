import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TendersPage from './pages/Tender.js';
import CreateCompanyPage from './pages/CreateCompany.js';
import Navbar from './components/Navbar.js';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-company" element={isLoggedIn ? <CreateCompanyPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/tenders" element={isLoggedIn ? <TendersPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
