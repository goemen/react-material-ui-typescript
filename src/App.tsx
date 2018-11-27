import * as React from 'react';
import './App.css';
import AppNavBar from './navigation/App.Bar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import * as firebase from 'firebase';
import { ActionType } from './actions/Helpers';
import { IUser, ADMIN_ROLE } from './state/User';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
});

class App extends React.Component {

  public componentWillMount() {
    firebase.auth().onAuthStateChanged(async user => {

      if (user && user.emailVerified) {
        const identity = await user.getIdTokenResult(true);
        const userInfo: IUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          roles: []
        };

        if (identity && identity.claims) {
          const claims = identity.claims;
          if (claims.admin) {
            userInfo.roles.push(ADMIN_ROLE);
          }
        }

        store.dispatch({ type: ActionType.CURRENT_USER, payload: userInfo });
      }
    });
  }

  public render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <AppNavBar />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
