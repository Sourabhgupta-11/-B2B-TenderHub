import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import TenderCard from '../components/TenderCard';
import ApplyModal from '../components/ApplicationModal';
import GuestBanner from '../components/GuestBanner';

const BrowseTendersPage = () => {
  const [tenders, setTenders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTenderId, setSelectedTenderId] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchTenders = async () => {
    try {
      const res = await axios.get('/tender/others');
      setTenders(res.data || []);
      setFiltered(res.data || []);
    } catch {
      setError('Failed to load tenders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTenders(); }, []);

  useEffect(() => {
    let result = [...tenders];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.title?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.createdBy?.name?.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
      if (sortBy === 'budget-high') return b.budget - a.budget;
      if (sortBy === 'budget-low') return a.budget - b.budget;
      return 0;
    });
    setFiltered(result);
  }, [search, sortBy, tenders]);

  const handleSuccess = () => {
    setSelectedTenderId(null);
    setSuccessMsg('Application submitted successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="th-page container" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <GuestBanner />

      <div className="th-page-header">
        <div>
          <p className="th-eyebrow mb-1">Open Procurement</p>
          <h2 className="mb-0">Browse Tenders</h2>
        </div>
        <span className="badge" style={{ background: '#eef0ff', color: 'var(--th-indigo-600)', fontSize: '0.85rem', padding: '0.5em 1em' }}>
          {filtered.length} tenders
        </span>
      </div>

      {/* Search + sort bar */}
      <div className="card p-3 mb-4 d-flex flex-wrap align-items-center gap-3" style={{ flexDirection: 'row' }}>
        <div className="input-group" style={{ maxWidth: 380 }}>
          <span className="input-group-text" style={{ background: 'var(--th-bg)', borderColor: 'var(--th-border)' }}>
            <i className="bi bi-search text-muted" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title, company…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="input-group-text border" style={{ cursor: 'pointer', background: 'var(--th-bg)' }} onClick={() => setSearch('')}>
              <i className="bi bi-x text-muted" />
            </button>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 ms-auto">
          <label className="form-label mb-0 th-muted" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Sort by</label>
          <select className="form-select form-select-sm" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto' }}>
            <option value="deadline">Deadline (soonest)</option>
            <option value="budget-high">Budget (highest)</option>
            <option value="budget-low">Budget (lowest)</option>
          </select>
        </div>
      </div>

      {successMsg && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
          <i className="bi bi-check-circle-fill" />{successMsg}
        </div>
      )}
      {error && <div className="alert alert-danger mb-4"><i className="bi bi-exclamation-circle me-2" />{error}</div>}

      {loading && <div className="th-loading"><div className="th-spinner" /><span>Loading tenders…</span></div>}

      {!loading && filtered.length === 0 && (
        <div className="th-empty">
          <i className="bi bi-search" />
          <h5 className="mb-1">No tenders found</h5>
          <p className="mb-0">Try a different search term or check back soon.</p>
        </div>
      )}

      <div className="row g-4">
        {filtered.map(tender => (
          <div className="col-md-6" key={tender._id}>
            <TenderCard tender={tender} showApply onApply={setSelectedTenderId} />
          </div>
        ))}
      </div>

      {selectedTenderId && (
        <ApplyModal tenderId={selectedTenderId} onClose={() => setSelectedTenderId(null)} onSuccess={handleSuccess} />
      )}
    </div>
  );
};

export default BrowseTendersPage;
