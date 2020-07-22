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
  db.collection("user").save(req.body, function(err, result) {
    if(err) throw err;
    console.log("User added");
    res.redirect("/");
  });
});



app.listen(8080);
console.log("Your server is listening for requests on port 8080");