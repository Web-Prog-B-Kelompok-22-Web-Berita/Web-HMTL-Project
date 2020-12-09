const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/userModel");

function checkAuthNext(req, res, next) {
  if (req.cookies["token"]) {
    try {
      const token = req.cookies["token"];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.isAuthenticated = true;
      req.user = decoded;
    } catch (err) {
      req.isAuthenticated = false;
      console.log(err);
    }
  }
  next();
}

module.exports.checkAuthNext = checkAuthNext;