
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://meetbotuser:meetbot@ds247077.mlab.com:47077/meetbot';



app.listen(80, () => {
console.log('Chatfuel Bot-Server listening on port 80...')
});

app.get('/*', function(req, res) {
   //get stuff from API push
    
    data = req.query; 

    console.log('New query...'); 
    console.log('Vibe: ', data.vibe);   
    console.log('Drink: ', data.drink);       
    console.log('longitude: ', data.longitude);   
    console.log('latitude: ', data.latitude);  


    MongoClient.connect(url, function (err, client) {
        i = 0;


        var db = client.db('meetbot');
        if (err) throw err;

/*
           db.collection('locations').find(
                               
               {
                    geometry :
                       { $near :
                          {
                            $geometry : {
                               type : "Point" ,
                               coordinates : [ parseFloat(data.longitude), parseFloat(data.latitude) ] //coordinatesResponse //[-0.07858826, 51.520557]
                            },
                            $maxDistance : 1000
                          }
                       }  
               },

                {
                    'properties.drink':data.drink, 
                    'properties.vibe':data.vibe
                },

*/

        db.collection('locations').find({
            "geometry": {
                "$nearSphere": {
                    "$geometry": {
                        "type": "Point",
                        "coordinates": [ parseFloat(data.longitude), parseFloat(data.latitude) ]
                    },
                    "$maxDistance": 1000
                }
            },
            "properties.drink": data.drink,
            "properties.vibe": data.vibe
            
        },













            function (err, result) { 
                var locationsmatched = result;
                var locationsmatchedcount = locationsmatched;
                if (err) throw err;
                console.log("locationsmatched: "+ locationsmatchedcount);
                    
                        var elementsArray = [];
                        jsonResponse = [];
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

                          // Execute the each command, triggers for each document
                          locationsmatched.each(function(err, item) {
                            
                            // If the item is null (none left) then the cursor is exhausted/empty and close

                            if(item == null) {
                              // Show that the cursor is closed
                              
                                locationsmatched.toArray(function(err, items) {

                                if(i == 0){
                                console.log("final i ==0 " + i);    
                                //send stuff
                                jsonResponse.push(
                                {
                                "text": "Oh no. We can't find you a place nearby.Why don't you send us a recommendation?"
                                },
                                {
                                    attachment:{
                                        type:"link",
                                        payload:{
                                            "url":"mailto:jared@thinkplanthrive.com"                                        }
                                    }
                                });

                                jsonResponsestringify = JSON.stringify(jsonResponse);
                                res.send(jsonResponse); //not string
                                console.log("final i: " + i);     
                                console.log("Sent jsonResponse: " + jsonResponsestringify); 
                                }

                                if(i > 0){
                                console.log("final i >0 " + i);  
                                //send stuff
                                jsonResponsestringify = JSON.stringify(jsonResponse);
                                res.send(jsonResponse); //not string
                                console.log("final i: " + i);     
                                console.log("Sent jsonResponse: " + jsonResponsestringify); 

                                }


                                client.close();
                              });

                            }

                            else{

                            console.log("item.name"+ item.properties.name);

                            var nameVar = item.name;
                            var image_urlVar = item.imageURL;
                            var descriptionVar = item.description;

                            elementsArray.push(
                                {                  
                                    title: item.properties.name,
                                    image_url: item.properties.imageURL,
                                    subtitle: item.properties.description, 

                                    buttons:[
                                        {
                                            type:"web_url",
                                            url:"https://www.google.com/maps/dir/?api=1&origin=" + data.latitude + "," + data.longitude + "&destination=" + item.geometry.coordinates[1] + "," + item.geometry.coordinates[0] + "&travelmode=walking",
                                            title:"Map"
                                        },
                                        {
                                            type:"web_url",
                                            url:item.properties.moreURL,
                                            title:"More"
                                        },     
                                        {
                                            type:"element_share"
                                        }                                               
                                    ]      
                                });

                                //need to limit this to 3...

                                if(i<4){
                                    jsonResponse[0].attachment.payload.elements.push(elementsArray[i]);
                                    console.log("loop i: " + i);       
                                    i = i+1;
                                }
                            }
                          });
                    });
        });
});






