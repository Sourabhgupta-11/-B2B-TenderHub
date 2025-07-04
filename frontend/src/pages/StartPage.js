import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow p-5 text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4">Welcome to TenderHub</h2>
        <p className="text-muted mb-4">Please choose an option to get started.</p>
        <button className="btn btn-primary w-100 mb-3" onClick={() => navigate('/login')}>Login</button>
        <button className="btn btn-outline-primary w-100" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
};

export default StartPage;
