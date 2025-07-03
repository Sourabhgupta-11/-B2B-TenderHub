const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  budget: Number,
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Tender', tenderSchema);
