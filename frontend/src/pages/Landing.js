import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { startGuestSession } from '../mock/guestData';

/* ── tiny helpers ─────────────────────────────────────────── */
const fmtINR = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

/* ── static demo data shown in the hero preview card ─────── */
const DEMO_TENDERS = [
  { id: 1, title: 'Pan-India Freight Distribution Network', company: 'Nimbus Logistics Pvt. Ltd.', budget: 3200000, industry: 'Logistics', daysLeft: 18 },
  { id: 2, title: 'Rooftop Solar EPC — 500 kW Facility', company: 'Vertex Renewables Ltd.', budget: 22000000, industry: 'Energy', daysLeft: 9 },
  { id: 3, title: 'Custom ERP & Inventory Web Application', company: 'Apex Technologies Group', budget: 1800000, industry: 'IT', daysLeft: 31 },
];

const FEATURES = [
  { icon: 'bi-megaphone-fill', color: '#4d5fff', label: 'Post Tenders', desc: 'Publish procurement requirements and reach qualified vendors across India instantly.' },
  { icon: 'bi-search', color: '#16a974', label: 'Discover Partners', desc: 'Search a curated directory of companies by industry, capability and track record.' },
  { icon: 'bi-send-check-fill', color: '#ffb020', label: 'Submit Proposals', desc: 'Respond to tenders with a structured bid — proposal, pricing and supporting details.' },
  { icon: 'bi-shield-check-fill', color: '#e5484d', label: 'Manage & Approve', desc: 'Review incoming applications, compare bids and approve the best partner — all in one place.' },
];

const STATS = [
  { value: '2,400+', label: 'Tenders Posted' },
  { value: '850+', label: 'Companies' },
  { value: '₹480 Cr+', label: 'Contracts Facilitated' },
  { value: '94%', label: 'Satisfaction Rate' },
];

const INDUSTRIES = [
  'Logistics & Supply Chain', 'Construction & Infrastructure',
  'Renewable Energy', 'Information Technology', 'Textiles & Apparel',
  'Healthcare & Pharma', 'Agriculture & Food Processing',
  'Finance & Consulting', 'Industrial Manufacturing',
];

const TESTIMONIALS = [
  { name: 'Priya Mehta', role: 'Procurement Head, Axis Infra Ltd.', quote: 'TenderHub cut our vendor discovery time by 60%. We received 9 qualified bids within a week of posting.' },
  { name: 'Rajan Sharma', role: 'CEO, BrightPath Logistics', quote: 'We won three major contracts in our first quarter on the platform. The application process is effortless.' },
  { name: 'Ananya Singh', role: 'Director, NovaEnergy Solutions', quote: 'As a growing renewable energy company, TenderHub gave us visibility with buyers we never could have reached otherwise.' },
];

/* ── component ────────────────────────────────────────────── */
const Landing = () => {
  const navigate = useNavigate();
  const [guestLoading, setGuestLoading] = useState(false);

  const handleGuest = () => {
    setGuestLoading(true);
    setTimeout(() => {
      startGuestSession();
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="th-landing">
      {/* ──────────────── HERO ──────────────── */}
      <section className="th-hero">
        <div className="th-hero-bg" aria-hidden="true">
          <div className="th-hero-blob th-hero-blob-1" />
          <div className="th-hero-blob th-hero-blob-2" />
          <div className="th-hero-grid" />
        </div>

        <div className="container position-relative py-5">
          <div className="row align-items-center g-5">
            {/* copy */}
            <div className="col-lg-6">
              <div className="th-eyebrow mb-3" style={{ color: '#a5b4ff' }}>
                India's B2B Tender Platform
              </div>
              <h1 className="th-hero-heading mb-4">
                Win More Contracts.<br />
                <span className="th-hero-gradient">Find Better Partners.</span>
              </h1>
              <p className="th-hero-sub mb-5">
                TenderHub connects companies that need work done with the right vendors, contractors and service providers — through a transparent, structured tender process.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link to="/signup" className="btn btn-primary btn-lg px-4">
                  <i className="bi bi-person-plus-fill me-2" />
                  Create Free Account
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg px-4">
                  <i className="bi bi-box-arrow-in-right me-2" />
                  Sign In
                </Link>
                <button
                  className="btn btn-stamp btn-lg px-4"
                  onClick={handleGuest}
                  disabled={guestLoading}
                >
                  {guestLoading
                    ? <><span className="spinner-border spinner-border-sm me-2" />Setting up preview…</>
                    : <><i className="bi bi-eye-fill me-2" />Continue as Guest</>}
                </button>
              </div>

              <p className="th-hero-guest-note mt-3">
                <i className="bi bi-magic me-1" />
                Guest mode creates a sample company with live tenders & applications — no signup needed.
              </p>
            </div>

            {/* preview card */}
            <div className="col-lg-6">
              <div className="th-hero-preview">
                <div className="th-preview-bar mb-3">
                  <div className="th-preview-dots">
                    <span /><span /><span />
                  </div>
                  <span className="th-preview-url">tenderhub.io / browse</span>
                </div>
                <p className="small fw-semibold text-muted mb-2" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Tenders</p>
                <div className="d-flex flex-column gap-2">
                  {DEMO_TENDERS.map((t) => (
                    <div key={t.id} className="th-preview-tender">
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <div>
                          <p className="mb-0 fw-semibold" style={{ fontSize: '0.88rem', color: 'var(--th-navy)', lineHeight: 1.3 }}>{t.title}</p>
                          <p className="mb-0" style={{ fontSize: '0.78rem', color: 'var(--th-ink-mute)' }}>{t.company}</p>
                        </div>
                        <span className="badge" style={{ background: 'var(--th-amber-bg)', color: '#9a6200', whiteSpace: 'nowrap', flexShrink: 0, fontSize: '0.72rem' }}>
                          {t.daysLeft}d left
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mt-1">
                        <span className="badge" style={{ background: '#eef0ff', color: 'var(--th-indigo-600)', fontSize: '0.72rem' }}>{t.industry}</span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--th-green)' }}>₹{fmtINR(t.budget)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary btn-sm w-100 mt-3" style={{ opacity: 0.85 }}>
                  <i className="bi bi-grid me-1" /> View All Tenders
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── STATS ──────────────── */}
      <section className="th-stats-bar">
        <div className="container">
          <div className="row g-4 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="col-6 col-md-3">
                <div className="th-stat-num">{s.value}</div>
                <div className="th-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── HOW IT WORKS ──────────────── */}
      <section className="th-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="th-eyebrow mb-2">Simple Process</div>
            <h2 className="mb-3">How TenderHub Works</h2>
            <p className="th-muted" style={{ maxWidth: 520, margin: '0 auto' }}>From signup to signed contract in four straightforward steps.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {[
              { step: '01', icon: 'bi-building-add', title: 'Create Your Company Profile', desc: 'Register your company with industry, description and services — your public pitch to potential partners.' },
              { step: '02', icon: 'bi-megaphone', title: 'Post or Browse Tenders', desc: 'Publish a tender to receive bids, or browse open tenders from companies across all industries.' },
              { step: '03', icon: 'bi-file-earmark-text', title: 'Submit & Receive Proposals', desc: 'Vendors submit structured proposals with bid amounts; buyers review them in a clear dashboard.' },
              { step: '04', icon: 'bi-patch-check-fill', title: 'Approve & Partner Up', desc: 'Approve the best proposal and start the engagement — its that clean.' },
            ].map((item) => (
              <div key={item.step} className="col-sm-6 col-lg-3">
                <div className="th-step-card">
                  <div className="th-step-number">{item.step}</div>
                  <div className="th-step-icon"><i className={`bi ${item.icon}`} /></div>
                  <h5 className="mb-2">{item.title}</h5>
                  <p className="th-muted mb-0" style={{ fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── FEATURES ──────────────── */}
      <section className="th-section" style={{ background: 'var(--th-surface)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="th-eyebrow mb-2">Everything You Need</div>
            <h2>Built for B2B Procurement</h2>
          </div>
          <div className="row g-4">
            {FEATURES.map((f) => (
              <div key={f.label} className="col-sm-6 col-lg-3">
                <div className="th-feature-card h-100">
                  <div className="th-feature-icon" style={{ background: f.color + '18', color: f.color }}>
                    <i className={`bi ${f.icon}`} />
                  </div>
                  <h5 className="mb-2 mt-3">{f.label}</h5>
                  <p className="th-muted mb-0" style={{ fontSize: '0.9rem' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── INDUSTRIES ──────────────── */}
      <section className="th-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="th-eyebrow mb-2">Sectors</div>
            <h2>Industries We Serve</h2>
          </div>
          <div className="th-industry-grid">
            {INDUSTRIES.map((ind) => (
              <div key={ind} className="th-industry-chip">
                <i className="bi bi-check-circle-fill me-2" style={{ color: 'var(--th-indigo)', fontSize: '0.85rem' }} />
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── TESTIMONIALS ──────────────── */}
      <section className="th-section" style={{ background: 'var(--th-surface)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="th-eyebrow mb-2">Social Proof</div>
            <h2>Trusted by Growing Companies</h2>
          </div>
          <div className="row g-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="col-md-4">
                <div className="th-testimonial-card h-100">
                  <div className="th-quote-icon">"</div>
                  <p className="th-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>{t.quote}</p>
                  <div className="d-flex align-items-center gap-3 mt-auto">
                    <div className="th-avatar th-avatar-sm" style={{ background: 'var(--th-indigo)', color: '#fff' }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="mb-0 fw-semibold" style={{ fontSize: '0.88rem' }}>{t.name}</p>
                      <p className="mb-0 th-muted" style={{ fontSize: '0.78rem' }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── CTA BANNER ──────────────── */}
      <section className="th-cta-section">
        <div className="container text-center">
          <h2 className="text-white mb-3" style={{ fontFamily: 'var(--th-font-display)' }}>Ready to Find Your Next Partner?</h2>
          <p className="mb-5" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto 2rem' }}>
            Join hundreds of companies already using TenderHub to run faster, fairer procurement.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/signup" className="btn btn-light btn-lg px-5 fw-bold" style={{ color: 'var(--th-navy)' }}>
              Get Started Free
            </Link>
            <button className="btn btn-stamp btn-lg px-5" onClick={handleGuest} disabled={guestLoading}>
              {guestLoading ? 'Loading…' : <><i className="bi bi-eye-fill me-2" />Explore as Guest</>}
            </button>
          </div>
        </div>
      </section>

      {/* ──────────────── FOOTER ──────────────── */}
      <footer className="th-footer">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <span className="th-footer-brand">TenderHub</span>
              <span className="th-muted ms-3" style={{ fontSize: '0.85rem' }}>B2B Procurement Made Simple</span>
            </div>
            <div className="d-flex gap-4">
              <Link to="/login" className="th-footer-link">Sign In</Link>
              <Link to="/signup" className="th-footer-link">Register</Link>
              <button onClick={handleGuest} className="th-footer-link bg-transparent border-0 p-0" disabled={guestLoading}>
                Guest Demo
              </button>
            </div>
            <p className="mb-0 th-muted" style={{ fontSize: '0.8rem' }}>© {new Date().getFullYear()} TenderHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ──────────────── LANDING STYLES ──────────────── */}
      <style>{`
        /* --- Hero --- */
        .th-hero {
          background: var(--th-navy);
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 5rem 0 4rem;
        }
        .th-hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .th-hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
        }
        .th-hero-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #4d5fff 0%, transparent 70%);
          top: -150px; left: -100px;
        }
        .th-hero-blob-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #16a974 0%, transparent 70%);
          bottom: -120px; right: -80px;
        }
        .th-hero-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .th-hero-heading {
          font-family: var(--th-font-display);
          font-size: clamp(2rem, 4vw, 3.25rem);
          font-weight: 800;
          line-height: 1.15;
          color: #fff;
          margin-bottom: 0;
        }
        .th-hero-gradient {
          background: linear-gradient(135deg, #a5b4ff 0%, #7ee8d1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .th-hero-sub {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
          max-width: 520px;
        }
        .th-hero-guest-note {
          font-size: 0.83rem;
          color: rgba(255,255,255,0.5);
          margin-top: 0.5rem;
        }
        /* Preview card */
        .th-hero-preview {
          background: var(--th-surface);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06);
          transform: perspective(1200px) rotateY(-4deg) rotateX(2deg);
          transition: transform 0.4s ease;
        }
        .th-hero-preview:hover {
          transform: perspective(1200px) rotateY(-1deg) rotateX(0deg);
        }
        .th-preview-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--th-border);
          padding-bottom: 0.75rem;
        }
        .th-preview-dots {
          display: flex;
          gap: 5px;
        }
        .th-preview-dots span {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #e2e6f0;
          display: block;
        }
        .th-preview-url {
          font-size: 0.75rem;
          color: var(--th-ink-mute);
          background: var(--th-bg);
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid var(--th-border);
        }
        .th-preview-tender {
          background: var(--th-bg);
          border: 1px solid var(--th-border);
          border-radius: var(--th-radius-sm);
          padding: 0.65rem 0.85rem;
        }
        /* Stats */
        .th-stats-bar {
          background: var(--th-surface);
          border-bottom: 1px solid var(--th-border);
          padding: 2.5rem 0;
        }
        .th-stat-num {
          font-family: var(--th-font-display);
          font-size: 2rem;
          font-weight: 800;
          color: var(--th-navy);
          line-height: 1;
        }
        .th-stat-label {
          font-size: 0.85rem;
          color: var(--th-ink-mute);
          margin-top: 0.35rem;
          font-weight: 500;
        }
        /* Steps */
        .th-step-card {
          background: var(--th-surface);
          border: 1px solid var(--th-border);
          border-radius: var(--th-radius);
          padding: 1.75rem 1.5rem;
          position: relative;
          transition: transform 0.18s, box-shadow 0.18s;
          height: 100%;
        }
        .th-step-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--th-shadow-md);
        }
        .th-step-number {
          font-family: var(--th-font-display);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--th-indigo);
          margin-bottom: 0.75rem;
        }
        .th-step-icon {
          font-size: 1.75rem;
          color: var(--th-indigo);
          margin-bottom: 0.75rem;
        }
        /* Features */
        .th-feature-card {
          background: var(--th-surface);
          border: 1px solid var(--th-border);
          border-radius: var(--th-radius);
          padding: 1.75rem 1.5rem;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .th-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--th-shadow-md);
        }
        .th-feature-icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
        }
        /* Industries */
        .th-industry-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          justify-content: center;
        }
        .th-industry-chip {
          background: var(--th-surface);
          border: 1px solid var(--th-border);
          border-radius: 999px;
          padding: 0.5rem 1.1rem;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--th-ink);
          transition: all 0.15s;
          cursor: default;
        }
        .th-industry-chip:hover {
          background: var(--th-indigo);
          color: #fff;
          border-color: var(--th-indigo);
        }
        .th-industry-chip:hover i { color: #fff !important; }
        /* Testimonials */
        .th-testimonial-card {
          background: var(--th-bg);
          border: 1px solid var(--th-border);
          border-radius: var(--th-radius);
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .th-testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--th-shadow-md);
        }
        .th-quote-icon {
          font-size: 4rem;
          line-height: 1;
          font-family: Georgia, serif;
          color: var(--th-indigo);
          opacity: 0.35;
          margin-bottom: -0.5rem;
        }
        /* CTA */
        .th-cta-section {
          background: linear-gradient(135deg, var(--th-navy) 0%, var(--th-navy-700) 50%, #2d1b6b 100%);
          padding: 6rem 0;
        }
        /* Footer */
        .th-footer {
          background: var(--th-navy);
          padding: 2rem 0;
        }
        .th-footer-brand {
          font-family: var(--th-font-display);
          font-weight: 800;
          font-size: 1.15rem;
          color: #fff;
        }
        .th-footer-link {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 0.88rem;
          cursor: pointer;
          transition: color 0.15s;
        }
        .th-footer-link:hover { color: #fff; }
      `}</style>
    </div>
  );
};

export default Landing;
