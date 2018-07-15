import React from 'react';

export class QuestionChoice extends React.Component {
  constructor(props) {
    super(props);
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
        <label 
          id={`choice-${this.props.choiceValue}`}
          htmlFor={`checkbox-${this.props.choiceValue}`}>
            {this.props.choiceText}
        </label>
      )
    }
  }
  
  render() {
    return (
      <div className="choice">
        <label className="checkbox-container">
          <input
            id={`checkbox-${this.props.choiceValue}`}
            type="checkbox"
            name={this.props.choiceValue}
            checked={this.props.checked}
            onChange={(event) => this.onCheckboxSelect(event)}
          />
          <span className="checkmark"></span>
        </label>
        {this.renderChoiceValue()}
        {this.renderChoiceText()}
      </div>
    )
  }
  
  choiceTextClass() {
    return this.props.showError ? "choice-text input-error" : "choice-text";
  }
  
  onCheckboxSelect(e) {
    this.props.onCheckboxSelect(e.target.name);
  }
}
