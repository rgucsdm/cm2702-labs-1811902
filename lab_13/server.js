var express = require("express");
var app = express();
app.use(express.static("public"));

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
  res.send("X + Y="+(x+y));
});

/* Calculator */
app.get("/calc", function(req, res){
  var x = parseInt(req.query.x);
  var y = parseInt(req.query.y);
  var op = req.query.op;
  var result = 0;
  if(op=="add") {result = x+y};
  if(op=="sub") {result = x-y};
  if(op=="mul") {result = x*y};
  if(op=="div") {result = x/y};
  res.send("Result is "+ result);
});

/* Form */
app.get("/getform", function (req, res) {
  var name = req.query.name;
  var quest = req.query.quest;
  res.send("Hi " + name + ", I am sure you will "+ quest);
});