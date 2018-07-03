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
      questions: [],
      showErrorForName: false,
      showErrorForDescription: false,
      showErrorForQuestions: false,
      questionEditorOpen: false
    }
    
    this.handleInputChange = setStateOnInputChange.bind(this);
  }
  
  render() {
    return (
      <form id="new-quiz-form">
        <div className="field name-field">
          <label htmlFor="quiz-name">Name</label>
          <input 
            type="text" 
            id="quiz-name" 
            name="name" 
            className={this.nameFieldClass()}
            onChange={this.handleInputChange}
          />
          {this.renderErrorMessageForName()}
        </div>
        <div className="field description-field">
          <label htmlFor="quiz-description">Description</label>
          <textarea 
            id="quiz-description" 
            name="description" 
            className={this.descriptionFieldClass()}
            onChange={this.handleInputChange}
          />
          {this.renderErrorMessageForDescription()}
        </div>
        
        <h3 className="add-questions-section-header">Questions</h3>
        <AddQuestionsSection
          questions={this.state.questions}
          onQuestionAdd={this.onQuestionAdd.bind(this)}
          onQuestionRemove={this.removeQuestion.bind(this)}
          onQuestionsUpdated={this.updateQuestions.bind(this)}
          onQuestionEditorUpdate={this.setQuestionEditorOpen.bind(this)}
        />
        {this.renderErrorMessageForQuestions()}
        <div className="submit-button-row">
          <a className="button save-button" onClick={this.onSubmit.bind(this)}>Submit</a>
        </div>
      </form>
    )
  }
  
  nameFieldClass() {
    if (this.state.showErrorForName && this.state.name === "") {
      return "input-error"
    }
    return "";
  }
  
  descriptionFieldClass() {
    if (this.state.showErrorForDescription && this.state.description === "") {
      return "input-error"
    }
    return "";
  }
  
  renderErrorMessageForName() {
    if (this.state.showErrorForName && this.state.name === "") {
      return (
        <p className="error-message">Name cannot be blank.</p>  
      )
    }
  }
  
  renderErrorMessageForDescription() {
    if (this.state.showErrorForDescription && this.state.description === "") {
      return (
        <p className="error-message">Description cannot be blank.</p>  
      )
    }
  }
  
  renderErrorMessageForQuestions() {
    if (this.state.showErrorForQuestions && this.state.questions.length === 0 && !this.state.questionEditorOpen) {
      return (
        <p className="error-message">You must add questions before submitting a quiz.</p>  
      )
    }
  }
  
  onSubmit(event) {
    event.preventDefault();
    
    var anyErrors = false;
    
    if (this.state.name === "") {
      this.setState({
        showErrorForName: true
      });
      
      anyErrors = true;
    }
    
    if (this.state.description === "") {
      this.setState({
        showErrorForDescription: true
      });
      
      anyErrors = true;
    }
    
    if (this.state.questions.length === 0) {
      this.setState({
        showErrorForQuestions: true
      });
      
      anyErrors = true;
    }
    
    if (!anyErrors) {
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
  
  updateQuestions(updatedQuestions) {
    this.setState({
      questions: updatedQuestions
    });
  }
  
  setQuestionEditorOpen(open) {
    this.setState({
      questionEditorOpen: open
    })
  }
}
