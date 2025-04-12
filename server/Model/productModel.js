const mongoose = require("mongoose");

const gamingProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  description: {
    type: String,
    required: true,
    maxlength: 500, // Limit description length
  },
  genre: {
    type: String,
    required: true,
    enum: ["Action", "RPG", "Shooter", "Adventure", "Puzzle", "Sports"], // Restrict to valid genres
  },
  platform: {
    type: [String],
    required: true,
    enum: ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile"], // Support multi-platform
  },
  price: {
    type: Number,
    required: true,
    min: 0, // No negative pricing
  },
  defaultImage: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },

})

module.exports = mongoose.model("GamingProduct", gamingProductSchema);