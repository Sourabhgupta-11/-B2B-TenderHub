import React from 'react';

const fmtINR = (n) =>
  n != null ? '₹' + new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n) : '—';

const daysLeft = (deadline) => {
  if (!deadline) return null;
  const diff = Math.ceil((new Date(deadline) - Date.now()) / 86400000);
  return diff;
};

const TenderCard = ({ tender, showApply = false, onApply, showEditDelete = false, onEdit, onDelete }) => {
  const { title, description, deadline, budget, createdBy } = tender;
  const days = daysLeft(deadline);
  const urgent = days !== null && days <= 7;
  const expired = days !== null && days < 0;

  const deadlineLabel = expired
    ? 'Expired'
    : days === 0
    ? 'Due today'
    : days === 1
    ? '1 day left'
    : `${days} days left`;

  const deadlineColor = expired ? 'var(--th-red)' : urgent ? '#d97706' : 'var(--th-green)';
  const deadlineBg = expired ? 'var(--th-red-bg)' : urgent ? 'var(--th-amber-bg)' : 'var(--th-green-bg)';

  return (
    <div className="th-tender-card h-100">
      {/* Publisher row */}
      <div className="th-tender-publisher">
        <div className="th-avatar th-avatar-sm" style={{ background: 'var(--th-indigo)', color: '#fff', fontSize: '0.75rem' }}>
          {(createdBy?.name || 'U')[0].toUpperCase()}
        </div>
        <span className="th-tender-company">{createdBy?.name || 'Unknown Company'}</span>
      </div>

      {/* Title + description */}
      <h5 className="th-tender-title">{title}</h5>
      <p className="th-tender-desc th-muted">{description}</p>

      {/* Meta row */}
      <div className="th-tender-meta">
        <div className="th-tender-meta-item">
          <i className="bi bi-currency-rupee" />
          <span className="th-tender-budget">{fmtINR(budget)}</span>
        </div>
        <div className="th-tender-meta-item">
          <i className="bi bi-calendar3" />
          <span>{new Date(deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="th-tender-footer">
        <span className="badge" style={{ background: deadlineBg, color: deadlineColor, fontSize: '0.78rem' }}>
          <i className={`bi ${expired ? 'bi-clock-history' : urgent ? 'bi-exclamation-circle' : 'bi-clock'} me-1`} />
          {deadlineLabel}
        </span>

        <div className="d-flex gap-2">
          {showApply && !expired && (
            <button className="btn btn-primary btn-sm px-3" onClick={() => onApply(tender._id)}>
              <i className="bi bi-send-fill me-1" />Apply
            </button>
          )}
          {showEditDelete && (
            <>
              <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(tender)} title="Edit">
                <i className="bi bi-pencil-square" />
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(tender._id)} title="Delete">
                <i className="bi bi-trash3" />
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .th-tender-card {
          background: var(--th-surface);
          border: 1px solid var(--th-border);
          border-radius: var(--th-radius);
          padding: 1.35rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: var(--th-shadow-sm);
        }
        .th-tender-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--th-shadow-md);
        }
        .th-tender-publisher {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }
        .th-tender-company {
          font-size: 0.8rem;
          color: var(--th-ink-mute);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .th-tender-title {
          font-family: var(--th-font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--th-navy);
          margin: 0;
          line-height: 1.35;
        }
        .th-tender-desc {
          font-size: 0.87rem;
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .th-tender-meta {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          border-top: 1px solid var(--th-border);
          padding-top: 0.65rem;
          margin-top: 0.15rem;
        }
        .th-tender-meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          color: var(--th-ink-mute);
        }
        .th-tender-meta-item i { font-size: 0.9rem; }
        .th-tender-budget {
          font-weight: 700;
          color: var(--th-navy);
        }
        .th-tender-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }
      `}</style>
    </div>
  );
};

export default TenderCard;
