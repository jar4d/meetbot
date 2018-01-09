var express = require('express');
var app = express();

app.listen(80, function() {
    console.log('Chatfuel Bot-Server listening on port 80...');
});

app.get('/*', function(req, res) {
    var jsonResponse = [];
    jsonResponse.push(







{
            "attachment":{
              "type":"template",
              "payload":{
                "template_type":"generic",
                "elements":[
                   //########start of element#########
                   {
                    "title":"locationsreturned.name",
                    "image_url":"locationsreturned.imageURL",
                    "subtitle":"locationsreturned.description",

                    "buttons":[
                      {
                        "type":"web_url",
                        "url":"https://www.google.co.uk",
                        "title":"Location"
                      },
                      {
                        "type":"web_url",
                        "url":"http://smokinggoatbar.com/shoreditch/",
                        "title":"Share"
                      }        
                    ]      
                  },
                   //########end of element#########

                ]
              }
            }
}    









	);
    res.send(jsonResponse);
});
