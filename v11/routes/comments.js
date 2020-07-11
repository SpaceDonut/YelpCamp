const express = require("express");
const router = express.Router({
  mergeParams: true
});

const Campground = require("../models/campground");
const Comment = require("../models/comment");

const middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, async (req, res) => {
  let campground = await Campground.findById(req.params.id);

  res.render("comments/new", {
    campground: campground
  });
});

router.post("/", middleware.isLoggedIn, async (req, res) => {
  try {
    let campground = await Campground.findById(req.params.id);
    console.log("campground" + campground)
    console.log("username: " + req.user.username)
    let comment = await Comment.create({
      text: req.body.comment.text,
      author: {
        id: req.user._id,
        username: req.user.username
      }
    });
    campground.comments.push(comment);
    campground.save();

    req.flash("success", "Successfully added a comment.");
    res.redirect("/campgrounds/" + campground._id);
  } catch (err) {
    //maybe have better error handling
    console.log(err);
    req.flash("error", "Something went wrong on post comment");
    res.redirect("/campgrounds");
  }
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, async (req, res) => {
  try {
    let foundCampground = await Campground.findById(req.params.id);
    if(!foundCampground || foundCampground.length < 0) {
      // req.flash("error", "campground not found");
      // res.redirect("back");
      throw "Not found";
    }
    console.log("inside comment edit route, found campground", foundCampground);
    let foundComment = await Comment.findById(req.params.comment_id);
    res.render("comments/edit", {
      campground_id: req.params.id,
      comment: foundComment
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Campground or comment not found.");
    res.redirect("back");
  }
});
//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
    res.redirect("/campgrounds/" + req.params.id);
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});

//DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.comment_id);
    req.flash("success", "Success, comment deleted.");
    res.redirect("back");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});

module.exports = router;