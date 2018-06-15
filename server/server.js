var http = require('http');
var path = require('path');

var express = require('express');
var router = express();
var server = http.createServer(router);

var favicon = require('serve-favicon');
router.use(favicon(path.join(__dirname,'..','client','img','favicon.ico')));

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var devConfig = require('../webpack.dev.config.js');
var compiler = webpack(devConfig);

if (process.env.NODE_ENV === "development") {
  router.use(webpackDevMiddleware(compiler, {
    publicPath: process.env.IP + ":" + process.env.PORT + "/",
  }));
} else {
  router.use(express.static('public'));
}

/**************************************************************
 * Database Setup
 *************************************************************/ 
var databaseSetup = require("./database.js").databaseSetup;
databaseSetup();

/**************************************************************
 * Routes
 *************************************************************/ 

router.use(express.urlencoded({extended: true}));
 
router.get('/', function(req, res) {
  res.sendFile(getPage('/home.html'));
});

router.get('/quizzes', function(req, res) {
  res.sendFile(getPage('/quizzes/index.html'));
});

router.get('/quizzes/new', function(req, res) {
  res.sendFile(getPage('/quizzes/new.html'));
});

router.post('/quizzes/', function(req, res) {
  console.log("Name: ", req.body.name);
  console.log("Description: ", req.body.description);
  // console.log(req.body.questions);
  
  res.send("Posted to /quizzes successfully!");
  // //Test MongoDB connection
  // var QuizModel = require("./models/quiz.js");
  // var quiz_instance = new QuizModel({name: "Test Quiz", description: "I am a test quiz created on " + new Date().toString()});
  // quiz_instance.save(function (err) {
  //   if (err) handleError(res, err.message, "Failed to save quiz.");
  //   res.send("Saved successfully!");
  // });
  }
)

/**************************************************************
 * Server Start
 *************************************************************/

server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function() {
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