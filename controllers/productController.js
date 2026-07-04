const Product = require('../models/Product');

const createProduct = async(req,res) => {
    try {
        const { title, price, category, stock, image } = req.body;

        const product = await Product.create({
            title,
            price,
            category,
            stock,
            image
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getProducts = async (req, res) => {
  try {

    // console.log(req.query);

    const {
      search,
      category,
      minPrice,
      maxPrice,
      sortBy,
      page,
      limit
    } = req.query;

    let query = {};

    // SEARCH

    if (search && search.trim() !== "") {

      query.$or = [

        {
          title: {
            $regex: search,
            $options: "i"
          }
        },

        {
          category: {
            $regex: search,
            $options: "i"
          }
        }

      ];
    }

    // CATEGORY FILTER

    if (
      category &&
      category.trim() !== ""
    ) {

      query.category = {
        $regex: category,
        $options: "i"
      };
    }

    // PRICE FILTER

    if (
      (minPrice &&
        minPrice.trim() !== "") ||

      (maxPrice &&
        maxPrice.trim() !== "")
    ) {

      query.price = {};

      // MIN PRICE

      if (
        minPrice &&
        minPrice.trim() !== ""
      ) {

        query.price.$gte =
          parseInt(minPrice);
      }

      // MAX PRICE

      if (
        maxPrice &&
        maxPrice.trim() !== ""
      ) {

        query.price.$lte =
          parseInt(maxPrice);
      }
    }

    // SORTING

    let sortOption = {};

    if (sortBy === "priceLowHigh") {
      sortOption.price = 1;
    }

    else if (
      sortBy === "priceHighLow"
    ) {
      sortOption.price = -1;
    }

    else if (sortBy === "titleAZ") {
      sortOption.title = 1;
    }

    else if (sortBy === "titleZA") {
      sortOption.title = -1;
    }

    // console.log(query);

    // console.log(sortOption);

    // PAGINATION
    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(limit) || 10;
    const skip = (currentPage - 1) * perPage;


    const products =
      await Product.find(query)
      .sort(sortOption).skip(skip).limit(perPage);

    const totalProducts = await Product.countDocuments(query)

    const totalPages = Math.ceil(totalProducts / perPage);

    res.json({
        products,
        currentPage,
        totalPages,
        totalProducts
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};


const deleteProduct = async(req,res)  => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({message : "Product Deleted"})
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { createProduct, getProducts, deleteProduct }






