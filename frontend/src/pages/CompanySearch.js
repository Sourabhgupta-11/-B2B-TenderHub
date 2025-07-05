import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const CompanySearchPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('/company');
      setCompanies(res.data || []);
      setFiltered(res.data || []);
    } catch (err) {
      setError('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const result = companies.filter((c) => {
      if (searchField === 'name') return c.name?.toLowerCase().includes(term);
      if (searchField === 'industry') return c.industry?.toLowerCase().includes(term);
      if (searchField === 'products') return c.products?.some(p => p.toLowerCase().includes(term));
      return false;
    });

    setFiltered(result);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-primary mb-4 fw-bold">Explore Companies</h3>

      <div className="row mb-4 g-2 align-items-center">
        <div className="col-md-3">
          <select
            className="form-select"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="name">Search by Name</option>
            <option value="industry">Search by Industry</option>
            <option value="products">Search by Product/Service</option>
          </select>
        </div>

        <div className="col-md-9">
          <input
            type="text"
            placeholder={`Search companies by ${searchField}`}
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && filtered.length === 0 && (
        <p className="text-muted">No companies found matching your search.</p>
      )}

      <div className="row g-4">
        {filtered.map((company) => (
          <div className="col-md-6" key={company._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">{company.name}</h5>
                <p className="mb-2"><strong>Industry:</strong> {company.industry}</p>
                <p className="mb-2"><strong>Email:</strong> {company.userId.email}</p>
                <p><strong>Description:</strong> {company.description}</p>
                <div>
                  <strong>Products/Services:</strong>{' '}
                  {company.products?.length ? (
                    <ul className="mb-0 mt-1 ps-3">
                      {company.products.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted ms-2">Not listed</span>
                  )}
                </div>
                {company.logoUrl && (
                  <div className="mt-3 text-center">
                    <img
                      src={company.logoUrl}
                      alt="Logo"
                      className="img-fluid rounded border"
                      style={{ maxHeight: '100px' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanySearchPage;
