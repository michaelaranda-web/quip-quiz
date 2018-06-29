import React from 'react';
import $ from 'jquery';
import { Question } from './Question';
import { NavBackArrow } from './NavBackArrow';

export class QuizShowPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quiz: null ,
      responses: {}
    }
    
    this.onChoiceSelect = this.onChoiceSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
  
  render() {
    var self = this;
    var quiz = this.state.quiz;
    
    if (quiz) {
      return (
        <div id="quiz-show-page">
          <div className="quiz-container">
            <NavBackArrow redirectPath={'/quizzes'}/>
            <h1>{quiz.name}</h1>
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
            
            <div className="buttons-row">
              <a className="button save-button" onClick={self.onSubmit}>Submit</a>
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
  
  onChoiceSelect(questionNumber, choiceValue) {
    let newState = Object.assign({}, this.state);
    newState.responses[questionNumber] = choiceValue;
    this.setState(newState);
  }
  
  onSubmit(event) {
    event.preventDefault();
    
    $.ajax({
      url: `/api/quizzes/${this.state.quiz._id}/submit`,
      type: 'POST',
      data: {
        responses: this.state.responses
      },
      success: function(data) {
        sessionStorage.setItem('quiz_result_id', data.quizResultId);
        
        if (data.redirectPath) {
          window.location.href = data.redirectPath;
        } else {
          console.log("success!");
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
}
