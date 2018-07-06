import React from 'react';
import { generateQuip } from '../helpers/quip';

export class QuestionChoice extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      quip: ""
    }
  }
  
  static get defaultProps() {
    return {
      editMode: false,
      onInputChange: () =>  {},
      onCheckboxSelect: () => {}
    }
  }
  
  onInputChange(e) {
    this.props.onInputChange(this.props.choiceValue, e.target.value);
  }
  
  renderChoiceValue() {
    if (this.props.editMode) {
      return <label className="choice-value">{this.props.choiceValue}</label>
    }
  }
  
  renderChoiceText() {
    if (this.props.editMode) {
      return (
        <input 
          type="text"
          id={`choice-${this.props.choiceValue}`}
          value={this.props.choiceText}
          placeholder={this.props.choiceText}
          onChange={this.onInputChange.bind(this)}
          className={this.choiceTextClass()}
        />  
      )
    } else {
      return (
        <span id={`choice-${this.props.choiceValue}`}>{this.props.choiceText}</span>
      )
    }
  }
  
  renderQuip() {
    if (this.props.checked && !this.props.editMode) {
      return (
        <span className="quip">{this.state.quip}</span>  
      )
    }
  }
  
  render() {
    return (
      <div className="choice">
        {this.renderChoiceValue()}
        {this.renderChoiceText()}
        
        <label className="checkbox-container">
          <input
            id={`checkbox-${this.props.choiceValue}`}
            type="checkbox"
            name={this.props.choiceValue}
            checked={this.props.checked}
            onChange={(event) => this.onCheckboxSelect(event)}
          />
          <span class="correct-answer-checkmark"></span>
        </label>

        {this.renderQuip()}
      </div>
    )
  }
  
  choiceTextClass() {
    return this.props.showError ? "choice-text input-error" : "choice-text";
  }
  
  onCheckboxSelect(e) {
    this.setState({quip: generateQuip()});
    this.props.onCheckboxSelect(e.target.name);
  }
}
