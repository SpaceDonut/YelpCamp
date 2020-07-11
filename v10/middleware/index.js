//all the middleware goes here
const Campground = require("../models/campground");
const Comment = require("../models/comment");

const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = async function (req, res, next) {
  if (req.isAuthenticated()) {
    try {
      let foundCampground = await Campground.findById(req.params.id);
      if (foundCampground.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect("back");
      }
    } catch (err) {
      console.log(err);
      res.redirect("back");
    }
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = async function (req, res, next) {
  try {
    if (req.isAuthenticated()) {
      let foundComment = await Comment.findById(req.params.comment_id);
      if (foundComment.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect("back");
      }
    }
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObj;