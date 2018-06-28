import React from 'react';
import $ from 'jquery';
import { QuestionEditor } from './QuestionEditor';

export class AddQuestionsSection extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      questions: [],
      editingQuestion: false
    }
    
    this.onQuestionAdd = this.onQuestionAdd.bind(this);
    // this.onQuestionRemove = this.onQuestionRemove.bind(this);
  }
  
  showQuestionEditorSection(show) {
    this.setState({editingQuestion: show});
  }
  
  renderQuestionEditorSection() {
    if (this.state.editingQuestion) {
      return (
        <QuestionEditor 
          onQuestionAdd={this.onQuestionAdd}
          onQuestionRemove={this.onQuestionRemove}
          onCancelClick={() => {this.showQuestionEditorSection(false)}}
        />
      )
    }
  }
  
  renderQuestions() {
    if (this.state.questions.length === 0) {
      return null;  
    }
    
    return (
      <div className="questions-section">
        {
          this.state.questions.map((question, i) => {
            return (
              <div className={`question-${i+1}`} key={i}>
                <p className="question">{`Question ${i+1}: ${question.text}`}</p>
                {
                  Object.entries(question.choices).map((choice, i) => {
                    var rightAnswer = choice[0] === question.answer;
                    var checkmark = rightAnswer ? <span>✔</span> : null;
                    
                    return (
                      <div className="choice" key={i}>
                        {choice[1]} {checkmark}
                      </div>
                    ) 
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
  
  renderAddNewQuestion() {
    if (!this.state.editingQuestion) {
      return (
        <a className="button add-new-question-button" onClick={() => {this.showQuestionEditorSection(true)}}>
          Add new question
        </a>  
      )
    }
  }
  
  render() {
    return (
      <div className="add-questions-section">
        {this.renderQuestions()}
        {this.renderQuestionEditorSection()}
        {this.renderAddNewQuestion()}
      </div>
    )
  }
  
  onQuestionAdd(question) {
    this.setState({
      questions: this.state.questions.concat(question)
    });
    
    this.props.onQuestionAdd(question);
    
    this.showQuestionEditorSection(false);
  }
  
  // onQuestionRemove(questionToRemove) {
  //   this.setState({
  //     questions: this.setState.questions.filter((question) => {
  //       question.id === questionToRemove.id
  //     })
  //   });
    
  //   this.props.onQuestionRemove(questionToRemove);
  // }
}
