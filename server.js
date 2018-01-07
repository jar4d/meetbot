
var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://meetbotuser:meetbot@ds247077.mlab.com:47077/meetbot';



MongoClient.connect(url, (err, db) => {
  if (err) return console.log(err);

  const database = db.db('meetbot');
  database.collection('locations');
  
  var cursor = database.collection('meetbot').find();



  app.listen(80, () => {
    console.log('Chatfuel Bot-Server listening on port 80...')
  });
});


app.get('/*', function(req, res) {

    //get stuff from API push
    var data = req.query; 
    //console.log('REQ Item: ', p);   // shows all data...
    console.log('New query...'); 
    console.log('venueType: ', data.venueType);   
    console.log('longitude: ', data.longitude);   
    console.log('latitude: ', data.latitude);  

    //look at DB
    //var cursor = db.locations.find();
    var count = db.meetbot.find().count();
    console.log("DB count: " + count);
      // send HTML file populated with quotes here

    var jsonResponse = [];

    // 







    jsonResponse.push(

   {"text": "How about The Smoking Goat?"},   
   {"text": "It's a Thai Barbecue Bar."},

  {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           
           {
            "title":"LALALA0",
            "image_url":"https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/26151403_788886704629335_7818346908434300928_n.jpg",
            "subtitle":"Weve got the right hat for everyone.",
            /*
            "default_action": {
              "type": "web_url",
              "url": "http://smokinggoatbar.com/shoreditch/",
              "messenger_extensions": true,
              "webview_height_ratio": "full",
              "fallback_url": "http://smokinggoatbar.com/shoreditch/"
            },
            */
            "buttons":[
              {
                "type":"web_url",
                "url":"http://smokinggoatbar.com/shoreditch/",
                "title":"Location"
              },
              {
                "type":"web_url",
                "url":"http://smokinggoatbar.com/shoreditch/",
                "title":"Share"
              }        
            ]      
          },

           {
            "title":"LALALA1",
            "image_url":"https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/26151403_788886704629335_7818346908434300928_n.jpg",
            "subtitle":"Weve got the right hat for everyone.",
            
            "buttons":[
              {
                "type":"web_url",
                "url":"http://smokinggoatbar.com/shoreditch/",
                "title":"Location"
              },
              {
                "type":"web_url",
                "url":"http://smokinggoatbar.com/shoreditch/",
                "title":"Share"
              }        
            ]      
          },

           {
            "title":"LALALA2",
            "image_url":"https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/26151403_788886704629335_7818346908434300928_n.jpg",
            "subtitle":"Weve got the right hat for everyone.",
            
            "buttons":[
              {
                "type":"web_url",
                "url":"http://smokinggoatbar.com/shoreditch/",
                "title":"Location"
              },
              {
                "type":"web_url",
                "url":"http://smokinggoatbar.com/shoreditch/",
                "title":"Share"
              }        
            ]      
          },



        ]
      }
    }
  }

/*
    {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"list",
          "top_element_style":"large",
          "elements":[
            {
              "title":"Chatfuel Rockets T-Shirt",
              "image_url":"https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/26151403_788886704629335_7818346908434300928_n.jpg",
              "subtitle":"Soft white cotton t-shirt with CF Rockets logo",
              "buttons":[
                {
                  "type":"web_url",
                  "url":"http://smokinggoatbar.com/shoreditch/",
                  "title":"View Item"
                }
              ]
            },
            {
              "title":"Chatfuel Rockets Hoodie",
              "image_url":"https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/26151403_788886704629335_7818346908434300928_n.jpg",
              "subtitle":"Soft gray cotton t-shirt with CF Rockets logo",
              "buttons":[
                {
                  "type":"web_url",
                  "url":"http://smokinggoatbar.com/shoreditch/",
                  "title":"View Item"
                }
              ]
            }
          ]
        }
      }
    }
*/



        
     
    );


    res.send(jsonResponse);
});
