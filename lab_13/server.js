var express = require("express");
var app = express();

/* Route 1 */
app.get("/", function(req, res) {
  res.send("Hello world! by express");
});

app.listen(8080);

/* Route 2 */
app.get("/test", function(req, res) {
  res.send("Hello world! by express - via Route 2");
});

/* Knock-knock jokes */
var knockknock = require("knock-knock-jokes");

app.get("/joke", function(req, res) {
  var randomJoke = knockknock();
  res.send(randomJoke);
});

/* Accessing parameters */
app.get("/add", function(req, res){
  var x = parseInt(req.query.x);
  var y = parseInt(req.query.y);
  res.send("X + Y = " + (x+y));
});