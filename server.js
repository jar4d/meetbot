
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;


    MongoClient.connect('mongodb://meetbotuser:meetbot@ds247077.mlab.com:47077/meetbot', function (err, client) {
        app.listen(80, () => {
        console.log('Chatfuel Bot-Server listening on port 80...')
        });

        app.get('/*', function(req, res) {

            //get stuff from API push
            var data = req.query; 
            //console.log('REQ Item: ', p);   // shows all data...
            console.log('New query...'); 
            console.log('Vibe: ', data.vibe);   
            console.log('Drink: ', data.drink);       
            console.log('longitude: ', data.longitude);   
            console.log('latitude: ', data.latitude);  
        
//db.collection.find( { field: { $gt: value1, $lt: value2 } } );

            if (err) throw err;
            var db = client.db('meetbot');

            db.collection('locations').find({}).count({}, function (findErr, result) {
                if (findErr) throw findErr;
                //console.log(result);
                var locationscount = result;
                client.close();
            });

            db.collection('locations').find({}, function (findErr, result) {
                if (findErr) throw findErr;
                var locationsmatched = result;
                //console.log(result);
                client.close();
            });   

            console.log("locationscount: " + locationscount);
            console.log("locationsmatched: " + locationsmatched);

            var jsonResponse = [];
            //initial result response
            jsonResponse.push(
                {"text": "Here are our picks for "+ data.vibe + " " + data.drink + " places less than 1/4 mile walk away."}
            );

            //container for gallery result elements
            jsonResponse.push(
            {
                "attachment":{
                  "type":"template",
                  "payload":{
                    "template_type":"generic",
                    "elements":[]
                  }
                }
            }    
            );


            //iterate over results...
            for(var i = 0; i < locationscount; ++i) {
            console.log("locationsmatched  " + locationsmatched[i]);
                jsonResponse['attachment']['payload']['elements'].push(


                //########start of element#########
                  {
                    "title":locationsmatched[i].name,
                    "image_url":locationsmatched[i].imageURL,
                    "subtitle":locationsmatched[i].description,

                    "buttons":[
                      {
                        "type":"web_url",
                        "url":"https://www.google.co.uk/maps/@" + data.longitude + "," + data.latitude + ",14z?hl=en",
                        "title":"Location"
                      },
                      {
                        "type":"web_url",
                        "url":"http://smokinggoatbar.com/shoreditch/",
                        "title":"Share"
                      }        
                    ]      
                  }
                //########end of element#########
                );  
            }
            jsonResponsestringify = JSON.stringify(jsonResponse);
            console.log("jsonResponse3: " + jsonResponsestringify);
            res.send(jsonResponse);
        });

}); 

