import React from 'react';
import $ from 'jquery';

export class QuizzesList extends React.Component {
  componentDidMount() {
    $.get("/api/quizzes", (data, status) => {
      console.log(data);
      console.log(status);
    });
  }
  
  render() {
    return (
      <div id="quizzes-list">
        Quizzes List
      </div>
    )
  }
}
