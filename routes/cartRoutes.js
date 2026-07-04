const express = require('express');

const router = express.Router();

const protect = require('../middleware/authMiddleware');

const { addToCart, getCart, removeFromCart, updateQuantity } = require('../controllers/cartController');

router.post('/', protect, addToCart);

router.get('/', protect, getCart);

router.delete('/:id', protect, removeFromCart);

router.patch('/:id', protect, updateQuantity);

module.exports = router;