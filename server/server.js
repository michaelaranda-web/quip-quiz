var http = require('http');
var path = require('path');

var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

/**************************************************************
 * Database Setup
 *************************************************************/ 
var databaseSetup = require("./database.js").databaseSetup;
databaseSetup();

/**************************************************************
 * Routes
 *************************************************************/ 
router.get('/', function(req, res) {
  res.sendFile(getPage('/home.html'));
});

router.get('/quizzes', function(req, res) {
  res.sendFile(getPage('/quizzes/index.html'));
});

router.get('/quizzes/add_test', function(req, res) {
  //Test MongoDB connection
  var QuizModel = require("./models/quiz.js");
  var quiz_instance = new QuizModel({name: "Test Quiz", description: "I am a test quiz created on " + new Date().toString()});
  quiz_instance.save(function (err) {
    if (err) handleError(res, err.message, "Failed to save quiz.");
    res.send("Saved successfully!");
  });
})

/**************************************************************
 * Server Start
 *************************************************************/ 

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

function getPage(filename) {
  return path.join(__dirname, '../client/views', filename);
}

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}