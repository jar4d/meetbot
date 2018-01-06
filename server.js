
var express = require('express');
var app = express();


app.listen(80, function() {
    console.log('Chatfuel Bot-Server listening on port 80...');
});








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


app.get('/*', function(req, res) {

    var data = req.query; 
    //console.log('REQ Item: ', p);   // shows all data...
    console.log('New query...'); 
    console.log('venueType: ', data.venueType);   
    console.log('longitude: ', data.longitude);   
    console.log('latitude: ', data.latitude);  

    var jsonResponse = [];
    jsonResponse.push(




   {"text": "Welcome to the Chatfuel Rockets!"},
   {"text": "What are you up to?"}




    );
    res.send(jsonResponse);
});
