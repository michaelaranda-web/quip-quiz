import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/index.scss';
import { QuizShowPage } from './components/QuizShowPage';
import { init } from './helpers/appInit';

init();
ReactDOM.render(<QuizShowPage />, document.getElementById("quiz-show-page-container"));