var express = require('express');
var app = express();

/*

//Places = new Mongo.Collection('places');



 var data = [
            {
                "name": "Nieuwmarkt, Amsterdam",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 52.372466,
                        "lng": 4.900722
                    }
                }
            },

            {
                "name": "Ransdorp, Amsterdam",
                "location": {
                    "type": "Point",
                    "coordinates": {
                        "lat": 52.392954,
                        "lng": 4.993593
                    }
                }
            },
        ];



*/


app.listen(80, function() {
    console.log('Chatfuel Bot-Server listening on port 80...');
});

app.get('/*', function(req, res) {

	var data = req.query; 
	//console.log('REQ Item: ', p);   // shows all data...
	console.log('New query...'); 
    console.log('venueType: ', data.venueType);   
	console.log('longitude: ', data.longitude);   
	console.log('latitude: ', data.latitude);  

    //var databaseSearch = Places.find();

    var jsonResponse = [];
    jsonResponse.push({ "url": "https://www.google.com/maps/dir/" + data.latitude"," + data.longitude + "/48.179926,27.28875860"});
    res.send(jsonResponse);

    //https://www.google.com/maps/dir/{{latitude}},{{longitude}}/48.179926,27.28875860
});


/*
app.get('/*', function(req, res) {


    var jsonResponse = [];
    jsonResponse.push({ "text": "Hi. " + (Math.random() * 5 + 1).toFixed(0) + " is a lucky number..." });
    res.send(jsonResponse);
});
*/