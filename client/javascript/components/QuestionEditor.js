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
        answer: this.props.question.answer
      }
      : {
        questionText: "",
        choices: {
          "A": '',
          "B": ''
        },
        answer: ""
      }
    
    this.addNewChoice = this.addNewChoice.bind(this);
    this.updateChoiceText = this.updateChoiceText.bind(this);
    this.onSubmitQuestion = this.onSubmitQuestion.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.handleInputChange = setStateOnInputChange.bind(this);
  }
  
  renderChoices() {
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
      /> 
    });
  }
  
  render() {
    return (
      <div className="question-editor-section">
        <div className="field">
          <label htmlFor="new-question-text">Question:</label>
          <input 
            type="text" 
            id="new-question-text" 
            name="questionText" 
            onChange={this.handleInputChange} 
            value={this.state.questionText}
          />
        </div>
        {this.renderChoices()}
        
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
  
  onSubmitQuestion() {
    this.props.onSave({
      text: this.state.questionText,
      choices: this.state.choices,
      answer: this.state.answer
    });
  }
  
  updateAnswer(value) {
    this.setState({
      answer: value
    })
  }
}
