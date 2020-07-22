var express = require("express");
var app = express();
app.use(express.static("public"));

app.listen(8080);
console.log("Your server is listening for requests on port 8080");