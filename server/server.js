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

var QuizModel = require("./models/quiz.js");
var QuizResultModel = require("./models/quizResult.js");

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

//MATCHES WITH quizzes/new, NEEDS TO COME AFTER!
router.get('/quizzes/:quiz_id', function(req, res) {
  res.sendFile(getPage('/quizzes/show.html'));
});

router.get('/quizzes/:quiz_id/results', function(req, res) {
  res.sendFile(getPage('/quizzes/results.html'));
});

router.post('/quizzes/', function(req, res) {
  console.log("Name: ", req.body.name);
  console.log("Description: ", req.body.description);
  console.log("Questions: ", req.body.questions);
  
  //Test MongoDB connection
  var quiz_instance = new QuizModel({
    name: req.body.name, 
    description: req.body.description,
    questions: req.body.questions
  });
  
  quiz_instance.save(function (err) {
    if (err) handleError(res, err.message, "Failed to save quiz.");
    res.send("Saved successfully!");
  });
  }
)

/**************************************************************
 * API Routes
 *************************************************************/ 
router.get('/api/quizzes', function(req, res) {
  QuizModel.find({}, (err, quizzes) => {
    if (err) return handleError(err);
    if (quizzes) {
      res.send(quizzes);
    }
  });
});

router.get('/api/quizzes/:quiz_id', function(req, res) {
  var quizId = req.params.quiz_id;
  
  QuizModel.findById(quizId, (err, quiz) => {
    if (err) handleError(res, err.message);
    res.send(quiz);
  })
});

router.post('/api/quizzes/:quiz_id/submit', function(req, res) {
  var quizId = req.params.quiz_id;
  var responses = req.body.responses;
  
  QuizModel.findById(quizId, (err, quiz) => {
    if (err) handleError(res, err.message);
    
    var quizResults = quiz.questions.map((question, i) => {
      var answeredCorrectly = false;
      
      if (question.answer === responses[i]) {
        answeredCorrectly = true;
      }
      
      return { 
        response: question.choices[responses[i]],
        correctAnswer: question.choices[question.answer],
        answeredCorrectly: answeredCorrectly
      }
    });
    
    var quizResultInstance = new QuizResultModel({
      quiz: quizId, 
      results: quizResults
    });
    
    quizResultInstance.save(function (err, result) {
      if (err) handleError(res, err.message, "Failed to submit quiz.");
      res.send({
        quizResultId: result._id,
        redirectPath: `/quizzes/${quizId}/results`
      });
    });
  })
})

router.get('/api/quiz_results/:quiz_result_id', function(req, res) {
  var quizResultId = req.params.quiz_result_id;
  
  QuizResultModel.findById(quizResultId, (err, quizResult) => {
    if (err) handleError(res, err.message);
    
    QuizModel.findById(quizResult.quiz, (err, quiz) => {
      if (err) handleError(res, err.message);
      
      res.send({
        quiz: quiz,
        quizResult: quizResult.results
      });
    })
  })
});

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