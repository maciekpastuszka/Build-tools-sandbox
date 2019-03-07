import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.scss';

class App extends React.Component {
  render() {
    return (
      <div className={styles.test}>
        Hello world
      </div>
    );
  }
}

const mountNode = document.querySelector('#app');
ReactDOM.render(<App/>, mountNode);
