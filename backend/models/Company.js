const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  industry: String,
  description: String,
  products: [String],
  logoUrl: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Company', companySchema);