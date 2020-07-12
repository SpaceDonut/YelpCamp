require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const flash = require("connect-flash");

//models
const User = require("./models/user");

//seeds
const seedDB = require("./seeds");

//routes
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));  
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "What a wonderful duwang",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

let atlasUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER_NAME}.ybhwl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// let localUrl = "mongodb://localhost:27017/yelp_camp";
mongoose.connect( atlasUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to DB!');
}).catch(err => {
  console.log('ERROR: ', err.message); 
});

//  seedDB();

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

let port = process.env.PORT;
if(!port) port = 3000;

app.listen(port, () => {
  console.log("YelpCamp Server has started , listening on " + port + " !")
});