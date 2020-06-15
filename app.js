const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let campgrounds = [
  {name: "Tuna creekest", image:"https://static.wixstatic.com/media/3332be_854f115fac294b37926e692abf3fa86f~mv2.jpg/v1/fill/w_560,h_260,al_c,q_80,usm_0.66_1.00_0.01/DSC01079-A.webp"},
  {name: "Bumblebee hill", image:"https://inteng-storage.s3.amazonaws.com/img/iea/MRw4y5ABO1/sizes/camping-tech-trends_resize_md.jpg"},
  {name: "Mountain Goat God's rest", image:"https://www.shumarinai.jp/wp-content/uploads/2017/04/cseijikazui-lakeshumarinaicamping-001.jpg"}
];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;

  campgrounds.push({name: name, image: image});

  res.redirect("/campgrounds")

});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
}); 

app.listen(3000, () => {
  console.log("YelpCamp Server has started , listening on 3000!")
});

//<%- include("partials/header") %>
