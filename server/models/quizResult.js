var mongoose = require('mongoose');

var QuizResultSchema = new mongoose.Schema({
  quiz: mongoose.Schema.Types.ObjectId,
  responses: [],
  overallResults: mongoose.Schema.Types.Mixed
});

var QuizResultModel = mongoose.model('quiz_result', QuizResultSchema);

module.exports = QuizResultModel;