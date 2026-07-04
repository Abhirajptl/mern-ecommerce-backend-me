const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {

    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;

    const cart = await Cart.find({
      user: req.user,
    }).populate("product");

    if (cart.length === 0) {
      return res.status(400).json({
        message: "Cart is Empty",
      });
    }

    let totalAmount = 0;

    const products = cart.map((item) => {

      totalAmount +=
        item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
      };

    });

    const order = await Order.create({

      user: req.user,

      products,

      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
      },

      totalAmount,

    });

    await Cart.deleteMany({
      user: req.user,
    });

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user,
    })
      .populate("products.product")
      .sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product")
      .sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const updateOrderStatus = async (req, res) => {
    try {

        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order Not Found"
            });
        }

        order.status = status;

        await order.save();

        res.json({
            message: "Order Status Updated",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};