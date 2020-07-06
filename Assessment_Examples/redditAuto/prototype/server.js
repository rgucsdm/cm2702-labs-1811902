var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const snoowrap = require('snoowrap'); // npm install snoowrap --save
//docs here https://not-an-aardvark.github.io/snoowrap/snoowrap.html#getKarma__anchor
const r = new snoowrap({
  userAgent: 'testApp: version 1 by someone',
  clientId: 'Wv_bC8IWXCMZeA',
  clientSecret: '3Ivz6FMFCJi_-ZbRuP17gdhFGUU',
  username: 'Its_Clor',
  password: 'testpass'
});

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('public'));

app.get('/', function(req, res){

});



app.get('/test', function(req, res) {

  // Printing a list of the titles on the front page
  r.getKarma().then(function(karma){
    console.log(karma);
  });

  r.getNew().then(function(results){
    console.log(results);
  });
});


app.post('/getform', function(req, res) {

  var searchTerm = req.body;
  console.log(req.body);
  req.body.searchVariables
});






app.listen(8080);
