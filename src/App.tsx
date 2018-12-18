import * as React from 'react';
import './App.css';
import AppNavBar from './navigation/App.Bar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { ActionType } from './actions/Helpers';
import { IUser, ADMIN_ROLE } from './state/User';
import Loading from './components/Loading';
import { UserClaims } from './state/Claims';
import { initializeStore } from './store/Store';
import { firebaseApp } from './firebase-init';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
});

const store = initializeStore(firebaseApp());

class App extends React.Component<{}, { loading: boolean }> {
  public removeAuthListener: firebase.Unsubscribe;
  public state = { loading: true };

  public componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(async user => {

      if (user && user.emailVerified) {
        const identity = await user.getIdTokenResult(true);
        const userInfo: IUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          roles: [],
        };

        if (identity && identity.claims) {
          const claims = identity.claims;
          userInfo.claims = new UserClaims(claims);
          if (claims.admin) {
            userInfo.roles.push(ADMIN_ROLE);
          }
        }
        store.dispatch({ type: ActionType.CURRENT_USER, payload: userInfo });
      }
      setTimeout(() =>
        this.setState({ loading: false }), 2000
      );
    });
  }

  public componentWillUnmount() {
    if (this.removeAuthListener) {
      this.removeAuthListener();
    }
  }

  public render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            {this.state.loading ? (<Loading />) : (<AppNavBar />)}
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
