import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const INDUSTRIES = [
  'Logistics & Supply Chain', 'Construction & Infrastructure', 'Renewable Energy',
  'Information Technology', 'Textiles & Apparel', 'Healthcare & Pharma',
  'Agriculture & Food Processing', 'Finance & Consulting', 'Industrial Manufacturing', 'Other',
];

const CreateCompanyPage = () => {
  const [formData, setFormData] = useState({ name: '', industry: '', description: '', products: '', logo: null });
  const [preview, setPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      const file = files[0];
      setFormData({ ...formData, logo: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    const form = new FormData();
    form.append('name', formData.name);
    form.append('industry', formData.industry);
    form.append('description', formData.description);
    form.append('products', formData.products);
    if (formData.logo) form.append('logo', formData.logo);
    try {
      const res = await axios.post('/company/create', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data && res.data._id) navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to create company. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="th-page" style={{ minHeight: '100vh', background: 'var(--th-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: 600 }}>
        <div className="text-center mb-4">
          <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#4d5fff,#3a46d6)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.4rem', margin: '0 auto 1rem' }}>
            <i className="bi bi-building-add" />
          </div>
          <h2 style={{ fontFamily: 'var(--th-font-display)' }}>Set Up Your Company</h2>
          <p className="th-muted" style={{ fontSize: '0.93rem' }}>This is your public profile. Vendors and buyers will see this when they review your tenders or bids.</p>
        </div>

        <div className="card p-4">
          {errorMsg && (
            <div className="alert alert-danger d-flex align-items-center gap-2 mb-3" style={{ fontSize: '0.88rem' }}>
              <i className="bi bi-exclamation-circle-fill" />{errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Company Name <span className="text-danger">*</span></label>
              <input type="text" name="name" className="form-control" placeholder="e.g. Apex Solutions Pvt. Ltd." value={formData.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Industry <span className="text-danger">*</span></label>
              <select name="industry" className="form-select" value={formData.industry} onChange={handleChange} required>
                <option value="">Select your industry…</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Company Description <span className="text-danger">*</span></label>
              <textarea name="description" className="form-control" rows={3} placeholder="Briefly describe what your company does and who it serves…" value={formData.description} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Products / Services <span className="text-danger">*</span></label>
              <input type="text" name="products" className="form-control" placeholder="e.g. Freight Forwarding, Warehousing, Fleet Management" value={formData.products} onChange={handleChange} required />
              <div className="form-text">Comma-separated list</div>
            </div>

            <div className="mb-4">
              <label className="form-label">Company Logo <span className="th-muted" style={{ fontWeight: 400 }}>(optional)</span></label>
              {preview && <img src={preview} alt="Preview" style={{ height: 64, objectFit: 'contain', borderRadius: 8, border: '1px solid var(--th-border)', marginBottom: '0.5rem', display: 'block' }} />}
              <input type="file" name="logo" className="form-control" accept="image/*" onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading} style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2" />Creating…</> : <><i className="bi bi-building-check me-2" />Create Company Profile</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyPage;
