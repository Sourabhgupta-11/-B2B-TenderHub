import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { isGuestMode, endGuestSession } from '../mock/guestData';

const Navbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [authed,   setAuthed]   = useState(!!localStorage.getItem('token') || isGuestMode());
  const [guest,    setGuest]    = useState(isGuestMode());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setAuthed(!!localStorage.getItem('token') || isGuestMode());
    setGuest(isGuestMode());
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    if (guest) endGuestSession();
    localStorage.removeItem('token');
    setAuthed(false);
    setGuest(false);
    navigate('/');
  };

  const isLanding = location.pathname === '/';
  const darkMode  = isLanding;

  return (
    <>
      {/* CRITICAL: keep Bootstrap's `navbar navbar-expand-lg` so the
          horizontal layout + mobile collapse are handled by Bootstrap.
          Our classes only control colour/background theming.           */}
        <nav
        className={[
        'navbar navbar-expand-lg',
        darkMode
          ? scrolled ? 'th-nb-dark-scrolled' : 'th-nb-dark'
          : 'th-nb-solid',
        ].join(' ')}
        style={darkMode && !scrolled ? { background: 'transparent', boxShadow: 'none' } : {}}
>
        <div className="container-fluid px-3 px-lg-5">

          {/* Brand */}
          <Link className="navbar-brand th-brand" to={authed ? '/dashboard' : '/'}>
            <div className="th-brand-icon">
              <i className="bi bi-layers-half" />
            </div>
            TenderHub
          </Link>

          {/* Mobile toggler — Bootstrap JS handles open/close */}
          <button
            className="navbar-toggler th-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#thNavCollapse"
            aria-controls="thNavCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list" style={{ fontSize: '1.5rem' }} />
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="thNavCollapse">

            {/* Nav links */}
            {authed && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-2">
                {[
                  { to: '/dashboard',             icon: 'bi-house-door',        label: 'Dashboard'  },
                  { to: '/browse',                icon: 'bi-search',            label: 'Browse'     },
                  { to: '/tenders',               icon: 'bi-file-earmark-text', label: 'My Tenders' },
                  { to: '/companies',             icon: 'bi-building',          label: 'Companies'  },
                  { to: '/applications',          icon: 'bi-send',              label: 'Applied'    },
                  { to: '/received-applications', icon: 'bi-inbox',             label: 'Received'   },
                ].map(({ to, icon, label }) => (
                  <li key={to} className="nav-item">
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `th-nav-link nav-link d-flex align-items-center gap-1 px-2 py-1 ${isActive ? 'th-nav-active' : ''}`
                      }
                    >
                      <i className={`bi ${icon}`} style={{ fontSize: '0.9rem' }} />
                      <span>{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}

            {/* Right-side buttons */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-2">
              {!authed ? (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-sm th-btn-ghost px-3" to="/login">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary btn-sm px-3" to="/signup">
                      <i className="bi bi-person-plus-fill me-1" />Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {guest && (
                    <li className="nav-item d-flex align-items-center">
                      <span className="th-guest-badge">
                        <i className="bi bi-eye-fill me-1" />Guest Mode
                      </span>
                    </li>
                  )}
                  <li className="nav-item">
                    <button className="btn btn-sm th-btn-ghost px-3" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-1" />
                      {guest ? 'Exit' : 'Logout'}
                    </button>
                  </li>
                </>
              )}
            </ul>

          </div>
        </div>
      </nav>

      <style>{`
        /* ── Base ──────────────────────────────────────────────── */
        .navbar {
          top: 0;
          z-index: 1030;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          padding-top: 0.6rem;
          padding-bottom: 0.6rem;
        }

        /* ── Colour themes ───────────────────────────────────── */
        .th-nb-dark,
        .th-nb-dark-scrolled {
          position: fixed;
          left: 0;
          right: 0;
          width: 100%;
        }

        /* Landing transparent */
        .th-nb-dark {
          background: transparent !important;
          box-shadow: none;
        }

        /* Landing scrolled */
        .th-nb-dark-scrolled {
          background: rgba(15, 27, 61, 0.97) !important;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 2px 24px rgba(0,0,0,0.28);
        }

        /* Inner pages — sticky (stays in document flow, pushes content down) */
        .th-nb-solid {
          position: sticky;
          background: #ffffff !important;
          border-bottom: 1px solid var(--th-border);
          box-shadow: var(--th-shadow-sm);
        }

        /* ── Brand ─────────────────────────────────────────────── */
        .th-brand {
          font-family: var(--th-font-display) !important;
          font-weight: 800 !important;
          font-size: 1.12rem;
          display: flex !important;
          align-items: center;
          gap: 0.5rem;
          transition: opacity 0.15s;
        }
        /* White text on dark/transparent navbar */
        .th-nb-dark .th-brand,
        .th-nb-dark .th-brand:hover,
        .th-nb-dark .th-brand:focus,
        .th-nb-dark-scrolled .th-brand,
        .th-nb-dark-scrolled .th-brand:hover,
        .th-nb-dark-scrolled .th-brand:focus {
          color: #ffffff !important;
          opacity: 0.95;
        }
        /* Navy text on solid white navbar */
        .th-nb-solid .th-brand,
        .th-nb-solid .th-brand:hover,
        .th-nb-solid .th-brand:focus {
          color: var(--th-navy) !important;
        }
        .th-brand:hover { opacity: 0.88; }

        .th-brand-icon {
          width: 30px; height: 30px;
          background: linear-gradient(135deg, var(--th-indigo), var(--th-indigo-600));
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 0.9rem;
          flex-shrink: 0;
        }

        /* ── Nav links ─────────────────────────────────────────── */
        .th-nav-link {
          font-size: 0.87rem;
          font-weight: 500;
          border-radius: 8px;
          white-space: nowrap;
          transition: background 0.14s, color 0.14s;
        }
        .th-nb-solid .th-nav-link        { color: var(--th-ink-mute) !important; }
        .th-nb-solid .th-nav-link:hover  { background: var(--th-bg); color: var(--th-navy) !important; }
        .th-nb-solid .th-nav-active      { background: #eef0ff !important; color: var(--th-indigo) !important; font-weight: 600; }

        .th-nb-dark .th-nav-link,
        .th-nb-dark-scrolled .th-nav-link        { color: rgba(255,255,255,0.75) !important; }
        .th-nb-dark .th-nav-link:hover,
        .th-nb-dark-scrolled .th-nav-link:hover  { background: rgba(255,255,255,0.1); color: #fff !important; }
        .th-nb-dark .th-nav-active,
        .th-nb-dark-scrolled .th-nav-active      { background: rgba(255,255,255,0.12) !important; color: #fff !important; }

        /* ── Ghost button (Sign In / Logout) ───────────────────── */
        .th-btn-ghost {
          font-weight: 600;
          background: transparent;
          border: 1.5px solid transparent;
          transition: all 0.14s;
        }
        .th-nb-solid .th-btn-ghost {
          color: var(--th-navy) !important;
          border-color: var(--th-border) !important;
        }
        .th-nb-solid .th-btn-ghost:hover {
          background: var(--th-bg) !important;
        }
        .th-nb-dark .th-btn-ghost,
        .th-nb-dark-scrolled .th-btn-ghost {
          color: rgba(255,255,255,0.88) !important;
          border-color: rgba(255,255,255,0.3) !important;
        }
        .th-nb-dark .th-btn-ghost:hover,
        .th-nb-dark-scrolled .th-btn-ghost:hover {
          background: rgba(255,255,255,0.1) !important;
          color: #fff !important;
        }

        /* ── Guest badge ───────────────────────────────────────── */
        .th-guest-badge {
          display: inline-flex; align-items: center;
          font-size: 0.76rem; font-weight: 600;
          padding: 0.3em 0.8em; border-radius: 999px;
        }
        .th-nb-solid .th-guest-badge         { background: var(--th-amber-bg); color: #9a6200; }
        .th-nb-dark .th-guest-badge,
        .th-nb-dark-scrolled .th-guest-badge { background: rgba(255,176,32,0.18); color: var(--th-amber); }

        /* ── Mobile toggler ────────────────────────────────────── */
        .th-toggler {
          border: none !important;
          padding: 4px 8px;
          border-radius: 8px;
          line-height: 1;
        }
        .th-toggler:focus { box-shadow: none !important; }
        .th-nb-solid .th-toggler           { color: var(--th-navy); }
        .th-nb-dark .th-toggler,
        .th-nb-dark-scrolled .th-toggler   { color: #ffffff; }

        /* Mobile: collapsed menu gets a floating panel */
        @media (max-width: 991.98px) {
          .th-nb-dark .navbar-collapse,
          .th-nb-dark-scrolled .navbar-collapse {
            background: rgba(15, 27, 61, 0.97);
            border-radius: 12px;
            padding: 0.75rem 1rem;
            margin-top: 0.5rem;
          }
          .th-nb-solid .navbar-collapse {
            background: #fff;
            border: 1px solid var(--th-border);
            border-radius: 12px;
            padding: 0.75rem 1rem;
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;