import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import GuestBanner from '../components/GuestBanner';

const fmtINR = (n) => n != null ? '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n) : '—';

const StatusBadge = ({ status }) => {
  const map = {
    approved: { bg: 'var(--th-green-bg)', color: 'var(--th-green)', icon: 'bi-check-circle-fill', label: 'Approved' },
    rejected: { bg: 'var(--th-red-bg)', color: 'var(--th-red)', icon: 'bi-x-circle-fill', label: 'Rejected' },
    pending: { bg: 'var(--th-amber-bg)', color: '#9a6200', icon: 'bi-hourglass-split', label: 'Under Review' },
  };
  const s = map[status] || map.pending;
  return (
    <span className="badge" style={{ background: s.bg, color: s.color, fontSize: '0.78rem', fontWeight: 600 }}>
      <i className={`bi ${s.icon} me-1`} />{s.label}
    </span>
  );
};

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/application/my');
        setApplications(res.data || []);
      } catch {
        setErrorMsg('Failed to fetch applications.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const approved = applications.filter(a => a.status === 'approved').length;

  return (
    <div className="th-page container" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <GuestBanner />

      <div className="th-page-header">
        <div>
          <p className="th-eyebrow mb-1">Outgoing Bids</p>
          <h2 className="mb-0">My Applications</h2>
        </div>
        {approved > 0 && (
          <span className="badge" style={{ background: 'var(--th-green-bg)', color: 'var(--th-green)', fontSize: '0.85rem', padding: '0.5em 1em' }}>
            <i className="bi bi-check-circle-fill me-1" />{approved} approved
          </span>
        )}
      </div>

      {loading && <div className="th-loading"><div className="th-spinner" /><span>Loading applications…</span></div>}
      {errorMsg && <div className="alert alert-danger"><i className="bi bi-exclamation-circle me-2" />{errorMsg}</div>}

      {!loading && applications.length === 0 && (
        <div className="th-empty">
          <i className="bi bi-send" />
          <h5 className="mb-2">No applications yet</h5>
          <p className="mb-3">Browse open tenders and submit your first bid.</p>
          <a href="/browse" className="btn btn-primary btn-sm px-4">
            <i className="bi bi-search me-1" />Browse Tenders
          </a>
        </div>
      )}

      <div className="row g-4">
        {applications.map(app => (
          <div className="col-md-6" key={app._id}>
            <div className="th-tender-card h-100" style={{ gap: '0.75rem' }}>
              {/* Tender title */}
              <div>
                <p className="th-muted mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Applied Tender</p>
                <h6 style={{ color: 'var(--th-navy)', fontFamily: 'var(--th-font-display)' }}>{app.tenderId?.title}</h6>
              </div>

              {/* Proposal */}
              <p className="th-muted mb-0" style={{ fontSize: '0.87rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {app.proposalText}
              </p>

              {/* Footer */}
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-auto pt-2" style={{ borderTop: '1px solid var(--th-border)' }}>
                <div>
                  <p className="mb-0 th-muted" style={{ fontSize: '0.75rem' }}>Your Bid</p>
                  <p className="mb-0 fw-bold" style={{ fontSize: '1.05rem', color: 'var(--th-navy)', fontFamily: 'var(--th-font-display)' }}>{fmtINR(app.bidAmount)}</p>
                </div>
                <div className="d-flex flex-column align-items-end gap-1">
                  <StatusBadge status={app.status} />
                  {app.tenderId?.deadline && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--th-ink-mute)' }}>
                      <i className="bi bi-calendar3 me-1" />
                      Due {new Date(app.tenderId.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplicationsPage;
