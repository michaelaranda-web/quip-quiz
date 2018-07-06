import React from 'react';

export class HomePage extends React.Component {
  render() {
    return (
      <div id="home-page">
        <div className="header-section">
          <h1>QuipQuiz</h1>
          <h3>Where the quizzes answer back.</h3>
        </div>
        
        <div className="content-section">
          <div className="button-row">
            <div className="button-container">
              <a className="button home-page-button" href="/quizzes">View Quizzes</a>
            </div>
            <div className="button-container">
              <a className="button home-page-button" href="/quizzes/new">Create a Quiz</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
