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
app.get("/joke", function(req, res) {
  var randomJoke = knockknock();
  res.send(randomJoke);
});