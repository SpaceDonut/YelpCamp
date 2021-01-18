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
        req.flash("error", "You don't have permission to do that.");
        res.redirect("back");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "Campground not found.");
      res.redirect("back");
    }
  } else {
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = async function (req, res, next) {
  try {
    if (req.isAuthenticated()) {
      let foundComment = await Comment.findById(req.params.comment_id);
      console.log("comment in checkcommentownership", foundComment);
      if (foundComment.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash("error", "You don't have permission to do that.");
        res.redirect("back");
      }
    } else {
      req.flash("error", "You need to be logged in to do that.");
      res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "Comment not found.");
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that.");
  res.redirect("/login");
};

module.exports = middlewareObj;