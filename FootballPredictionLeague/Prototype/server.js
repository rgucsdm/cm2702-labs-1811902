const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/football_prediction_league";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var db;

/* MongoDB */

MongoClient.connect(url, function(err, database) {
  if(err) throw err;
  db = database;
});
  
/* GET routes - displaying pages */

app.get("/", function(req,res) {
  res.render("pages/index", {
    pageTitle: "Home",
    pageHeader: "FOOTBALL PREDICTION LEAGUE"
  });
});

app.get("/predictions", function (req, res) {
  res.render("pages/predictions", {
    pageTitle: "Predictions",
    pageHeader: "MY PREDICTIONS"
  });
});

app.get("/login", function (req, res) {
  res.render("pages/login", {
    pageTitle: "Login",
    pageHeader: "FOOTBALL PREDICTION LEAGUE"
  });
});

app.get("/", function (req, res) {
  res.render("pages/leaderboard", {
    pageTitle: "Leaderboard",
    pageHeader: "LEADERBOARD"
  });
});



/* Add new user to the db */

app.post("/register", function(req, res) {
  var user = req.body.username;
  db.collection("user").count({username:user}, function(err, result) {
    if(err) throw err;
    if(result > 0) {
      console.log(user + " found " + result + "times");
    }
    else {
      db.collection("user").save(req.body, function(err, result) {
        if(err) throw err;
        console.log("New user " + user + " added succesfully");
        res.redirect("/");
      });
    }; 
  });
});

/* Predictions */
// Display match data



app.listen(8080);
console.log("Your server is listening for requests on port 8080");