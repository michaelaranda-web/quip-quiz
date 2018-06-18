import React from 'react';

export class QuizResultsPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quiz: null
    }
  }
  
  render() {
    var quiz = this.state.quiz;
    
    if (quiz) {
      return (
        <div id="quiz-results-page">
          Quiz Results Page
        </div>
      )
    } else {
      return null;
    }
  }
}
