
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect('mongodb://meetbotuser:meetbot@ds247077.mlab.com:47077/meetbot', function (err, client) {
        app.listen(80, () => {
        console.log('Chatfuel Bot-Server listening on port 80...')
        });

        if (err) throw err;
        var db = client.db('meetbot');

        db.collection('locations').findOne({}, function (findErr, result) {
            if (findErr) throw findErr;
            console.log(result);
            locationsreturned = result;
            client.close();
        });


        app.get('/*', function(req, res) {

            //get stuff from API push
            var data = req.query; 
            //console.log('REQ Item: ', p);   // shows all data...
            console.log('New query...'); 
            console.log('venueType: ', data.venueType);   
            console.log('longitude: ', data.longitude);   
            console.log('latitude: ', data.latitude);  

            var jsonResponse = [];

            jsonResponse.push(

           {"text": "How about " + locationsreturned.name + "?"},   
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
             
            );


            res.send(jsonResponse);
        });

}); 