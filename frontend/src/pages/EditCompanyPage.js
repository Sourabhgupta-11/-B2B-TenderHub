import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const EditCompanyPage = () => {
  const [form, setForm] = useState({
    name: '', industry: '', description: '', products: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data } = await axios.get('/company/me');
        setCompanyId(data._id);
        setForm({
          name: data.name || '',
          industry: data.industry || '',
          description: data.description || '',
          products: (data.products || []).join(', ')
        });
      } catch {
        alert('Failed to load company data.');
      }
    };
    fetchCompany();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('industry', form.industry);
      formData.append('description', form.description);
      formData.append('products', JSON.stringify(form.products.split(',').map(p => p.trim())));
      if (logoFile) formData.append('logo', logoFile);

      await axios.put(`/company/${companyId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Company updated successfully');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Update failed');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-primary mb-4">Edit Company Profile</h3>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        {['name', 'industry', 'description', 'products'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            {field === 'description' ? (
              <textarea
                name={field}
                className="form-control"
                value={form[field]}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                name={field}
                className="form-control"
                value={form[field]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        {/* File Upload */}
        <div className="mb-3">
          <label className="form-label">Upload New Logo</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleLogoChange} />
        </div>

        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default EditCompanyPage;
