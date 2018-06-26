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
          <h1>Create a New Quiz</h1>
          <NewQuizForm />
        </div>
      </div>
    )
  }
}
