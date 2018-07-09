import React from 'react';
import $ from 'jquery';

export class QuizResultsPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quiz: null,
      responses: null,
      overallResults: null
    }
  }
  
  componentDidMount() {
    var self = this;
    
    var quizResultId = sessionStorage.getItem('quiz_result_id');
    
    $.get(`/api/quiz_results/${quizResultId}`, (data) => {
      self.setState({
        quiz: data.quiz,
        responses: data.responses,
        overallResults: data.overallResults
      })
    });
  }
  
  renderResults() {
    var quiz = this.state.quiz;
    
    return this.state.responses.map((response, i) => {
      var answerIcon = response.answeredCorrectly 
        ? <span className="checkmark-icon">✓</span> 
        : <span className="x-icon">X</span>
      
      return (
        <div className="result" key={i}>
          <p className="question">{`Question ${i+1}: ${quiz.questions[i].text}`}</p>
          <p className="response">{`Your answer: ${response.response}`}</p>
          <p className="correct-answer">{`Correct answer: ${response.correctAnswer}`} {answerIcon}</p>
        </div>
      )
    })
  }
  
  renderScore() {
    var overallResults = this.state.overallResults;
    var numCorrect = overallResults.numCorrect;
    var numQuestions = overallResults.numQuestions;
    
    var quizScore = numCorrect / numQuestions * 100;
    var quizScoreTwoDecimals = quizScore.toFixed(2);
    
    return (
      <div className="score">
        <p>Score: <span>{quizScoreTwoDecimals}% </span><span>({numCorrect}/{numQuestions})</span></p>
      </div>
    )
  }
  
  render() {
    var quiz = this.state.quiz;
    
    if (quiz) {
      return (
        <div id="quiz-results-page">
          <div className="results-container">
            <h1>{quiz.name}</h1>
            <h4>{quiz.description}</h4>
            
            <h2>Results</h2>
            {this.renderResults()}
            {this.renderScore()}
            
            <div className="buttons-row">
              <a className="button view-more-quizzes-button" href="/quizzes">View More Quizzes</a>
              <a className="button create-quiz-button" href="/quizzes/new">Create a Quiz</a>
              <a className="button home-button" href="/">Home</a>
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
