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
    
    //A lot of this data should be organized as part of presenting the response, server-side
    return this.state.responses.map((response, i) => {
      return (
        <div className="result" key={i}>
          <p>{`Question ${quiz.questions[i].text}`}</p>
          <p>{`Your response was: ${response.response}`}</p>
          <p>{`The correct response was: ${response.correctAnswer}`}</p>
          <p>{`You answered ${response.answeredCorrectly ? 'correctly' : 'incorrectly'}!`}</p>
        </div>
      )
    })
  }
  
  renderScore() {
    var overallResults = this.state.overallResults;
    var numCorrect = overallResults.numCorrect;
    var numQuestions = overallResults.numQuestions;
    
    var quizScore = numCorrect / numQuestions;
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
          <h1>{quiz.name}</h1>
          <h3>{quiz.description}</h3>
          
          <h4>Results</h4>
          {this.renderResults()}
          {this.renderScore()}
        </div>
      )
    } else {
      return null;
    }
  }
}
