import * as React from 'react';
import './App.css';
import AppNavBar from './navigation/App.Bar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// import logo from './logo.svg';
import { store } from './store/Store';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <AppNavBar />
        </Router>
      </Provider>
    );
  }
}

export default App;
