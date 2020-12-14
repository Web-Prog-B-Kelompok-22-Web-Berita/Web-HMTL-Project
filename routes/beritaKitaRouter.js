const express = require("express");
const router = express.Router();
const newsModel = require("../models/newsModel.js");
const moment = require("moment");
const auth = require("./auth");
const userModel = require("../models/userModel");

const categoryList = {
  hype: "Hype",
  seleb: "Selebriti",
  film: "Film",
  health: "Health",
  resep: "Resep",
  foodnews: "Food-News"
};

// hype : hype
// Link nya : nama category nya

router.get("/", auth.checkAuthNext, async (req, res) => {
  const headline = await newsModel.find({headline : true})
  const freshNews = await newsModel.find().sort({createdAt : -1})
  newsModel.findRandom({}, {}, {limit: 4}, function(err, results) {
    if (!err) {
      newsRandom = results
      console.log(newsRandom)
    }
  })
  console.log(req.isAuthenticated)
  res.render("pages/Home", { logged : req.isAuthenticated, headline : headline, freshNews:freshNews, newsRandom:newsRandom, moment : moment});
});

router.get("/genre/:category", auth.checkAuthNext, async (req, res) => {
  const newsParams = req.params.category;
  console.log(newsParams);
  const news = await newsModel.find({ category: newsParams });
  newsModel.findRandom({}, {}, {limit: 4}, function(err, results) {
    if (!err) {
      newsRandom = results
    }
  })

  res.render("pages/Genre", {
    news: news,
    categoryName: categoryList[newsParams],
    logged : req.isAuthenticated,
    newsRandom : newsRandom
  });
});

router.get("/news/:idberita", auth.checkAuthNext, async (req, res) => {
  try {
    user = {}
    if(req.isAuthenticated){
      user = await userModel.findById(req.user.id)
    }
    newsModel.findRandom({}, {}, {limit: 4}, function(err, results) {
      if (!err) {
        newsRandom = results
      }
    });

    console.log(newsRandom)
    const idberita = req.params.idberita; 
    let news = await newsModel.findById(idberita)
    res.render("pages/Berita", { news: news, moment : moment, user : user, newsRandom : newsRandom, logged : req.isAuthenticated });
  } catch (error) {
    res.json({message : error.message})
  }

});

//search
router.get("/search", auth.checkAuthNext, async (req, res) => {
    try {
        const searchQuery = req.query.keyword
        const news = await newsModel.find({ title: { $regex: searchQuery, $options: 'i' } });
        res.render("pages/Search", {
            searchNews: news,
            logged : req.isAuthenticated
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

router.post('/api/comment', auth.checkAuthNext, async (req,res)=> {
  try {
    if(req.isAuthenticated){
      data = req.body
      if(!data.comments) res.redirect('/news/' + data.id)
      console.log(data)
      const newComment = await newsModel.findByIdAndUpdate(data.id, {
        $addToSet: {
          comment : {
            username : data.username,
            text : data.comments,
            commentDate : Date.now()
          }
        },
      })
  
      res.redirect('/news/' + data.id)
      
    } else {
      res.redirect('/sign/in')
    }
  } catch (error) {
    res.json({message : error.message})
  }
})






module.exports = router;
