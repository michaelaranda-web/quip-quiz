import React from 'react';
import $ from 'jquery';
import { setStateOnInputChange } from '../helpers/reactHelpers.js';
import { AddQuestionsSection } from './AddQuestionsSection.js';

export class NewQuizForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      description: ''
    }
    this.handleInputChange = setStateOnInputChange.bind(this);
  }
  
  render() {
    return (
      <form id="new-quiz-form" onSubmit={this.onSubmit.bind(this)}>
        <div className="field">
          <label htmlFor="quiz-name">Name</label>
          <input type="text" id="quiz-name" name="name" onChange={this.handleInputChange}/>
        </div>
        <div className="field">
          <label htmlFor="quiz-description">Description</label>
          <textarea id="quiz-description" name="description" onChange={this.handleInputChange}/>
        </div>
        
        <h3>Questions</h3>
        <AddQuestionsSection
          onQuestionAdd={this.onQuestionAdd.bind(this)}
        />
        
        <button>Submit</button>
      </form>
    )
  }
  
  onSubmit(event) {
    event.preventDefault();
    
    $.ajax({
      url: "/quizzes",
      type: 'POST',
      data: {
        name: this.state.name,
        description: this.state.description
      },
      success: function(data) {
        console.log("success!");
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  
  onQuestionAdd(question) {
    this.setState({
      questions: this.setState.questions.concat(question)
    });
  }
  
  // onQuestionRemove(questionToRemove) {
    // this.setState({
    //   questions: this.setState.questions.filter((question) => {
    //     question.id === questionToRemove.id
    //   })
    // });
  // }
}
