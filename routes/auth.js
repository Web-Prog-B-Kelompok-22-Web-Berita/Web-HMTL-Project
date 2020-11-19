const express = require('express');
const router = express.Router();

router.get('/home', async(req, res) =>{
    res.render('pages/Home');
})

router.get('/genre', async(req,res) => {
    res.render('pages/Genre');
})

router.get('/berita', async(req,res) =>{
    res.render('pages/Berita');
})

module.exports = router;