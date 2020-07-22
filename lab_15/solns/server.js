const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/star_wars_quotes";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

var db; // Contains ref to the db

// Connect to the db and define db var
MongoClient.connect(url, function(err, database) {
    if(err) throw err;
    db = database;
    app.listen(8080);
});

// Define an /all route that'll return all quotes
app.get('/all', function(req, res) {
   db.collection('quotes').find().toArray(function(err, result) {
       if(err) throw err;
       
       var output = "<h1>All the quotes</h1>";
       
       for(var i = 0; i < result.length; i++) {
           output += "<div>"
           output += "<h3>" + result[i].name + "</h3>"
           output += "<p>" + result[i].quote + "</p>"
           output += "</div>"
       }
       
       res.send(output);
   });
});

// Define the /quotes route
app.post('/quotes', function(req, res) {
    
    //req.body contains the entire posted content from the form
    // Inserts the record into the database
    db.collection('quotes').save(req.body, function(err, result) {
        if(err) throw err;
        
        console.log('saved to database');
        
        res.redirect('/');
    })
});

// Define the /search route
// When Search is called it pulls the inputted name, and returns a formatted page of results
app.post('/search', function(req, res) {
     db.collection('quotes').find(req.body).toArray(function(err, result) {
         if(err) throw err;
         
         var output = "<h1>Retrieved Quotes</h1>";
         
         for(var i = 0; i < result.length; i++) {
             output += "<div>"
             output += "<h3>" + result[i].name + "</h3>"
             output += "<p>" + result[i].quote + "</p>"
             output += "<div>"
         }
         
         res.send(output);
     });
});

// Define the /delete route
app.post("/delete", function(req, res) {
     db.collection('quotes').deleteOne(req.body, function(err, result) {
         if(err) throw err;
         
         res.redirect('/');
     });
});

// Define the /update route
app.post('/update', function(req, res) {
    var query = {quote: req.body.quote };
    var newValues = {$set: {name: req.body.newname, quote: req.body.newquote} };
    
    db.collection('quotes').updateOne(query, newValues, function(err, result) {
         if (err) throw err;
        res.redirect('/');
    });
})