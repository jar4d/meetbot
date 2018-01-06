
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




    {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "image_aspect_ratio": "square",
          "elements":[
            {
              "title":"Chatfuel Rockets T-Shirt",
              "image_url":"https://rockets.chatfuel.com/img/shirt.png",
              "subtitle":"Soft white cotton t-shirt with CF Rockets logo",
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://rockets.chatfuel.com/store/shirt",
                  "title":"View Item"
                }
              ]
            },
            {
              "title":"Chatfuel Rockets Hoodie",
              "image_url":"https://rockets.chatfuel.com/img/hoodie.png",
              "subtitle":"Soft grey cotton hoddie with CF Rockets logo",
              "default_action": {
                "type": "web_url",
                "url": "https://rockets.chatfuel.com/store",
                "messenger_extensions": true
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://rockets.chatfuel.com/store/hoodie",
                  "title":"View Item"
                }
              ]
            }
          ]
        }
      }
    }




    );
    res.send(jsonResponse);
});
