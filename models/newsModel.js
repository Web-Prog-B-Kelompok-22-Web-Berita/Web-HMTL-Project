const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  category: String,
});

module.exports = mongoose.model("news", newsSchema);

