import React, { useState } from 'react';
import axios from '../api/axiosConfig';

const ApplyModal = ({ tenderId, onClose, onSuccess }) => {
  const [proposalText, setProposalText] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/application/${tenderId}/apply`, { proposalText, bidAmount });
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to apply');
    }
  };

  return (
    <div className="modal-backdrop show d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Apply to Tender</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleApply}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Proposal</label>
                <textarea className="form-control" value={proposalText} onChange={(e) => setProposalText(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Bid Amount (₹)</label>
                <input type="number" className="form-control" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">Submit Application</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
