
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var locationscount = [];
var locationsmatched = [];
var url = 'mongodb://meetbotuser:meetbot@ds247077.mlab.com:47077/meetbot';
var JsonBody;
var JsonElements;
var jsonResponse = [];
var longitudeMIN;
var longitudeMAX;
var latitudeMIN;
var latitudeMAX;
var i = 0;
app.listen(80, () => {
console.log('Chatfuel Bot-Server listening on port 8080...')
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

    var longitudeMIN = data.longitude - 10
    var longitudeMAX = data.longitude + 10
    var latitudeMIN   = data.latitude - 10
    var latitudeMAX   = data.latitude + 10

    MongoClient.connect(url, function (err, client) {
        var db = client.db('meetbot');
        if (err) throw err;
/*
            db.collection('locations')
            .find({
                drink:data.drink, 
                vibe:data.vibe, 
                //longitude: { $gt: longitudeMIN, $lt: longitudeMAX }, 
                //latitude: { $gt: latitudeMIN, $lt: latitudeMAX }, 
            },
            { limit : 3 }, 
*/
           db.collection('locations').find(
               {geometry :
                       { $near :
                          {
                            $geometry : {
                               type : "Point" ,
                               coordinates : [-0.086499, 51.514554] },
                            $maxDistance : 100000
                          }
                       }  
               },
                {
                    'properties.drink':"cocktails", 
                    'properties.vibe':"fancy", 
                }, 
               { limit : 3 },


            function (err, result) { 
                var locationsmatched = result;
                if (err) throw err;
                console.log("locationsmatched: "+ locationsmatched.length);
                    
            //db.collection.find( { field: { $gt: value1, $lt: value2 } } );

                        var elementsArray = [];
                        
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
                            jsonResponsestringify = JSON.stringify(jsonResponse);
                        console.log("Sent jsonResponse 1: " + jsonResponsestringify);  
                        //iterate over results...
                        //for(var i = 0; i < locationscount; ++i) {
                        //console.log("looping  " + [i]);

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
                                            url:"https://www.google.co.uk/maps/@" + item.longitude + "," + item.latitude + ",14z?hl=en",
                                            title:"Location"
                                        },
                                        {
                                            type:"web_url",
                                            url:"http://smokinggoatbar.com/shoreditch/",
                                            title:"Share"
                                        }        
                                    ]      
                                });
                                                        //something wrong with this line and duplicates
                            //something wrong with this line and duplicates

                            jsonResponse[0].attachment.payload.elements.push(elementsArray[i]);
                            i = i+1;
                            }

                          });

    



                    });


            

        });
});






