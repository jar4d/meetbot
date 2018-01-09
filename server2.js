
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var locationscount = [];
var locationsmatched = [];
var url = 'mongodb://meetbotuser:meetbot@ds247077.mlab.com:47077/meetbot';
var JsonBody
var JsonElements

app.listen(80, () => {
console.log('Chatfuel Bot-Server listening on port 80...')
});

MongoClient.connect(url, function (err, client) {
    var db = client.db('meetbot');
    if (err) throw err;

        db.collection('locations').find({}, function (err, result) { //{drink:data.drink, vibe:data.vibe}
            var locationsmatched = result;
            if (err) throw err;
            console.log("locationsmatched: "+ locationsmatched);

            db.collection('locations').find({}).count({}, function (err, result) { //{drink:data.drink, vibe:data.vibe} db.collection.find( { field: { $gt: value1, $lt: value2 } } );
                var locationscount = result;
                if (err) throw err;
                console.log("locationscount: "+ locationscount);
                client.close();

                    app.get('/*', function(req, res) {
                        //get stuff from API push
                        var data = req.query; 
                        console.log("locationscount outside APP GET: " + locationscount);
                        console.log("locationsmatched outside APP GET: " + locationsmatched);

                        var elementsArray = [];
                        var jsonResponse = [];
                        //initial result response
                        //jsonResponse.push(
                        //    {"text": "Here are our picks for "+ data.vibe + " " + data.drink + " places less than 1/4 mile walk away."}
                        //);

                        //container for gallery result elements
                        jsonResponse.push(
                            {
                                attachment:{
                                    type:"template",
                                    payload:{
                                        template_type:"generic",
                                        elements:[]
                                    }
                                }
                            }                   
                        );

                        //iterate over results...
                        //for(var i = 0; i < locationscount; ++i) {
                        //console.log("looping  " + [i]);

                        elementsArray.push(
                            {                  
                                title:locationsmatched.name,
                                image_url:locationsmatched.imageURL,
                                subtitle:locationsmatched.description, 

                                buttons:[
                                    {
                                        type:"web_url",
                                        url:"https://www.google.co.uk/maps/@" + data.longitude + "," + data.latitude + ",14z?hl=en",
                                        title:"Location"
                                    },
                                    {
                                        type:"web_url",
                                        url:"http://smokinggoatbar.com/shoreditch/",
                                        title:"Share"
                                    }        
                                ]      

                            }
                        );

                        jsonResponse[0].attachment.payload.elements.push(elementsArray[0]);
                        jsonResponsestringify = JSON.stringify(jsonResponse);
                        res.send(jsonResponse); //not string
                        console.log("Sent jsonResponse: " + jsonResponsestringify);         

                    });


            });

        });
});






