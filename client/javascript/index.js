import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/index.scss';

class App extends React.Component {
  render() {
    return <div>Hello React!</div>
  }
}

ReactDOM.render(<App />, document.getElementById("quip-quiz-app"));