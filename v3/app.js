const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//models
const Campground = require("./models/campground");

//seeds
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

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
      res.render("index", {campgrounds: allCampgrounds});
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
      res.redirect("/index");
    }
  });
});

//NEW
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
}); 

//SHOW
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});


app.listen(3000, () => {
  console.log("YelpCamp Server has started , listening on 3000!")
});