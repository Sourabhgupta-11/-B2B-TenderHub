import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isGuestMode, GUEST_BANNER_KEY } from '../mock/guestData';

const GuestBanner = () => {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(GUEST_BANNER_KEY) === 'true'; } catch { return false; }
  });

  if (!isGuestMode() || dismissed) return null;

  const dismiss = () => {
    localStorage.setItem(GUEST_BANNER_KEY, 'true');
    setDismissed(true);
  };

  return (
    <div className="th-guest-banner">
      <div className="th-guest-text">
        <i className="bi bi-magic" />
        <span>
          <strong>Guest Preview Mode</strong> — You're exploring with a sample company profile.
          All data is local to your browser.
        </span>
      </div>
      <div className="d-flex align-items-center gap-2 flex-shrink-0">
        <Link to="/signup" className="btn btn-stamp btn-sm px-3">
          <i className="bi bi-person-plus-fill me-1" />Create Real Account
        </Link>
        <button className="btn btn-sm btn-outline-light" onClick={dismiss}>
          <i className="bi bi-x" />
        </button>
      </div>
    </div>
  );
};

export default GuestBanner;
