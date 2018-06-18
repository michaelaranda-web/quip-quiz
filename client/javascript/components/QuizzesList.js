import React from 'react';
import $ from 'jquery';

export class QuizzesList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quizzes: []  
    }
    
    this.visitQuiz = this.visitQuiz.bind(this);
  }
  
  componentDidMount() {
    var self = this;
    
    $.get("/api/quizzes", (data) => {
      self.setState({
        quizzes: data
      })
    });
  }
  
  render() {
    return (
      <div id="quizzes-list">
        {
          this.state.quizzes.map((quiz, i) => {
            return (
              <div className="quiz-item" key={i} onClick={() => this.visitQuiz(quiz._id)}>
                <h3>{quiz.name}</h3>
                <p>{quiz.description}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
  
  visitQuiz(quizId) {
    window.location = `/quizzes/${quizId}`
  }
}
