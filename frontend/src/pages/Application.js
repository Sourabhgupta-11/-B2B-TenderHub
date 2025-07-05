import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchApplications = async () => {
    try {
      const res = await axios.get("/application/my");
      console.log(res.data);
      setApplications(res.data || []);
    } catch (err) {
      setErrorMsg("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-primary mb-4">My Applications</h3>

      {loading && <p>Loading...</p>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {!loading && applications.length === 0 && (
        <p className="text-muted">No applications submitted yet.</p>
      )}

      <div className="row g-4">
        {applications.map((app) => (
          <div className="col-md-6" key={app._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  {app.tenderId?.title}
                </h5>
                <p>
                  <strong>Proposal:</strong> {app.proposalText}
                </p>
                <p>
                  <strong>Bid Amount:</strong> ₹{app.bidAmount}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(app.tenderId?.deadline).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      app.status === "approved"
                        ? "bg-success"
                        : app.status === "rejected"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplicationsPage;
