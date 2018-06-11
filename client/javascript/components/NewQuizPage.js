import React from 'react';
import { NewQuizForm } from './NewQuizForm';

export class NewQuizPage extends React.Component {
  render() {
    return (
      <div id="quiz-new-page">
        <div className="form-container">
          <div className="top-row">
            {"<"}
          </div>
          <h2>New Quiz Form</h2>
          <NewQuizForm />
        </div>
      </div>
    )
  }
}
