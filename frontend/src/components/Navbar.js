import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { isGuestMode, endGuestSession } from '../mock/guestData';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authed, setAuthed] = useState(!!localStorage.getItem('token') || isGuestMode());
  const [guest, setGuest] = useState(isGuestMode());
  const [scrolled, setScrolled] = useState(false);

  // Re-evaluate on every route change
  useEffect(() => {
    setAuthed(!!localStorage.getItem('token') || isGuestMode());
    setGuest(isGuestMode());
  }, [location.pathname]);

  // Shrink navbar on scroll when on landing page
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    if (guest) {
      endGuestSession();
    }
    localStorage.removeItem('token');
    setAuthed(false);
    setGuest(false);
    navigate('/');
  };

  const isLanding = location.pathname === '/';

  return (
    <nav
      className={`th-navbar navbar navbar-expand-lg ${isLanding ? (scrolled ? 'th-navbar-scrolled' : 'th-navbar-transparent') : 'th-navbar-solid'}`}
    >
      <div className="container-fluid px-4 px-lg-5">
        {/* Brand */}
        <Link className="navbar-brand th-brand" to={authed ? '/dashboard' : '/'}>
          <div className="th-brand-icon">
            <i className="bi bi-layers-half" />
          </div>
          TenderHub
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#thNavbar"
          aria-controls="thNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="thNavbar">
          {/* Nav links — only shown when logged in */}
          {authed && (
            <ul className="navbar-nav me-auto ms-3 gap-1">
              {[
                { to: '/dashboard', icon: 'bi-house-door', label: 'Dashboard' },
                { to: '/browse', icon: 'bi-search', label: 'Browse Tenders' },
                { to: '/tenders', icon: 'bi-file-earmark-text', label: 'My Tenders' },
                { to: '/companies', icon: 'bi-building', label: 'Companies' },
                { to: '/applications', icon: 'bi-send', label: 'Applications' },
                { to: '/received-applications', icon: 'bi-inbox', label: 'Received' },
              ].map(({ to, icon, label }) => (
                <li key={to} className="nav-item">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `th-nav-link nav-link d-flex align-items-center gap-1 px-2 ${isActive ? 'th-nav-active' : ''}`
                    }
                  >
                    <i className={`bi ${icon}`} />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          {/* Right side */}
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {!authed ? (
              <>
                <li className="nav-item">
                  <Link className="btn th-btn-ghost btn-sm px-3" to="/login">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary btn-sm px-3" to="/signup">
                    <i className="bi bi-person-plus-fill me-1" />
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {guest && (
                  <li className="nav-item">
                    <span className="badge th-guest-badge me-1">
                      <i className="bi bi-eye-fill me-1" />
                      Guest Mode
                    </span>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn th-btn-ghost btn-sm px-3" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-1" />
                    {guest ? 'Exit Guest' : 'Logout'}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <style>{`
        .th-navbar {
          transition: background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          z-index: 1000;
        }
        .th-navbar-transparent {
          background: transparent;
          box-shadow: none;
        }
        .th-navbar-scrolled {
          background: rgba(15,27,61,0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 2px 20px rgba(0,0,0,0.25);
        }
        .th-navbar-solid {
          background: var(--th-surface);
          border-bottom: 1px solid var(--th-border);
          box-shadow: var(--th-shadow-sm);
        }
        /* Brand */
        .th-brand {
          font-family: var(--th-font-display);
          font-weight: 800;
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: inherit;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .th-navbar-transparent .th-brand,
        .th-navbar-scrolled .th-brand { color: #fff; }
        .th-navbar-solid .th-brand { color: var(--th-navy); }
        .th-brand:hover { opacity: 0.85; color: inherit; }
        .th-brand-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, var(--th-indigo), var(--th-indigo-600));
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 0.95rem;
          flex-shrink: 0;
        }
        /* Nav links */
        .th-nav-link {
          font-size: 0.88rem;
          font-weight: 500;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .th-navbar-solid .th-nav-link { color: var(--th-ink-mute); }
        .th-navbar-solid .th-nav-link:hover { background: var(--th-bg); color: var(--th-navy); }
        .th-navbar-solid .th-nav-active { background: #eef0ff; color: var(--th-indigo) !important; font-weight: 600; }
        .th-navbar-transparent .th-nav-link,
        .th-navbar-scrolled .th-nav-link { color: rgba(255,255,255,0.75); }
        .th-navbar-transparent .th-nav-link:hover,
        .th-navbar-scrolled .th-nav-link:hover { background: rgba(255,255,255,0.1); color: #fff; }
        /* Ghost button */
        .th-btn-ghost {
          border: 1.5px solid transparent;
          transition: all 0.15s;
          font-weight: 600;
        }
        .th-navbar-solid .th-btn-ghost { color: var(--th-navy); border-color: var(--th-border); }
        .th-navbar-solid .th-btn-ghost:hover { background: var(--th-bg); border-color: var(--th-border); }
        .th-navbar-transparent .th-btn-ghost,
        .th-navbar-scrolled .th-btn-ghost { color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.25); }
        .th-navbar-transparent .th-btn-ghost:hover,
        .th-navbar-scrolled .th-btn-ghost:hover { background: rgba(255,255,255,0.1); color: #fff; }
        /* Guest badge */
        .th-guest-badge {
          background: var(--th-amber-bg);
          color: #9a6200;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35em 0.75em;
          border-radius: 999px;
          letter-spacing: 0;
        }
        .th-navbar-solid .th-guest-badge { background: var(--th-amber-bg); color: #9a6200; }
        .th-navbar-scrolled .th-guest-badge { background: rgba(255,176,32,0.2); color: var(--th-amber); }
        /* Toggler on dark */
        .th-navbar-transparent .navbar-toggler-icon,
        .th-navbar-scrolled .navbar-toggler-icon {
          filter: invert(1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
