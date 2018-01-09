
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

app.get('/*', function(req, res) {
   //get stuff from API push
    var data = req.query; 
    //console.log('REQ Item: ', p);   // shows all data...
    console.log('New query...'); 
    console.log('Vibe: ', data.vibe);   
    console.log('Drink: ', data.drink);       
    console.log('longitude: ', data.longitude);   
    console.log('latitude: ', data.latitude);  

    MongoClient.connect(url, function (err, client) {
        var db = client.db('meetbot');
        if (err) throw err;

            db.collection('locations').find({drink:data.drink, vibe:data.vibe}, function (err, result) { //{drink:data.drink, vibe:data.vibe}
                var locationsmatched = result;
                if (err) throw err;
                console.log("locationsmatched: "+ locationsmatched);
                    
            //db.collection.find( { field: { $gt: value1, $lt: value2 } } );

                        console.log("locationscount outside: " + locationscount);
                        console.log("locationsmatched outside: " + locationsmatched);

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

                        console.log("line 70 check: "+ locationsmatched);

                          // Execute the each command, triggers for each document
                          locationsmatched.each(function(err, item) {
                            
                            // If the item is null (none left) then the cursor is exhausted/empty and closed
                            if(item == null) {
                              // Show that the cursor is closed
                              locationsmatched.toArray(function(err, items) {
                                //send stuff
                                jsonResponsestringify = JSON.stringify(jsonResponse);
                                res.send(jsonResponse); //not string
                                console.log("Sent jsonResponse: " + jsonResponsestringify);     
                                // Let's close the db
                                client.close();
                              });
                            }else{

                            console.log("item.name"+ item.name);

                            var nameVar = item.name;
                            var image_urlVar = item.imageURL;
                            var descriptionVar = item.description;

                            elementsArray.push(
                                {                  
                                    title: item.name,
                                    image_url: item.imageURL,
                                    subtitle: item.description, 

                                    buttons:[
                                        {
                                            type:"web_url",
                                            url:"https://www.google.co.uk",
                                            title:"Location"
                                        },
                                        {
                                            type:"web_url",
                                            url:"http://smokinggoatbar.com/shoreditch/",
                                            title:"Share"
                                        }        
                                    ]      
                                });

                            jsonResponse[0].attachment.payload.elements.push(elementsArray[0]);
                            }

                          });

    



                    });


            

        });
});






