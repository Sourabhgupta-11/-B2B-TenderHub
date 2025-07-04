const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  budget: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required:true}
},{timestamps:true});

module.exports = mongoose.model('Tender', tenderSchema);
