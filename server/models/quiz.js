var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  description: String,
  questions: [
    { 
      text: String, 
      choices: Object,
      answer: String
    }
  ]
});

var QuizModel = mongoose.model('quiz', QuizSchema);

module.exports = QuizModel;