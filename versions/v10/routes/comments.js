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

    res.redirect("/campgrounds/" + campground._id);
  } catch (err) {
    //maybe have better error handling
    console.log(err);
    res.redirect("/campgrounds");
  }
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, async (req, res) => {
  try {
    let foundComment = await Comment.findById(req.params.comment_id);
    res.render("comments/edit", {
      campground_id: req.params.id,
      comment: foundComment
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});
//COMMENTS UPDATE ROUTE
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
    res.redirect("back");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
});

module.exports = router;