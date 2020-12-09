require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("./auth");
const Joi = require("joi");
const { valid } = require("joi");
const userModel = require("../models/userModel");


router.get('/in', auth.checkAuthNext ,async (req,res) => {
    if(req.isAuthenticated) {
        res.redirect('/')
    } else {
        logMessage = req.session.logMessage
        res.render('pages/Login')
    }
})

router.get('/up', auth.checkAuthNext, async (req,res) => {
    if(req.isAuthenticated) {
        res.redirect('/')
    } else {
        regMessage = req.session.regMessage
        res.render('pages/SignUp')
    }
})

router.post("/auth", async (req, res) => {
    try {
      const { username, password } = req.body;
      const User = await userModel.findOne({ username: username });
      console.log(User);
      if (User) {
        const authResult = await bcrypt.compare(password, User.password);
        if (authResult) {
          const token = jwt.sign(
            {
              id: User._id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          res.cookie("token", token);
          res.redirect("/");
          req.session.destroy()
          return;
        }
        req.session.logMessage =
          "Login failed : Invalid username or password";
        res.redirect("/sign/in");
      } else {
        req.session.logMessage =
          "Login failed : Invalid username or password";
        res.redirect("/sign/in");
      }
    } catch (error) {
      req.session.logMessage =
        "Login failed : Invalid username or password";
      res.redirect("/sign/in");
    }
  });

  router.post("/register", async (req, res) => {
    try {
      const validation = await regSchema.validateAsync(req.body);
      const usernameValidate = await user.find({username : validation.username})
      if(usernameValidate) throw new Error(`username : ${validation.username} has already been taken`)
      const password = await bcrypt.hash(validation.password, 10);
      const newUser = new user({
        username: validation.username,
        password: password,
      });
  
      const userLists = await newUser.save();
      if (!userLists) throw new Error("Something went wrong");
      res.status(200).redirect("/sign/in");
      req.session.destroy();
      res.redirect("/sign/in");
    } catch (error) {
      req.session.regMessage = error.message;
      res.redirect("/sign/up");
    }
  });


  //validation
  const regSchema = Joi.object({
    username: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(6).max(128).required(),
  });

module.exports = router;
