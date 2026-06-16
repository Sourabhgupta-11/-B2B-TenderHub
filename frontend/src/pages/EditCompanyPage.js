import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import GuestBanner from '../components/GuestBanner';

const INDUSTRIES = [
  'Logistics & Supply Chain', 'Construction & Infrastructure', 'Renewable Energy',
  'Information Technology', 'Textiles & Apparel', 'Healthcare & Pharma',
  'Agriculture & Food Processing', 'Finance & Consulting', 'Industrial Manufacturing', 'Other',
];

const EditCompanyPage = () => {
  const [form, setForm] = useState({ name: '', industry: '', description: '', products: '' });
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/company/me');
        setCompanyId(data._id);
        setForm({ name: data.name || '', industry: data.industry || '', description: data.description || '', products: (data.products || []).join(', ') });
        if (data.logoUrl) setPreview(data.logoUrl);
      } catch {
        setError('Failed to load company data.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('industry', form.industry);
      formData.append('description', form.description);
      formData.append('products', JSON.stringify(form.products.split(',').map(p => p.trim()).filter(Boolean)));
      if (logoFile) formData.append('logo', logoFile);
      await axios.put(`/company/${companyId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container" style={{ paddingTop: 80 }}><div className="th-loading"><div className="th-spinner" /><span>Loading…</span></div></div>;

  return (
    <div className="th-page container" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <GuestBanner />
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div className="mb-4">
          <p className="th-eyebrow mb-1">Company Settings</p>
          <h2 className="mb-0">Edit Company Profile</h2>
        </div>

        {error && <div className="alert alert-danger d-flex align-items-center gap-2 mb-3" style={{ fontSize: '0.88rem' }}><i className="bi bi-exclamation-circle-fill" />{error}</div>}

        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Industry</label>
              <select name="industry" className="form-select" value={form.industry} onChange={handleChange} required>
                <option value="">Select industry…</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-control" rows={3} value={form.description} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Products / Services</label>
              <input type="text" name="products" className="form-control" placeholder="Comma-separated list" value={form.products} onChange={handleChange} />
              <div className="form-text">Separate each service with a comma</div>
            </div>
            <div className="mb-4">
              <label className="form-label">Company Logo</label>
              {preview && <img src={preview} alt="Preview" style={{ height: 60, objectFit: 'contain', borderRadius: 8, border: '1px solid var(--th-border)', marginBottom: '0.5rem', display: 'block' }} />}
              <input type="file" className="form-control" accept="image/*" onChange={handleLogoChange} />
            </div>
            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-primary px-4" disabled={saving}>
                {saving ? <><span className="spinner-border spinner-border-sm me-2" />Saving…</> : <><i className="bi bi-check-circle-fill me-1" />Save Changes</>}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyPage;
