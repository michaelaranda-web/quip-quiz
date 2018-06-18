var mongoose = require('mongoose');

var QuizResultSchema = new mongoose.Schema({
  quiz: mongoose.Schema.Types.ObjectId,
  results: []
});

var QuizResultModel = mongoose.model('quiz_result', QuizResultSchema);

module.exports = QuizResultModel;