const express = require('express');
const router = express.Router();
const Tender = require('../models/Tender');
const { jwtAuthMiddleware } = require('./../middleware/auth.js');

// Create a new tender
router.post('/create', jwtAuthMiddleware, async (req, res) => {
  try {
    const { title, description, deadline, budget } = req.body;

    const newTender = await Tender.create({
      title,
      description,
      deadline,
      budget,
      createdBy: req.user.id
    });

    res.status(201).json(newTender);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tenders that is paginated
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await Tender.countDocuments();
    const tenders = await Tender.find()
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

// Get tenders created by the logged-in company
router.get('/myTender', jwtAuthMiddleware, async (req, res) => {
  try {
    const tenders = await Tender.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single tender by ID
router.get('/:id', async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ error: 'Tender not found' });
    res.json(tender);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update tender
router.put('/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const updated = await Tender.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Tender not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete tender
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const deleted = await Tender.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Tender not found' });
    res.json({ message: 'Tender deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
