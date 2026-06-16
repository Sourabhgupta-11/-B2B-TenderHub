import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const ApplyModal = ({ tenderId, onClose, onSuccess }) => {
  const [proposalText, setProposalText] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleApply = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await axios.post(`/application/${tenderId}/apply`, { proposalText, bidAmount });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(15,27,61,0.55)', zIndex: 1060, backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white rounded-3 shadow-lg p-4"
        style={{ width: '100%', maxWidth: 480, margin: '1rem', animation: 'th-fade-up 0.25s ease both' }}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h5 className="mb-0" style={{ fontFamily: 'var(--th-font-display)', color: 'var(--th-navy)' }}>
              <i className="bi bi-send-fill me-2 text-primary" />Submit Application
            </h5>
            <p className="mb-0 th-muted" style={{ fontSize: '0.82rem', marginTop: 2 }}>Your proposal will be sent to the tender owner</p>
          </div>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2 py-2 mb-3" style={{ fontSize: '0.88rem' }}>
            <i className="bi bi-exclamation-circle-fill" />{error}
          </div>
        )}

        <form onSubmit={handleApply}>
          <div className="mb-3">
            <label className="form-label">Proposal <span className="text-danger">*</span></label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Describe your approach, relevant experience and why you're the right partner for this tender…"
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
              required
              minLength={30}
            />
            <div className="d-flex justify-content-end mt-1">
              <span style={{ fontSize: '0.75rem', color: 'var(--th-ink-mute)' }}>{proposalText.length} chars</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Bid Amount (₹) <span className="text-danger">*</span></label>
            <div className="input-group">
              <span className="input-group-text" style={{ background: 'var(--th-bg)', borderColor: 'var(--th-border)', color: 'var(--th-ink-mute)' }}>₹</span>
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 1500000"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
                min={1}
              />
            </div>
            {bidAmount && (
              <p className="mb-0 mt-1" style={{ fontSize: '0.8rem', color: 'var(--th-ink-mute)' }}>
                ₹{new Intl.NumberFormat('en-IN').format(bidAmount)}
              </p>
            )}
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1" disabled={submitting}>
              {submitting
                ? <><span className="spinner-border spinner-border-sm me-2" />Submitting…</>
                : <><i className="bi bi-send-fill me-2" />Submit Application</>}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
