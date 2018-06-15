import React from 'react';

export class QuestionChoice extends React.Component {
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
      </div>
    )
  }
}
