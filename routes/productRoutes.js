const express = require("express");
const router = express.Router();
const { getProducts, createProduct, deleteProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


router.post('/' ,protect,adminOnly, createProduct);
router.get('/', protect, getProducts);
router.delete('/:id', protect,adminOnly, deleteProduct);
router.put('/:id', protect,adminOnly, deleteProduct);

module.exports = router;