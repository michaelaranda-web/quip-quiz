import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/quiz_index_page.scss';
import { QuizIndexPage } from './components/QuizIndexPage';
import { init } from './helpers/appInit';

init();
ReactDOM.render(<QuizIndexPage />, document.getElementById("quiz-index-page-container"));