const express = require('express');
const router = express.Router();
const Tender = require('../models/Tender');
const Company = require('../models/Company');
const { jwtAuthMiddleware } = require('../middleware/auth');

// Create a new tender
router.post('/create', jwtAuthMiddleware, async (req, res) => {
  try {
    const { title, description, deadline, budget } = req.body;

    const company = await Company.findOne({ userId: req.user.id });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const newTender = await Tender.create({
      title,
      description,
      deadline,
      budget,
      createdBy: company._id,
    });

    res.status(201).json(newTender);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get tenders created by the logged-in company
router.get('/myTender', jwtAuthMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.id });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const tenders = await Tender.find({ createdBy: company._id }).populate('createdBy','name').sort({ createdAt: -1 });
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tenders (paginated)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await Tender.countDocuments();
    const tenders = await Tender.find()
      .populate('createdBy', 'name industry') // optional: show who created it
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      tenders
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tenders created by other companies (excluding the current user's company)
router.get('/others', jwtAuthMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    
    const company = await Company.findOne({ userId: currentUserId });
    if (!company) {
      return res.status(404).json({ success: false, error: 'Company not found' });
    }

    const tenders = await Tender.find({ createdBy: { $ne: company._id } })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name');

    res.json(tenders);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single tender by ID
router.get('/:id', async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id).populate('createdBy', 'name');
    if (!tender) return res.status(404).json({ error: 'Tender not found' });
    res.json(tender);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update tender
router.put('/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.id });
    if (!company) return res.status(404).json({ error: 'Company not found' });

    const tender = await Tender.findOneAndUpdate(
      { _id: req.params.id, createdBy: company._id },
      req.body,
      { new: true }
    );

    if (!tender) return res.status(404).json({ error: 'Tender not found or not authorized' });

    res.json(tender);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete tender
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.id });
    if (!company) return res.status(404).json({ error: 'Company not found' });

    const tender = await Tender.findOneAndDelete({ _id: req.params.id, createdBy: company._id });

    if (!tender) return res.status(404).json({ error: 'Tender not found or not authorized' });

    res.json({ message: 'Tender deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
