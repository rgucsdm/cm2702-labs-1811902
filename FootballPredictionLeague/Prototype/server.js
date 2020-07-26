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

/*app.get("/predictions", function (req, res) {
  db.collection("wc2018").findOne({matchID: "match51"}, function(err, result) {
    if(err) throw err;
    res.render("pages/predictions", {
      match: result,
      pageTitle: "Predictions",
      pageHeader: "MY PREDICTIONS"
    })
    console.log("Getting there");
  })
});*/

app.get("/predictions", function(req, res) {
  db.collection("wc2018").find().toArray(function(err, result) {
    if(err) throw err;
    res.render("pages/predictions", {
      pageTitle: "Predictions",
      pageHeader: "MY PREDICTIONS",
      match49: result.find(e => e.matchID === "match49"),
      match50: result.find(e => e.matchID === "match50"),
      match51: result.find(e => e.matchID === "match51"),
      match52: result.find(e => e.matchID === "match52"),
      match53: result.find(e => e.matchID === "match53"),
      match54: result.find(e => e.matchID === "match54"),
      match55: result.find(e => e.matchID === "match55"),
      match56: result.find(e => e.matchID === "match56"),
    })
  })
  //console.log("Getting there");
});
/*
//this is our profile route, it takes in a username and uses that to search the database for a specific user
app.get('/profile', function(req, res) {
  if(!req.session.loggedin){res.redirect('/login');return;}
  //get the requested user based on their username, eg /profile?username=dioreticllama
  var uname = req.query.username;
  //this query finds the first document in the array with that username.
  //Because the username value sits in the login section of the user data we use login.username
  db.collection('people').findOne({
    "login.username": uname
  }, function(err, result) {
    if (err) throw err;
    //console.log(uname+ ":" + result);
    //finally we just send the result to the user page as "user"
    res.render('pages/profile', {
      user: result
    })
  });
});
*/


app.get("/login", function (req, res) {
  res.render("pages/login", {
    pageTitle: "Login",
    pageHeader: "FOOTBALL PREDICTION LEAGUE"
  });
});

app.get("/leaderboard", function (req, res) {
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




app.listen(8080);
console.log("Your server is listening for requests on port 8080");