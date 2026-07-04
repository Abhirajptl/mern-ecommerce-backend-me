const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    category: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },
    
    image: {
    type: String,
    default: "",
  },

},
  {timestamps : true}
) 

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;