import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Link } from 'react-router-dom';
import GuestBanner from '../components/GuestBanner';

const fmtINR = (n) =>
  n != null ? '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n) : '—';

const QUICK_ACTIONS = [
  { to: '/create-tender', icon: 'bi-plus-circle-fill', label: 'Post a Tender', desc: 'Reach qualified vendors', color: '#4d5fff', bg: '#eef0ff' },
  { to: '/browse', icon: 'bi-search', label: 'Browse Tenders', desc: 'Find opportunities', color: '#16a974', bg: '#e7f7f1' },
  { to: '/tenders', icon: 'bi-file-earmark-text', label: 'My Tenders', desc: 'Manage posted tenders', color: '#ffb020', bg: '#fff6e5' },
  { to: '/applications', icon: 'bi-send-check', label: 'My Applications', desc: 'Track submitted bids', color: '#7c3aed', bg: '#f3eeff' },
  { to: '/received-applications', icon: 'bi-inbox-fill', label: 'Received Bids', desc: 'Review & approve', color: '#e5484d', bg: '#fdecec' },
  { to: '/companies', icon: 'bi-building', label: 'Companies', desc: 'Discover partners', color: '#0ea5e9', bg: '#e0f4ff' },
];

const Dashboard = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/company/me');
        setCompany(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch company data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="th-loading"><div className="th-spinner" /><span>Loading your dashboard…</span></div>
    </div>
  );

  if (error) return (
    <div className="container" style={{ paddingTop: 80 }}>
      <div className="alert alert-danger"><i className="bi bi-exclamation-circle me-2" />{error}</div>
    </div>
  );

  const initials = company?.name
    ? company.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
    : '?';

  return (
    <div className="th-page container" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <GuestBanner />

      {/* ── Header ── */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <p className="th-eyebrow mb-1">Company Dashboard</p>
          <h2 className="mb-0">{company?.name || 'Your Company'}</h2>
        </div>
        <Link to="/edit-company" className="btn btn-outline-primary btn-sm px-3">
          <i className="bi bi-pencil-square me-1" />Edit Profile
        </Link>
      </div>

      {/* ── Company Card ── */}
      <div className="card mb-4 p-0 overflow-hidden">
        <div className="row g-0">
          {/* Logo / avatar sidebar */}
          <div className="col-md-3 d-flex align-items-center justify-content-center p-4"
            style={{ background: company?.avatarColor ? (company.avatarColor + '18') : '#eef0ff', borderRight: '1px solid var(--th-border)' }}>
            {company?.logoUrl
              ? <img src={company.logoUrl} alt="Logo" style={{ maxWidth: 120, maxHeight: 120, objectFit: 'contain', borderRadius: 12 }} />
              : <div className="th-avatar th-avatar-lg" style={{ background: company?.avatarColor || 'var(--th-indigo)', color: company?.avatarText || '#fff' }}>
                  {initials}
                </div>}
          </div>

          {/* Details */}
          <div className="col-md-9 p-4">
            <div className="row g-3">
              <div className="col-12">
                <h4 className="mb-1">{company?.name}</h4>
                <span className="badge" style={{ background: '#eef0ff', color: 'var(--th-indigo-600)', fontSize: '0.8rem' }}>
                  {company?.industry}
                </span>
              </div>

              {company?.email && (
                <div className="col-sm-6">
                  <p className="th-muted mb-1" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Email</p>
                  <p className="mb-0" style={{ fontSize: '0.9rem' }}><i className="bi bi-envelope me-1 text-muted" />{company.email}</p>
                </div>
              )}

              {company?.description && (
                <div className="col-12">
                  <p className="th-muted mb-1" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>About</p>
                  <p className="mb-0" style={{ fontSize: '0.9rem', color: 'var(--th-ink)', lineHeight: 1.6 }}>{company.description}</p>
                </div>
              )}

              {company?.products?.length > 0 && (
                <div className="col-12">
                  <p className="th-muted mb-2" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Products & Services</p>
                  <div className="d-flex flex-wrap gap-2">
                    {company.products.map((p, i) => (
                      <span key={i} className="badge" style={{ background: 'var(--th-bg)', color: 'var(--th-ink)', border: '1px solid var(--th-border)', fontWeight: 500, fontSize: '0.8rem' }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="mb-2">
        <h5 className="mb-3" style={{ color: 'var(--th-navy)' }}>Quick Actions</h5>
        <div className="row g-3">
          {QUICK_ACTIONS.map(({ to, icon, label, desc, color, bg }) => (
            <div key={to} className="col-sm-6 col-lg-4">
              <Link to={to} className="th-action-card text-decoration-none d-flex align-items-center gap-3 p-3">
                <div className="th-action-icon" style={{ background: bg, color }}>
                  <i className={`bi ${icon}`} />
                </div>
                <div>
                  <p className="mb-0 fw-semibold" style={{ fontSize: '0.92rem', color: 'var(--th-navy)' }}>{label}</p>
                  <p className="mb-0 th-muted" style={{ fontSize: '0.8rem' }}>{desc}</p>
                </div>
                <i className="bi bi-chevron-right ms-auto th-muted" style={{ fontSize: '0.8rem' }} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .th-action-card {
          background: var(--th-surface);
          border: 1px solid var(--th-border);
          border-radius: var(--th-radius-sm);
          transition: all 0.18s;
          box-shadow: var(--th-shadow-sm);
        }
        .th-action-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--th-shadow-md);
          border-color: transparent;
        }
        .th-action-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
