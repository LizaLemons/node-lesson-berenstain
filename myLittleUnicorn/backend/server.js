// backend: run `nodemon` (`npx nodemon`) to begin listening to localhost:3000
// the BE listens for requests from the FE (localhost:8080)

// *Note* If you use Postman to send data, instead of "form-data", choose
// "x-www-form-urlencoded"


var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

/* let's add the ability ajax to our server from anywhere! */
app.use(cors());

/* extended:true = put it in an obj */
app.use(bodyParser.urlencoded({extended: true}));


/* welcome page */
app.get('/', function(request, response){
  response.json({"description":"~uNiCoRnS API~"});
});

/* get all */
app.get('/unicorns', function(request, response){
  response.json({ "description": "Get all unicorns" });
});

/* add new one */
app.post('/unicorns/new', function(request, response){
  response.json({ "description": "Add new unicorn" });
});

/* find one */
app.get('/unicorns/:name', function(request, response){
  response.json({"description":"find by name"});
});

/* delete one */
app.delete('/unicorns/:name', function(request, response) {
  response.json({"description":"delete by name"});
}); 

/* update one */
app.put('/unicorns/:name', function(request, response) {
  response.json({"description":"update by name"});
});



/* tell our app where to listen */
app.listen(3000, function(){
  console.log('listen to events on port 3000.')
});
