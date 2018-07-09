import React from 'react';
import { QuestionChoice } from './QuestionChoice';
import { setStateOnInputChange } from '../helpers/reactHelpers.js';

export class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    
    this.alphabet = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
    
    this.state = !!this.props.question 
      ? {
        questionText: this.props.question.text,
        choices: this.props.question.choices,
        answer: this.props.question.answer,
        showErrorForQuestionText: false,
        emptyChoices: [],
        showErrorForAnswer: false
      }
      : {
        questionText: "",
        choices: {
          "A": '',
          "B": ''
        },
        answer: "",
        showErrorForQuestionText: false,
        emptyChoices: [],
        showErrorForAnswer: false
      }
    
    this.addNewChoice = this.addNewChoice.bind(this);
    this.updateChoiceText = this.updateChoiceText.bind(this);
    this.onSubmitQuestion = this.onSubmitQuestion.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.handleInputChange = setStateOnInputChange.bind(this);
  }
  
  renderChoices(emptyChoices) {
    return Object.entries(this.state.choices).map((choice, i) => {
      var choiceValue = choice[0];
      var choiceText = choice[1];
      
      return <QuestionChoice
        key={i}
        choiceText={choiceText}
        choiceValue={choiceValue}
        onInputChange={this.updateChoiceText}
        onCheckboxSelect={this.updateAnswer}
        checked={this.state.answer === choiceValue}
        editMode={true}
        showError={emptyChoices.includes(choiceValue)}
      /> 
    });
  }
  
  renderErrorMessage() {
    if (this.state.showErrorForQuestionText || this.state.emptyChoices.length > 0) {
      if (this.state.showErrorForAnswer) {
        return (
          <p className="error-message">Please make sure all fields are filled out, and a correct answer is selected.</p>  
        )
      }
      
      return (
        <p className="error-message">Please make sure all fields are filled out.</p>  
      )
    }
    
    if (this.state.showErrorForAnswer) {
      return (
        <p className="error-message">Please make sure a correct answer is selected.</p>  
      )
    }
  }
  
  render() {
    return (
      <div className="question-editor-section">
        <div className="field question-field">
          <input 
            type="text" 
            id="new-question-text" 
            name="questionText" 
            placeholder="Enter question here"
            onChange={this.handleInputChange} 
            value={this.state.questionText}
            className={this.questionTextClass(this.state.showErrorForQuestionText)}
          />
        </div>
        
        <div className="choices-section">
          {this.renderChoices(this.state.emptyChoices)}
        </div>
        
        {this.renderErrorMessage()}
        
        <div className="buttons-row">
          <a className="button add-new-choice" onClick={this.addNewChoice}>
            Add new choice
          </a>
          
          <a className="button cancel-button" onClick={this.props.onCancelClick}>
            Cancel
          </a>
          
          <a className="button save-button" onClick={this.onSubmitQuestion}>
            Save
          </a>
        </div>
      </div>
    )
  }
  
  questionTextClass(error) {
    return error ? 'input-error' : '';
  }
  
  addNewChoice() {
    let numChoices = Object.entries(this.state.choices).length;
    let newChoiceValue = this.alphabet[numChoices];
    
    let newState = Object.assign({}, this.state);
    newState.choices[newChoiceValue] = '';
    this.setState(newState);
  }
  
  updateChoiceText(choiceValue, newChoiceText) {
    let newState = Object.assign({}, this.state);
    newState.choices[choiceValue] = newChoiceText;
    this.setState(newState);
  }
  
  validateChoices(callback) {
    this.setState({
      showErrorForQuestionText: this.state.questionText.length === 0,
      emptyChoices: this.getEmptyChoices(this.state.choices),
      showErrorForAnswer: this.state.answer.length === 0
    }, () => callback());
  }
  
  submitIfNoErrors() {
    if (!this.showErrors()) {
      this.props.onSave({
        text: this.state.questionText,
        choices: this.state.choices,
        answer: this.state.answer
      });
    }
  }
  
  onSubmitQuestion() {
    this.validateChoices(() => this.submitIfNoErrors());
  }
  
  updateAnswer(value) {
    this.setState({
      answer: value
    })
  }
  
  getEmptyChoices(choices) {
    var emptyChoices = [];
    
    Object.entries(this.state.choices).map((choice) => {
      if (choice[1].length === 0) {
        emptyChoices.push(choice[0]);
      }
    })
    
    return emptyChoices;
  }
  
  showErrors() {
    return this.state.showErrorForQuestionText || this.state.emptyChoices.length > 0 || this.state.showErrorForAnswer;
  }
}
