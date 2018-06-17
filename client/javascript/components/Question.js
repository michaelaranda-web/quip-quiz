import React from 'react';
import { QuestionChoice } from './QuestionChoice';

export class Question extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentResponse: ''
    }
    
    this.onChoiceSelect = this.onChoiceSelect.bind(this);
  }
  
  render() {
    var self = this;
    
    return  (
      <div className="question">
        <h4>{`Question ${this.props.questionNumber+1}: ${this.props.question.text}`}</h4>
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
      </div>
    )
    
  }
  
  onChoiceSelect(choiceValue) {
    this.setState({
      currentResponse: choiceValue
    })
    
    this.props.onChoiceSelect(this.props.questionNumber, choiceValue);
  }
}
