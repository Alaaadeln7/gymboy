const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("plan", planSchema);
