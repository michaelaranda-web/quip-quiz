import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/quiz_new_page.scss';
import { NewQuizPage } from './components/NewQuizPage';
import { init } from './helpers/appInit';

init();
ReactDOM.render(<NewQuizPage />, document.getElementById("quiz-new-page-container"));