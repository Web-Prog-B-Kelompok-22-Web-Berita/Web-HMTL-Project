const express = require("express");
const router = express.Router();
const newsModel = require("../models/newsModel.js");
const moment = require("moment");


const categoryList = {
  hype: "Hype",
  seleb: "Selebriti",
  film: "Film",
};

// hype : hype
// Link nya : nama category nya

router.get("/", async (req, res) => {
  res.render("pages/Home");
});

router.get("/genre/:category", async (req, res) => {
  const newsParams = req.params.category;
  console.log(newsParams);
  const news = await newsModel.find({ category: newsParams });

  res.render("pages/Genre", {
    news: news,
    categoryName: categoryList[newsParams],
  });
});

router.get("/news/:idberita", async (req, res) => {
  try {
    const idberita = req.params.idberita;
    const news = await newsModel.findById(idberita);
    res.render("pages/Berita", { news: news, moment : moment });
  } catch (error) {
    res.json({message : error.message})
  }

});

//search
router.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.keyword
        const news = await newsModel.find({ title: { $regex: searchQuery, $options: 'i' } });
        res.render("pages/Search", {
            searchNews: news,
        });
    } catch (error) {
        res.json({ message: error.message })
    }
});

// api

router.post('/api/news', async (req,res) => {
  try {
    data = new newsModel(req.body)
    newNews = await data.save()
    if (!newNews) throw new Error("Something went wrong");
    res.status(200).json(newNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})




module.exports = router;
