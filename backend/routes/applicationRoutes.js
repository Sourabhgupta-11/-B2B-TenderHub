const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Tender = require('../models/Tender');
const Company=require('../models/Company.js')
const { jwtAuthMiddleware } = require('./../middleware/auth.js');

// Apply to a tender
router.post('/:tenderId/apply', jwtAuthMiddleware, async (req, res) => {
  try {
    const { proposalText, bidAmount } = req.body;
    const tenderId = req.params.tenderId;

    const tender = await Tender.findById(tenderId);

    if (!tender) return res.status(404).json({ error: 'Tender not found' });
    const userId= req.user.id;

    const company = await Company.findOne({ userId});

    if (!company) {
      return res.status(404).json({ success: false, error: 'Company not found' });
    }
    const application = await Application.create({
      tenderId,
      companyId: company.id,
      proposalText,
      bidAmount
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all applications for a tender 
router.get('/tender/:tenderId', jwtAuthMiddleware, async (req, res) => {
  try {
    const tenderId = req.params.tenderId;

    const applications = await Application.find({ tenderId }).populate('companyId', 'name industry logoUrl');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all applications submitted by the logged-in company
router.get('/my', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId= req.user.id;
    const company = await Company.findOne({ userId});

    if (!company) {
      return res.status(404).json({ success: false, error: 'Company not found' });
    }
    const applications = await Application.find({ companyId: company.id}).populate('tenderId', 'title deadline');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get applications received for tenders created by logged-in company
router.get('/received', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId= req.user.id;
    const company = await Company.findOne({ userId});
    if (!company) {
      return res.status(404).json({ success: false, error: 'Company not found' });
    }

    const myTenders = await Tender.find({ createdBy: company.id }).select('_id');
    const tenderIds = myTenders.map(t => t._id);

    const apps = await Application.find({ tenderId: { $in: tenderIds } })
      .populate('companyId', 'name industry')
      .populate('tenderId', 'title');

    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
