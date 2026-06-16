import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import GuestBanner from '../components/GuestBanner';

const today = new Date().toISOString().slice(0, 10);

const CreateTenderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '', budget: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('/tender/create', formData);
      navigate('/tenders');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create tender. Please try again.');
      setLoading(false);
    }
  };

  const fmtPreview = formData.budget
    ? '₹' + new Intl.NumberFormat('en-IN').format(formData.budget)
    : null;

  return (
    <div className="th-page container" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <GuestBanner />

      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div className="mb-4">
          <p className="th-eyebrow mb-1">Procurement</p>
          <h2 className="mb-0">Post a New Tender</h2>
          <p className="th-muted mt-1" style={{ fontSize: '0.93rem' }}>Fill in the details below. Vendors will see this and submit their proposals.</p>
        </div>

        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2 mb-4">
            <i className="bi bi-exclamation-circle-fill" />{error}
          </div>
        )}

        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Tender Title <span className="text-danger">*</span></label>
              <input
                type="text"
                name="title"
                className="form-control form-control-lg"
                placeholder="e.g. Supply of Raw Materials for Q3 Production"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Description <span className="text-danger">*</span></label>
              <textarea
                name="description"
                className="form-control"
                rows={5}
                placeholder="Describe the scope of work, specific requirements, deliverables and any special conditions…"
                value={formData.description}
                onChange={handleChange}
                required
                minLength={20}
              />
              <div className="d-flex justify-content-end mt-1">
                <span style={{ fontSize: '0.75rem', color: 'var(--th-ink-mute)' }}>{formData.description.length} / 20+ chars</span>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-sm-6">
                <label className="form-label">Submission Deadline <span className="text-danger">*</span></label>
                <input
                  type="date"
                  name="deadline"
                  className="form-control"
                  min={today}
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Budget (₹) <span className="text-danger">*</span></label>
                <div className="input-group">
                  <span className="input-group-text" style={{ background: 'var(--th-bg)', borderColor: 'var(--th-border)', color: 'var(--th-ink-mute)' }}>₹</span>
                  <input
                    type="number"
                    name="budget"
                    className="form-control"
                    placeholder="e.g. 2500000"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    min={1}
                  />
                </div>
                {fmtPreview && (
                  <p className="mb-0 mt-1" style={{ fontSize: '0.78rem', color: 'var(--th-ink-mute)' }}>{fmtPreview}</p>
                )}
              </div>
            </div>

            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-primary px-5" disabled={loading}>
                {loading
                  ? <><span className="spinner-border spinner-border-sm me-2" />Publishing…</>
                  : <><i className="bi bi-megaphone-fill me-2" />Publish Tender</>}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/tenders')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTenderPage;
