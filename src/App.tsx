import * as React from 'react';
import './App.css';
import AppNavBar from './navigation/App.Bar';
import { BrowserRouter as Router } from 'react-router-dom';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
    <Router>
      <AppNavBar/>
    </Router>
    );
  }
}

export default App;
