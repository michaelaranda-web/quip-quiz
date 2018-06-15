import React from 'react';
import { QuestionChoice } from './QuestionChoice';
import { setStateOnInputChange } from '../helpers/reactHelpers.js';

export class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    
    this.alphabet = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
    
    this.state = {
      value: '',
      choices: {
        "A": '',
        "B": ''
      },
      answer: ''
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
        isRightAnswer={this.state.answer === choiceValue}
      /> 
    });
  }
  
  render() {
    return (
      <div className="question-editor-section">
        <div className="field">
          <label htmlFor="new-question-text">Question:</label>
          <input type="text" id="new-question-text" name="value" onChange={this.handleInputChange} value={this.state.value} />
        </div>
        {this.renderChoices()}
        <div className="add-new-choice" onClick={this.addNewChoice}>
          Add new choice <span>+</span>
        </div>
        
        <a onClick={this.onSubmitQuestion}>
          Save
        </a>
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
    this.props.onQuestionAdd({
      text: this.state.value,
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
