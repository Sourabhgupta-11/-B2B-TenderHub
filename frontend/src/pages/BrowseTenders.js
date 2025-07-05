import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import TenderCard from "../components/TenderCard";
import ApplyModal from "../components/ApplicationModal";

const BrowseTendersPage = () => {
  const [tenders, setTenders] = useState([]);
  const [error, setError] = useState("");
  const [selectedTenderId, setSelectedTenderId] = useState(null);

  const fetchAllTenders = async () => {
    try {
      const res = await axios.get("/tender/others");
      setTenders(res.data || []);
    } catch (err) {
      setTenders([]);
      setError("Failed to load tenders");
    }
  };

  useEffect(() => {
    fetchAllTenders();
  }, []);

  const handleApplyClick = (tenderId) => {
    setSelectedTenderId(tenderId);
  };

  const handleModalClose = () => {
    setSelectedTenderId(null);
  };

  const handleApplicationSuccess = () => {
    alert("Application submitted successfully!");
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-primary mb-4">All Published Tenders</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-4">
          {tenders.map((tender) => (
            <div className="col-md-6" key={tender._id}>
              <TenderCard
                tender={tender}
                showApply={true}
                onApply={handleApplyClick}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedTenderId && (
        <ApplyModal
          tenderId={selectedTenderId}
          onClose={handleModalClose}
          onSuccess={handleApplicationSuccess}
        />
      )}
    </>
  );
};

export default BrowseTendersPage;
