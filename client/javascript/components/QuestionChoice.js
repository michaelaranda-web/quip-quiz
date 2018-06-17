import React from 'react';

export class QuestionChoice extends React.Component {
  constructor(props) {
    super(props);
    
    this.onCheckboxSelect = this.onCheckboxSelect.bind(this);
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
      return <span>{this.props.choiceValue}</span>
    }
  }
  
  renderChoiceText() {
    if (this.props.editMode) {
      return (
        <input 
          type="text" 
          id={`choice-${this.props.choiceValue}`}
          value={this.props.choiceText}
          onChange={this.onInputChange.bind(this)}
        />  
      )
    } else {
      return (
        <span id={`choice-${this.props.choiceValue}`}>{this.props.choiceText}</span>  
      )
    }
  }
  
  render() {
    return (
      <div className="choice">
        {this.renderChoiceValue()}
        {this.renderChoiceText()}
        <input
          id={`checkbox-${this.props.choiceValue}`}
          type="checkbox"
          name={this.props.choiceValue}
          checked={this.props.checked}
          onChange={this.onCheckboxSelect}
        />
      </div>
    )
  }
  
  onCheckboxSelect(e) {
    this.props.onCheckboxSelect(e.target.name);
  }
}
