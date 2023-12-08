const mongoose = require("mongoose");

const classesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("classes", classesSchema);
