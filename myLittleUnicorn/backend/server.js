// 1st create your unicorns db
// backend: run `nodemon` to begin listening to localhost:3000
// the BE listens for requests from the FE (localhost:8080)
// don't forget to run your mongo server in a separate Terminal tab: `mongod`
// *Note* If you use Postman to send data, instead of "form-data", choose
// "x-www-form-urlencoded"


var express = require('express');
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var app = express();

/* let's add the ability ajax to our server from anywhere! */
app.use(cors());

/* extended:true = put it in an obj */
app.use(bodyParser.urlencoded({extended: true}));

/* MongoClient lets us interface/connect to mongodb */
var MongoClient = mongodb.MongoClient;

/* Connection url where your mongodb server is running. */
var mongoUrl = 'mongodb://localhost:27017/unicorns_db';

/*** our backend routes ***/
/* depending on the request, fire the right callback */

MongoClient.connect(mongoUrl, function (err, db) {

  /* welcome page */
  app.get('/', function(request, response){
    response.json({"description":"uNiCoRnS API"});
  });

  /* get all */
  app.get('/unicorns', function(request, response){
    // MongoClient.connect(mongoUrl, function (err, db) {
      var unicornsCollection = db.collection('unicorns');
      if (err) {
        console.log('Unable to connect to the mongoDB server. ERROR:', err);
      } else {
        /* Get all */
        unicornsCollection.find().toArray(function (err, result) {
          if (err) {
            console.log("ERROR!", err);
            response.json("error");
          } else if (result.length) {
            console.log('Found:', result);
            response.json(result);
          } else { //
            console.log('No document(s) found with defined "find" criteria');
            response.json("no unicorns found");
          }
          // db.close(function() {
          //   console.log( "database CLOSED");
          // });
        }); // end find

      } // end else
    // }); // end mongo connect
  }); // end get all

  /* add new one */
  app.post('/unicorns/new', function(request, response){
    // if it comes over as form data:
    console.log("request.body", request.body);
    // if it comes over as params
    console.log("request.query", request.query);

    // response.json({"description":"add new"});

    // MongoClient.connect(mongoUrl, function (err, db) {
      var unicornsCollection = db.collection('unicorns');
      if (err) {
        console.log('Unable to connect to the mongoDB server. ERROR:', err);
      } else {
        // We are connected!
        console.log('Connection established to', mongoUrl);
        console.log('Adding new user...');

        /* Insert */
        var newUser = request.body;
        unicornsCollection.insert([newUser], function (err, result) {
          if (err) {
            console.log(err);
            response.json("error");
          } else {
            console.log('Inserted.');
            console.log('RESULT!!!!', result);
            console.log("end result");
            response.json(result);
          }
          // db.close(function() {
          //   console.log( "database CLOSED");
          // });
        }); // end insert
      } // end else
    // }); // end mongo connect

  }); // end add new

  /* find one */
  app.get('/unicorns/:name', function(request, response){
    // response.json({"description":"find by name"});
    // console.log("request.params: ", request.params);
    // MongoClient.connect(mongoUrl, function (err, db) {
      var unicornsCollection = db.collection('unicorns');
      console.log("request.params:", request.params);
      if (err) {
        console.log('Unable to connect to the mongoDB server. ERROR:', err);
      } else {
        // We are connected!
        console.log('Finding by name... ');
        /* Get */
        unicornsCollection.find(request.params).toArray(function (err, result) {
          if (err) {
            console.log("ERROR!", err);
            response.json("error");
          } else if (result.length) {
            console.log('Found:', result);
            response.json(result);
          } else { //
            console.log('No document(s) found with defined "find" criteria');
            response.json("no unicorns found");
          }
          // db.close(function() {
          //   console.log( "database CLOSED");
          // });
        }); // end find
      } // end else
    // }); // end mongo connect

  });

  /* delete one */
  app.delete('/unicorns/:name', function(request, response) {

    console.log("delete route...");

    console.log("request.body:", request.body);
    console.log("request.params:", request.params);
    console.log("request.query", request.query);

    // response.json({"description":"delete by name"});

    // MongoClient.connect(mongoUrl, function (err, db) {
      var unicornsCollection = db.collection('unicorns');
      if (err) {
        console.log('Unable to connect to the mongoDB server. ERROR:', err);
      } else {
        // We are connected!
        console.log('Deleting by name... ');

        /* Delete */
        unicornsCollection.remove(request.params, function(err, numOfRemovedDocs) {

          // console.log("numOfRemovedDocs:", numOfRemovedDocs);

          if(err) {
            console.log("error!", err);
          } else { // after deletion, retrieve list of all
            unicornsCollection.find().toArray(function (err, result) {
              if (err) {
                console.log("ERROR!", err);
                response.json("error");
              } else if (result.length) {
                console.log('Found:', result);
                response.json(result);
                // response.json({"description":"deleted"});
              } else { //
                console.log('No document(s) found with defined "find" criteria');
                response.json("none found");
              }
              // db.close(function() {
              //   console.log( "database CLOSED");
              // });
            }); // end find
          } // end else
        }); // end remove
      } // end else
    // }); // end mongo connect

  }); // end delete

  /* update one */
  app.put('/unicorns/:name', function(request, response) {
    // response.json({"description":"update by name"});
    console.log("request.body", request.body);
    console.log("request.params:", request.params);

    var old = {name: request.body.name};
    var updateTo = {name: request.body.newName, tailColor: request.body.newTailColor}

    // MongoClient.connect(mongoUrl, function (err, db) {
      var unicornsCollection = db.collection('unicorns');
      if (err) {
        console.log('Unable to connect to the mongoDB server. ERROR:', err);
      } else {
        // We are connected!
        console.log('Updating by name... ');

        /* Update */
        unicornsCollection.update(old,updateTo);

        // Wait a sec then fetch the modified doc
        setTimeout(function() {
          unicornsCollection.find(updateTo).toArray(function (err, result) {
            if (err) {
              console.log("ERROR!", err);
              response.json("error");
            } else if (result.length) {
              console.log('Found:', result);
              response.json(result);
            } else { //
              console.log('No document(s) found with defined "find" criteria');
              response.json("none found");
            }
            // db.close(function() {
            //   console.log( "database CLOSED");
            // }); // end db close
          }); // end find
        }, 1000);
      } // end else
    // }); // end mongo connect
  }); // end update


}); // end mongo connect


/* tell our app where to listen */
app.listen(3000, function(){
  console.log('listen to events on port 3000.')
});
