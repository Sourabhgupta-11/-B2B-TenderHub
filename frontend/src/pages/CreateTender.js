import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const CreateTenderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    budget: ''
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      await axios.post('/tender/create', formData);
      setSuccessMsg('Tender created successfully!');
      setFormData({ title: '', description: '', deadline: '', budget: '' });

      setTimeout(() => navigate('/tenders'), 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create tender.');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-primary mb-4">Create New Tender</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="card shadow-sm p-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            className="form-control"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Budget (₹)</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Tender</button>
      </form>
    </div>
  );
};

export default CreateTenderPage;
