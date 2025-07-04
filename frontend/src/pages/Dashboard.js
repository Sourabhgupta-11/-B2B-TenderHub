import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

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
    <div className="container mt-5">
      <h2 className="mb-4 text-primary fw-bold">Company Dashboard</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row g-4 align-items-center">
            {/* Logo Section */}
            <div className="col-md-3 text-center">
              {data?.logoUrl ? (
                <img
                  src={data.logoUrl}
                  alt="Company Logo"
                  className="img-fluid rounded"
                  style={{ maxHeight: '130px' }}
                />
              ) : (
                <div className="text-muted border rounded p-3">No Logo Uploaded</div>
              )}
              <button className="btn btn-outline-secondary btn-sm mt-3">
                Edit Profile
              </button>
            </div>

            {/* Info Section */}
            <div className="col-md-9">
              <h4 className="text-primary mb-3">{data.name}</h4>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Industry:</strong> {data.industry}</p>
              <p><strong>Description:</strong> {data.description}</p>
              <p>
                <strong>Products/Services:</strong>
                {data.products?.length ? (
                  <ul className="mb-0 mt-1">
                    {data.products.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted ms-2">Not listed</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Section */}
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h5 className="card-title text-primary">Manage</h5>
          <div className="row mt-3">
            <div className="col-md-4 mb-2">
              <button className="btn btn-success w-100">Create New Tender</button>
            </div>
            <div className="col-md-4 mb-2">
              <button className="btn btn-outline-primary w-100">View My Tenders</button>
            </div>
            <div className="col-md-4 mb-2">
              <button className="btn btn-outline-primary w-100">View Applications</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
