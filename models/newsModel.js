const mongoose = require("mongoose");
var random = require('mongoose-simple-random');


const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  headline : Boolean,
  img: {
    type: String,
    required: true,
  },
  text: [
    {
      type: String,
      required: true,
    },
  ],
  category: String,
  comment : [{
    username : {
    type : String
    },
    text : String,
    commentDate :  {
    type : Date
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
);

newsSchema.plugin(random)

module.exports = mongoose.model("news", newsSchema);
