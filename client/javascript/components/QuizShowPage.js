import React from 'react';
import $ from 'jquery';
import { Question } from './Question';
import { QuestionChoice } from './QuestionChoice';

export class QuizShowPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quiz: null ,
      responses: {}
    }
    
    this.onChoiceSelect = this.onChoiceSelect.bind(this);
  }
  
  componentDidMount() {
    var self = this;
    
    var quizId = window.location.pathname.split('/')[2]
    
    $.get(`/api/quizzes/${quizId}`, (data) => {
      self.setState({
        quiz: data
      })
    });
  }
  
  onChoiceSelect(questionNumber, choiceValue) {
    let newState = Object.assign({}, this.state);
    newState.responses[questionNumber] = choiceValue;
    this.setState(newState);
  }
  
  render() {
    var self = this;
    var quiz = this.state.quiz;
    
    if (quiz) {
      return (
        <div id="quiz-show-page">
          <div className="quiz-container">
            <h2>{quiz.name}</h2>
            <h4>{quiz.description}</h4>
            
            {
              this.state.quiz.questions.map((question, i) => {
                return (
                  <Question 
                    key={i}
                    question={question}
                    questionNumber={i}
                    onChoiceSelect={self.onChoiceSelect}
                  />  
                )
              })
            }
            
            <button>Submit</button>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}
