import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import GuestBanner from '../components/GuestBanner';

const fmtINR = (n) => n != null ? '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n) : '—';

const StatusBadge = ({ status }) => {
  const map = {
    approved: { bg: 'var(--th-green-bg)', color: 'var(--th-green)', icon: 'bi-check-circle-fill', label: 'Approved' },
    rejected: { bg: 'var(--th-red-bg)', color: 'var(--th-red)', icon: 'bi-x-circle-fill', label: 'Rejected' },
    pending: { bg: 'var(--th-amber-bg)', color: '#9a6200', icon: 'bi-hourglass-split', label: 'Pending Review' },
  };
  const s = map[status] || map.pending;
  return (
    <span className="badge" style={{ background: s.bg, color: s.color, fontSize: '0.78rem', fontWeight: 600 }}>
      <i className={`bi ${s.icon} me-1`} />{s.label}
    </span>
  );
};

const ReceivedApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [approving, setApproving] = useState(null);

  const fetchApps = async () => {
    try {
      const res = await axios.get('/application/received');
      setApplications(res.data || []);
    } catch {
      setErrorMsg('Failed to fetch received applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApps(); }, []);

  const handleApprove = async (appId) => {
    if (!window.confirm('Approve this application? All other bids for this tender will be rejected.')) return;
    setApproving(appId);
    try {
      await axios.put(`/application/${appId}/approve`);
      fetchApps();
    } catch (err) {
      alert(err.response?.data?.error || 'Approval failed. Please try again.');
    } finally {
      setApproving(null);
    }
  };

  const pending = applications.filter(a => a.status === 'pending').length;

  return (
    <div className="th-page container" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <GuestBanner />

      <div className="th-page-header">
        <div>
          <p className="th-eyebrow mb-1">Incoming Bids</p>
          <h2 className="mb-0">Applications Received</h2>
        </div>
        {pending > 0 && (
          <span className="badge" style={{ background: 'var(--th-amber-bg)', color: '#9a6200', fontSize: '0.85rem', padding: '0.5em 1em' }}>
            <i className="bi bi-hourglass-split me-1" />{pending} awaiting review
          </span>
        )}
      </div>

      {loading && <div className="th-loading"><div className="th-spinner" /><span>Loading applications…</span></div>}
      {errorMsg && <div className="alert alert-danger"><i className="bi bi-exclamation-circle me-2" />{errorMsg}</div>}

      {!loading && applications.length === 0 && (
        <div className="th-empty">
          <i className="bi bi-inbox" />
          <h5 className="mb-2">No applications yet</h5>
          <p className="mb-0">Once vendors apply to your tenders, their proposals will appear here.</p>
        </div>
      )}

      <div className="row g-4">
        {applications.map(app => (
          <div className="col-md-6" key={app._id}>
            <div className="th-tender-card h-100" style={{ gap: '0.75rem' }}>
              {/* Tender title */}
              <div>
                <p className="th-muted mb-1" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>For Tender</p>
                <h6 style={{ color: 'var(--th-navy)', fontFamily: 'var(--th-font-display)' }}>{app.tenderId?.title}</h6>
              </div>

              {/* Applicant */}
              <div style={{ borderTop: '1px solid var(--th-border)', paddingTop: '0.75rem' }}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <div className="th-avatar th-avatar-sm" style={{ background: 'var(--th-indigo)', color: '#fff', fontSize: '0.75rem' }}>
                    {(app.companyId?.name || 'U')[0]}
                  </div>
                  <div>
                    <p className="mb-0 fw-semibold" style={{ fontSize: '0.9rem', color: 'var(--th-navy)' }}>{app.companyId?.name}</p>
                    <p className="mb-0 th-muted" style={{ fontSize: '0.78rem' }}>{app.companyId?.industry}</p>
                  </div>
                </div>
              </div>

              {/* Proposal */}
              <p className="th-muted mb-0" style={{ fontSize: '0.87rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {app.proposalText}
              </p>

              {/* Bid amount + status */}
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-auto pt-2" style={{ borderTop: '1px solid var(--th-border)' }}>
                <div>
                  <p className="mb-0 th-muted" style={{ fontSize: '0.75rem' }}>Bid Amount</p>
                  <p className="mb-0 fw-bold" style={{ fontSize: '1.05rem', color: 'var(--th-navy)', fontFamily: 'var(--th-font-display)' }}>{fmtINR(app.bidAmount)}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <StatusBadge status={app.status} />
                  {app.status === 'pending' && (
                    <button
                      className="btn btn-success btn-sm px-3"
                      onClick={() => handleApprove(app._id)}
                      disabled={approving === app._id}
                    >
                      {approving === app._id
                        ? <span className="spinner-border spinner-border-sm" />
                        : <><i className="bi bi-check-circle-fill me-1" />Approve</>}
                    </button>
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

export default ReceivedApplicationsPage;
