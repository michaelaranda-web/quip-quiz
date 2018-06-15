import React from 'react';

export class QuestionChoice extends React.Component {
  constructor(props) {
    super(props);
    
    this.onCheckboxSelect = this.onCheckboxSelect.bind(this);
  }
  
  onInputChange(e) {
    this.props.onInputChange(this.props.choiceValue, e.target.value);
  }
  
  render() {
    return (
      <div className="choice">
        <span>{this.props.choiceValue}</span>
        <input 
          type="text" 
          id={`choice-${this.props.choiceValue}`}
          value={this.props.choiceText}
          onChange={this.onInputChange.bind(this)}
        />
        <input
          id={`checkbox-${this.props.choiceValue}`}
          type="checkbox"
          name={this.props.choiceValue}
          checked={this.props.isRightAnswer}
          onChange={this.onCheckboxSelect}
        />
      </div>
    )
  }
  
  onCheckboxSelect(e) {
    this.props.onCheckboxSelect(e.target.name);
  }
}
