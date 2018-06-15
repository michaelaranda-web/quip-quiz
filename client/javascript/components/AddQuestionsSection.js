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
        />
      )
    }
  }
  
  renderQuestions() {
    return (
      <div className="questions-section">
        {
          this.state.questions.map((question, i) => {
            return (
              <div className={`question-${i+1}`} key={i}>
                <h4>{`Question ${i+1}: ${question.text}`}</h4>
                {
                  Object.entries(question.choices).map((choice, i) => {
                    return (
                      <div className="choice" key={i}>
                        {`${choice[0]} ${choice[1]}`}
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
  
  render() {
    return (
      <div className="add-questions-section">
        {this.renderQuestions()}
        {this.renderQuestionEditorSection()}
        <div className="add-new-question-header" onClick={() => {this.showQuestionEditorSection(true)}}>
          Add new question <span>+</span>
        </div>
      </div>
    )
  }
  
  onQuestionAdd(question) {
    this.setState({
      questions: this.state.questions.concat(question)
    });
    
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
