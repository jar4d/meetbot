
var express = require('express');
var app = express();


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

    var jsonResponse = [];


    jsonResponse.push(

   {"text": "How about The Smoking Goat?"},   
   {"text": "It's a Thai Barbecue Bar."},

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
    },



    {
    "attachment":{
    "type":"template",
    "payload":{    
    "template_type":"generic",
      "elements":[
         {
          "title":"Chatfuel Rockets T-Shirt",
          "image_url":"https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/26151403_788886704629335_7818346908434300928_n.jpg",
          "subtitle":"Chatfuel Rockets T-Shirt",
          "default_action": {
            "type": "web_url",
            "url": "http://smokinggoatbar.com/shoreditch/",
            "messenger_extensions": true //,
            //"webview_height_ratio": "FULL"
          },
          "buttons":[{
                      "type":"web_url",
                      "url":"http://smokinggoatbar.com/shoreditch/",
                      "title":"View Item"
                    }]      
        },

      ]
    }
    }
    },


        
     
    );


    res.send(jsonResponse);
});
