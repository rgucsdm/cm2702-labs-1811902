var express = require("express");
var app = express();
app.use(express.static("public"));

app.get('/', function(req, res){
  res.send("Hello world! by express”);
});

app.listen(8080);
console.log("Your server is listening for requests on port 8080");