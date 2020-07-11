const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//models
const Campground = require("./models/campground");
const Comment = require("./models/comment");

//seeds
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
 
seedDB();

app.get("/", (req, res) => {
  res.render("landing");
});

//INDEX
app.get("/index", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  })
});

//CREATE
app.post("/campgrounds", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newCampground = {name: name, image: image, description: desc};
  
  Campground.create(newCampground, (err, camp) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect("campgrounds/index");
    }
  });
});

//NEW
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
}); 

//SHOW
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

//===========================
//COMMENTS ROUTES
//===========================
app.get("/campgrounds/:id/comments/new", async (req, res) => {
  let campground = await Campground.findById(req.params.id);

  res.render("comments/new", {campground: campground});
});

app.post("/campgrounds/:id/comments", async (req, res) => {
  try{
  let campground = await Campground.findById(req.params.id);
    console.log("campground" + campground)
  let comment = await Comment.create({
    text: req.body.comment.text,
    author: req.body.comment.author
  });
  campground.comments.push(comment);
  campground.save();

  res.redirect("/campgrounds/" + campground._id);
} catch (err){
  //maybe have better error handling
  console.log(err);
  res.redirect("campgrounds/index")
}

});


app.listen(3000, () => {
  console.log("YelpCamp Server has started , listening on 3000!")
});