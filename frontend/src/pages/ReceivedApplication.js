import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const ReceivedApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchReceivedApps = async () => {
    try {
      const res = await axios.get('/application/received');
      console.log(res.data)
      setApplications(res.data || []);
    } catch (err) {
      setErrorMsg('Failed to fetch received applications.');
    } finally {
      setLoading(false);
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceivedApplicationsPage;
