import React from 'react';

const TenderCard = ({tender,showApply = false,onApply,showEditDelete = false,onEdit,onDelete,}) => {
  
  const {title,description,deadline,budget,createdBy,} = tender;

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-header bg-light">
        <h6 className="mb-0 text-muted">
          <i className="bi bi-building me-2"></i>
          Published by: <strong>{createdBy?.name || 'Unknown Company'}</strong>
        </h6>
      </div>

      <div className="card-body">
        <h5 className="card-title text-primary mb-3">{title}</h5>
        <p className="card-text text-muted">{description}</p>

        <hr />

        <dl className="row small mb-3">
          <dt className="col-sm-4 fw-semibold fs-6">📅 Deadline</dt>
          <dd className="col-sm-8 fs-6">{new Date(deadline).toLocaleDateString()}</dd>

          <dt className="col-sm-4 fw-semibold fs-6">💰 Budget</dt>
          <dd className="col-sm-8 fs-6">₹{budget}</dd>
        </dl>

        <div className="d-flex justify-content-end gap-2">
          {showApply && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => onApply(tender._id)}
            >
              <i className="bi bi-send-check-fill me-1"></i>Apply
            </button>
          )}

          {showEditDelete && (
            <>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => onEdit(tender)}
              >
                <i className="bi bi-pencil-square me-1"></i>Edit
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(tender._id)}
              >
                <i className="bi bi-trash3-fill me-1"></i>Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenderCard;
