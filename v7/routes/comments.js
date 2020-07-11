const express = require("express");
const router = express.Router({mergeParams: true});

const Campground = require("../models/campground");
const Comment = require("../models/comment");

router.get("/new", isLoggedIn, async (req, res) => {
  let campground = await Campground.findById(req.params.id);

  res.render("comments/new", {
    campground: campground
  });
});

router.post("/", isLoggedIn, async (req, res) => {
  try {
    let campground = await Campground.findById(req.params.id);
    console.log("campground" + campground)
    let comment = await Comment.create({
      text: req.body.comment.text,
      author: res.locals.currentUser.username
    });
    campground.comments.push(comment);
    campground.save();

    res.redirect("/campgrounds/" + campground._id);
  } catch (err) {
    //maybe have better error handling
    console.log(err);
    res.redirect("/campgrounds");
  }
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;