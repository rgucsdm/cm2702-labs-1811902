var http = require('http');
var knockknock = require('knock-knock-jokes');
var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function(req, res){
    res.send("Hello world! by express");
});
app.get('/test', function(req, res){
res.send("this is route 2");
});


app.get('/joke', function(req, res){
    var randomJoke = knockknock();
    res.send(randomJoke);
});

app.get('/add', function(req, res){
    var x = parseInt(req.query.x);
    var y = parseInt(req.query.y);
    res.send("X + Y="+(x+y));
});

app.get('/calc', function(req, res){
 var x = parseInt(req.query.x);
 var y = parseInt(req.query.y);
 var op = req.query.op;
   var retn=op;
    if (op=="add")retn=(x+y).toString();
    if (op=="sub")retn=(x-y).toString();
    if (op=="mul")retn=(x*y).toString();
    if (op=="div")retn=(x/y).toString();
   res.send(retn);
});

app.get('/getform', function(req, res){
    var name = req.query.name;
    var quest = req.query.quest;
    res.send("Hi "+name+" I am sure you will "+quest) ;
});

app.listen(8080);

