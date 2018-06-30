import React from 'react';
import $ from 'jquery';
import { setStateOnInputChange } from '../helpers/reactHelpers.js';
import { AddQuestionsSection } from './AddQuestionsSection.js';

export class NewQuizForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      description: '',
      questions: []
    }
    this.handleInputChange = setStateOnInputChange.bind(this);
  }
  
  render() {
    return (
      <form id="new-quiz-form">
        <div className="field name-field">
          <label htmlFor="quiz-name">Name</label>
          <input type="text" id="quiz-name" name="name" onChange={this.handleInputChange}/>
        </div>
        <div className="field description-field">
          <label htmlFor="quiz-description">Description</label>
          <textarea id="quiz-description" name="description" onChange={this.handleInputChange}/>
        </div>
        
        <h3 className="add-questions-section-header">Questions</h3>
        <AddQuestionsSection
          questions={this.state.questions}
          onQuestionAdd={this.onQuestionAdd.bind(this)}
          onQuestionRemove={this.removeQuestion.bind(this)}
        />
        <div className="submit-button-row">
          <a className="button save-button" onClick={this.onSubmit.bind(this)}>Submit</a>
        </div>
      </form>
    )
  }
  
  onSubmit(event) {
    event.preventDefault();
    
    $.ajax({
      url: "/quizzes",
      type: 'POST',
      data: {
        name: this.state.name,
        description: this.state.description,
        questions: this.state.questions
      },
      success: function(data) {
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
  
  onQuestionAdd(question) {
    this.setState({
      questions: this.state.questions.concat(question)
    });
  }
  
  removeQuestion(index) {
    this.setState({
      questions: this.state.questions.filter((question, i) => {
        return index != i;
      })
    });
  }
}
