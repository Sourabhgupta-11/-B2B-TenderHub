import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import GuestBanner from '../components/GuestBanner';

const AVATAR_COLORS = ['#4d5fff','#16a974','#ffb020','#e5484d','#7c3aed','#0ea5e9','#f97316','#14b8a6'];
const getColor = (name) => AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length];

const CompanySearchPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [searchField, setSearchField] = useState('name');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/company');
        setCompanies(res.data || []);
        setFiltered(res.data || []);
      } catch {
        setError('Failed to load companies.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    if (!term) { setFiltered(companies); return; }
    setFiltered(companies.filter((c) => {
      if (searchField === 'name') return c.name?.toLowerCase().includes(term);
      if (searchField === 'industry') return c.industry?.toLowerCase().includes(term);
      if (searchField === 'products') return c.products?.some(p => p.toLowerCase().includes(term));
      return false;
    }));
  }, [search, searchField, companies]);

  return (
    <div className="th-page container" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <GuestBanner />

      <div className="th-page-header">
        <div>
          <p className="th-eyebrow mb-1">Partner Discovery</p>
          <h2 className="mb-0">Explore Companies</h2>
        </div>
        <span className="badge" style={{ background: '#eef0ff', color: 'var(--th-indigo-600)', fontSize: '0.85rem', padding: '0.5em 1em' }}>
          {filtered.length} companies
        </span>
      </div>

      {/* Search bar */}
      <div className="card p-3 mb-4 d-flex flex-wrap align-items-center gap-3" style={{ flexDirection: 'row' }}>
        <div className="input-group" style={{ maxWidth: 400 }}>
          <select className="input-group-text border-end-0 form-select" style={{ maxWidth: 165, background: 'var(--th-bg)', borderColor: 'var(--th-border)', fontSize: '0.85rem', borderRadius: 'var(--th-radius-sm) 0 0 var(--th-radius-sm)' }}
            value={searchField} onChange={e => { setSearchField(e.target.value); setSearch(''); }}>
            <option value="name">By Name</option>
            <option value="industry">By Industry</option>
            <option value="products">By Service</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder={`Search companies by ${searchField}…`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="input-group-text border" style={{ cursor: 'pointer', background: 'var(--th-bg)' }} onClick={() => setSearch('')}>
              <i className="bi bi-x text-muted" />
            </button>
          )}
        </div>
      </div>

      {loading && <div className="th-loading"><div className="th-spinner" /><span>Loading companies…</span></div>}
      {error && <div className="alert alert-danger"><i className="bi bi-exclamation-circle me-2" />{error}</div>}

      {!loading && filtered.length === 0 && (
        <div className="th-empty">
          <i className="bi bi-building" />
          <h5 className="mb-1">No companies found</h5>
          <p className="mb-0">Try a different search term.</p>
        </div>
      )}

      <div className="row g-4">
        {filtered.map((company) => {
          const color = company.avatarColor || getColor(company.name);
          const initials = company.name?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
          return (
            <div className="col-md-6" key={company._id}>
              <div className="th-tender-card h-100" style={{ gap: '0.75rem' }}>
                {/* Header row */}
                <div className="d-flex align-items-center gap-3">
                  {company.logoUrl
                    ? <img src={company.logoUrl} alt="Logo" style={{ width: 52, height: 52, objectFit: 'contain', borderRadius: 12, border: '1px solid var(--th-border)' }} />
                    : <div className="th-avatar th-avatar-md" style={{ background: color, color: '#fff' }}>{initials}</div>}
                  <div>
                    <h5 className="mb-0" style={{ fontFamily: 'var(--th-font-display)', fontSize: '1rem', color: 'var(--th-navy)' }}>{company.name}</h5>
                    <span className="badge" style={{ background: '#eef0ff', color: 'var(--th-indigo-600)', fontSize: '0.75rem', marginTop: 3 }}>{company.industry}</span>
                  </div>
                </div>

                {/* Description */}
                {company.description && (
                  <p className="th-muted mb-0" style={{ fontSize: '0.87rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {company.description}
                  </p>
                )}

                {/* Products */}
                {company.products?.length > 0 && (
                  <div>
                    <p className="th-muted mb-2" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Services</p>
                    <div className="d-flex flex-wrap gap-1">
                      {company.products.map((p, i) => (
                        <span key={i} className="badge" style={{ background: 'var(--th-bg)', color: 'var(--th-ink)', border: '1px solid var(--th-border)', fontWeight: 500, fontSize: '0.78rem' }}>{p}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Email */}
                {company.userId?.email && (
                  <p className="mb-0 th-muted" style={{ fontSize: '0.8rem', borderTop: '1px solid var(--th-border)', paddingTop: '0.6rem', marginTop: 'auto' }}>
                    <i className="bi bi-envelope me-1" />{company.userId.email}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanySearchPage;
