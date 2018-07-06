import React from 'react';
import $ from 'jquery';
import { QuestionEditor } from './QuestionEditor';

export class AddQuestionsSection extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editingQuestion: false,
      savedQuestionEditing: null
    }
    
    this.onQuestionAdd = this.onQuestionAdd.bind(this);
  }
  
  renderQuestionEditorSection() {
    if (this.state.editingQuestion) {
      return (
        <QuestionEditor
          onSave={this.onQuestionAdd}
          onCancelClick={() => {this.onQuestionEditorClose()}}
        />
      )
    }
  }
  
  renderQuestions() {
    if (this.props.questions.length === 0) {
      return null;  
    }
    
    return (
      <div className="questions-section">
        {
          this.props.questions.map((question, i) => {
            if (i === this.state.savedQuestionEditing) {
              return <QuestionEditor 
                key={i}
                question={question}
                onSave={(updatedQuestion) => this.onQuestionUpdate(i, updatedQuestion)}
                onCancelClick={() => this.onSavedQuestionEditorClose()}
              />
            }
            
            return (
              <div className={`question-item question-${i+1}`} key={i}>
                <div className="close-icon fa fa-fw fa-times-circle" onClick={() => { this.props.onQuestionRemove(i) }}></div>
                <div className="edit-icon fa fa-fw fa-pen" onClick={() => { this.editQuestion(i) }}></div>
                <p className="question">{`Question ${i+1}: ${question.text}`}</p>
                {
                  Object.entries(question.choices).map((choice, i) => {
                    var rightAnswer = choice[0] === question.answer;
                    var checkmark = rightAnswer ? <span className="checkmark">✔</span> : null;
                    
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
        <div className="button-row">
          <a className="button add-new-question-button" onClick={() => {this.showQuestionEditorSection()}}>
            Add new question
          </a>  
        </div>
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
    this.props.onQuestionAdd(question);
    this.onQuestionEditorClose(false);
  }
  
  editQuestion(questionIndex) {
    this.setState({
      savedQuestionEditing: questionIndex
    });
  }
  
  onQuestionUpdate(questionIndex, updatedQuestion) {
    this.updateSavedQuestion(questionIndex, updatedQuestion); 
    this.closeSavedQuestionEditor();
  }
  
  onQuestionEditorClose() {
    this.props.onQuestionEditorUpdate(false);
    this.closeQuestionEditor();
  }
  
  onSavedQuestionEditorClose() {
    this.props.onQuestionEditorUpdate(false);
    this.closeSavedQuestionEditor();
  }
  
  updateSavedQuestion(questionIndex, updatedQuestion) {
    var updatedQuestions = this.props.questions.map((question, i) => {
      if (questionIndex === i) {
        return updatedQuestion;
      }
      return question;
    });
    
    this.props.onQuestionsUpdated(updatedQuestions);
  }
  
  closeQuestionEditor() {
    this.setState({
      editingQuestion: false
    })
  }
  
  closeSavedQuestionEditor() {
    this.setState({
      savedQuestionEditing: null
    })
  }
  
  showQuestionEditorSection() {
    this.props.onQuestionEditorUpdate(true);
    this.setState({
      editingQuestion: true
    });
  }
}
