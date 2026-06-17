import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isGuestMode } from './mock/guestData';
import LandingPage from './pages/Landing';
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

// A route that is accessible when authenticated OR in guest mode
const PrivateRoute = ({ element }) => {
  const ok = !!localStorage.getItem('token') || isGuestMode();
  return ok ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Landing — root always goes here now */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected pages — work for real users AND guests */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/create-company" element={<PrivateRoute element={<CreateCompanyPage />} />} />
        <Route path="/edit-company" element={<PrivateRoute element={<EditCompanyPage />} />} />
        <Route path="/tenders" element={<PrivateRoute element={<MyTendersPage />} />} />
        <Route path="/create-tender" element={<PrivateRoute element={<CreateTenderPage />} />} />
        <Route path="/browse" element={<PrivateRoute element={<BrowseTendersPage />} />} />
        <Route path="/companies" element={<PrivateRoute element={<CompanySearchPage />} />} />
        <Route path="/applications" element={<PrivateRoute element={<MyApplicationsPage />} />} />
        <Route path="/received-applications" element={<PrivateRoute element={<ReceivedApplicationsPage />} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
