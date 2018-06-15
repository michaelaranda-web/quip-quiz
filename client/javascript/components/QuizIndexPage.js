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
          <h2>Quizzes</h2>
          <QuizzesList />
        </div>
      </div>
    )
  }
}
