import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import Product from "../Models/ProductModel.js";
import User from "../Models/UserModel.js";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import asyncHandler from "express-async-handler";
import Order from "./../Models/OrderModel.js";
import { checkAndAssignTrustedBadge } from "../utils/Utils.js";

const productRoute = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({ storage });


productRoute.get(
  '/recommendations',
  protect,
  asyncHandler(async (req, res) => {
    try {
      // Example recommendation logic: Get the last 10 products added to the collection
      const recommendedProducts = await Product.find({ status: 'active' }).populate('user', 'banned').limit(6);

      res.json(recommendedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  })
);

// GET ALL PRODUCT
productRoute.get(
  '/',
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    // Extract filters from query parameters
    const { category, priceRange, trustedSeller } = req.query;
    const [minPrice, maxPrice] = priceRange ? priceRange.split('-').map(Number) : [null, null];

    let filter = { ...keyword, status: 'active' };

    if (category) {
      filter.category = category;
    }
    if (minPrice !== null && maxPrice !== null) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (trustedSeller === 'true') {
      const trustedSellers = await User.find({ isTrustedSeller: true }).select('_id');
      filter.user = { $in: trustedSellers };
    }

    const count = await Product.countDocuments({ ...filter });
    const products = await Product.find({ ...filter })
      .populate('user', 'name email isTrustedSeller')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);


// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PAGINATION
productRoute.get(
  "/all",
  protect,
  //admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('user', 'name email isTrustedSeller');
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// PRODUCT REVIEW
productRoute.post(
  '/:id/review',
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id).populate('user', 'name');

    if (product) {
      const orders = await Order.find({ user: req.user._id });
      const orderedProduct = orders.some(order =>
        order.orderItems.some(item => item.product.toString() === product._id.toString() && !item.isReviewed)
      );

      if (!orderedProduct) {
        res.status(400);
        throw new Error('You can only review products you have purchased and not yet reviewed');
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();

      // Mark the product as reviewed in the order
      await Order.updateOne(
        { user: req.user._id, "orderItems.product": product._id },
        { $set: { "orderItems.$.isReviewed": true } }
      );

      // Check and assign trusted seller badge
      await checkAndAssignTrustedBadge(product.user._id);

      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

// FETCH SELLER REVIEWS
productRoute.get(
  '/seller/:sellerId/reviews',
  asyncHandler(async (req, res) => {
    const { sellerId } = req.params;
    const products = await Product.find({ user: sellerId });
    let reviews = [];
    products.forEach(product => {
      reviews = reviews.concat(product.reviews);
    });
    res.json(reviews);
  })
);

// DELETE PRODUCT
productRoute.delete(
  "/:id",
  protect,
 // admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// CREATE PRODUCT
productRoute.post('/', protect, asyncHandler(async (req, res) => {
  const { name, price, description, countInStock, image, category, type, size, color, author, publicationYear, pageCount, quality } = req.body;

  try {
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    const product = new Product({
      name,
      price,
      description,
      image,
      countInStock,
      category,
      type,
      size,
      color,
      author,
      publicationYear,
      pageCount,
      quality,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json({ message: 'Product uploaded successfully', product: createdProduct });
  } catch (error) {
    console.error('Error creating product:', error);  // Add detailed logging
    res.status(500).json({ message: 'Failed to upload product', error: error.message });
  }
}));

// UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const { 
      name, price, description, image, countInStock, 
      category, type, size, color, author, 
      publicationYear, pageCount, quality 
    } = req.body;
    
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.type = type || product.type;
      product.size = size || product.size;
      product.color = color || product.color;
      product.author = author || product.author;
      product.publicationYear = publicationYear || product.publicationYear;
      product.pageCount = pageCount || product.pageCount;
      product.quality = quality || product.quality;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);


// Disable product
productRoute.put(
  "/disable/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.status = 'inactive';
      await product.save();
      res.json({ message: "Product disabled" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// Enable product
productRoute.put(
  "/enable/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.status = 'active';
      await product.save();
      res.json({ message: "Product enabled" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);


export default productRoute;