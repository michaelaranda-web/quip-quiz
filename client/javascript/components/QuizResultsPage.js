import React from 'react';
import $ from 'jquery';

export class QuizResultsPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quiz: null,
      results: null
    }
  }
  
  componentDidMount() {
    var self = this;
    
    var quizResultId = sessionStorage.getItem('quiz_result_id');
    
    $.get(`/api/quiz_results/${quizResultId}`, (data) => {
      self.setState({
        quiz: data.quiz,
        results: data.quizResult
      })
    });
  }
  
  renderResults() {
    var quiz = this.state.quiz;
    
    //A lot of this data should be organized as part of presenting the response, server-side
    return this.state.results.map((result, i) => {
      return (
        <div className="result" key={i}>
          <p>{`Question ${quiz.questions[i].text}`}</p>
          <p>{`Your response was: ${result.response}`}</p>
          <p>{`The correct response was: ${result.correctAnswer}`}</p>
          <p>{`You answered ${result.answeredCorrectly ? 'correctly' : 'incorrectly'}!`}</p>
        </div>
      )
    })
  }
  
  render() {
    var quiz = this.state.quiz;
    var results = this.state.results;
    
    if (quiz && results) {
      return (
        <div id="quiz-results-page">
          <h1>{quiz.name}</h1>
          <h3>{quiz.description}</h3>
          
          <h4>Results</h4>
          {this.renderResults()}
        </div>
      )
    } else {
      return null;
    }
  }
}
