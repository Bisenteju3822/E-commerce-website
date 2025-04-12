const AdminModel = require("../Model/adminModel");
const ProductModel = require("../Model/productModel");
const OrderModel = require("../Model/orderModel");

const adminLogin = async (req, res) => {
  const { adminid, password } = req.body;
  console.log(req.body)
  try {
    const Admin = await AdminModel.findOne({ adminid: adminid });
    if (!Admin) {
      res.status(404).send({ msg: "Invalid Admin Id!" });
    }
    if (Admin.password != password) {
      res.status(404).send({ msg: "Invalid Password!" });
    }
    res.status(200).send({ msg: "You are Succesfully Login", Admin: Admin });
  } catch (error) {
    console.log(error);
  }
}


const addProduct = async (req, res) => {
  console.log(req.files);
  try {
    console.log(req.files);

    const imageUrls = req.files.map((file) => file.path); // Map file paths
    const { title, description, genre, platform, price } = req.body; // Destructure request body

    // Create the product with correct property mappings
    const Product = await ProductModel.create({
      title: title,
      description: description,
      genre: genre,
      platform: platform,
      price: price,
      defaultImage: imageUrls[0],
      images: imageUrls,
    })
    res.status(200).send("PRoduct Succesfully save!!!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}


const showProduct = async (req, res) => {
  const Product = await ProductModel.find();
  res.status(200).send(Product);
}
const getOrder = async (req, res) => {
  const Order = await OrderModel.find();
  res.status(200).send(Order);
}
const updateProduct = async (req, res) => {
  const { id } = req.params; // Product ID from request parameters
  const { title, description, genre, platform, price } = req.body; // Updated fields

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { title, description, genre, platform, price },
      { new: true } // Return the updated document
    );
    if (!updatedProduct) {
      return res.status(404).send({ msg: "Product Not Found!" });
    }
    res.status(200).send({ msg: "Product Successfully Updated!", Product: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params; // Product ID from request parameters

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send({ msg: "Product Not Found!" });
    }
    res.status(200).send({ msg: "Product Successfully Deleted!", Product: deletedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};



module.exports = {
  adminLogin,
  addProduct,
  showProduct,
  getOrder,
  updateProduct,
  deleteProduct,
}