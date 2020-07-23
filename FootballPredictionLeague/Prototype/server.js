const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/football_prediction_league";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var db;

/* MongoDB */

MongoClient.connect(url, function(err, database) {
  if(err) throw err;
  db = database;
});
  
/* Add new user to the db */

app.post("/register", function(req, res) {
  var user = req.body.username;
  db.collection("user").count({username:user}, function(err, result) {
    if(err) throw err;
    if(result > 0) {
      console.log(user + " found " + result + "times");
      alert(user + " already exists. Please try logging in");
    }
    else {
      db.collection("user").save(req.body, function(err, result) {
        if(err) throw err;
        console.log("New user " + user + " added succesfully");
        res.redirect("/");
      });
    } 
  });
});


/*

app.post("/register", function(req, res) {
  var user = req.body.username;
  if(db.collection("user").find({username:user}).count() > 0) {
    console.log("You have already registered");
  } 
  else {
    db.collection("user").save(req.body, function(err, result) {
      if(err) throw err;
      console.log("New user " + user + " added succesfully");
      res.redirect("/");
    });
    console.log("Adding new user");
    res.redirect("/");
  };
  
});

*/

app.listen(8080);
console.log("Your server is listening for requests on port 8080");