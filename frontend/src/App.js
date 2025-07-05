import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateTenderPage from './pages/CreateTender.js';
import MyTendersPage from './pages/MyTenders.js';
import CreateCompanyPage from './pages/CreateCompany.js';
import Navbar from './components/Navbar.js';
import BrowseTendersPage from './pages/BrowseTenders'; 
import CompanySearchPage from './pages/CompanySearch.js';
import EditCompanyPage from './pages/EditCompanyPage.js';
import ReceivedApplicationsPage from './pages/ReceivedApplication.js';
import MyApplicationsPage from './pages/Application.js';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-company" element={isLoggedIn ? <CreateCompanyPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/edit-company" element={isLoggedIn ? <EditCompanyPage /> : <Navigate to="/login" />} />
        <Route path="/tenders" element={isLoggedIn ? <MyTendersPage/> : <Navigate to="/login" />} />
        <Route path="/create-tender" element={isLoggedIn ? <CreateTenderPage/> : <Navigate to="/login" />} />
        <Route path="/browse" element={isLoggedIn ? <BrowseTendersPage /> : <Navigate to="/login" />} />
        <Route path="/companies" element={isLoggedIn ? <CompanySearchPage /> : <Navigate to="/login" />} />
        <Route path='/applications' element={isLoggedIn? <MyApplicationsPage/>: <Navigate to='login'/>}/>
        <Route path="/received-applications" element={isLoggedIn ? <ReceivedApplicationsPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
