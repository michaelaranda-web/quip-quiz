import React from 'react';
import { QuestionChoice } from './QuestionChoice';
import { generateQuip } from '../helpers/quip';

export class Question extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentResponse: '',
      quip: ''
    }
    
    this.onChoiceSelect = this.onChoiceSelect.bind(this);
  }
  
  renderQuip() {
    if (this.state.currentResponse !== "") {
      return (
        <p className="quip">{this.state.quip}</p>  
      )
    }
  }
  
  render() {
    var self = this;
    
    return  (
      <div className="question-item">
        <p className="question">{`Question ${this.props.questionNumber+1}: ${this.props.question.text}`}</p>
        {
          Object.entries(this.props.question.choices).map((choice, i) => {
            var choiceValue = choice[0];
            var choiceText = choice[1];
            
            return (
              <QuestionChoice
                key={i}
                checked={this.state.currentResponse === choiceValue}
                choiceValue={choiceValue}
                choiceText={choiceText}
                onCheckboxSelect={self.onChoiceSelect}
              />
            )
          })
        }
        {this.renderQuip()}
      </div>
    )
    
  }
  
  onChoiceSelect(choiceValue) {
    this.setState({
      currentResponse: choiceValue,
      quip: generateQuip()
    })
    
    this.props.onChoiceSelect(this.props.questionNumber, choiceValue);
  }
}
