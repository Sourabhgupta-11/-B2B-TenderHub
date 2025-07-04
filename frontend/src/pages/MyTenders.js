import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import TenderCard from '../components/TenderCard'; 

const MyTendersPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({title: '',description: '',deadline: '',budget: ''});

  const fetchTenders = async () => {                    //fetch all tenders
    try {
      const res = await axios.get('/tender/myTender');
      setTenders(res.data || []);
    } catch (err) {
      setErrorMsg('Failed to fetch tenders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  const handleEditClick = (tender) => {                  //handle edit button
    setEditingId(tender._id);
    setFormData({
      title: tender.title,
      description: tender.description,
      deadline: tender.deadline?.slice(0, 10),
      budget: tender.budget
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id) => {                 //handle delete button
    if (window.confirm('Are you sure you want to delete this tender?')) {
      try {
        await axios.delete(`/tender/${id}`);
        fetchTenders();
      } catch (err) {
        alert('Failed to delete tender.');
      }
    }
  };

  const handleChange = (e) => {                         //if there is any change in form it is handles here
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {                   //after edit update button shows up it is handles here
    e.preventDefault();
    try {
      await axios.put(`/tender/${editingId}`, formData);
      setEditingId(null);
      setFormData({ title: '', description: '', deadline: '', budget: '' });
      fetchTenders();
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleCancelEdit = () => {                     //after edit cancel button also shows up it is handled here
    setEditingId(null);
    setFormData({ title: '', description: '', deadline: '', budget: '' });
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-primary">My Tenders</h3>

{/*----------------------------------------works only if edit button clicked-----------------------------------*/ }
      {editingId && (                                  
        <form onSubmit={handleUpdate} className="card shadow-sm p-4 mb-4">
          <h5 className="text-secondary mb-3">Edit Tender</h5>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" name="title" value={formData.title} className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" value={formData.description} className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Deadline</label>
            <input type="date" name="deadline" value={formData.deadline} className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Budget (₹)</label>
            <input type="number" name="budget" value={formData.budget} className="form-control" onChange={handleChange} required />
          </div>
          <div className="d-flex gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
          </div>
        </form>
      )}
{/*--------------------------------------------------------------------------------------------------------------*/ }

      {loading && <p>Loading...</p>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {!loading && tenders.length === 0 && <p className="text-muted">No tenders found.</p>}

      <div className="row g-4">
        {tenders.map((tender) => (
          <div className="col-md-6" key={tender._id}>
            <TenderCard
              tender={tender}
              showEditDelete={true}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTendersPage;
