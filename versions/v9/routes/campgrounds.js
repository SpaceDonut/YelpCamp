const express = require("express");
const router = express.Router();

const Campground = require("../models/campground");
const { request } = require("express");
const { route } = require("./comments");

//INDEX
router.get("/", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds
      });
    }
  })
});

//CREATE
router.post("/", isLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };
 
  Campground.create(newCampground, (err, camp) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//NEW
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

//SHOW
router.get("/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {
        campground: foundCampground
      });
    }
  });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", async (req, res) => {
  try {
  let foundCampground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", {campground: foundCampground});
}catch(err){
  console.log(err);
  res.redirect("/campgrounds");
}
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", async (req, res) => {
  try {
    await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    res.redirect("/campgrounds/" + req.params.id);
  } catch(err) {
    console.log(err);
    res.redirect("/campgrounds");
  }
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", async (req, res) => {
  try {
    let foundCampground = await Campground.findById(req.params.id);
    await foundCampground.remove();
    res.redirect("/campgrounds");
  } catch(err) {
    console.log(err);
    res.redirect("/campgrounds");
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;