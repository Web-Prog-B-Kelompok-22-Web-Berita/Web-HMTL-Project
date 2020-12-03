const express = require("express");
const router = express.Router();
const newsModel = require("../models/newsModel.js");

const categoryList = {
    'hype' : 'Hype',
    'seleb' : 'Selebriti',

}

// hype : hype
// Link nya : nama category nya



router.get("/", async (req, res) => {
  res.render("pages/Home");
});

router.get("/genre/:category", async (req, res) => {
  const newsParams = req.params.category;
  console.log(newsParams)
  const news = await newsModel.find({ category: newsParams });

  res.render("pages/Genre", {news : news, categoryName : categoryList[newsParams]});
});

router.get("/berita", async (req, res) => {
  res.render("pages/Berita");
});

module.exports = router;
