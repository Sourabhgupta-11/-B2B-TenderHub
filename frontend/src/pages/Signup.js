import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { startGuestSession } from '../mock/guestData';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await axios.post('/auth/signup', form);
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/create-company');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    startGuestSession();
    navigate('/dashboard');
  };

  const strength = (() => {
    const pw = form.password;
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  })();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#e5484d', '#ffb020', '#16a974', '#16a974'][strength];

  return (
    <div className="th-auth-page">
      <div className="th-auth-left d-none d-lg-flex">
        <div className="th-auth-quote">
          <div style={{ width: 48, height: 48, fontSize: '1.4rem', background: 'linear-gradient(135deg,#4d5fff,#3a46d6)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '1.5rem' }}>
            <i className="bi bi-layers-half" />
          </div>
          <h2 style={{ fontFamily: 'var(--th-font-display)', color: '#fff', fontSize: '1.9rem', lineHeight: 1.3 }}>
            Start Winning Contracts Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '1rem', lineHeight: 1.7 }}>
            Join 850+ companies already using TenderHub to source vendors, win tenders and grow their business.
          </p>
          <div className="mt-4">
            {['No subscription fees to post tenders', 'Reach verified companies in your industry', 'Full proposal & approval workflow included'].map((b) => (
              <div key={b} className="d-flex align-items-center gap-2 mb-2" style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.9rem' }}>
                <i className="bi bi-check-circle-fill" style={{ color: '#16a974' }} />
                {b}
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
          <h3 className="th-auth-heading">Create your account</h3>
          <p className="th-muted mb-4" style={{ fontSize: '0.93rem' }}>Free forever. No credit card needed.</p>

          {errorMsg && (
            <div className="alert alert-danger d-flex align-items-center gap-2 py-2" style={{ fontSize: '0.88rem' }}>
              <i className="bi bi-exclamation-circle-fill" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <span className="input-group-text th-input-icon"><i className="bi bi-person" /></span>
                <input type="text" name="name" className="form-control" placeholder="Rajan Sharma" value={form.name} onChange={handleChange} required autoComplete="name" />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Work Email</label>
              <div className="input-group">
                <span className="input-group-text th-input-icon"><i className="bi bi-envelope" /></span>
                <input type="email" name="email" className="form-control" placeholder="you@company.com" value={form.email} onChange={handleChange} required autoComplete="email" />
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text th-input-icon"><i className="bi bi-lock" /></span>
                <input
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  className="form-control border-end-0"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <button type="button" className="input-group-text th-input-icon" onClick={() => setShowPw(!showPw)} tabIndex={-1} style={{ cursor: 'pointer' }}>
                  <i className={`bi ${showPw ? 'bi-eye-slash' : 'bi-eye'}`} />
                </button>
              </div>
            </div>

            {form.password && (
              <div className="mb-3">
                <div className="d-flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? strengthColor : 'var(--th-border)', transition: 'background 0.2s' }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.78rem', color: strengthColor, fontWeight: 600 }}>{strengthLabel}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading} style={{ paddingTop: '0.7rem', paddingBottom: '0.7rem' }}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Creating account…</>
                : <><i className="bi bi-person-check-fill me-2" />Create Account</>}
            </button>
          </form>

          <div className="th-divider"><span>or</span></div>

          <button className="btn btn-stamp w-100 mb-4" onClick={handleGuest} style={{ paddingTop: '0.7rem', paddingBottom: '0.7rem' }}>
            <i className="bi bi-eye-fill me-2" />
            Continue as Guest
          </button>

          <p className="text-center mb-0" style={{ fontSize: '0.9rem', color: 'var(--th-ink-mute)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 600, color: 'var(--th-indigo)' }}>Sign in</Link>
          </p>
        </div>
      </div>

      <style>{`
        .th-auth-page { min-height: 100vh; display: flex; }
        .th-auth-left { flex: 0 0 42%; background: linear-gradient(145deg, var(--th-navy) 0%, var(--th-navy-700) 60%, #2d1b6b 100%); display: flex; align-items: center; justify-content: center; padding: 3rem; }
        .th-auth-quote { max-width: 360px; }
        .th-auth-right { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; background: var(--th-bg); }
        .th-auth-card { width: 100%; max-width: 420px; background: var(--th-surface); border: 1px solid var(--th-border); border-radius: var(--th-radius); padding: 2.5rem 2rem; box-shadow: var(--th-shadow-sm); }
        .th-auth-heading { font-family: var(--th-font-display); font-size: 1.65rem; color: var(--th-navy); margin-bottom: 0.25rem; }
        .th-back-link { font-size: 0.85rem; color: var(--th-ink-mute); text-decoration: none; display: inline-flex; align-items: center; gap: 3px; transition: color 0.15s; }
        .th-back-link:hover { color: var(--th-indigo); }
        .th-input-icon { background: var(--th-bg); border-color: var(--th-border); color: var(--th-ink-mute); }
        .th-divider { display: flex; align-items: center; gap: 1rem; margin: 1.25rem 0; color: var(--th-ink-mute); font-size: 0.82rem; }
        .th-divider::before, .th-divider::after { content: ''; flex: 1; height: 1px; background: var(--th-border); }
      `}</style>
    </div>
  );
};

export default SignupPage;
