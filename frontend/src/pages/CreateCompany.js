import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const CreateCompanyPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    description: '',
    products: '',
    logo: null,
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const form = new FormData();
    form.append('name', formData.name);
    form.append('industry', formData.industry);
    form.append('description', formData.description);
    form.append('products', formData.products); // comma-separated
    if (formData.logo) form.append('logo', formData.logo);

    try {
      const res = await axios.post('/company/create', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data && res.data._id) {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to create company');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 className="mb-4 text-center">Create Your Company Profile</h3>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Industry</label>
            <input
              type="text"
              name="industry"
              className="form-control"
              value={formData.industry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Products (comma separated)</label>
            <input
              type="text"
              name="products"
              className="form-control"
              value={formData.products}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Company Logo</label>
            <input
              type="file"
              name="logo"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Create Company</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompanyPage;
