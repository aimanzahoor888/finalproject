// routes/negotiationRoutes.js

import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../Models/ProductModel.js';
import Negotiation from '../Models/NegotiationModel.js';
import { protect } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/initiate', protect, asyncHandler(async (req, res) => {
    const { productId, initialPrice } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    const negotiation = await Negotiation.create({
        productId,
        buyerId: req.user._id,
        sellerId: product.user,
        initialPrice,
        status: 'pending'
    });

    product.negotiation = {
        buyerId: req.user._id,
        status: 'pending',
        initialPrice,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
    await product.save();

    res.status(201).json(negotiation);
}));

router.get('/seller', protect, asyncHandler(async (req, res) => {
    const negotiations = await Negotiation.find({ sellerId: req.user._id }).populate('productId', 'name price').populate('buyerId', 'name email');

    if (!negotiations) {
        res.status(404);
        throw new Error('Negotiations not found');
    }

    res.json(negotiations);
}));

// Get buyer negotiations
router.get('/buyer', protect, asyncHandler(async (req, res) => {
  const negotiations = await Negotiation.find({ buyerId: req.user._id }).populate('productId', 'name price').populate('sellerId', 'name email');

  if (!negotiations) {
    res.status(404);
    throw new Error('Negotiations not found');
  }

  res.json(negotiations);
}));

// Respond to a negotiation (accept, reject, or counter)
router.put('/respond/:id', protect, asyncHandler(async (req, res) => {
  const { status, counterPrice } = req.body;
  const negotiation = await Negotiation.findById(req.params.id);

  if (!negotiation) {
      res.status(404);
      throw new Error('Negotiation not found');
  }

  // Ensure only the seller can respond to the negotiation
  /*  if (req.user._id.toString() !== negotiation.sellerId.toString()) {
        res.status(401);
        throw new Error('Not authorized to respond to this negotiation');
    }*/
  negotiation.status = status;
  negotiation.counterPrice = counterPrice;
  negotiation.updatedAt = Date.now();

  if (status === 'accepted') {
      negotiation.finalPrice = counterPrice || negotiation.initialPrice;
  }

  await negotiation.save();

  const product = await Product.findById(negotiation.productId);
  product.negotiation.status = status;
  product.negotiation.counterPrice = counterPrice;
  product.negotiation.updatedAt = Date.now();
  if (status === 'accepted') {
      product.price = negotiation.finalPrice;
  }
  await product.save();

 // io.emit('negotiationUpdate', negotiation); // Emit the update event

  res.status(200).json(negotiation);
}));

// Get negotiation details
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const negotiation = await Negotiation.findById(req.params.id)
    .populate('productId', 'name price')
    .populate('buyerId', 'name email')
    .populate('sellerId', 'name email');

  if (!negotiation) {
    res.status(404);
    throw new Error('Negotiation not found');
  }

  res.json(negotiation);
}));

export default router;
