const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

//Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Duwang fjord", 
//   img: "https://dailyscandinavian.com/wp-content/uploads/2016/02/120216-Geiranger-fjord-photo-brandstroms-busstrafikk.jpg",
//   description: "This is a wonderful duwang fjord. Awesome bumblebee tunas everywhere!"
// }, (err, camps) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(`Added new camp: `, camps);
//   }
// });

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
  let newCampground = {name: name, img: image, description: desc};
  
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

app.listen(3000, () => {
  console.log("YelpCamp Server has started , listening on 3000!")
});

//SHOW
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});

//<%- include("partials/header") %>