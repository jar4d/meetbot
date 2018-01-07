
var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://meetbotuser:meetbot@ds247077.mlab.com:47077/meetbot';


MongoClient.connect(url)
    .then(function(db){
    const database = db.db('meetbot');
    database.collection('locations');        
    var count = database.collection('meetbot').find().count();
    console.log("DB count: " + count);        

    })
.catch(function(err){
    console.log(err)
    })




