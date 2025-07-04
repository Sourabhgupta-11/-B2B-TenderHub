import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateTenderPage from './pages/CreateTender.js';
import MyTendersPage from './pages/MyTenders.js';
import CreateCompanyPage from './pages/CreateCompany.js';
import Navbar from './components/Navbar.js';
import BrowseTendersPage from './pages/BrowseTenders'; 

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
        <Route path="/tenders" element={isLoggedIn ? <MyTendersPage/> : <Navigate to="/login" />} />
        <Route path="/create-tender" element={isLoggedIn ? <CreateTenderPage/> : <Navigate to="/login" />} />
        <Route path="/browse" element={isLoggedIn ? <BrowseTendersPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
