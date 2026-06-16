import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import TenderCard from '../components/TenderCard';
import GuestBanner from '../components/GuestBanner';

const MyTendersPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '', budget: '' });
  const [saving, setSaving] = useState(false);

  const fetchTenders = async () => {
    try {
      const res = await axios.get('/tender/myTender');
      setTenders(res.data || []);
    } catch {
      setErrorMsg('Failed to fetch tenders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTenders(); }, []);

  const handleEditClick = (tender) => {
    setEditingId(tender._id);
    setFormData({ title: tender.title, description: tender.description, deadline: tender.deadline?.slice(0, 10), budget: tender.budget });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm('Delete this tender? This cannot be undone.')) return;
    try {
      await axios.delete(`/tender/${id}`);
      fetchTenders();
    } catch {
      alert('Failed to delete tender.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`/tender/${editingId}`, formData);
      setEditingId(null);
      fetchTenders();
    } catch {
      alert('Update failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="th-page container" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <GuestBanner />

      <div className="th-page-header">
        <div>
          <p className="th-eyebrow mb-1">Procurement</p>
          <h2 className="mb-0">My Tenders</h2>
        </div>
        <a href="/create-tender" className="btn btn-primary btn-sm px-3">
          <i className="bi bi-plus-circle-fill me-1" />Post New Tender
        </a>
      </div>

      {/* Edit panel */}
      {editingId && (
        <div className="card p-4 mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0"><i className="bi bi-pencil-square me-2 text-primary" />Edit Tender</h5>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingId(null)}>
              <i className="bi bi-x me-1" />Cancel
            </button>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Deadline</label>
                <input type="date" className="form-control" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} required />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Budget (₹)</label>
                <input type="number" className="form-control" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} required min={0} />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary px-4" disabled={saving}>
                  {saving ? <><span className="spinner-border spinner-border-sm me-2" />Saving…</> : <><i className="bi bi-check-circle-fill me-1" />Save Changes</>}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {loading && <div className="th-loading"><div className="th-spinner" /><span>Loading tenders…</span></div>}
      {errorMsg && <div className="alert alert-danger"><i className="bi bi-exclamation-circle me-2" />{errorMsg}</div>}

      {!loading && tenders.length === 0 && (
        <div className="th-empty">
          <i className="bi bi-file-earmark-plus" />
          <h5 className="mb-2">No tenders yet</h5>
          <p className="mb-3">Post your first tender to start receiving bids from qualified vendors.</p>
          <a href="/create-tender" className="btn btn-primary btn-sm px-4">
            <i className="bi bi-plus-circle-fill me-1" />Post a Tender
          </a>
        </div>
      )}

      <div className="row g-4">
        {tenders.map(tender => (
          <div className="col-md-6" key={tender._id}>
            <TenderCard tender={tender} showEditDelete onEdit={handleEditClick} onDelete={handleDeleteClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTendersPage;
