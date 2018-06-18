import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/index.scss';
import { QuizResultsPage } from './components/QuizResultsPage';
import { init } from './helpers/appInit';

init();
ReactDOM.render(<QuizResultsPage />, document.getElementById("quiz-results-page-container"));