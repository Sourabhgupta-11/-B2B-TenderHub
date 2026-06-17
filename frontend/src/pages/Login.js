import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { startGuestSession } from '../mock/guestData';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', { email, password });
      const data = res.data;
      if (data.success) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    startGuestSession();
    navigate('/dashboard');
  };

  return (
    <div className="th-auth-page">
      <div className="th-auth-left d-none d-lg-flex">
        <div className="th-auth-quote">
          <div className="th-brand-icon mb-4" style={{ width: 48, height: 48, fontSize: '1.4rem', background: 'linear-gradient(135deg,#4d5fff,#3a46d6)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <i className="bi bi-layers-half" />
          </div>
          <h2 style={{ fontFamily: 'var(--th-font-display)', color: '#fff', fontSize: '1.9rem', lineHeight: 1.3 }}>
            India's Most Trusted<br />B2B Tender Platform
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '1rem', lineHeight: 1.7 }}>
            Connect with qualified vendors, post tenders and manage your procurement pipeline — all in one place.
          </p>
          <div className="th-auth-stats mt-4">
            {[['2,400+', 'Tenders Posted'], ['850+', 'Companies'], ['94%', 'Satisfaction']].map(([v, l]) => (
              <div key={l} className="th-auth-stat">
                <div style={{ fontFamily: 'var(--th-font-display)', fontWeight: 800, fontSize: '1.5rem', color: '#fff' }}>{v}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="th-auth-right">
        <div className="th-auth-card">
          <div className="mb-4">
            <Link to="/" className="th-back-link">
              <i className="bi bi-arrow-left me-1" /> Back to home
            </Link>
          </div>
          <h3 className="th-auth-heading">Welcome back</h3>
          <p className="th-muted mb-4" style={{ fontSize: '0.93rem' }}>Sign in to your TenderHub account</p>

          {errorMsg && (
            <div className="alert alert-danger d-flex align-items-center gap-2 py-2" style={{ fontSize: '0.88rem' }}>
              <i className="bi bi-exclamation-circle-fill" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email address</label>
              <div className="input-group">
                <span className="input-group-text th-input-icon"><i className="bi bi-envelope" /></span>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-group">
                <span className="input-group-text th-input-icon"><i className="bi bi-lock" /></span>
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  className="form-control border-end-0"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-group-text th-input-icon"
                  onClick={() => setShowPw(!showPw)}
                  tabIndex={-1}
                  style={{ cursor: 'pointer' }}
                >
                  <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'}`} />
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading} style={{ paddingTop: '0.7rem', paddingBottom: '0.7rem' }}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Signing in…</>
                : <><i className="bi bi-box-arrow-in-right me-2" />Sign In</>}
            </button>
          </form>

          <div className="th-divider"><span>or</span></div>

          <button className="btn btn-stamp w-100 mb-4" onClick={handleGuest} style={{ paddingTop: '0.7rem', paddingBottom: '0.7rem' }}>
            <i className="bi bi-eye-fill me-2" />
            Continue as Guest
          </button>

          <p className="text-center mb-0" style={{ fontSize: '0.9rem', color: 'var(--th-ink-mute)' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ fontWeight: 600, color: 'var(--th-indigo)' }}>Create one free</Link>
          </p>
        </div>
      </div>

      <AuthStyles />
    </div>
  );
};

const AuthStyles = () => (
  <style>{`
    .th-auth-page {
      min-height: 100vh;
      display: flex;
    }
    .th-auth-left {
      flex: 0 0 42%;
      background: linear-gradient(145deg, var(--th-navy) 0%, var(--th-navy-700) 60%, #2d1b6b 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
    }
    .th-auth-quote { max-width: 360px; }
    .th-auth-stats {
      display: flex;
      gap: 2rem;
      border-top: 1px solid rgba(255,255,255,0.12);
      padding-top: 1.25rem;
    }
    .th-auth-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      background: var(--th-bg);
    }
    .th-auth-card {
      width: 100%;
      max-width: 420px;
      background: var(--th-surface);
      border: 1px solid var(--th-border);
      border-radius: var(--th-radius);
      padding: 2.5rem 2rem;
      box-shadow: var(--th-shadow-sm);
    }
    .th-auth-heading {
      font-family: var(--th-font-display);
      font-size: 1.65rem;
      color: var(--th-navy);
      margin-bottom: 0.25rem;
    }
    .th-back-link {
      font-size: 0.85rem;
      color: var(--th-ink-mute);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: color 0.15s;
    }
    .th-back-link:hover { color: var(--th-indigo); }
    .th-input-icon {
      background: var(--th-bg);
      border-color: var(--th-border);
      color: var(--th-ink-mute);
    }
    .th-divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1.25rem 0;
      color: var(--th-ink-mute);
      font-size: 0.82rem;
    }
    .th-divider::before, .th-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--th-border);
    }
  `}</style>
);

export default LoginPage;
