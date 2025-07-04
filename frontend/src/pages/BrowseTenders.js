import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import TenderCard from "../components/TenderCard";

const BrowseTendersPage = () => {
  const [tenders, setTenders] = useState([]);
  const [error, setError] = useState("");

  const fetchAllTenders = async () => {
    try {
      const res = await axios.get("/tender/others");
      console.log(res.data);
      setTenders(res.data);
    } catch (err) {
      setTenders([]);
      setError("Failed to load tenders");
    }
  };

  const handleApply = async (tenderId) => {
    try {
      const res = await axios.post(`/tender/apply/${tenderId}`);
      alert("Application submitted!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to apply");
    }
  };

  useEffect(() => {
    fetchAllTenders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">All Published Tenders</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-4">
        {tenders.map((tender) => (
          <div className="col-md-6" key={tender._id}>
            <TenderCard
              tender={tender}
              showApply={true}
              onApply={handleApply} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTendersPage;
