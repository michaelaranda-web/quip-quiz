import React from 'react';
import { QuizzesList } from './QuizzesList';

export class QuizIndexPage extends React.Component {
  render() {
    return (
      <div id="quiz-index-page">
        <div className="form-container">
          <div className="top-row">
            {"<"}
          </div>
          <h1>Quizzes</h1>
          <QuizzesList />
        </div>
      </div>
    )
  }
}
