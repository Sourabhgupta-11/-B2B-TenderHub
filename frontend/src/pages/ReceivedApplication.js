import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const ReceivedApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchReceivedApps = async () => {
    try {
      const res = await axios.get('/application/received');
      setApplications(res.data || []);
    } catch (err) {
      setErrorMsg('Failed to fetch received applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (appId) => {
    const confirm = window.confirm('Are you sure you want to approve this application? Others will be rejected.');
    if (!confirm) return;

    try {
      await axios.put(`/application/${appId}/approve`);
      alert('Application approved');
      fetchReceivedApps(); // Refresh
    } catch (err) {
      alert(err.response?.data?.error || 'Approval failed.');
    }
  };

  useEffect(() => {
    fetchReceivedApps();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-primary mb-4">Applications Received</h3>

      {loading && <p>Loading...</p>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {!loading && applications.length === 0 && <p className="text-muted">No applications received yet.</p>}

      <div className="row g-4">
        {applications.map((app) => (
          <div className="col-md-6" key={app._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">{app.tenderId?.title}</h5>
                <p><strong>From:</strong> {app.companyId?.name}</p>
                <p><strong>Industry:</strong> {app.companyId?.industry}</p>
                <p><strong>Proposal:</strong> {app.proposalText}</p>
                <p><strong>Bid:</strong> ₹{app.bidAmount}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`badge ${
                    app.status === 'approved' ? 'bg-success' :
                    app.status === 'rejected' ? 'bg-danger' : 'bg-secondary'
                  }`}>
                    {app.status}
                  </span>
                </p>

                {app.status === 'pending' && (
                  <button className="btn btn-success btn-sm mt-2" onClick={() => handleApprove(app._id)}>
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceivedApplicationsPage;

