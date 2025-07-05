const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  proposalText: String,
  bidAmount: {type:String, required:true},
  tenderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender' },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Application', applicationSchema);
