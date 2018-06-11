import React from 'react';

export class NewQuizForm extends React.Component {
  render() {
    return (
      <form id="new-quiz-form" action="/quizzes" method="POST">
        <div className="field">
          <label htmlFor="quiz-name">Name</label>
          <input type="text" id="quiz-name" name="name" />
        </div>
        <div className="field">
          <label htmlFor="quiz-description">Description</label>
          <textarea id="quiz-description" name="description" />
        </div>
        
        <button>Submit</button>
      </form>
    )
  }
}
