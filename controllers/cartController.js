const Cart = require('../models/Cart');

const addToCart = async (req,res) =>{
    try {

        // console.log("USER:", req.user);
        // console.log("BODY:", req.body);
        const { productId } = req.body;

        const userId = req.user;

        const exists = await Cart.findOne({
            user : userId,
            product : productId
        })

        if(exists){
            exists.quantity += 1;
            await exists.save();
            return res.json(exists)
        }

        const cart = await Cart.create({
            user : userId,
            product : productId,
            quantity : 1
        })

        res.json(cart)

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getCart = async (req,res) => {
    try {
        const cart = await Cart.find({
            user : req.user
        }).populate('product')

        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const removeFromCart = async (req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({message : "Item Removed"})
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
} 

const updateQuantity = async (req, res) => {
    try {

        const { action } = req.body;

        const cart = await Cart.findById(req.params.id);

        if (!cart) {
            return res.status(404).json({
                message: "Cart Item Not Found"
            });
        }

        if (action === "increase") {
            cart.quantity += 1;
        }

        if (action === "decrease") {

            if (cart.quantity > 1) {
                cart.quantity -= 1;
            } else {
                await Cart.findByIdAndDelete(req.params.id);

                return res.json({
                    message: "Item Removed"
                });
            }

        }

        await cart.save();

        res.json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity
};
