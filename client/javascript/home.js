import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/home_page.scss';
import { App } from './components/App';
import { init } from './helpers/appInit';

init();
ReactDOM.render(<App />, document.getElementById("quip-quiz-app"));