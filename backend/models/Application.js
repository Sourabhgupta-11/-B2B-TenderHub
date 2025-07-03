const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  proposalText: String,
  tenderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender' },
  applicantCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Application', applicationSchema);
