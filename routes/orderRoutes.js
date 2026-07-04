const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", protect, placeOrder);

router.get("/", protect, getMyOrders);

// Admin Routes
router.get("/admin", protect, adminOnly, getAllOrders);

router.patch("/:id", protect, updateOrderStatus);

module.exports = router;