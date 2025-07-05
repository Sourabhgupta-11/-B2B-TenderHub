import React, { useState } from 'react';
import axios from '../api/axiosConfig';

const ApplyModal = ({ tenderId, onClose, onSuccess }) => {
  const [proposalText, setProposalText] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/application/${tenderId}/apply`, {
        proposalText,
        bidAmount,
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to apply');
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
    >
      <div className="bg-white rounded shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Apply to Tender</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleApply}>
          <div className="mb-3">
            <label className="form-label">Proposal</label>
            <textarea
              className="form-control"
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              required
              rows={4}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Bid Amount (₹)</label>
            <input
              type="number"
              className="form-control"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="submit" className="btn btn-success">
              Submit Application
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
