import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCompanyData = async () => {
    try {
      const res = await axios.get('/company/me');
      setCompany(res.data);
    } catch (err) {
      console.error('Auth failed', err);
      setError(err.response?.data?.error || 'Failed to fetch company data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  const data = company?.success ? company : null;

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold text-primary mb-5">Company Dashboard</h2>


      <div className="card shadow-sm p-4 mb-5">
        <div className="row align-items-center">
          <div className="col-md-3 text-center mb-4 mb-md-0">
            {data?.logoUrl ? (
              <img
                src={data.logoUrl}
                alt="Company Logo"
                className="img-fluid rounded border"
                style={{ maxHeight: '130px' }}
              />
            ) : (
              <div className="border rounded p-4 text-muted">No Logo Uploaded</div>
            )}
            <Link to="/edit-company" className="btn btn-outline-secondary btn-sm mt-3">
              Edit Profile
            </Link>
          </div>


          <div className="col-md-9">
            <h3 className="fw-semibold text-dark">{data.name}</h3>
            <hr className="text-muted" />
            <p className="mb-2">
              <span className="fw-semibold text-muted">📧 Email:</span>{' '}
              <span>{data.email || <em className="text-muted">Not available</em>}</span>
            </p>
            <p className="mb-2">
              <span className="fw-semibold text-muted">🏭 Industry:</span> {data.industry}
            </p>
            <p className="mb-2">
              <span className="fw-semibold text-muted">📝 Description:</span> {data.description}
            </p>
            <div className="mb-2">
              <span className="fw-semibold text-muted">🧰 Products/Services:</span>{' '}
              {data.products?.length ? (
                <ul className="mb-0 ps-3 mt-1">
                  {data.products.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-muted">Not listed</span>
              )}
            </div>
          </div>
        </div>
      </div>


      <div className="card shadow-sm p-4">
        <h5 className="text-primary fw-bold mb-4">Quick Actions</h5>
        <div className="row g-3">
          <div className="col-md-3 col-sm-6">
            <Link to="/create-tender" className="btn btn-success w-100">
              📝 Create Tender
            </Link>
          </div>
          <div className="col-md-3 col-sm-6">
            <Link to="/tenders" className="btn btn-outline-primary w-100">
              📂 My Tenders
            </Link>
          </div>
          <div className="col-md-3 col-sm-6">
            <Link to="/applications" className="btn btn-outline-primary w-100">
              📥 View Applications
            </Link>
          </div>
         <div className="col-md-3 col-sm-6">
          <Link to="/received-applications" className="btn btn-outline-primary w-100">
          Applications Received
          </Link>
          </div>
          <div className="col-md-3 col-sm-6">
            <Link to="/browse" className="btn btn-outline-secondary w-100">
              🔍 Browse All Tenders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
