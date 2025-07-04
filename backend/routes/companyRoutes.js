const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const { upload } = require('../utils/cloudinary');
const { jwtAuthMiddleware } = require('./../middleware/auth.js');

// Create a company profile
router.post('/create', jwtAuthMiddleware, upload.single('logo'), async (req, res) => {
  try {
    const { name, industry, description, products } = req.body;
    const logoUrl = req.file?.path;

    const newCompany = await Company.create({
      name,
      industry,
      description,
      products: products,
      logoUrl,
      userId: req.user.id
    });

    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/me', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId= req.user.id;


    const company = await Company.findOne({ userId}).populate('userId', 'email');

    if (!company) {
      return res.status(404).json({ success: false, error: 'Company not found' });
    }

    res.json({
      success: true,
      _id: company._id,
      name: company.name,
      email: company.userId.email,
      industry: company.industry,
      description: company.description,
      products: company.products,
      logoUrl: company.logoUrl
    });
  } catch (err) {
    console.error('Error in /me:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});
// Get all companies
router.get('/', async (req, res) => {
  try {
    const { name, industry, products } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (industry) filter.industry = new RegExp(industry, 'i');
    if (products) filter.products = { $in: [new RegExp(products, 'i')] };

    const companies = await Company.find(filter);
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a company
router.put('/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const updated = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true });
    if (!updated) return res.status(404).json({ error: 'Company not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a company
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
  try {
    const deleted = await Company.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Company not found' });
    res.json({ message: 'Company deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
